"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tools = Tools;
var react_1 = require("react");
var lucide_react_1 = require("lucide-react");
var button_1 = require("./ui/button");
function Tools() {
    var tools = [
        {
            id: 'search',
            name: 'Search',
            description: 'Multi-provider search with RAG processing',
            icon: <lucide_react_1.Search className="w-5 h-5"/>,
            action: function () { return console.log('Search tool clicked'); }
        },
        {
            id: 'code',
            name: 'Code Analysis',
            description: 'Code awareness and analysis tools',
            icon: <lucide_react_1.Code className="w-5 h-5"/>,
            action: function () { return console.log('Code tool clicked'); }
        },
        // Add more tools as needed
    ];
    return (<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {tools.map(function (tool) { return (<div key={tool.id} className="card p-4">
          <div className="flex items-start space-x-4">
            <div className="p-2 bg-primary/10 rounded-lg">
              {tool.icon}
            </div>
            <div className="flex-1">
              <h3 className="font-medium">{tool.name}</h3>
              <p className="text-sm text-muted-foreground">{tool.description}</p>
            </div>
          </div>
          <button_1.Button onClick={tool.action} variant="secondary" className="w-full mt-4">
            Launch
          </button_1.Button>
        </div>); })}
    </div>);
}
