"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgentEvent = exports.AgentState = exports.AgentMessage = exports.AgentConfig = exports.AgentCapability = exports.AgentRole = void 0;
var zod_1 = require("zod");
exports.AgentRole = zod_1.z.enum([
    'orchestrator', // High-level task planning and delegation
    'researcher', // Web search and information gathering
    'analyst', // Data analysis and insights
    'coder', // Code generation and execution
    'writer', // Content generation and refinement
    'critic', // Review and quality control
    'executor' // Task execution and tool usage
]);
exports.AgentCapability = zod_1.z.enum([
    'web-search',
    'code-execution',
    'data-analysis',
    'content-generation',
    'task-planning',
    'tool-usage',
    'memory-access',
    'agent-communication',
    'error-handling',
    'self-reflection'
]);
exports.AgentConfig = zod_1.z.object({
    id: zod_1.z.string(),
    name: zod_1.z.string(),
    role: exports.AgentRole,
    capabilities: zod_1.z.array(exports.AgentCapability),
    model: zod_1.z.string(),
    temperature: zod_1.z.number().min(0).max(1),
    maxTokens: zod_1.z.number().positive(),
    systemPrompt: zod_1.z.string(),
    tools: zod_1.z.array(zod_1.z.string()),
    metadata: zod_1.z.record(zod_1.z.unknown()).optional()
});
exports.AgentMessage = zod_1.z.object({
    id: zod_1.z.string(),
    from: zod_1.z.string(),
    to: zod_1.z.string(),
    content: zod_1.z.string(),
    type: zod_1.z.enum(['command', 'response', 'error', 'reflection', 'plan', 'result']),
    timestamp: zod_1.z.number(),
    metadata: zod_1.z.record(zod_1.z.unknown()).optional()
});
exports.AgentState = zod_1.z.object({
    id: zod_1.z.string(),
    status: zod_1.z.enum(['idle', 'active', 'paused', 'error']),
    currentTask: zod_1.z.string().optional(),
    memory: zod_1.z.record(zod_1.z.unknown()),
    metrics: zod_1.z.object({
        tasksCompleted: zod_1.z.number(),
        successRate: zod_1.z.number(),
        averageResponseTime: zod_1.z.number(),
        lastActive: zod_1.z.number()
    })
});
exports.AgentEvent = zod_1.z.object({
    type: zod_1.z.enum([
        'task-assigned',
        'task-completed',
        'task-failed',
        'message-sent',
        'message-received',
        'state-changed',
        'error-occurred',
        'reflection-added'
    ]),
    agentId: zod_1.z.string(),
    timestamp: zod_1.z.number(),
    data: zod_1.z.record(zod_1.z.unknown())
});
