"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigWarning = ConfigWarning;
var react_1 = require("react");
var lucide_react_1 = require("lucide-react");
var store_1 = require("../store");
var ConfigProvider_1 = require("../providers/ConfigProvider");
function ConfigWarning() {
    var setSettingsPanelOpen = (0, store_1.useStore)().setSettingsPanelOpen;
    var missingKeys = (0, ConfigProvider_1.useConfig)().missingKeys;
    return (<div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card p-6 rounded-lg shadow-lg max-w-md w-full space-y-4">
        <div className="flex items-center space-x-2 text-yellow-500">
          <lucide_react_1.AlertTriangle className="w-6 h-6"/>
          <h2 className="text-lg font-semibold">Configuration Required</h2>
        </div>
        <p className="text-muted-foreground">
          Please configure your API keys in the settings panel to continue. The following keys are missing:
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm">
          {missingKeys.map(function (key) { return (<li key={key} className="text-muted-foreground">
              {key.toUpperCase().replace('VITE_', '').replace('_', ' ')} API Key
            </li>); })}
        </ul>
        <button onClick={function () { return setSettingsPanelOpen(true); }} className="w-full flex items-center justify-center space-x-2 bg-primary text-primary-foreground rounded-lg px-4 py-2 hover:bg-primary/90 transition-colors">
          <lucide_react_1.Settings className="w-4 h-4"/>
          <span>Open Settings</span>
        </button>
      </div>
    </div>);
}
