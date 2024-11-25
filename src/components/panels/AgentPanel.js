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
exports.AgentPanel = AgentPanel;
var react_1 = require("react");
var lucide_react_1 = require("lucide-react");
var agent_system_1 = require("../../lib/agents/agent-system");
var thought_logger_1 = require("../../lib/logging/thought-logger");
var useToast_1 = require("../../hooks/useToast");
var framer_motion_1 = require("framer-motion");
function AgentPanel() {
    var _this = this;
    var _a = (0, react_1.useState)({
        activeAgents: 0,
        completedTasks: 0,
        averageResponseTime: 0,
        memoryUsage: 0,
        uptime: 0
    }), stats = _a[0], setStats = _a[1];
    var _b = (0, react_1.useState)(true), isLoading = _b[0], setIsLoading = _b[1];
    var _c = (0, react_1.useState)(false), isRefreshing = _c[0], setIsRefreshing = _c[1];
    var addToast = (0, useToast_1.useToast)().addToast;
    var fetchStats = function () { return __awaiter(_this, void 0, void 0, function () {
        var agents, activeCount, completedTasks, avgResponseTime, memoryUsage, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, 3, 4]);
                    setIsRefreshing(true);
                    agents = agent_system_1.agentSystem.getAgents();
                    activeCount = agents.filter(function (a) { return a.getState().status === 'active'; }).length;
                    completedTasks = agents.reduce(function (sum, a) { return sum + a.getState().metrics.tasksCompleted; }, 0);
                    avgResponseTime = agents.reduce(function (sum, a) { return sum + a.getState().metrics.averageResponseTime; }, 0) / Math.max(agents.length, 1);
                    return [4 /*yield*/, thought_logger_1.thoughtLogger.getMemoryUsage()];
                case 1:
                    memoryUsage = _a.sent();
                    setStats({
                        activeAgents: activeCount,
                        completedTasks: completedTasks,
                        averageResponseTime: avgResponseTime,
                        memoryUsage: memoryUsage,
                        uptime: Date.now() - agent_system_1.agentSystem.getStartTime()
                    });
                    return [3 /*break*/, 4];
                case 2:
                    error_1 = _a.sent();
                    addToast({
                        type: 'error',
                        title: 'Failed to fetch agent stats',
                        message: error_1 instanceof Error ? error_1.message : 'An unknown error occurred'
                    });
                    return [3 /*break*/, 4];
                case 3:
                    setIsLoading(false);
                    setIsRefreshing(false);
                    return [7 /*endfinally*/];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    (0, react_1.useEffect)(function () {
        fetchStats();
        var interval = setInterval(fetchStats, 5000);
        return function () { return clearInterval(interval); };
    }, []);
    return (<div className="flex-1 p-6 overflow-auto">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Agent System</h1>
            <p className="text-muted-foreground mt-1">Monitor and manage agent activities</p>
          </div>
          <button onClick={fetchStats} disabled={isRefreshing} className="p-2 text-muted-foreground hover:text-foreground rounded-lg transition-colors disabled:opacity-50">
            <lucide_react_1.RefreshCw className={"w-5 h-5 ".concat(isRefreshing ? 'animate-spin' : '')}/>
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard icon={lucide_react_1.Users} label="Active Agents" value={stats.activeAgents} loading={isLoading}/>
          <StatCard icon={lucide_react_1.Activity} label="Tasks Completed" value={stats.completedTasks} loading={isLoading}/>
          <StatCard icon={lucide_react_1.Code} label="Avg Response Time" value={"".concat(stats.averageResponseTime.toFixed(2), "ms")} loading={isLoading}/>
          <StatCard icon={lucide_react_1.Database} label="Memory Usage" value={"".concat((stats.memoryUsage / 1024 / 1024).toFixed(2), " MB")} loading={isLoading}/>
        </div>

        {/* Agent Status */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="card p-6">
            <h2 className="text-lg font-medium mb-4">Active Agents</h2>
            <div className="space-y-4">
              {agent_system_1.agentSystem.getAgents().map(function (agent) { return (<div key={agent.getId()} className="flex items-center justify-between p-4 bg-secondary rounded-lg">
                  <div>
                    <h3 className="font-medium">{agent.getName()}</h3>
                    <p className="text-sm text-muted-foreground">{agent.getRole()}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className={"w-2 h-2 rounded-full ".concat(agent.getState().status === 'active'
                ? 'bg-green-400'
                : 'bg-gray-400')}/>
                    <span className="text-sm">{agent.getState().status}</span>
                  </div>
                </div>); })}
            </div>
          </div>

          <div className="card p-6">
            <h2 className="text-lg font-medium mb-4">System Health</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span>Agent System</span>
                <span className="text-green-400">Online</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Memory System</span>
                <span className="text-green-400">Active</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Task Planner</span>
                <span className="text-green-400">Ready</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Model Router</span>
                <span className="text-green-400">Connected</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>);
}
function StatCard(_a) {
    var Icon = _a.icon, label = _a.label, value = _a.value, loading = _a.loading;
    return (<framer_motion_1.motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card p-6">
      <div className="flex items-center justify-between">
        <div className="p-2 bg-primary/10 rounded-lg">
          <Icon className="w-5 h-5 text-primary"/>
        </div>
      </div>
      <div className="mt-4">
        {loading ? (<div className="animate-pulse">
            <div className="h-6 bg-secondary rounded w-24"/>
            <div className="h-4 bg-secondary rounded w-16 mt-2"/>
          </div>) : (<>
            <h3 className="text-2xl font-bold">{value}</h3>
            <p className="text-sm text-muted-foreground mt-1">{label}</p>
          </>)}
      </div>
    </framer_motion_1.motion.div>);
}
