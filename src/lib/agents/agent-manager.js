"use strict";
// Previous imports remain the same...
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgentManager = void 0;
var AgentManager = /** @class */ (function () {
    function AgentManager() {
    }
    // Previous properties remain the same...
    AgentManager.prototype.processMessage = function (message) {
        return __awaiter(this, void 0, void 0, function () {
            var routerConfig, searchSpecialist, searchResponse, webDataAgent, webDataResponse, analysisSpecialist, analysisResponse, csvAgent, exportResponse, results, aggregatedContent, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        thoughtLogger.log('plan', 'Starting message processing', { messageId: message.id });
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 12, , 13]);
                        return [4 /*yield*/, this.router.route(message.content, [])];
                    case 2:
                        routerConfig = _a.sent();
                        thoughtLogger.log('decision', "Selected model: ".concat(routerConfig.model), {
                            confidence: routerConfig.confidence,
                            strategy: routerConfig.responseStrategy
                        });
                        if (!(message.content.toLowerCase().includes('find') ||
                            message.content.toLowerCase().includes('search') ||
                            message.content.toLowerCase().includes('gather'))) return [3 /*break*/, 10];
                        thoughtLogger.log('plan', 'Initiating multi-agent data gathering collaboration');
                        searchSpecialist = this.agents.get('specialist-search');
                        if (!searchSpecialist) {
                            throw new Error('Search specialist not found');
                        }
                        return [4 /*yield*/, searchSpecialist.processMessage(__assign(__assign({}, message), { type: 'search' }))];
                    case 3:
                        searchResponse = _a.sent();
                        webDataAgent = this.agents.get('task-web');
                        if (!webDataAgent) {
                            throw new Error('Web data agent not found');
                        }
                        return [4 /*yield*/, webDataAgent.processMessage({
                                id: crypto.randomUUID(),
                                role: 'system',
                                content: "Process and structure the following data: ".concat(searchResponse.content),
                                timestamp: Date.now(),
                                type: 'process'
                            })];
                    case 4:
                        webDataResponse = _a.sent();
                        analysisSpecialist = this.agents.get('specialist-analysis');
                        if (!analysisSpecialist) {
                            throw new Error('Analysis specialist not found');
                        }
                        return [4 /*yield*/, analysisSpecialist.processMessage({
                                id: crypto.randomUUID(),
                                role: 'system',
                                content: "Analyze the following structured data: ".concat(webDataResponse.content),
                                timestamp: Date.now(),
                                type: 'analyze'
                            })];
                    case 5:
                        analysisResponse = _a.sent();
                        if (!(message.content.toLowerCase().includes('table') ||
                            message.content.toLowerCase().includes('export'))) return [3 /*break*/, 9];
                        thoughtLogger.log('plan', 'Data export requested, delegating to CSV agent');
                        csvAgent = this.agents.get('task-csv');
                        if (!csvAgent) {
                            throw new Error('CSV agent not found');
                        }
                        return [4 /*yield*/, csvAgent.processMessage({
                                id: crypto.randomUUID(),
                                role: 'system',
                                content: "Export the following data to CSV: ".concat(analysisResponse.content),
                                timestamp: Date.now(),
                                type: 'export'
                            })];
                    case 6:
                        exportResponse = _a.sent();
                        results = [
                            { agentId: 'specialist-search', content: searchResponse.content, confidence: 0.9 },
                            { agentId: 'task-web', content: webDataResponse.content, confidence: 0.85 },
                            { agentId: 'specialist-analysis', content: analysisResponse.content, confidence: 0.9 },
                            { agentId: 'task-csv', content: exportResponse.content, confidence: 0.95 }
                        ];
                        return [4 /*yield*/, this.memoryAggregator.aggregateResults(results)];
                    case 7:
                        aggregatedContent = _a.sent();
                        // Store the final result in memory
                        return [4 /*yield*/, this.vectorMemory.store(aggregatedContent, 'aggregated_result', {
                                strategy: 'multi_agent_collaboration',
                                agentCount: results.length
                            })];
                    case 8:
                        // Store the final result in memory
                        _a.sent();
                        return [2 /*return*/, {
                                id: crypto.randomUUID(),
                                role: 'assistant',
                                content: aggregatedContent,
                                timestamp: Date.now()
                            }];
                    case 9: 
                    // If no export requested, return analysis results
                    return [2 /*return*/, analysisResponse];
                    case 10: return [4 /*yield*/, this.primaryAgent.processMessage(message)];
                    case 11: 
                    // Handle other types of requests...
                    return [2 /*return*/, _a.sent()];
                    case 12:
                        error_1 = _a.sent();
                        thoughtLogger.log('error', "Message processing failed: ".concat(error_1 instanceof Error ? error_1.message : 'Unknown error'));
                        throw error_1;
                    case 13: return [2 /*return*/];
                }
            });
        });
    };
    return AgentManager;
}());
exports.AgentManager = AgentManager;
