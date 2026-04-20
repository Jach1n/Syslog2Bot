package main

import (
	"encoding/json"
	"fmt"
	"net"
	"os"
	"strings"
	"time"
)

type SyslogForwardMessage struct {
	Timestamp   string                 `json:"timestamp"`
	SourceIP    string                 `json:"sourceIp"`
	DeviceName  string                 `json:"deviceName"`
	Facility    int                    `json:"facility"`
	Severity    int                    `json:"severity"`
	Message     string                 `json:"message"`
	RawLog      string                 `json:"rawLog"`
	ParsedData  map[string]interface{} `json:"parsedData,omitempty"`
	Forwarded   bool                   `json:"forwarded"`
	ForwardedBy string                 `json:"forwardedBy,omitempty"`
}

type FieldMappingItem struct {
	SourceField string `json:"sourceField"`
	DisplayName string `json:"displayName"`
}

func applyFieldMapping(parsedData map[string]interface{}, fieldMappingJSON string, fieldNameMapping map[string]string) map[string]interface{} {
	if fieldMappingJSON == "" && len(fieldNameMapping) == 0 {
		return parsedData
	}

	result := make(map[string]interface{})

	for k, v := range parsedData {
		result[k] = v
	}

	if len(fieldNameMapping) > 0 {
		for sourceField, displayName := range fieldNameMapping {
			if value, exists := parsedData[sourceField]; exists {
				result[displayName] = value
				delete(result, sourceField)
			}
		}
	}

	if fieldMappingJSON != "" {
		var fieldMappings map[string]string
		if err := json.Unmarshal([]byte(fieldMappingJSON), &fieldMappings); err == nil && len(fieldMappings) > 0 {
			for sourceField, displayName := range fieldMappings {
				if value, exists := parsedData[sourceField]; exists {
					result[displayName] = value
					delete(result, sourceField)
				}
			}
		}
	}

	return result
}

func filterFieldsBySelection(mappedData map[string]interface{}, selectedFields []string) map[string]interface{} {
	if len(selectedFields) == 0 {
		return mappedData
	}

	result := make(map[string]interface{})
	for _, field := range selectedFields {
		if value, exists := mappedData[field]; exists {
			result[field] = value
		}
	}
	return result
}

func formatFieldsAsKeyValue(data map[string]interface{}) string {
	if len(data) == 0 {
		return ""
	}
	var parts []string
	for k, v := range data {
		parts = append(parts, fmt.Sprintf("%s：%v", k, v))
	}
	return strings.Join(parts, " | ")
}

func applyValueTransform(data map[string]interface{}, valueTransformJSON string) map[string]interface{} {
	if valueTransformJSON == "" {
		return data
	}

	var transforms map[string]map[string]string
	if err := json.Unmarshal([]byte(valueTransformJSON), &transforms); err != nil {
		return data
	}

	for field, transformMap := range transforms {
		if value, exists := data[field]; exists {
			strValue := fmt.Sprintf("%v", value)
			if newValue, ok := transformMap[strValue]; ok {
				data[field] = newValue
			}
		}
	}

	return data
}

