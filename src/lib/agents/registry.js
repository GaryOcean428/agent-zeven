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
exports.AgentRegistry = void 0;
var event_emitter_1 = require("../events/event-emitter");
var thought_logger_1 = require("../logging/thought-logger");
var zod_1 = require("zod");
var AgentRegistry = /** @class */ (function (_super) {
    __extends(AgentRegistry, _super);
    function AgentRegistry() {
        var _this = _super.call(this) || this;
        _this.agents = new Map();
        _this.capabilities = new Map();
        return _this;
    }
    AgentRegistry.getInstance = function () {
        if (!AgentRegistry.instance) {
            AgentRegistry.instance = new AgentRegistry();
        }
        return AgentRegistry.instance;
    };
    AgentRegistry.prototype.createAgent = function (config) {
        return __awaiter(this, void 0, void 0, function () {
            var validatedConfig_1, error_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, zod_1.z.object({
                                id: zod_1.z.string(),
                                name: zod_1.z.string(),
                                role: zod_1.z.string(),
                                capabilities: zod_1.z.array(zod_1.z.string()),
                                model: zod_1.z.string(),
                                temperature: zod_1.z.number(),
                                maxTokens: zod_1.z.number(),
                                systemPrompt: zod_1.z.string(),
                                tools: zod_1.z.array(zod_1.z.string())
                            }).parseAsync(config)];
                    case 1:
                        validatedConfig_1 = _a.sent();
                        // Register agent
                        this.agents.set(validatedConfig_1.id, validatedConfig_1);
                        // Index capabilities
                        validatedConfig_1.capabilities.forEach(function (capability) {
                            var _a;
                            if (!_this.capabilities.has(capability)) {
                                _this.capabilities.set(capability, new Set());
                            }
                            (_a = _this.capabilities.get(capability)) === null || _a === void 0 ? void 0 : _a.add(validatedConfig_1.id);
                        });
                        thought_logger_1.thoughtLogger.log('success', 'Agent created successfully', {
                            agentId: validatedConfig_1.id,
                            role: validatedConfig_1.role
                        });
                        return [2 /*return*/, validatedConfig_1];
                    case 2:
                        error_1 = _a.sent();
                        thought_logger_1.thoughtLogger.log('error', 'Failed to create agent', { error: error_1 });
                        throw error_1;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AgentRegistry.prototype.getAgent = function (id) {
        return this.agents.get(id);
    };
    AgentRegistry.prototype.findAgentsByCapability = function (capability) {
        var _this = this;
        var agentIds = this.capabilities.get(capability);
        if (!agentIds)
            return [];
        return Array.from(agentIds)
            .map(function (id) { return _this.agents.get(id); })
            .filter(function (agent) { return agent !== undefined; });
    };
    AgentRegistry.prototype.findAgentsByRole = function (role) {
        return Array.from(this.agents.values())
            .filter(function (agent) { return agent.role === role; });
    };
    AgentRegistry.prototype.removeAgent = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var agent;
            var _this = this;
            return __generator(this, function (_a) {
                agent = this.agents.get(id);
                if (!agent)
                    return [2 /*return*/];
                // Remove from capabilities index
                agent.capabilities.forEach(function (capability) {
                    var _a;
                    (_a = _this.capabilities.get(capability)) === null || _a === void 0 ? void 0 : _a.delete(id);
                });
                // Remove agent
                this.agents.delete(id);
                thought_logger_1.thoughtLogger.log('success', 'Agent removed', { agentId: id });
                return [2 /*return*/];
            });
        });
    };
    AgentRegistry.prototype.emitAgentEvent = function (event) {
        thought_logger_1.thoughtLogger.log('observation', 'Agent event emitted', {
            type: event.type,
            agentId: event.agentId
        });
        this.emit('agent-event', event);
    };
    AgentRegistry.prototype.getAgentCount = function () {
        return this.agents.size;
    };
    AgentRegistry.prototype.getCapabilities = function () {
        return Array.from(this.capabilities.keys());
    };
    AgentRegistry.prototype.clear = function () {
        this.agents.clear();
        this.capabilities.clear();
        thought_logger_1.thoughtLogger.log('success', 'Agent registry cleared');
    };
    return AgentRegistry;
}(event_emitter_1.EventEmitter));
exports.AgentRegistry = AgentRegistry;
