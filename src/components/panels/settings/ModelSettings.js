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
var lucide_react_1 = require("lucide-react");
var SettingsContext_1 = require("../../../context/SettingsContext");
var SettingsSection_1 = require("./SettingsSection");
function ModelSettings() {
    var _a = (0, SettingsContext_1.useSettings)(), settings = _a.settings, updateSettings = _a.updateSettings;
    var handleModelChange = function (model) {
        updateSettings({
            models: __assign(__assign({}, settings.models), { defaultModel: model })
        });
    };
    var handleModelToggle = function (model) {
        var enabledModels = settings.models.enabledModels.includes(model)
            ? settings.models.enabledModels.filter(function (m) { return m !== model; })
            : __spreadArray(__spreadArray([], settings.models.enabledModels, true), [model], false);
        updateSettings({
            models: __assign(__assign({}, settings.models), { enabledModels: enabledModels })
        });
    };
    return (<SettingsSection_1.SettingsSection>
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <lucide_react_1.Code className="w-5 h-5 mr-2"/>
            Model Configuration
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Default Model</label>
              <select value={settings.models.defaultModel} onChange={function (e) { return handleModelChange(e.target.value); }} className="w-full bg-gray-700 rounded-lg px-3 py-2 text-gray-100">
                <option value="grok-beta">Grok Beta</option>
                <option value="llama-3.2-70b-preview">Llama 70B</option>
                <option value="llama-3.2-7b-preview">Llama 7B</option>
                <option value="granite3-dense-2b">Granite Dense 2B</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Enabled Models</label>
              <div className="space-y-2">
                {['grok-beta', 'llama-3.2-70b-preview', 'llama-3.2-7b-preview', 'granite3-dense-2b'].map(function (model) { return (<label key={model} className="flex items-center space-x-2">
                    <input type="checkbox" checked={settings.models.enabledModels.includes(model)} onChange={function () { return handleModelToggle(model); }} className="rounded bg-gray-700 border-gray-600 text-blue-600 focus:ring-blue-500"/>
                    <span>{model}</span>
                  </label>); })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </SettingsSection_1.SettingsSection>);
}
