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
exports.RealTimeProcessor = void 0;
var thought_logger_1 = require("../logging/thought-logger");
var model_connector_1 = require("../connectors/model-connector");
var streaming_1 = require("../streaming");
var RealTimeProcessor = /** @class */ (function () {
    function RealTimeProcessor() {
        this.activeStreams = new Map();
        this.modelConnector = model_connector_1.ModelConnector.getInstance();
        this.streamProcessor = new streaming_1.StreamProcessor();
    }
    RealTimeProcessor.prototype.processInRealTime = function (message, onProgress, onThought) {
        return __awaiter(this, void 0, void 0, function () {
            var streamId, abortController, chunks, _i, chunks_1, chunk, response, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        streamId = crypto.randomUUID();
                        abortController = new AbortController();
                        this.activeStreams.set(streamId, abortController);
                        thought_logger_1.thoughtLogger.log('plan', 'Starting real-time processing', { streamId: streamId });
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 7, 8, 9]);
                        chunks = this.splitIntoChunks(message.content);
                        _i = 0, chunks_1 = chunks;
                        _a.label = 2;
                    case 2:
                        if (!(_i < chunks_1.length)) return [3 /*break*/, 6];
                        chunk = chunks_1[_i];
                        if (abortController.signal.aborted) {
                            thought_logger_1.thoughtLogger.log('observation', 'Processing aborted', { streamId: streamId });
                            return [3 /*break*/, 6];
                        }
                        return [4 /*yield*/, this.processChunk(chunk)];
                    case 3:
                        response = _a.sent();
                        onProgress(response.content);
                        // Emit thought process
                        if (response.thought) {
                            onThought(response.thought);
                        }
                        // Small delay between chunks for natural flow
                        return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 100); })];
                    case 4:
                        // Small delay between chunks for natural flow
                        _a.sent();
                        _a.label = 5;
                    case 5:
                        _i++;
                        return [3 /*break*/, 2];
                    case 6:
                        thought_logger_1.thoughtLogger.log('success', 'Real-time processing completed', { streamId: streamId });
                        return [3 /*break*/, 9];
                    case 7:
                        error_1 = _a.sent();
                        thought_logger_1.thoughtLogger.log('error', 'Real-time processing failed', { streamId: streamId, error: error_1 });
                        throw error_1;
                    case 8:
                        this.activeStreams.delete(streamId);
                        return [7 /*endfinally*/];
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    RealTimeProcessor.prototype.splitIntoChunks = function (content) {
        // Split content into manageable chunks for real-time processing
        return content.match(/.{1,100}/g) || [];
    };
    RealTimeProcessor.prototype.processChunk = function (chunk) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modelConnector.routeToModel([{ role: 'user', content: chunk }], {
                            model: 'grok-beta',
                            temperature: 0.7,
                            maxTokens: 100,
                            confidence: 0.9
                        })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, {
                                content: response.content,
                                thought: this.extractThought(response.content)
                            }];
                }
            });
        });
    };
    RealTimeProcessor.prototype.extractThought = function (content) {
        // Extract thought process from response if present
        var thoughtMatch = content.match(/\[THOUGHT\](.*?)\[\/THOUGHT\]/s);
        return thoughtMatch ? thoughtMatch[1].trim() : undefined;
    };
    RealTimeProcessor.prototype.cancelStream = function (streamId) {
        var controller = this.activeStreams.get(streamId);
        if (controller) {
            controller.abort();
            this.activeStreams.delete(streamId);
            thought_logger_1.thoughtLogger.log('observation', 'Stream cancelled', { streamId: streamId });
        }
    };
    RealTimeProcessor.prototype.getActiveStreamCount = function () {
        return this.activeStreams.size;
    };
    return RealTimeProcessor;
}());
exports.RealTimeProcessor = RealTimeProcessor;
