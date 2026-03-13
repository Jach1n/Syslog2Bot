package main

import (
	"bytes"
	"crypto/hmac"
	"crypto/sha256"
	"encoding/base64"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"net/url"
	"strconv"
	"time"
)

type DingTalkMessage struct {
	MsgType  string                 `json:"msgtype"`
	Markdown *DingTalkMarkdown      `json:"markdown,omitempty"`
	Text     *DingTalkText          `json:"text,omitempty"`
}

type DingTalkMarkdown struct {
	Title string `json:"title"`
	Text  string `json:"text"`
}

type DingTalkText struct {
	Content string `json:"content"`
}

type DingTalkResponse struct {
	ErrCode int    `json:"errcode"`
	ErrMsg  string `json:"errmsg"`
}

func SendDingTalkMessage(webhookURL, secret, content string) error {
	if secret != "" {
		timestamp := strconv.FormatInt(time.Now().UnixMilli(), 10)
		sign := generateSign(timestamp, secret)
		webhookURL = fmt.Sprintf("%s&timestamp=%s&sign=%s", webhookURL, timestamp, url.QueryEscape(sign))
	}

	message := DingTalkMessage{
		MsgType: "markdown",
		Markdown: &DingTalkMarkdown{
			Title: "Syslog告警",
			Text:  content,
		},
	}

	jsonData, err := json.Marshal(message)
	if err != nil {
		return fmt.Errorf("failed to marshal message: %v", err)
	}

	resp, err := http.Post(webhookURL, "application/json", bytes.NewReader(jsonData))
	if err != nil {
		return fmt.Errorf("failed to send request: %v", err)
	}
	defer resp.Body.Close()

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return fmt.Errorf("failed to read response: %v", err)
	}

	var result DingTalkResponse
	if err := json.Unmarshal(body, &result); err != nil {
		return fmt.Errorf("failed to parse response: %v", err)
	}

	if result.ErrCode != 0 {
		return fmt.Errorf("dingtalk api error: %s", result.ErrMsg)
	}

	return nil
}

func SendDingTalkTestMessage(webhookURL, secret string) (string, error) {
	if secret != "" {
		timestamp := strconv.FormatInt(time.Now().UnixMilli(), 10)
		sign := generateSign(timestamp, secret)
		webhookURL = fmt.Sprintf("%s&timestamp=%s&sign=%s", webhookURL, timestamp, url.QueryEscape(sign))
	}

	message := DingTalkMessage{
		MsgType: "text",
		Text: &DingTalkText{
			Content: "【测试消息】Syslog告警系统连接测试成功！\n\n发送时间: " + time.Now().Format("2006-01-02 15:04:05"),
		},
	}

	jsonData, err := json.Marshal(message)
	if err != nil {
		return "", fmt.Errorf("failed to marshal message: %v", err)
	}

	resp, err := http.Post(webhookURL, "application/json", bytes.NewReader(jsonData))
	if err != nil {
		return "", fmt.Errorf("failed to send request: %v", err)
	}
	defer resp.Body.Close()

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return "", fmt.Errorf("failed to read response: %v", err)
	}

	var result DingTalkResponse
	if err := json.Unmarshal(body, &result); err != nil {
		return "", fmt.Errorf("failed to parse response: %v", err)
	}

	if result.ErrCode != 0 {
		return "", fmt.Errorf("dingtalk api error: %s", result.ErrMsg)
	}

	return "测试消息发送成功！", nil
}

func generateSign(timestamp, secret string) string {
	stringToSign := timestamp + "\n" + secret
	
	h := hmac.New(sha256.New, []byte(secret))
	h.Write([]byte(stringToSign))
	
	return base64.StdEncoding.EncodeToString(h.Sum(nil))
}