func SendSyslogForward(host string, port int, protocol string, format string, message string, parsedData map[string]interface{}, log *SyslogLog, fieldMapping string, fieldNameMapping map[string]string, selectedFields []string, valueTransform string) error {
	if host == "" || port == 0 {
		return fmt.Errorf("syslog host or port is empty")
	}

	mappedData := applyFieldMapping(parsedData, fieldMapping, fieldNameMapping)
	filteredData := filterFieldsBySelection(mappedData, selectedFields)

	if len(selectedFields) > 0 && len(filteredData) < len(selectedFields) {
		reverseMapping := make(map[string]string)
		for eng, chn := range fieldNameMapping {
			reverseMapping[chn] = eng
		}
		if fieldMapping != "" {
			var fieldMappings map[string]string
			if err := json.Unmarshal([]byte(fieldMapping), &fieldMappings); err == nil {
				for eng, chn := range fieldMappings {
					reverseMapping[chn] = eng
				}
			}
		}

		for _, field := range selectedFields {
			if _, exists := filteredData[field]; exists {
				continue
			}
			if value, exists := mappedData[field]; exists {
				filteredData[field] = value
			} else if engField, hasMapping := reverseMapping[field]; hasMapping {
				if value, exists := parsedData[engField]; exists {
					filteredData[field] = value
				}
			} else if value, exists := parsedData[field]; exists {
				filteredData[field] = value
			}
		}
	}

	if len(filteredData) > 0 && valueTransform != "" {
		filteredData = applyValueTransform(filteredData, valueTransform)
	} else if len(mappedData) > 0 && valueTransform != "" {
		transformedMappedData := applyValueTransform(mappedData, valueTransform)
		if len(filteredData) > 0 {
			for k, v := range transformedMappedData {
				if _, existsInFiltered := filteredData[k]; existsInFiltered {
					filteredData[k] = v
				}
			}
		}
	}

	var payload []byte
	var err error

	hostname, _ := os.Hostname()

	switch format {
	case "json":
		if len(selectedFields) > 0 && len(filteredData) > 0 {
			payload, err = json.Marshal(filteredData)
			if err != nil {
				return fmt.Errorf("failed to marshal json: %v", err)
			}
		} else {
			msg := SyslogForwardMessage{
				Timestamp:   time.Now().Format(time.RFC3339),
				SourceIP:    log.SourceIP,
				DeviceName:  log.DeviceName,
				Facility:    log.Facility,
				Severity:    log.Severity,
				Message:     message,
				RawLog:      log.RawMessage,
				ParsedData:  filteredData,
				Forwarded:   true,
				ForwardedBy: hostname,
			}
			payload, err = json.Marshal(msg)
			if err != nil {
				return fmt.Errorf("failed to marshal json: %v", err)
			}
		}
	case "rfc3164":
		ts := time.Now().Format("Jan 2 15:04:05")
		hostname := log.SourceIP
		if hostname == "" {
			hostname = "unknown"
		}

		var msgContent string
		if len(filteredData) > 0 {
			msgContent = formatFieldsAsKeyValue(filteredData)
		} else if len(mappedData) > 0 {
			dataJSON, _ := json.Marshal(mappedData)
			msgContent = fmt.Sprintf("%s | Data: %s", message, string(dataJSON))
		} else {
			msgContent = message
		}
		payload = []byte(fmt.Sprintf("<134>%s %s syslog2bot: [FORWARDED] %s", ts, hostname, msgContent))
	case "rfc5424":
		ts := time.Now().Format(time.RFC3339)
		hostname := log.SourceIP
		if hostname == "" {
			hostname = "unknown"
		}

		var msgContent string
		if len(filteredData) > 0 {
			msgContent = formatFieldsAsKeyValue(filteredData)
		} else if len(mappedData) > 0 {
			dataJSON, _ := json.Marshal(mappedData)
			msgContent = fmt.Sprintf("%s | Data: %s", message, string(dataJSON))
		} else {
			msgContent = message
		}
		payload = []byte(fmt.Sprintf("<134>1 %s %s syslog2bot - - - [FORWARDED] %s", ts, hostname, msgContent))
	default:
		if len(selectedFields) > 0 && len(filteredData) > 0 {
			payload, err = json.Marshal(filteredData)
			if err != nil {
				return fmt.Errorf("failed to marshal json: %v", err)
			}
		} else {
			msg := SyslogForwardMessage{
				Timestamp:   time.Now().Format(time.RFC3339),
				SourceIP:    log.SourceIP,
				DeviceName:  log.DeviceName,
				Facility:    log.Facility,
				Severity:    log.Severity,
				Message:     message,
				RawLog:      log.RawMessage,
				ParsedData:  filteredData,
				Forwarded:   true,
				ForwardedBy: hostname,
			}
			payload, err = json.Marshal(msg)
			if err != nil {
				return fmt.Errorf("failed to marshal json: %v", err)
			}
		}
	}

	address := fmt.Sprintf("%s:%d", host, port)

	protocol = strings.ToLower(protocol)
	if protocol == "" {
		protocol = "udp"
	}

	if protocol == "tcp" {
		conn, err := net.Dial("tcp", address)
		if err != nil {
			return fmt.Errorf("failed to connect to %s: %v", address, err)
		}
		defer conn.Close()
		_, err = conn.Write(payload)
		if err != nil {
			return fmt.Errorf("failed to send tcp message: %v", err)
		}
	} else {
		const maxUDPPacketSize = 65507
		if len(payload) > maxUDPPacketSize {
			truncated, truncErr := truncateLargeFields(payload, filteredData, selectedFields, maxUDPPacketSize)
			if truncErr != nil {
				return fmt.Errorf("UDP数据包大小超限（当前 %d 字节，最大 %d 字节），截断后仍超限。建议：1. 使用TCP协议；2. 减少推送字段；3. 使用更短的字段名称", len(payload), maxUDPPacketSize)
			}
			payload = truncated
		}

		conn, err := net.Dial("udp", address)
		if err != nil {
			return fmt.Errorf("failed to connect to %s: %v", address, err)
		}
		defer conn.Close()
		_, err = conn.Write(payload)
		if err != nil {
			return fmt.Errorf("failed to send udp message: %v", err)
		}
	}

	return nil
}

