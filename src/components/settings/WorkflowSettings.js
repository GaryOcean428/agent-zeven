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
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkflowSettings = WorkflowSettings;
var react_1 = require("react");
var store_1 = require("../../store");
var Toggle_1 = require("../ui/Toggle");
function WorkflowSettings() {
    var _a = (0, store_1.useStore)(), workflowSettings = _a.workflowSettings, setWorkflowSettings = _a.setWorkflowSettings;
    return (<div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">Workflow Settings</h3>

        <div className="space-y-6">
          {/* Agent Collaboration */}
          <div>
            <h4 className="text-sm font-medium mb-2">Agent Collaboration</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">Enable Multi-Agent Collaboration</span>
                <Toggle_1.Toggle checked={workflowSettings.collaborationEnabled} onCheckedChange={function (checked) {
            setWorkflowSettings(__assign(__assign({}, workflowSettings), { collaborationEnabled: checked }));
        }}/>
              </div>
            </div>
          </div>

          {/* Task Planning */}
          <div>
            <h4 className="text-sm font-medium mb-2">Task Planning</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">Enable Automatic Task Planning</span>
                <Toggle_1.Toggle checked={workflowSettings.taskPlanningEnabled} onCheckedChange={function (checked) {
            setWorkflowSettings(__assign(__assign({}, workflowSettings), { taskPlanningEnabled: checked }));
        }}/>
              </div>
            </div>
          </div>

          {/* Parallel Processing */}
          <div>
            <label className="block text-sm font-medium mb-2">Parallel Tasks</label>
            <select value={workflowSettings.parallelTasks} onChange={function (e) { return setWorkflowSettings(__assign(__assign({}, workflowSettings), { parallelTasks: parseInt(e.target.value) })); }} className="w-full bg-secondary rounded-lg px-3 py-2 text-sm">
              <option value={1}>Sequential (1 task)</option>
              <option value={2}>Balanced (2 tasks)</option>
              <option value={4}>Performance (4 tasks)</option>
              <option value={8}>Maximum (8 tasks)</option>
            </select>
          </div>

          {/* Logging */}
          <div>
            <h4 className="text-sm font-medium mb-2">Logging</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">Log Task Planning</span>
                <Toggle_1.Toggle checked={workflowSettings.logTaskPlanning} onCheckedChange={function (checked) {
            setWorkflowSettings(__assign(__assign({}, workflowSettings), { logTaskPlanning: checked }));
        }}/>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Log Agent Communication</span>
                <Toggle_1.Toggle checked={workflowSettings.logAgentComm} onCheckedChange={function (checked) {
            setWorkflowSettings(__assign(__assign({}, workflowSettings), { logAgentComm: checked }));
        }}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>);
}
