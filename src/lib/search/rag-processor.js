"use strict";
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
exports.RagProcessor = void 0;
var thought_logger_1 = require("../logging/thought-logger");
var vector_store_1 = require("../memory/vector-store");
var RagProcessor = /** @class */ (function () {
    function RagProcessor() {
        this.vectorStore = new vector_store_1.VectorStore();
    }
    RagProcessor.prototype.process = function (results) {
        return __awaiter(this, void 0, void 0, function () {
            var storedResults, enhancedResults, error_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        thought_logger_1.thoughtLogger.log('plan', 'Processing search results with RAG', {
                            resultCount: results.length
                        });
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, Promise.all(results.map(function (result) { return __awaiter(_this, void 0, void 0, function () {
                                var vectorId;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, this.vectorStore.addDocument(result.content)];
                                        case 1:
                                            vectorId = _a.sent();
                                            return [2 /*return*/, __assign(__assign({}, result), { vectorId: vectorId })];
                                    }
                                });
                            }); }))];
                    case 2:
                        storedResults = _a.sent();
                        return [4 /*yield*/, Promise.all(storedResults.map(function (result) { return __awaiter(_this, void 0, void 0, function () {
                                var similarContent;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, this.vectorStore.search(result.content, 0.7, 3)];
                                        case 1:
                                            similarContent = _a.sent();
                                            // Enhance result with related content
                                            return [2 /*return*/, __assign(__assign({}, result), { content: this.combineContent(result.content, similarContent) })];
                                    }
                                });
                            }); }))];
                    case 3:
                        enhancedResults = _a.sent();
                        thought_logger_1.thoughtLogger.log('success', 'RAG processing complete', {
                            enhancedCount: enhancedResults.length
                        });
                        return [2 /*return*/, enhancedResults];
                    case 4:
                        error_1 = _a.sent();
                        thought_logger_1.thoughtLogger.log('error', 'RAG processing failed', { error: error_1 });
                        return [2 /*return*/, results]; // Return original results if RAG fails
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    RagProcessor.prototype.combineContent = function (originalContent, similarContent) {
        var combined = originalContent + '\n\n';
        if (similarContent.length > 0) {
            combined += '### Related Information\n\n';
            similarContent.forEach(function (_a) {
                var content = _a.content, score = _a.score;
                if (score > 0.8 && content !== originalContent) {
                    combined += content + '\n\n';
                }
            });
        }
        return combined.trim();
    };
    return RagProcessor;
}());
exports.RagProcessor = RagProcessor;
