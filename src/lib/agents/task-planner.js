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
exports.TaskPlanner = void 0;
var thought_logger_1 = require("../logging/thought-logger");
var model_router_1 = require("../routing/model-router");
var zod_1 = require("zod");
var TaskStep = zod_1.z.object({
    id: zod_1.z.string(),
    type: zod_1.z.enum(['research', 'analyze', 'code', 'write', 'review', 'execute']),
    description: zod_1.z.string(),
    requiredCapabilities: zod_1.z.array(zod_1.z.string()),
    dependencies: zod_1.z.array(zod_1.z.string()),
    status: zod_1.z.enum(['pending', 'active', 'completed', 'failed']),
    assignedAgent: zod_1.z.string().optional(),
    result: zod_1.z.unknown().optional()
});
var TaskPlan = zod_1.z.object({
    id: zod_1.z.string(),
    steps: zod_1.z.array(TaskStep),
    status: zod_1.z.enum(['planning', 'executing', 'completed', 'failed']),
    startTime: zod_1.z.number(),
    endTime: zod_1.z.number().optional()
});
var TaskPlanner = /** @class */ (function () {
    function TaskPlanner() {
        this.activePlans = new Map();
        this.router = new model_router_1.ModelRouter();
    }
    TaskPlanner.prototype.createPlan = function (task) {
        return __awaiter(this, void 0, void 0, function () {
            var planId, routerConfig, steps, plan, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        planId = crypto.randomUUID();
                        thought_logger_1.thoughtLogger.log('plan', 'Creating task plan', { planId: planId });
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, this.router.route(task, [])];
                    case 2:
                        routerConfig = _a.sent();
                        return [4 /*yield*/, this.generateTaskSteps(task, routerConfig)];
                    case 3:
                        steps = _a.sent();
                        plan = {
                            id: planId,
                            steps: steps,
                            status: 'planning',
                            startTime: Date.now()
                        };
                        this.activePlans.set(planId, plan);
                        thought_logger_1.thoughtLogger.log('success', 'Task plan created', {
                            planId: planId,
                            stepCount: steps.length
                        });
                        return [2 /*return*/, plan];
                    case 4:
                        error_1 = _a.sent();
                        thought_logger_1.thoughtLogger.log('error', 'Failed to create task plan', { planId: planId, error: error_1 });
                        throw error_1;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    TaskPlanner.prototype.generateTaskSteps = function (task, config) {
        return __awaiter(this, void 0, void 0, function () {
            var steps, taskLower;
            return __generator(this, function (_a) {
                steps = [];
                taskLower = task.toLowerCase();
                // Information gathering step
                if (this.requiresResearch(taskLower)) {
                    steps.push({
                        id: crypto.randomUUID(),
                        type: 'research',
                        description: 'Gather relevant information and context',
                        requiredCapabilities: ['web-search', 'memory-access'],
                        dependencies: [],
                        status: 'pending'
                    });
                }
                // Analysis step
                if (this.requiresAnalysis(taskLower)) {
                    steps.push({
                        id: crypto.randomUUID(),
                        type: 'analyze',
                        description: 'Analyze gathered information and identify key insights',
                        requiredCapabilities: ['data-analysis', 'content-generation'],
                        dependencies: steps.map(function (s) { return s.id; }),
                        status: 'pending'
                    });
                }
                // Code generation step
                if (this.requiresCode(taskLower)) {
                    steps.push({
                        id: crypto.randomUUID(),
                        type: 'code',
                        description: 'Generate required code implementation',
                        requiredCapabilities: ['code-execution', 'tool-usage'],
                        dependencies: steps.map(function (s) { return s.id; }),
                        status: 'pending'
                    });
                }
                // Content writing step
                if (this.requiresWriting(taskLower)) {
                    steps.push({
                        id: crypto.randomUUID(),
                        type: 'write',
                        description: 'Create content based on analysis',
                        requiredCapabilities: ['content-generation', 'self-reflection'],
                        dependencies: steps.map(function (s) { return s.id; }),
                        status: 'pending'
                    });
                }
                // Review step
                steps.push({
                    id: crypto.randomUUID(),
                    type: 'review',
                    description: 'Review and validate generated content/code',
                    requiredCapabilities: ['error-handling', 'self-reflection'],
                    dependencies: steps.map(function (s) { return s.id; }),
                    status: 'pending'
                });
                // Execution step
                steps.push({
                    id: crypto.randomUUID(),
                    type: 'execute',
                    description: 'Execute final actions and compile results',
                    requiredCapabilities: ['tool-usage', 'agent-communication'],
                    dependencies: steps.map(function (s) { return s.id; }),
                    status: 'pending'
                });
                return [2 /*return*/, steps];
            });
        });
    };
    TaskPlanner.prototype.requiresResearch = function (task) {
        return /\b(search|find|gather|research|information about|learn about)\b/i.test(task);
    };
    TaskPlanner.prototype.requiresAnalysis = function (task) {
        return /\b(analyze|compare|evaluate|assess|understand)\b/i.test(task);
    };
    TaskPlanner.prototype.requiresCode = function (task) {
        return /\b(code|program|implement|function|class|algorithm)\b/i.test(task);
    };
    TaskPlanner.prototype.requiresWriting = function (task) {
        return /\b(write|create|generate|compose|draft)\b/i.test(task);
    };
    TaskPlanner.prototype.executePlan = function (plan) {
        return __awaiter(this, void 0, void 0, function () {
            var completed_1, readySteps, error_2;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        plan.status = 'executing';
                        thought_logger_1.thoughtLogger.log('execution', 'Executing task plan', { planId: plan.id });
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 5, , 6]);
                        completed_1 = new Set();
                        _a.label = 2;
                    case 2:
                        if (!(completed_1.size < plan.steps.length)) return [3 /*break*/, 4];
                        readySteps = plan.steps.filter(function (step) {
                            return step.status === 'pending' &&
                                step.dependencies.every(function (depId) { return completed_1.has(depId); });
                        });
                        if (readySteps.length === 0) {
                            throw new Error('Deadlock detected in task execution');
                        }
                        // Execute ready steps in parallel
                        return [4 /*yield*/, Promise.all(readySteps.map(function (step) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    try {
                                        step.status = 'active';
                                        // Step execution handled by assigned agent
                                        completed_1.add(step.id);
                                        step.status = 'completed';
                                    }
                                    catch (error) {
                                        step.status = 'failed';
                                        throw error;
                                    }
                                    return [2 /*return*/];
                                });
                            }); }))];
                    case 3:
                        // Execute ready steps in parallel
                        _a.sent();
                        return [3 /*break*/, 2];
                    case 4:
                        plan.status = 'completed';
                        plan.endTime = Date.now();
                        thought_logger_1.thoughtLogger.log('success', 'Task plan executed successfully', {
                            planId: plan.id,
                            duration: plan.endTime - plan.startTime
                        });
                        return [3 /*break*/, 6];
                    case 5:
                        error_2 = _a.sent();
                        plan.status = 'failed';
                        plan.endTime = Date.now();
                        thought_logger_1.thoughtLogger.log('error', 'Task plan execution failed', { planId: plan.id, error: error_2 });
                        throw error_2;
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    TaskPlanner.prototype.getPlan = function (planId) {
        return this.activePlans.get(planId);
    };
    TaskPlanner.prototype.getActivePlans = function () {
        return Array.from(this.activePlans.values());
    };
    return TaskPlanner;
}());
exports.TaskPlanner = TaskPlanner;
