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
exports.CodeAgent = void 0;
var base_agent_1 = require("./core/base-agent");
var qwen_api_1 = require("../api/qwen-api");
var thought_logger_1 = require("../logging/thought-logger");
var CodeAgent = /** @class */ (function (_super) {
    __extends(CodeAgent, _super);
    function CodeAgent(id, name) {
        var _this = _super.call(this, id, name, 'specialist') || this;
        _this.qwenAPI = qwen_api_1.QwenAPI.getInstance();
        _this.capabilities.add('code-generation');
        _this.capabilities.add('code-review');
        _this.capabilities.add('refactoring');
        return _this;
    }
    CodeAgent.prototype.processMessage = function (message) {
        return __awaiter(this, void 0, void 0, function () {
            var startTime, result, review, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        startTime = Date.now();
                        thought_logger_1.thoughtLogger.log('plan', "Code agent ".concat(this.getId(), " processing message"), {
                            capabilities: Array.from(this.capabilities)
                        });
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 6, 7, 8]);
                        this.setStatus('active');
                        result = void 0;
                        if (!message.content.toLowerCase().includes('review')) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.reviewCode(message.content)];
                    case 2:
                        review = _a.sent();
                        result = this.formatReviewResponse(review);
                        return [3 /*break*/, 5];
                    case 3: return [4 /*yield*/, this.generateCode(message.content)];
                    case 4:
                        result = _a.sent();
                        _a.label = 5;
                    case 5:
                        thought_logger_1.thoughtLogger.log('success', "Code agent ".concat(this.getId(), " completed task"), {
                            duration: Date.now() - startTime
                        });
                        return [2 /*return*/, {
                                id: crypto.randomUUID(),
                                role: 'assistant',
                                content: result,
                                timestamp: Date.now()
                            }];
                    case 6:
                        error_1 = _a.sent();
                        thought_logger_1.thoughtLogger.log('error', "Code agent ".concat(this.getId(), " failed"), { error: error_1 });
                        throw error_1;
                    case 7:
                        this.setStatus('idle');
                        return [7 /*endfinally*/];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    CodeAgent.prototype.generateCode = function (prompt) {
        return __awaiter(this, void 0, void 0, function () {
            var languageMatch, language;
            return __generator(this, function (_a) {
                languageMatch = prompt.match(/in\s+([\w\+\#]+)(?:\s|$)/i);
                language = languageMatch ? languageMatch[1] : undefined;
                thought_logger_1.thoughtLogger.log('execution', 'Generating code', { language: language });
                return [2 /*return*/, this.qwenAPI.generateCode(prompt, language)];
            });
        });
    };
    CodeAgent.prototype.reviewCode = function (content) {
        return __awaiter(this, void 0, void 0, function () {
            var codeMatch, _, language, code;
            return __generator(this, function (_a) {
                codeMatch = content.match(/```(\w+)?\n([\s\S]+?)```/);
                if (!codeMatch) {
                    throw new Error('No code block found in message');
                }
                _ = codeMatch[0], language = codeMatch[1], code = codeMatch[2];
                thought_logger_1.thoughtLogger.log('execution', 'Reviewing code', { language: language });
                return [2 /*return*/, this.qwenAPI.reviewCode(code, language)];
            });
        });
    };
    CodeAgent.prototype.formatReviewResponse = function (review) {
        return "# Code Review Results\n\n## Quality Score: ".concat(review.quality, "/100\n\n## Issues Found\n").concat(review.issues.map(function (issue) { return "- ".concat(issue); }).join('\n'), "\n\n## Suggestions for Improvement\n").concat(review.suggestions.map(function (suggestion) { return "- ".concat(suggestion); }).join('\n'));
    };
    CodeAgent.prototype.getCapabilities = function () {
        return Array.from(this.capabilities);
    };
    return CodeAgent;
}(base_agent_1.BaseAgent));
exports.CodeAgent = CodeAgent;
