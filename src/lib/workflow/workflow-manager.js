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
exports.WorkflowManager = void 0;
var thought_logger_1 = require("../logging/thought-logger");
var swarm_coordinator_1 = require("../agents/swarm-coordinator");
var real_time_processor_1 = require("../agents/real-time-processor");
var WorkflowManager = /** @class */ (function () {
    function WorkflowManager() {
        this.workflows = new Map();
        this.swarmCoordinator = new swarm_coordinator_1.SwarmCoordinator();
        this.realTimeProcessor = new real_time_processor_1.RealTimeProcessor();
    }
    WorkflowManager.prototype.processWorkflow = function (message) {
        return __awaiter(this, void 0, void 0, function () {
            var workflowId, workflow, _i, _a, step, _b, error_1, finalResult, error_2;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        workflowId = crypto.randomUUID();
                        workflow = {
                            id: workflowId,
                            steps: this.createWorkflowSteps(message),
                            status: 'active',
                            startTime: Date.now()
                        };
                        this.workflows.set(workflowId, workflow);
                        thought_logger_1.thoughtLogger.log('plan', 'Starting workflow', { workflowId: workflowId });
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 8, , 9]);
                        _i = 0, _a = workflow.steps;
                        _c.label = 2;
                    case 2:
                        if (!(_i < _a.length)) return [3 /*break*/, 7];
                        step = _a[_i];
                        step.status = 'active';
                        thought_logger_1.thoughtLogger.log('execution', "Executing workflow step: ".concat(step.type), {
                            workflowId: workflowId,
                            stepId: step.id
                        });
                        _c.label = 3;
                    case 3:
                        _c.trys.push([3, 5, , 6]);
                        _b = step;
                        return [4 /*yield*/, this.executeWorkflowStep(step, message)];
                    case 4:
                        _b.result = _c.sent();
                        step.status = 'completed';
                        return [3 /*break*/, 6];
                    case 5:
                        error_1 = _c.sent();
                        step.status = 'failed';
                        throw error_1;
                    case 6:
                        _i++;
                        return [3 /*break*/, 2];
                    case 7:
                        finalResult = this.aggregateWorkflowResults(workflow);
                        workflow.status = 'completed';
                        workflow.endTime = Date.now();
                        thought_logger_1.thoughtLogger.log('success', 'Workflow completed', {
                            workflowId: workflowId,
                            duration: workflow.endTime - workflow.startTime
                        });
                        return [2 /*return*/, {
                                id: crypto.randomUUID(),
                                role: 'assistant',
                                content: finalResult,
                                timestamp: Date.now()
                            }];
                    case 8:
                        error_2 = _c.sent();
                        workflow.status = 'failed';
                        workflow.endTime = Date.now();
                        thought_logger_1.thoughtLogger.log('error', 'Workflow failed', { workflowId: workflowId, error: error_2 });
                        throw error_2;
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    WorkflowManager.prototype.createWorkflowSteps = function (message) {
        var steps = [];
        var content = message.content.toLowerCase();
        if (content.includes('search') || content.includes('find')) {
            steps.push({
                id: crypto.randomUUID(),
                type: 'search',
                status: 'pending'
            });
        }
        if (content.includes('process') || content.includes('analyze')) {
            steps.push({
                id: crypto.randomUUID(),
                type: 'process',
                status: 'pending'
            });
            steps.push({
                id: crypto.randomUUID(),
                type: 'analyze',
                status: 'pending'
            });
        }
        if (content.includes('export') || content.includes('table')) {
            steps.push({
                id: crypto.randomUUID(),
                type: 'export',
                status: 'pending'
            });
        }
        return steps;
    };
    WorkflowManager.prototype.executeWorkflowStep = function (step, message) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = step.type;
                        switch (_a) {
                            case 'search': return [3 /*break*/, 1];
                            case 'process': return [3 /*break*/, 3];
                            case 'analyze': return [3 /*break*/, 5];
                            case 'export': return [3 /*break*/, 7];
                        }
                        return [3 /*break*/, 9];
                    case 1: return [4 /*yield*/, this.swarmCoordinator.processTask(__assign(__assign({}, message), { content: "Search: ".concat(message.content) }))];
                    case 2: return [2 /*return*/, _b.sent()];
                    case 3: return [4 /*yield*/, this.realTimeProcessor.processInRealTime(message, function (content) { return thought_logger_1.thoughtLogger.log('observation', content); }, function (thought) { return thought_logger_1.thoughtLogger.log('reasoning', thought); })];
                    case 4: return [2 /*return*/, _b.sent()];
                    case 5: return [4 /*yield*/, this.swarmCoordinator.processTask(__assign(__assign({}, message), { content: "Analyze: ".concat(message.content) }))];
                    case 6: return [2 /*return*/, _b.sent()];
                    case 7: return [4 /*yield*/, this.swarmCoordinator.processTask(__assign(__assign({}, message), { content: "Export: ".concat(message.content) }))];
                    case 8: return [2 /*return*/, _b.sent()];
                    case 9: throw new Error("Unknown workflow step type: ".concat(step.type));
                }
            });
        });
    };
    WorkflowManager.prototype.aggregateWorkflowResults = function (workflow) {
        // Combine results from all completed steps
        var results = workflow.steps
            .filter(function (step) { return step.status === 'completed'; })
            .map(function (step) { return step.result; });
        // Format and return combined results
        return results.join('\n\n');
    };
    WorkflowManager.prototype.getWorkflow = function (workflowId) {
        return this.workflows.get(workflowId);
    };
    WorkflowManager.prototype.getActiveWorkflows = function () {
        return Array.from(this.workflows.values()).filter(function (workflow) { return workflow.status === 'active'; });
    };
    return WorkflowManager;
}());
exports.WorkflowManager = WorkflowManager;
