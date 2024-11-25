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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModelSettings = ModelSettings;
var react_1 = require("react");
var store_1 = require("../../store");
var config_1 = require("../../config");
var Toggle_1 = require("../ui/Toggle");
function ModelSettings() {
    var _a = (0, store_1.useStore)(), modelSettings = _a.modelSettings, setModelSettings = _a.setModelSettings;
    var models = {
        xai: Object.entries(config_1.config.services.xai.models),
        groq: Object.entries(config_1.config.services.groq.models),
        perplexity: [['default', config_1.config.services.perplexity.defaultModel]]
    };
    return (<div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">Model Configuration</h3>
        
        <div className="space-y-6">
          {/* X.AI Models */}
          <div>
            <h4 className="text-sm font-medium mb-2">X.AI Models</h4>
            <div className="space-y-2">
              {models.xai.map(function (_a) {
            var key = _a[0], model = _a[1];
            return (<div key={key} className="flex items-center justify-between">
                  <span className="text-sm">{model}</span>
                  <Toggle_1.Toggle checked={modelSettings.enabledModels.includes(model)} onCheckedChange={function (checked) {
                    setModelSettings(__assign(__assign({}, modelSettings), { enabledModels: checked
                            ? __spreadArray(__spreadArray([], modelSettings.enabledModels, true), [model], false) : modelSettings.enabledModels.filter(function (m) { return m !== model; }) }));
                }}/>
                </div>);
        })}
            </div>
          </div>

          {/* Groq Models */}
          <div>
            <h4 className="text-sm font-medium mb-2">Groq Models</h4>
            <div className="space-y-2">
              {models.groq.map(function (_a) {
            var key = _a[0], model = _a[1];
            return (<div key={key} className="flex items-center justify-between">
                  <span className="text-sm">{model}</span>
                  <Toggle_1.Toggle checked={modelSettings.enabledModels.includes(model)} onCheckedChange={function (checked) {
                    setModelSettings(__assign(__assign({}, modelSettings), { enabledModels: checked
                            ? __spreadArray(__spreadArray([], modelSettings.enabledModels, true), [model], false) : modelSettings.enabledModels.filter(function (m) { return m !== model; }) }));
                }}/>
                </div>);
        })}
            </div>
          </div>

          {/* Perplexity Models */}
          <div>
            <h4 className="text-sm font-medium mb-2">Perplexity Models</h4>
            <div className="space-y-2">
              {models.perplexity.map(function (_a) {
            var key = _a[0], model = _a[1];
            return (<div key={key} className="flex items-center justify-between">
                  <span className="text-sm">{model}</span>
                  <Toggle_1.Toggle checked={modelSettings.enabledModels.includes(model)} onCheckedChange={function (checked) {
                    setModelSettings(__assign(__assign({}, modelSettings), { enabledModels: checked
                            ? __spreadArray(__spreadArray([], modelSettings.enabledModels, true), [model], false) : modelSettings.enabledModels.filter(function (m) { return m !== model; }) }));
                }}/>
                </div>);
        })}
            </div>
          </div>

          {/* Default Model Selection */}
          <div>
            <label className="block text-sm font-medium mb-2">Default Model</label>
            <select value={modelSettings.defaultModel} onChange={function (e) { return setModelSettings(__assign(__assign({}, modelSettings), { defaultModel: e.target.value })); }} className="w-full bg-secondary rounded-lg px-3 py-2 text-sm">
              {modelSettings.enabledModels.map(function (model) { return (<option key={model} value={model}>{model}</option>); })}
            </select>
          </div>
        </div>
      </div>
    </div>);
}
