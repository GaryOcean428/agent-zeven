"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToolsPanel = ToolsPanel;
var react_1 = require("react");
var lucide_react_1 = require("lucide-react");
var CompetitorAnalysis_1 = require("../competitor-analysis/CompetitorAnalysis");
var tool_registry_1 = require("../../lib/tools/tool-registry");
function ToolsPanel() {
    var _a, _b;
    var _c = (0, react_1.useState)('tools'), activeTab = _c[0], setActiveTab = _c[1];
    var _d = (0, react_1.useState)(null), selectedTool = _d[0], setSelectedTool = _d[1];
    var tools = tool_registry_1.toolRegistry.getTools();
    var toolCategories = {
        'Data Processing': tools.filter(function (t) { return t.name.includes('data') || t.name.includes('process'); }),
        'Search & Analysis': tools.filter(function (t) { return t.name.includes('search') || t.name.includes('analyze'); }),
        'Code & Development': tools.filter(function (t) { return t.name.includes('code') || t.name.includes('git'); }),
        'Export & Import': tools.filter(function (t) { return t.name.includes('export') || t.name.includes('import'); })
    };
    return (<div className="flex-1 overflow-hidden flex flex-col">
      <div className="border-b border-border">
        <nav className="max-w-7xl mx-auto px-4">
          <div className="flex space-x-4">
            <button onClick={function () { return setActiveTab('tools'); }} className={"px-4 py-2 font-medium ".concat(activeTab === 'tools'
            ? 'text-primary border-b-2 border-primary'
            : 'text-muted-foreground hover:text-foreground')}>
              Available Tools
            </button>
            <button onClick={function () { return setActiveTab('analysis'); }} className={"px-4 py-2 font-medium ".concat(activeTab === 'analysis'
            ? 'text-primary border-b-2 border-primary'
            : 'text-muted-foreground hover:text-foreground')}>
              Competitor Analysis
            </button>
          </div>
        </nav>
      </div>

      <div className="flex-1 overflow-auto p-6">
        {activeTab === 'tools' ? (<div className="max-w-7xl mx-auto">
            <div className="flex items-center space-x-4 mb-6">
              <lucide_react_1.Wrench className="w-8 h-8 text-primary"/>
              <div>
                <h2 className="text-2xl font-bold">Tools & Utilities</h2>
                <p className="text-muted-foreground">
                  Powerful tools to enhance your workflow
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(toolCategories).map(function (_a) {
                var category = _a[0], tools = _a[1];
                return (<div key={category} className="card p-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
                    {category === 'Data Processing' && <lucide_react_1.Database className="w-5 h-5"/>}
                    {category === 'Search & Analysis' && <lucide_react_1.Search className="w-5 h-5"/>}
                    {category === 'Code & Development' && <lucide_react_1.Code className="w-5 h-5"/>}
                    {category === 'Export & Import' && <lucide_react_1.FileText className="w-5 h-5"/>}
                    <span>{category}</span>
                  </h3>
                  <div className="space-y-3">
                    {tools.map(function (tool) { return (<button key={tool.name} onClick={function () { return setSelectedTool(tool.name); }} className={"w-full p-3 rounded-lg transition-colors text-left ".concat(selectedTool === tool.name
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-secondary hover:bg-secondary/80')}>
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{tool.name}</span>
                          <lucide_react_1.Zap className="w-4 h-4 opacity-50"/>
                        </div>
                        <p className="text-sm mt-1 opacity-80">
                          {tool.description}
                        </p>
                      </button>); })}
                  </div>
                </div>);
            })}
            </div>

            {selectedTool && (<div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
                <div className="bg-card max-w-2xl w-full rounded-lg shadow-lg border border-border p-6">
                  <h3 className="text-lg font-semibold mb-4">
                    {(_a = tools.find(function (t) { return t.name === selectedTool; })) === null || _a === void 0 ? void 0 : _a.name}
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    {(_b = tools.find(function (t) { return t.name === selectedTool; })) === null || _b === void 0 ? void 0 : _b.description}
                  </p>
                  <div className="flex justify-end space-x-3">
                    <button onClick={function () { return setSelectedTool(null); }} className="px-4 py-2 text-muted-foreground hover:text-foreground">
                      Cancel
                    </button>
                    <button onClick={function () {
                    // Execute tool
                    setSelectedTool(null);
                }} className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90">
                      Execute Tool
                    </button>
                  </div>
                </div>
              </div>)}
          </div>) : (<CompetitorAnalysis_1.CompetitorAnalysis />)}
      </div>
    </div>);
}
