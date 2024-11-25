"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingsPanel = SettingsPanel;
var react_1 = require("react");
var lucide_react_1 = require("lucide-react");
var APISettings_1 = require("./settings/APISettings");
var PerformanceSettings_1 = require("./settings/PerformanceSettings");
var MemorySettings_1 = require("./settings/MemorySettings");
var NotificationSettings_1 = require("./settings/NotificationSettings");
var ModelSettings_1 = require("./settings/ModelSettings");
var WorkflowSettings_1 = require("./settings/WorkflowSettings");
function SettingsPanel() {
    var _a;
    var _b = react_1.default.useState('api'), activeSection = _b[0], setActiveSection = _b[1];
    var sections = [
        { id: 'api', icon: lucide_react_1.Settings, title: 'API Configuration', component: APISettings_1.APISettings },
        { id: 'performance', icon: lucide_react_1.Zap, title: 'Performance', component: PerformanceSettings_1.PerformanceSettings },
        { id: 'memory', icon: lucide_react_1.Database, title: 'Memory & Storage', component: MemorySettings_1.MemorySettings },
        { id: 'models', icon: lucide_react_1.Code, title: 'Model Configuration', component: ModelSettings_1.ModelSettings },
        { id: 'workflow', icon: lucide_react_1.Workflow, title: 'Workflow Settings', component: WorkflowSettings_1.WorkflowSettings },
        { id: 'notifications', icon: lucide_react_1.Bell, title: 'Notifications', component: NotificationSettings_1.NotificationSettings }
    ];
    var ActiveComponent = ((_a = sections.find(function (s) { return s.id === activeSection; })) === null || _a === void 0 ? void 0 : _a.component) || APISettings_1.APISettings;
    return (<div className="flex-1 p-6 overflow-auto">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center space-x-4 mb-6">
          <lucide_react_1.Settings className="w-8 h-8 text-primary"/>
          <h2 className="text-2xl font-bold">Settings</h2>
        </div>

        <div className="flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-6">
          {/* Navigation */}
          <div className="w-64 space-y-2">
            {sections.map(function (section) { return (<button key={section.id} onClick={function () { return setActiveSection(section.id); }} className={"w-full flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors ".concat(activeSection === section.id
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:text-foreground hover:bg-secondary')}>
                <section.icon className="w-5 h-5"/>
                <span>{section.title}</span>
              </button>); })}
          </div>

          {/* Content */}
          <div className="flex-1">
            <ActiveComponent />
          </div>
        </div>
      </div>
    </div>);
}
