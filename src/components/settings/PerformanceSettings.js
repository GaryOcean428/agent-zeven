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
exports.PerformanceSettings = PerformanceSettings;
var react_1 = require("react");
var store_1 = require("../../store");
var Toggle_1 = require("../ui/Toggle");
function PerformanceSettings() {
    var _a = (0, store_1.useStore)(), performanceSettings = _a.performanceSettings, setPerformanceSettings = _a.setPerformanceSettings;
    return (<div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">Performance Settings</h3>

        <div className="space-y-6">
          {/* Temperature */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Temperature
              <span className="text-foreground/60 ml-2">Controls response creativity</span>
            </label>
            <input type="range" min="0" max="1" step="0.1" value={performanceSettings.temperature} onChange={function (e) { return setPerformanceSettings(__assign(__assign({}, performanceSettings), { temperature: parseFloat(e.target.value) })); }} className="w-full"/>
            <div className="flex justify-between text-sm text-foreground/60 mt-1">
              <span>More Focused</span>
              <span>{performanceSettings.temperature.toFixed(1)}</span>
              <span>More Creative</span>
            </div>
          </div>

          {/* Max Tokens */}
          <div>
            <label className="block text-sm font-medium mb-2">Max Tokens</label>
            <select value={performanceSettings.maxTokens} onChange={function (e) { return setPerformanceSettings(__assign(__assign({}, performanceSettings), { maxTokens: parseInt(e.target.value) })); }} className="w-full bg-secondary rounded-lg px-3 py-2 text-sm">
              <option value={2048}>2K tokens</option>
              <option value={4096}>4K tokens</option>
              <option value={8192}>8K tokens</option>
              <option value={16384}>16K tokens</option>
            </select>
          </div>

          {/* Streaming */}
          <div>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium">Enable Streaming</h4>
                <p className="text-sm text-foreground/60">Show responses as they are generated</p>
              </div>
              <Toggle_1.Toggle checked={performanceSettings.streaming} onCheckedChange={function (checked) { return setPerformanceSettings(__assign(__assign({}, performanceSettings), { streaming: checked })); }}/>
            </div>
          </div>
        </div>
      </div>
    </div>);
}
