export namespace gorm {
	
	export class DeletedAt {
	    // Go type: time
	    Time: any;
	    Valid: boolean;
	
	    static createFrom(source: any = {}) {
	        return new DeletedAt(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.Time = this.convertValues(source["Time"], null);
	        this.Valid = source["Valid"];
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice && a.map) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}

}

export namespace main {
	
	export class AlertPolicy {
	    id: number;
	    name: string;
	    description: string;
	    filterPolicyId: number;
	    robotId: number;
	    outputTemplateId: number;
	    deviceId: number;
	    deviceGroupId: number;
	    isActive: boolean;
	    // Go type: time
	    createdAt: any;
	    // Go type: time
	    updatedAt: any;
	
	    static createFrom(source: any = {}) {
	        return new AlertPolicy(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.name = source["name"];
	        this.description = source["description"];
	        this.filterPolicyId = source["filterPolicyId"];
	        this.robotId = source["robotId"];
	        this.outputTemplateId = source["outputTemplateId"];
	        this.deviceId = source["deviceId"];
	        this.deviceGroupId = source["deviceGroupId"];
	        this.isActive = source["isActive"];
	        this.createdAt = this.convertValues(source["createdAt"], null);
	        this.updatedAt = this.convertValues(source["updatedAt"], null);
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice && a.map) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class AlertRecord {
	    id: number;
	    logId: number;
	    robotId: number;
	    alertPolicyId: number;
	    deviceName: string;
	    message: string;
	    status: string;
	    errorMsg: string;
	    // Go type: time
	    sentAt: any;
	
	    static createFrom(source: any = {}) {
	        return new AlertRecord(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.logId = source["logId"];
	        this.robotId = source["robotId"];
	        this.alertPolicyId = source["alertPolicyId"];
	        this.deviceName = source["deviceName"];
	        this.message = source["message"];
	        this.status = source["status"];
	        this.errorMsg = source["errorMsg"];
	        this.sentAt = this.convertValues(source["sentAt"], null);
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice && a.map) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class Device {
	    id: number;
	    name: string;
	    ipAddress: string;
	    groupId: number;
	    groupName: string;
	    description: string;
	    isActive: boolean;
	    // Go type: time
	    createdAt: any;
	    // Go type: time
	    updatedAt: any;
	
	    static createFrom(source: any = {}) {
	        return new Device(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.name = source["name"];
	        this.ipAddress = source["ipAddress"];
	        this.groupId = source["groupId"];
	        this.groupName = source["groupName"];
	        this.description = source["description"];
	        this.isActive = source["isActive"];
	        this.createdAt = this.convertValues(source["createdAt"], null);
	        this.updatedAt = this.convertValues(source["updatedAt"], null);
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice && a.map) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class DeviceGroup {
	    id: number;
	    name: string;
	    description: string;
	    color: string;
	    sortOrder: number;
	    // Go type: time
	    createdAt: any;
	    // Go type: time
	    updatedAt: any;
	
	    static createFrom(source: any = {}) {
	        return new DeviceGroup(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.name = source["name"];
	        this.description = source["description"];
	        this.color = source["color"];
	        this.sortOrder = source["sortOrder"];
	        this.createdAt = this.convertValues(source["createdAt"], null);
	        this.updatedAt = this.convertValues(source["updatedAt"], null);
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice && a.map) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class DingTalkRobot {
	    id: number;
	    name: string;
	    webhookUrl: string;
	    secret: string;
	    description: string;
	    isActive: boolean;
	    // Go type: time
	    createdAt: any;
	    // Go type: time
	    updatedAt: any;
	
	    static createFrom(source: any = {}) {
	        return new DingTalkRobot(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.name = source["name"];
	        this.webhookUrl = source["webhookUrl"];
	        this.secret = source["secret"];
	        this.description = source["description"];
	        this.isActive = source["isActive"];
	        this.createdAt = this.convertValues(source["createdAt"], null);
	        this.updatedAt = this.convertValues(source["updatedAt"], null);
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice && a.map) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class FieldMappingDoc {
	    id: number;
	    name: string;
	    deviceType: string;
	    description: string;
	    fieldMappings: string;
	    isActive: boolean;
	    // Go type: time
	    createdAt: any;
	    // Go type: time
	    updatedAt: any;
	
	    static createFrom(source: any = {}) {
	        return new FieldMappingDoc(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.name = source["name"];
	        this.deviceType = source["deviceType"];
	        this.description = source["description"];
	        this.fieldMappings = source["fieldMappings"];
	        this.isActive = source["isActive"];
	        this.createdAt = this.convertValues(source["createdAt"], null);
	        this.updatedAt = this.convertValues(source["updatedAt"], null);
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice && a.map) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class FilterPolicy {
	    id: number;
	    name: string;
	    description: string;
	    deviceId: number;
	    deviceGroupId: number;
	    parseTemplateId: number;
	    conditions: string;
	    conditionLogic: string;
	    action: string;
	    priority: number;
	    isActive: boolean;
	    dedupEnabled: boolean;
	    dedupWindow: number;
	    dropUnmatched: boolean;
	    // Go type: time
	    createdAt: any;
	    // Go type: time
	    updatedAt: any;
	
	    static createFrom(source: any = {}) {
	        return new FilterPolicy(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.name = source["name"];
	        this.description = source["description"];
	        this.deviceId = source["deviceId"];
	        this.deviceGroupId = source["deviceGroupId"];
	        this.parseTemplateId = source["parseTemplateId"];
	        this.conditions = source["conditions"];
	        this.conditionLogic = source["conditionLogic"];
	        this.action = source["action"];
	        this.priority = source["priority"];
	        this.isActive = source["isActive"];
	        this.dedupEnabled = source["dedupEnabled"];
	        this.dedupWindow = source["dedupWindow"];
	        this.dropUnmatched = source["dropUnmatched"];
	        this.createdAt = this.convertValues(source["createdAt"], null);
	        this.updatedAt = this.convertValues(source["updatedAt"], null);
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice && a.map) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class LogQueryParams {
	    page: number;
	    pageSize: number;
	    deviceId: number;
	    startTime: string;
	    endTime: string;
	    keyword: string;
	
	    static createFrom(source: any = {}) {
	        return new LogQueryParams(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.page = source["page"];
	        this.pageSize = source["pageSize"];
	        this.deviceId = source["deviceId"];
	        this.startTime = source["startTime"];
	        this.endTime = source["endTime"];
	        this.keyword = source["keyword"];
	    }
	}
	export class SyslogLog {
	    id: number;
	    deviceId: number;
	    deviceName: string;
	    sourceIp: string;
	    rawMessage: string;
	    parsedData: string;
	    parsedFields: string;
	    filterStatus: string;
	    matchedPolicyId: number;
	    alertStatus: string;
	    alertPolicyId: number;
	    priority: string;
	    facility: number;
	    severity: number;
	    // Go type: time
	    timestamp: any;
	    // Go type: time
	    receivedAt: any;
	    isProcessed: boolean;
	    isAlerted: boolean;
	
	    static createFrom(source: any = {}) {
	        return new SyslogLog(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.deviceId = source["deviceId"];
	        this.deviceName = source["deviceName"];
	        this.sourceIp = source["sourceIp"];
	        this.rawMessage = source["rawMessage"];
	        this.parsedData = source["parsedData"];
	        this.parsedFields = source["parsedFields"];
	        this.filterStatus = source["filterStatus"];
	        this.matchedPolicyId = source["matchedPolicyId"];
	        this.alertStatus = source["alertStatus"];
	        this.alertPolicyId = source["alertPolicyId"];
	        this.priority = source["priority"];
	        this.facility = source["facility"];
	        this.severity = source["severity"];
	        this.timestamp = this.convertValues(source["timestamp"], null);
	        this.receivedAt = this.convertValues(source["receivedAt"], null);
	        this.isProcessed = source["isProcessed"];
	        this.isAlerted = source["isAlerted"];
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice && a.map) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class LogQueryResult {
	    logs: SyslogLog[];
	    total: number;
	
	    static createFrom(source: any = {}) {
	        return new LogQueryResult(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.logs = this.convertValues(source["logs"], SyslogLog);
	        this.total = source["total"];
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice && a.map) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class OutputTemplate {
	    id: number;
	    name: string;
	    description: string;
	    content: string;
	    fields: string;
	    deviceType: string;
	    isActive: boolean;
	    // Go type: time
	    createdAt: any;
	    // Go type: time
	    updatedAt: any;
	
	    static createFrom(source: any = {}) {
	        return new OutputTemplate(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.name = source["name"];
	        this.description = source["description"];
	        this.content = source["content"];
	        this.fields = source["fields"];
	        this.deviceType = source["deviceType"];
	        this.isActive = source["isActive"];
	        this.createdAt = this.convertValues(source["createdAt"], null);
	        this.updatedAt = this.convertValues(source["updatedAt"], null);
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice && a.map) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class ParseTemplate {
	    id: number;
	    name: string;
	    description: string;
	    parseType: string;
	    headerRegex: string;
	    fieldMapping: string;
	    valueTransform: string;
	    sampleLog: string;
	    deviceType: string;
	    delimiter: string;
	    typeField: number;
	    subTemplates: string;
	    isActive: boolean;
	    // Go type: time
	    createdAt: any;
	    // Go type: time
	    updatedAt: any;
	
	    static createFrom(source: any = {}) {
	        return new ParseTemplate(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.name = source["name"];
	        this.description = source["description"];
	        this.parseType = source["parseType"];
	        this.headerRegex = source["headerRegex"];
	        this.fieldMapping = source["fieldMapping"];
	        this.valueTransform = source["valueTransform"];
	        this.sampleLog = source["sampleLog"];
	        this.deviceType = source["deviceType"];
	        this.delimiter = source["delimiter"];
	        this.typeField = source["typeField"];
	        this.subTemplates = source["subTemplates"];
	        this.isActive = source["isActive"];
	        this.createdAt = this.convertValues(source["createdAt"], null);
	        this.updatedAt = this.convertValues(source["updatedAt"], null);
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice && a.map) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class ParseTestRequest {
	    parseType: string;
	    headerRegex: string;
	    fieldMapping: string;
	    valueTransform: string;
	    sampleLog: string;
	
	    static createFrom(source: any = {}) {
	        return new ParseTestRequest(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.parseType = source["parseType"];
	        this.headerRegex = source["headerRegex"];
	        this.fieldMapping = source["fieldMapping"];
	        this.valueTransform = source["valueTransform"];
	        this.sampleLog = source["sampleLog"];
	    }
	}
	export class ParseTestResult {
	    success: boolean;
	    error: string;
	    fields: string[];
	    data: Record<string, any>;
	
	    static createFrom(source: any = {}) {
	        return new ParseTestResult(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.success = source["success"];
	        this.error = source["error"];
	        this.fields = source["fields"];
	        this.data = source["data"];
	    }
	}
	export class PresetTemplate {
	    id: string;
	    name: string;
	    deviceType: string;
	    description: string;
	    parseType: string;
	    headerRegex: string;
	    fieldMapping: string;
	    valueTransform: string;
	    sampleLog: string;
	
	    static createFrom(source: any = {}) {
	        return new PresetTemplate(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.name = source["name"];
	        this.deviceType = source["deviceType"];
	        this.description = source["description"];
	        this.parseType = source["parseType"];
	        this.headerRegex = source["headerRegex"];
	        this.fieldMapping = source["fieldMapping"];
	        this.valueTransform = source["valueTransform"];
	        this.sampleLog = source["sampleLog"];
	    }
	}
	
	export class SystemConfig {
	    id: number;
	    listenPort: number;
	    protocol: string;
	    logRetention: number;
	    maxLogSize: number;
	    autoStart: boolean;
	    minimizeToTray: boolean;
	    alertEnabled: boolean;
	    alertInterval: number;
	    unmatchedLogRetention: number;
	    unmatchedLogAlert: boolean;
	    defaultFilterAction: string;
	    theme: string;
	    language: string;
	    dataDir: string;
	
	    static createFrom(source: any = {}) {
	        return new SystemConfig(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.listenPort = source["listenPort"];
	        this.protocol = source["protocol"];
	        this.logRetention = source["logRetention"];
	        this.maxLogSize = source["maxLogSize"];
	        this.autoStart = source["autoStart"];
	        this.minimizeToTray = source["minimizeToTray"];
	        this.alertEnabled = source["alertEnabled"];
	        this.alertInterval = source["alertInterval"];
	        this.unmatchedLogRetention = source["unmatchedLogRetention"];
	        this.unmatchedLogAlert = source["unmatchedLogAlert"];
	        this.defaultFilterAction = source["defaultFilterAction"];
	        this.theme = source["theme"];
	        this.language = source["language"];
	        this.dataDir = source["dataDir"];
	    }
	}
	export class SystemStats {
	    totalLogs: number;
	    deviceCount: number;
	    serviceRunning: boolean;
	    listenPort: number;
	    startTime: string;
	    memoryUsage: number;
	    cpuUsage: number;
	    connections: number;
	    receiveRate: number;
	    protocol: string;
	    databaseSize: number;
	
	    static createFrom(source: any = {}) {
	        return new SystemStats(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.totalLogs = source["totalLogs"];
	        this.deviceCount = source["deviceCount"];
	        this.serviceRunning = source["serviceRunning"];
	        this.listenPort = source["listenPort"];
	        this.startTime = source["startTime"];
	        this.memoryUsage = source["memoryUsage"];
	        this.cpuUsage = source["cpuUsage"];
	        this.connections = source["connections"];
	        this.receiveRate = source["receiveRate"];
	        this.protocol = source["protocol"];
	        this.databaseSize = source["databaseSize"];
	    }
	}
	export class Template {
	    id: number;
	    name: string;
	    description: string;
	    ruleRegex: string;
	    outputFormat: string;
	    exampleInput: string;
	    exampleOutput: string;
	    deviceType: string;
	    isActive: boolean;
	    // Go type: time
	    createdAt: any;
	    // Go type: time
	    updatedAt: any;
	
	    static createFrom(source: any = {}) {
	        return new Template(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.name = source["name"];
	        this.description = source["description"];
	        this.ruleRegex = source["ruleRegex"];
	        this.outputFormat = source["outputFormat"];
	        this.exampleInput = source["exampleInput"];
	        this.exampleOutput = source["exampleOutput"];
	        this.deviceType = source["deviceType"];
	        this.isActive = source["isActive"];
	        this.createdAt = this.convertValues(source["createdAt"], null);
	        this.updatedAt = this.convertValues(source["updatedAt"], null);
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice && a.map) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class TestSyslogRequest {
	    host: string;
	    port: number;
	    protocol: string;
	    message: string;
	    count: number;
	    intervalMs: number;
	
	    static createFrom(source: any = {}) {
	        return new TestSyslogRequest(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.host = source["host"];
	        this.port = source["port"];
	        this.protocol = source["protocol"];
	        this.message = source["message"];
	        this.count = source["count"];
	        this.intervalMs = source["intervalMs"];
	    }
	}
	export class TestSyslogResult {
	    success: boolean;
	    message: string;
	    sentCount: number;
	    failedCount: number;
	    errors: string[];
	
	    static createFrom(source: any = {}) {
	        return new TestSyslogResult(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.success = source["success"];
	        this.message = source["message"];
	        this.sentCount = source["sentCount"];
	        this.failedCount = source["failedCount"];
	        this.errors = source["errors"];
	    }
	}

}

