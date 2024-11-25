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
exports.Orchestrator = void 0;
var event_emitter_1 = require("../events/event-emitter");
var thought_logger_1 = require("../logging/thought-logger");
var registry_1 = require("./registry");
var task_planner_1 = require("./task-planner");
var memory_manager_1 = require("../memory/memory-manager");
var model_router_1 = require("../routing/model-router");
var Orchestrator = /** @class */ (function (_super) {
    __extends(Orchestrator, _super);
    function Orchestrator(config) {
        var _this = _super.call(this) || this;
        _this.activeTasks = new Map();
        _this.config = config;
        _this.registry = registry_1.AgentRegistry.getInstance();
        _this.planner = new task_planner_1.TaskPlanner();
        _this.memory = new memory_manager_1.MemoryManager();
        _this.router = new model_router_1.ModelRouter();
        // Register for agent events
        _this.registry.on('agent-event', _this.handleAgentEvent.bind(_this));
        return _this;
    }
    Orchestrator.prototype.processTask = function (content) {
        return __awaiter(this, void 0, void 0, function () {
            var taskId, plan, routerConfig, agents, _loop_1, this_1, _i, _a, step, error_1;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        taskId = crypto.randomUUID();
                        thought_logger_1.thoughtLogger.log('plan', 'Orchestrator processing new task', { taskId: taskId });
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 9, 10, 11]);
                        return [4 /*yield*/, this.planner.createPlan(content)];
                    case 2:
                        plan = _b.sent();
                        return [4 /*yield*/, this.router.route(content, [])];
                    case 3:
                        routerConfig = _b.sent();
                        return [4 /*yield*/, this.createAgentSwarm(plan, routerConfig)];
                    case 4:
                        agents = _b.sent();
                        this.activeTasks.set(taskId, agents.map(function (a) { return a.id; }));
                        _loop_1 = function (step) {
                            var agent, message;
                            return __generator(this, function (_c) {
                                switch (_c.label) {
                                    case 0:
                                        agent = this_1.findBestAgent(agents, step);
                                        if (!agent) {
                                            throw new Error("No suitable agent found for step: ".concat(step.type));
                                        }
                                        message = {
                                            id: crypto.randomUUID(),
                                            from: this_1.config.id,
                                            to: agent.id,
                                            content: step.description,
                                            type: 'command',
                                            timestamp: Date.now()
                                        };
                                        return [4 /*yield*/, this_1.sendMessage(message)];
                                    case 1:
                                        _c.sent();
                                        // Wait for step completion
const stepTimeout = this.config.stepTimeout || 30000;
return [4 /*yield*/, new Promise(function (resolve, reject) {
    var timeout = setTimeout(function () {
        _this.removeAllListeners('step-completed');
        reject(new Error('Step execution timeout'));
    }, stepTimeout);
    _this.once('step-completed', function (_a) {
        var stepId = _a.stepId;
        if (stepId === step.id) {
            clearTimeout(timeout);
            resolve(true);
        }
    });
})];
                                    case 2:
                                        // Wait for step completion
                                        _c.sent();
                                        return [2 /*return*/];
                                }
                            });
                        };
                        this_1 = this;
                        _i = 0, _a = plan.steps;
                        _b.label = 5;
                    case 5:
                        if (!(_i < _a.length)) return [3 /*break*/, 8];
                        step = _a[_i];
                        return [5 /*yield**/, _loop_1(step)];
                    case 6:
                        _b.sent();
                        _b.label = 7;
                    case 7:
                        _i++;
                        return [3 /*break*/, 5];
                    case 8:
                        thought_logger_1.thoughtLogger.log('success', 'Task completed successfully', { taskId: taskId });
                        return [3 /*break*/, 11];
                    case 9:
                        error_1 = _b.sent();
                        thought_logger_1.thoughtLogger.log('error', 'Task execution failed', { taskId: taskId, error: error_1 });
                        throw error_1;
                    case 10:
                        this.activeTasks.delete(taskId);
                        return [7 /*endfinally*/];
                    case 11: return [2 /*return*/];
                }
            });
        });
    };
    Orchestrator.prototype.createAgentSwarm = function (plan, config) {
        return __awaiter(this, void 0, void 0, function () {
            var requiredRoles, _i, _a, step, agents, _b, requiredRoles_1, role, agent;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        requiredRoles = new Set();
                        // Analyze plan steps to determine required agent roles
                        for (_i = 0, _a = plan.steps; _i < _a.length; _i++) {
                            step = _a[_i];
                            switch (step.type) {
                                case 'research':
                                    requiredRoles.add('researcher');
                                    break;
                                case 'analyze':
                                    requiredRoles.add('analyst');
                                    break;
                                case 'code':
                                    requiredRoles.add('coder');
                                    break;
                                case 'write':
                                    requiredRoles.add('writer');
                                    break;
                                case 'review':
                                    requiredRoles.add('critic');
                                    break;
                                case 'execute':
                                    requiredRoles.add('executor');
                                    break;
                            }
                        }
                        agents = [];
                        _b = 0, requiredRoles_1 = requiredRoles;
                        _c.label = 1;
                    case 1:
                        if (!(_b < requiredRoles_1.length)) return [3 /*break*/, 4];
                        role = requiredRoles_1[_b];
                        return [4 /*yield*/, this.registry.createAgent({
                                id: crypto.randomUUID(),
                                name: "".concat(role, "-agent"),
                                role: role,
                                capabilities: this.getCapabilitiesForRole(role),
                                model: this.getModelForRole(role, config),
                                temperature: 0.7,
                                maxTokens: 4096,
                                systemPrompt: this.getSystemPromptForRole(role),
                                tools: this.getToolsForRole(role)
                            })];
                    case 2:
                        agent = _c.sent();
                        agents.push(agent);
                        _c.label = 3;
                    case 3:
                        _b++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/, agents];
                }
            });
        });
    };
    Orchestrator.prototype.getCapabilitiesForRole = function (role) {
        // Map roles to required capabilities
        var capabilityMap = {
            researcher: ['web-search', 'memory-access'],
            analyst: ['data-analysis', 'content-generation'],
            coder: ['code-execution', 'tool-usage'],
            writer: ['content-generation', 'self-reflection'],
            critic: ['error-handling', 'self-reflection'],
            executor: ['tool-usage', 'agent-communication']
        };
        return capabilityMap[role] || [];
    };
    Orchestrator.prototype.getModelForRole = function (role, config) {
        // Map roles to appropriate models based on requirements
        switch (role) {
            case 'researcher':
                return 'llama-3.1-sonar-large-128k-online';
            case 'analyst':
                return 'llama-3.2-70b-preview';
            case 'coder':
                return 'granite-3b-code-base-2k';
            case 'writer':
                return 'llama-3.2-70b-preview';
            case 'critic':
                return 'llama-3.2-7b-preview';
            case 'executor':
                return 'llama-3.2-3b-preview';
            default:
                return config.model;
        }
    };
    Orchestrator.prototype.getSystemPromptForRole = function (role) {
        // Role-specific system prompts
        var prompts = {
            researcher: 'You are a research specialist focused on gathering accurate and relevant information...',
            analyst: 'You are a data analyst skilled at processing information and generating insights...',
            coder: 'You are a coding expert focused on generating high-quality, maintainable code...',
            writer: 'You are a content specialist skilled at creating clear and engaging content...',
            critic: 'You are a quality control specialist focused on reviewing and improving work...',
            executor: 'You are a task execution specialist skilled at using tools and completing objectives...'
        };
        return prompts[role] || '';
    };
    Orchestrator.prototype.getToolsForRole = function (role) {
        // Map roles to available tools
        var toolMap = {
            researcher: ['web-search', 'document-retrieval'],
            analyst: ['data-processing', 'visualization'],
            coder: ['code-execution', 'version-control'],
            writer: ['content-generation', 'grammar-check'],
            critic: ['code-review', 'content-review'],
            executor: ['file-operations', 'system-commands']
        };
        return toolMap[role] || [];
    };
    Orchestrator.prototype.findBestAgent = function (agents, step) {
        return agents.find(function (agent) {
            return agent.capabilities.some(function (cap) {
                return step.requiredCapabilities.includes(cap);
            });
        });
    };
    Orchestrator.prototype.sendMessage = function (message) {
        return __awaiter(this, void 0, void 0, function () {
            var agent, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        thought_logger_1.thoughtLogger.log('execution', 'Sending message', {
                            from: message.from,
                            to: message.to,
                            type: message.type
                        });
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        agent = this.registry.getAgent(message.to);
                        if (!agent) {
                            throw new Error("Agent ".concat(message.to, " not found"));
                        }
                        return [4 /*yield*/, agent.receiveMessage(message)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_2 = _a.sent();
                        thought_logger_1.thoughtLogger.log('error', 'Failed to send message', { error: error_2 });
                        throw error_2;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Orchestrator.prototype.handleAgentEvent = function (event) {
        thought_logger_1.thoughtLogger.log('observation', 'Received agent event', {
            type: event.type,
            agentId: event.agentId
        });
        switch (event.type) {
            case 'task-completed':
                this.emit('step-completed', {
                    stepId: event.data.stepId,
                    result: event.data.result
                });
                break;
            case 'task-failed':
                this.emit('step-failed', {
                    stepId: event.data.stepId,
                    error: event.data.error
                });
                break;
            case 'error-occurred':
                thought_logger_1.thoughtLogger.log('error', 'Agent error occurred', {
                    agentId: event.agentId,
                    error: event.data.error
                });
                break;
        }
    };
    return Orchestrator;
}(event_emitter_1.EventEmitter));
exports.Orchestrator = Orchestrator;
