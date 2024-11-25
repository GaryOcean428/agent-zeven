"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
exports.SpecialistAgent = void 0;
var base_agent_1 = require("./core/base-agent");
var thought_logger_1 = require("../logging/thought-logger");
var web_data_tools_1 = require("../tools/web-data-tools");
var SpecialistAgent = /** @class */ (function (_super) {
    __extends(SpecialistAgent, _super);
    function SpecialistAgent(config) {
        var _this = _super.call(this, __assign(__assign({}, config), { role: 'specialist' })) || this;
        _this.webDataTools = web_data_tools_1.WebDataTools.getInstance();
        return _this;
    }
    SpecialistAgent.prototype.processMessage = function (message) {
        return __awaiter(this, void 0, void 0, function () {
            var startTime, result, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        startTime = Date.now();
                        thought_logger_1.thoughtLogger.log('plan', "Specialist agent ".concat(this.config.id, " processing message"), {
                            messageType: message.type,
                            capabilities: this.config.capabilities
                        });
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 9, 10, 11]);
                        this.setStatus('active');
                        result = void 0;
                        if (!(message.type === 'search' && this.hasCapability('web-search'))) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.performWebSearch(message.content)];
                    case 2:
                        result = _a.sent();
                        return [3 /*break*/, 8];
                    case 3:
                        if (!(message.type === 'process' && this.hasCapability('data-synthesis'))) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.processData(message.content)];
                    case 4:
                        result = _a.sent();
                        return [3 /*break*/, 8];
                    case 5:
                        if (!(message.type === 'analyze' && this.hasCapability('data-analysis'))) return [3 /*break*/, 7];
                        return [4 /*yield*/, this.analyzeData(message.content)];
                    case 6:
                        result = _a.sent();
                        return [3 /*break*/, 8];
                    case 7: throw new Error("Unsupported message type or missing capability: ".concat(message.type));
                    case 8:
                        thought_logger_1.thoughtLogger.log('success', "Specialist agent ".concat(this.config.id, " completed task"), {
                            duration: Date.now() - startTime
                        });
                        return [2 /*return*/, {
                                id: crypto.randomUUID(),
                                role: 'assistant',
                                content: typeof result === 'string' ? result : JSON.stringify(result),
                                timestamp: Date.now()
                            }];
                    case 9:
                        error_1 = _a.sent();
                        thought_logger_1.thoughtLogger.log('error', "Specialist agent ".concat(this.config.id, " failed"), { error: error_1 });
                        throw error_1;
                    case 10:
                        this.setStatus('idle');
                        return [7 /*endfinally*/];
                    case 11: return [2 /*return*/];
                }
            });
        });
    };
    SpecialistAgent.prototype.performWebSearch = function (query) {
        return __awaiter(this, void 0, void 0, function () {
            var urls, results;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        thought_logger_1.thoughtLogger.log('execution', 'Performing web search', { query: query });
                        urls = [
                            'https://www.dtwd.wa.gov.au/apprenticeship-office',
                            'https://www.apprenticeshipsupport.com.au',
                            // Add more relevant URLs
                        ];
                        return [4 /*yield*/, Promise.all(urls.map(function (url) { return _this.webDataTools.fetchWebData(url); }))];
                    case 1:
                        results = _a.sent();
                        return [2 /*return*/, results.join('\n\n')];
                }
            });
        });
    };
    SpecialistAgent.prototype.processData = function (content) {
        return __awaiter(this, void 0, void 0, function () {
            var structured, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        thought_logger_1.thoughtLogger.log('execution', 'Processing data');
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        if (!(content.includes('<!DOCTYPE html>') || content.includes('<html'))) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.webDataTools.parseWebContent(content)];
                    case 2: return [2 /*return*/, _a.sent()];
                    case 3:
                        structured = {
                            raw: content,
                            sections: this.extractSections(content),
                            entities: this.extractEntities(content)
                        };
                        return [2 /*return*/, structured];
                    case 4:
                        error_2 = _a.sent();
                        thought_logger_1.thoughtLogger.log('error', 'Data processing failed', { error: error_2 });
                        throw error_2;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    SpecialistAgent.prototype.analyzeData = function (content) {
        return __awaiter(this, void 0, void 0, function () {
            var data, analysis;
            return __generator(this, function (_a) {
                thought_logger_1.thoughtLogger.log('execution', 'Analyzing data');
                try {
                    data = typeof content === 'string' ? JSON.parse(content) : content;
                    analysis = {
                        summary: this.generateSummary(data),
                        insights: this.extractInsights(data),
                        recommendations: this.generateRecommendations(data)
                    };
                    return [2 /*return*/, analysis];
                }
                catch (error) {
                    thought_logger_1.thoughtLogger.log('error', 'Data analysis failed', { error: error });
                    throw error;
                }
                return [2 /*return*/];
            });
        });
    };
    SpecialistAgent.prototype.extractSections = function (content) {
        // Extract meaningful sections from the content
        var sections = {};
        // Implementation here
        return sections;
    };
    SpecialistAgent.prototype.extractEntities = function (content) {
        // Extract named entities (organizations, locations, etc.)
        var entities = {
            organizations: [],
            locations: [],
            dates: []
        };
        // Implementation here
        return entities;
    };
    SpecialistAgent.prototype.generateSummary = function (data) {
        // Generate a concise summary of the data
        return '';
    };
    SpecialistAgent.prototype.extractInsights = function (data) {
        // Extract key insights from the data
        return [];
    };
    SpecialistAgent.prototype.generateRecommendations = function (data) {
        // Generate recommendations based on the analysis
        return [];
    };
    return SpecialistAgent;
}(base_agent_1.BaseAgent));
exports.SpecialistAgent = SpecialistAgent;
