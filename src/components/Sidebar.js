"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sidebar = Sidebar;
var react_1 = require("react");
var lucide_react_1 = require("lucide-react");
var utils_1 = require("../lib/utils");
function Sidebar(_a) {
    var activePanel = _a.activePanel, onPanelChange = _a.onPanelChange;
    var navItems = [
        { id: 'chat', icon: lucide_react_1.MessageSquare, label: 'Chat', primary: true },
        { id: 'canvas', icon: lucide_react_1.Paintbrush, label: 'Canvas' },
        { id: 'agent', icon: lucide_react_1.Brain, label: 'Agent' },
        { id: 'tools', icon: lucide_react_1.Wrench, label: 'Tools' },
        { id: 'documents', icon: lucide_react_1.FileText, label: 'Documents' },
        { id: 'search', icon: lucide_react_1.Search, label: 'Search' },
        { id: 'settings', icon: lucide_react_1.Settings, label: 'Settings' }
    ];
    return (<div className="w-64 bg-background border-r border-border flex flex-col h-full">
      <div className="flex-1 py-2 space-y-1">
        {navItems.map(function (item) {
            var Icon = item.icon;
            return (<button key={item.id} onClick={function () { return onPanelChange(item.id); }} className={(0, utils_1.cn)('w-full flex items-center space-x-3 px-3 py-2 text-sm transition-colors', activePanel === item.id
                    ? item.primary
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-secondary text-secondary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary')}>
              <Icon className="w-5 h-5"/>
              <span>{item.label}</span>
            </button>);
        })}
      </div>

      <div className="p-4 border-t border-border">
        <div className="flex items-center space-x-3">
          <div className="w-2 h-2 bg-green-400 rounded-full"/>
          <span className="text-sm text-muted-foreground">System Online</span>
        </div>
      </div>
    </div>);
}
