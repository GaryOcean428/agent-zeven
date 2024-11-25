"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingsPanel = SettingsPanel;
var react_1 = require("react");
var lucide_react_1 = require("lucide-react");
var APISettings_1 = require("./APISettings");
var PerformanceSettings_1 = require("./PerformanceSettings");
var MemorySettings_1 = require("./MemorySettings");
var NotificationSettings_1 = require("./NotificationSettings");
var ModelSettings_1 = require("./ModelSettings");
var WorkflowSettings_1 = require("./WorkflowSettings");
function SettingsPanel() {
    var _a;
    var _b = react_1.default.useState('api'), activeSection = _b[0], setActiveSection = _b[1];
    var _c = react_1.default.useState(false), isMobileNavOpen = _c[0], setIsMobileNavOpen = _c[1];
    var sections = [
        { id: 'api', icon: lucide_react_1.Settings, title: 'API Configuration', component: APISettings_1.APISettings },
        { id: 'performance', icon: lucide_react_1.Settings, title: 'Performance', component: PerformanceSettings_1.PerformanceSettings },
        { id: 'memory', icon: lucide_react_1.Settings, title: 'Memory & Storage', component: MemorySettings_1.MemorySettings },
        { id: 'models', icon: lucide_react_1.Settings, title: 'Model Configuration', component: ModelSettings_1.ModelSettings },
        { id: 'workflow', icon: lucide_react_1.Settings, title: 'Workflow Settings', component: WorkflowSettings_1.WorkflowSettings },
        { id: 'notifications', icon: lucide_react_1.Settings, title: 'Notifications', component: NotificationSettings_1.NotificationSettings }
    ];
    var ActiveComponent = ((_a = sections.find(function (s) { return s.id === activeSection; })) === null || _a === void 0 ? void 0 : _a.component) || APISettings_1.APISettings;
    return (<div className="flex-1 p-4 sm:p-6 overflow-auto">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <lucide_react_1.Settings className="w-8 h-8 text-blue-400"/>
            <h2 className="text-2xl font-bold">Settings</h2>
          </div>
          <button onClick={function () { return setIsMobileNavOpen(!isMobileNavOpen); }} className="lg:hidden p-2 text-gray-400 hover:text-gray-300">
            <lucide_react_1.Settings className="w-6 h-6"/>
          </button>
        </div>

        <div className="flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-6">
          {/* Navigation */}
          <div className={"lg:w-64 space-y-2 ".concat(isMobileNavOpen ? 'block' : 'hidden lg:block')}>
            {sections.map(function (section) { return (<button key={section.id} onClick={function () {
                setActiveSection(section.id);
                setIsMobileNavOpen(section.id);
                setIsMobileNavOpen(false);
            }} className={"w-full flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors ".concat(activeSection === section.id
                ? 'bg-blue-600 text-white'
                : 'text-gray-400 hover:bg-gray-800')}>
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
