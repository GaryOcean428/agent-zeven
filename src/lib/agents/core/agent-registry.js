"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgentRegistry = void 0;
var primary_agent_1 = require("../primary-agent");
var specialist_agent_1 = require("../specialist-agent");
var task_agent_1 = require("../task-agent");
var AgentRegistry = /** @class */ (function () {
    function AgentRegistry() {
        this.agents = new Map();
    }
    AgentRegistry.getInstance = function () {
        if (!AgentRegistry.instance) {
            AgentRegistry.instance = new AgentRegistry();
        }
        return AgentRegistry.instance;
    };
    AgentRegistry.prototype.createAgent = function (config) {
        if (this.agents.has(config.id)) {
            throw new Error("Agent with ID ".concat(config.id, " already exists"));
        }
        var agent;
        switch (config.role) {
            case 'primary':
                agent = new primary_agent_1.PrimaryAgent(config);
                break;
            case 'specialist':
                agent = new specialist_agent_1.SpecialistAgent(config);
                break;
            case 'task':
                agent = new task_agent_1.TaskAgent(config);
                break;
            default:
                throw new Error("Unknown agent role: ".concat(config.role));
        }
        this.agents.set(config.id, agent);
        return agent;
    };
    AgentRegistry.prototype.getAgent = function (id) {
        return this.agents.get(id);
    };
    AgentRegistry.prototype.removeAgent = function (id) {
        return this.agents.delete(id);
    };
    AgentRegistry.prototype.getAllAgents = function () {
        return Array.from(this.agents.values());
    };
    AgentRegistry.prototype.getAgentsByRole = function (role) {
        return Array.from(this.agents.values()).filter(function (agent) { return agent.getRole() === role; });
    };
    AgentRegistry.prototype.clear = function () {
        this.agents.clear();
    };
    return AgentRegistry;
}());
exports.AgentRegistry = AgentRegistry;
