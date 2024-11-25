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
exports.PrimaryAgent = void 0;
var base_agent_1 = require("./core/base-agent");
var router_1 = require("../routing/router");
var ErrorHandler_1 = require("../errors/ErrorHandler");
var PrimaryAgent = /** @class */ (function (_super) {
    __extends(PrimaryAgent, _super);
    function PrimaryAgent(config) {
        var _this = _super.call(this, __assign(__assign({}, config), { role: 'primary' })) || this;
        _this.router = new router_1.ModelRouter();
        // Register message handlers
        _this.messageQueue.registerHandler('command', _this.handleCommand.bind(_this));
        _this.messageQueue.registerHandler('report', _this.handleReport.bind(_this));
        _this.messageQueue.registerHandler('query', _this.handleQuery.bind(_this));
        return _this;
    }
    PrimaryAgent.prototype.processMessage = function (message) {
        return __awaiter(this, void 0, void 0, function () {
            var startTime, routerConfig, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        startTime = Date.now();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 7, 8, 9]);
                        this.setStatus('active');
                        return [4 /*yield*/, this.router.route(message.content, [])];
                    case 2:
                        routerConfig = _a.sent();
                        if (!this.shouldDelegateToSpecialist(routerConfig)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.delegateToSpecialist(message, routerConfig)];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 6];
                    case 4: return [4 /*yield*/, this.executeTask(message.content)];
                    case 5:
                        _a.sent();
                        _a.label = 6;
                    case 6:
                        this.updateMetrics(true, Date.now() - startTime);
                        return [3 /*break*/, 9];
                    case 7:
                        error_1 = _a.sent();
                        this.updateMetrics(false, Date.now() - startTime);
                        throw error_1;
                    case 8:
                        this.setStatus('idle');
                        return [7 /*endfinally*/];
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    PrimaryAgent.prototype.executeTask = function (task) {
        return __awaiter(this, void 0, void 0, function () {
            var handled;
            return __generator(this, function (_a) {
                try {
                    // Primary agent's direct task execution logic
                    return [2 /*return*/, { status: 'completed', task: task }];
                }
                catch (error) {
                    handled = ErrorHandler_1.ErrorHandler.handle(error);
                    throw new Error("Task execution failed: ".concat(handled.message));
                }
                return [2 /*return*/];
            });
        });
    };
    PrimaryAgent.prototype.handleCommand = function (message) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: 
                    // Handle commands from user
                    return [4 /*yield*/, this.processMessage(message)];
                    case 1:
                        // Handle commands from user
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    PrimaryAgent.prototype.handleReport = function (message) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                // Process reports from subordinates
                this.emit('report-received', message);
                return [2 /*return*/];
            });
        });
    };
    PrimaryAgent.prototype.handleQuery = function (message) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.executeTask(message.content)];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, this.sendMessage({
                                from: this.config.id,
                                to: message.from,
                                content: JSON.stringify(response),
                                type: 'response'
                            })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    PrimaryAgent.prototype.shouldDelegateToSpecialist = function (routerConfig) {
        return routerConfig.model.includes('3b') || routerConfig.model.includes('7b');
    };
    PrimaryAgent.prototype.delegateToSpecialist = function (message, routerConfig) {
        return __awaiter(this, void 0, void 0, function () {
            var specialists, specialist;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        specialists = this.getSubordinates().filter(function (agent) {
                            return agent.getRole() === 'specialist';
                        });
                        if (specialists.length === 0) {
                            throw new Error('No specialist agents available');
                        }
                        specialist = specialists.find(function (agent) {
                            return agent.getModelTier() === routerConfig.model;
                        });
                        if (!specialist) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.delegateTask(message.content, specialist.getId())];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2: throw new Error("No specialist available for model ".concat(routerConfig.model));
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return PrimaryAgent;
}(base_agent_1.BaseAgent));
exports.PrimaryAgent = PrimaryAgent;