func truncateLargeFields(payload []byte, filteredData map[string]interface{}, selectedFields []string, maxSize int) ([]byte, error) {
	truncatedData := make(map[string]interface{})
	for k, v := range filteredData {
		truncatedData[k] = v
	}

	const truncateThreshold = 500
	for k, v := range truncatedData {
		strVal := fmt.Sprintf("%v", v)
		if len(strVal) > truncateThreshold {
			truncatedData[k] = strVal[:truncateThreshold] + "...[截断]"
		}
	}

	newPayload, err := json.Marshal(truncatedData)
	if err != nil {
		return nil, err
	}

	if len(newPayload) <= maxSize {
		return newPayload, nil
	}

	if len(selectedFields) > 0 && len(selectedFields) > 3 {
		minimalData := make(map[string]interface{})
		for i, field := range selectedFields {
			if i >= len(selectedFields)/2 {
				break
			}
			if value, exists := truncatedData[field]; exists {
				minimalData[field] = value
			}
		}
		minPayload, err := json.Marshal(minimalData)
		if err != nil {
			return nil, err
		}
		if len(minPayload) <= maxSize {
			return minPayload, nil
		}
	}

	return nil, fmt.Errorf("truncated payload still exceeds limit")
}

func TestSyslogForward(host string, port int, protocol string, format string) error {
	if host == "" || port == 0 {
		return fmt.Errorf("syslog host or port is empty")
	}

	var payload []byte
	var err error

	switch format {
	case "rfc3164":
		ts := time.Now().Format("Jan 2 15:04:05")
		payload = []byte(fmt.Sprintf("<134>%s 127.0.0.1 syslog2bot: 【测试消息】Syslog2Bot连接测试成功！", ts))
	case "rfc5424":
		ts := time.Now().Format(time.RFC3339)
		payload = []byte(fmt.Sprintf("<134>1 %s 127.0.0.1 syslog2bot - - - 【测试消息】Syslog2Bot连接测试成功！", ts))
	default:
		testMessage := SyslogForwardMessage{
			Timestamp:  time.Now().Format(time.RFC3339),
			SourceIP:   "127.0.0.1",
			DeviceName: "syslog2bot",
			Facility:   1,
			Severity:   6,
			Message:    "【测试消息】Syslog2Bot连接测试成功！",
		}
		payload, err = json.Marshal(testMessage)
		if err != nil {
			return fmt.Errorf("failed to marshal json: %v", err)
		}
	}

	address := fmt.Sprintf("%s:%d", host, port)

	protocol = strings.ToLower(protocol)
	if protocol == "" {
		protocol = "udp"
	}

	if protocol == "tcp" {
		conn, err := net.Dial("tcp", address)
		if err != nil {
			return fmt.Errorf("failed to connect to %s: %v", address, err)
		}
		defer conn.Close()
		_, err = conn.Write(payload)
		if err != nil {
			return fmt.Errorf("failed to send tcp message: %v", err)
		}
	} else {
		conn, err := net.Dial("udp", address)
		if err != nil {
			return fmt.Errorf("failed to connect to %s: %v", address, err)
		}
		defer conn.Close()
		_, err = conn.Write(payload)
		if err != nil {
			return fmt.Errorf("failed to send udp message: %v", err)
		}
	}

	return nil
}
