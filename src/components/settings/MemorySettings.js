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
exports.MemorySettings = MemorySettings;
var react_1 = require("react");
var store_1 = require("../../store");
var Toggle_1 = require("../ui/Toggle");
function MemorySettings() {
    var _a = (0, store_1.useStore)(), memorySettings = _a.memorySettings, setMemorySettings = _a.setMemorySettings;
    return (<div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">Memory & Storage Settings</h3>

        <div className="space-y-6">
          {/* Vector Memory */}
          <div>
            <h4 className="text-sm font-medium mb-2">Vector Memory</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">Enable Vector Memory</span>
                <Toggle_1.Toggle checked={memorySettings.vectorMemoryEnabled} onCheckedChange={function (checked) {
            setMemorySettings(__assign(__assign({}, memorySettings), { vectorMemoryEnabled: checked }));
        }}/>
              </div>
            </div>
          </div>

          {/* Context Window */}
          <div>
            <label className="block text-sm font-medium mb-2">Context Window</label>
            <select value={memorySettings.contextSize} onChange={function (e) { return setMemorySettings(__assign(__assign({}, memorySettings), { contextSize: parseInt(e.target.value) })); }} className="w-full bg-secondary rounded-lg px-3 py-2 text-sm">
              <option value={2048}>2K tokens</option>
              <option value={4096}>4K tokens</option>
              <option value={8192}>8K tokens</option>
              <option value={16384}>16K tokens</option>
            </select>
          </div>

          {/* Memory Limit */}
          <div>
            <label className="block text-sm font-medium mb-2">Memory Limit</label>
            <select value={memorySettings.memoryLimit} onChange={function (e) { return setMemorySettings(__assign(__assign({}, memorySettings), { memoryLimit: parseInt(e.target.value) })); }} className="w-full bg-secondary rounded-lg px-3 py-2 text-sm">
              <option value={100}>100 memories</option>
              <option value={500}>500 memories</option>
              <option value={1000}>1,000 memories</option>
              <option value={5000}>5,000 memories</option>
            </select>
          </div>

          {/* Clear Memory */}
          <div>
            <button onClick={function () {
            if (window.confirm('Are you sure you want to clear all memories? This cannot be undone.')) {
                // Clear memory implementation
            }
        }} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm">
              Clear All Memories
            </button>
            <p className="text-sm text-foreground/60 mt-2">
              This will permanently delete all stored memories and conversation history.
            </p>
          </div>
        </div>
      </div>
    </div>);
}
