"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingsPanel = SettingsPanel;
var react_1 = require("react");
var lucide_react_1 = require("lucide-react");
var store_1 = require("../store");
var utils_1 = require("../lib/utils");
var APISettings_1 = require("./settings/APISettings");
var PerformanceSettings_1 = require("./settings/PerformanceSettings");
var MemorySettings_1 = require("./settings/MemorySettings");
var ModelSettings_1 = require("./settings/ModelSettings");
var NotificationSettings_1 = require("./settings/NotificationSettings");
var WorkflowSettings_1 = require("./settings/WorkflowSettings");
function SettingsPanel() {
    var setSettingsPanelOpen = (0, store_1.useStore)().setSettingsPanelOpen;
    var _a = react_1.default.useState('api'), activeTab = _a[0], setActiveTab = _a[1];
    var tabs = [
        { id: 'api', label: 'API Configuration', icon: lucide_react_1.Settings },
        { id: 'performance', label: 'Performance', icon: lucide_react_1.Zap },
        { id: 'memory', label: 'Memory & Storage', icon: lucide_react_1.Database },
        { id: 'models', label: 'Model Configuration', icon: lucide_react_1.Code },
        { id: 'notifications', label: 'Notifications', icon: lucide_react_1.Bell },
        { id: 'workflow', label: 'Workflow', icon: lucide_react_1.Workflow }
    ];
    var renderContent = function () {
        switch (activeTab) {
            case 'api':
                return <APISettings_1.APISettings />;
            case 'performance':
                return <PerformanceSettings_1.PerformanceSettings />;
            case 'memory':
                return <MemorySettings_1.MemorySettings />;
            case 'models':
                return <ModelSettings_1.ModelSettings />;
            case 'notifications':
                return <NotificationSettings_1.NotificationSettings />;
            case 'workflow':
                return <WorkflowSettings_1.WorkflowSettings />;
            default:
                return null;
        }
    };
    return (<div className="fixed inset-y-0 right-0 w-[400px] bg-background border-l border-border shadow-lg z-50 flex flex-col">
      <div className="flex items-center justify-between p-4 border-b border-border">
        <h2 className="text-lg font-semibold">Settings</h2>
        <button onClick={function () { return setSettingsPanelOpen(false); }} className="p-2 hover:bg-secondary rounded-lg transition-colors">
          <lucide_react_1.X className="w-5 h-5"/>
        </button>
      </div>

      <div className="flex-1 flex">
        {/* Sidebar */}
        <div className="w-48 border-r border-border p-2">
          {tabs.map(function (tab) { return (<button key={tab.id} onClick={function () { return setActiveTab(tab.id); }} className={(0, utils_1.cn)('w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors', activeTab === tab.id
                ? 'bg-primary text-primary-foreground'
                : 'text-foreground/60 hover:text-foreground hover:bg-secondary')}>
              <tab.icon className="w-4 h-4"/>
              {tab.label}
            </button>); })}
        </div>

        {/* Content */}
        <div className="flex-1 p-4 overflow-y-auto">
          {renderContent()}
        </div>
      </div>
    </div>);
}
