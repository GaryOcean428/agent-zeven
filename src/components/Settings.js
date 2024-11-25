"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Settings = Settings;
var react_1 = require("react");
var lucide_react_1 = require("lucide-react");
var store_1 = require("../store");
function Settings() {
    var setSettingsPanelOpen = (0, store_1.useStore)().setSettingsPanelOpen;
    react_1.default.useEffect(function () {
        setSettingsPanelOpen(true);
        return function () { return setSettingsPanelOpen(false); };
    }, [setSettingsPanelOpen]);
    return (<div className="h-full flex items-center justify-center text-foreground/60">
      <div className="text-center">
        <lucide_react_1.Settings className="w-12 h-12 mx-auto mb-4 opacity-50"/>
        <p>Use the settings panel to configure the application</p>
      </div>
    </div>);
}
