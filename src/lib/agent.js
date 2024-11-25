"use strict";
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
var config_1 = require("./config");
var memory_1 = require("./memory");
var streaming_1 = require("./streaming");
var reasoning_1 = require("./reasoning");
var AgentManager = /** @class */ (function () {
    function AgentManager() {
        this.memory = new memory_1.Memory();
        this.reasoningEngine = new reasoning_1.ReasoningEngine();
    }
    AgentManager.prototype.processMessage = function (message, onStream) {
        return __awaiter(this, void 0, void 0, function () {
            var context, complexity, strategy, reasoningSteps, reasoningContext, response, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        return [4 /*yield*/, this.memory.getRelevantMemories(message.content)];
                    case 1:
                        context = _a.sent();
                        complexity = this.assessComplexity(message.content);
                        strategy = this.reasoningEngine.selectStrategy(message.content, complexity);
                        reasoningSteps = [];
                        if (!(strategy !== 'none')) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.reasoningEngine.reason(message.content, strategy)];
                    case 2:
                        reasoningSteps = _a.sent();
                        _a.label = 3;
                    case 3:
                        reasoningContext = reasoningSteps.length > 0
                            ? '\n\nReasoning steps:\n' + reasoningSteps.map(function (step) {
                                return "[".concat(step.type.toUpperCase(), "] ").concat(step.content);
                            }).join('\n')
                            : '';
                        return [4 /*yield*/, this.callAPI(message, context + reasoningContext, onStream)];
                    case 4:
                        response = _a.sent();
                        return [4 /*yield*/, this.memory.store(message, response)];
                    case 5:
                        _a.sent();
                        return [2 /*return*/, response];
                    case 6:
                        error_1 = _a.sent();
                        console.error('Agent processing error:', error_1);
                        throw error_1;
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    AgentManager.prototype.assessComplexity = function (content) {
        var factors = {
            length: Math.min(content.length / 500, 1),
            questionWords: (content.match(/\b(how|why|what|when|where|who)\b/gi) || []).length * 0.1,
            technicalTerms: (content.match(/\b(algorithm|function|process|system|analyze)\b/gi) || []).length * 0.15,
            codeRelated: /\b(code|program|debug|function|api)\b/i.test(content) ? 0.3 : 0,
            multipleSteps: (content.match(/\b(and|then|after|before|finally)\b/gi) || []).length * 0.1
        };
        return Math.min(Object.values(factors).reduce(function (sum, value) { return sum + value; }, 0), 1);
    };
    AgentManager.prototype.callAPI = function (message, context, onStream) {
        return __awaiter(this, void 0, void 0, function () {
            var response, reader, processor, data;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, fetch("".concat(config_1.config.apiBaseUrl, "/chat/completions"), {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': "Bearer ".concat(config_1.config.apiKey)
                            },
                            body: JSON.stringify({
                                model: config_1.config.model,
                                messages: [
                                    { role: 'system', content: "".concat(config_1.config.systemPrompt, "\n\nContext: ").concat(context) },
                                    { role: 'user', content: message.content }
                                ],
                                max_tokens: config_1.config.maxTokens,
                                temperature: config_1.config.temperature,
                                stream: Boolean(onStream)
                            })
                        })];
                    case 1:
                        response = _c.sent();
                        if (!response.ok) {
                            throw new Error("API request failed: ".concat(response.statusText));
                        }
                        if (!(onStream && response.body)) return [3 /*break*/, 3];
                        reader = response.body.getReader();
                        processor = new streaming_1.StreamProcessor(onStream);
                        return [4 /*yield*/, processor.processStream(reader)];
                    case 2:
                        _c.sent();
                        return [2 /*return*/, {
                                id: crypto.randomUUID(),
                                role: 'assistant',
                                content: '',
                                timestamp: Date.now()
                            }];
                    case 3: return [4 /*yield*/, response.json()];
                    case 4:
                        data = _c.sent();
                        return [2 /*return*/, {
                                id: crypto.randomUUID(),
                                role: 'assistant',
                                content: ((_b = (_a = data.choices[0]) === null || _a === void 0 ? void 0 : _a.message) === null || _b === void 0 ? void 0 : _b.content) || '',
                                timestamp: Date.now()
                            }];
                }
            });
        });
    };
    return AgentManager;
}());
