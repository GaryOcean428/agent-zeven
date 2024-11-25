"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StrategicInsights = StrategicInsights;
var react_1 = require("react");
var lucide_react_1 = require("lucide-react");
function StrategicInsights(_a) {
    var insights = _a.insights;
    var getImpactColor = function (impact) {
        switch (impact) {
            case 'high': return 'text-red-400';
            case 'medium': return 'text-yellow-400';
            case 'low': return 'text-green-400';
            default: return 'text-gray-400';
        }
    };
    return (<div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {insights.map(function (insight, index) { return (<div key={index} className="card p-6 space-y-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-600/10 rounded-lg">
                  <lucide_react_1.TrendingUp className="w-5 h-5 text-blue-400"/>
                </div>
                <h3 className="font-medium">{insight.title}</h3>
              </div>
              <span className={"text-sm ".concat(getImpactColor(insight.impact))}>
                {insight.impact.toUpperCase()}
              </span>
            </div>

            <p className="text-sm text-gray-400">{insight.description}</p>

            <div className="pt-4 border-t border-gray-700">
              <div className="flex items-start space-x-2">
                <lucide_react_1.Lightbulb className="w-4 h-4 text-yellow-400 mt-1 flex-shrink-0"/>
                <p className="text-sm">{insight.recommendation}</p>
              </div>
            </div>

            {insight.metrics && (<div className="grid grid-cols-2 gap-4 pt-4">
                {Object.entries(insight.metrics).map(function (_a) {
                    var key = _a[0], value = _a[1];
                    return (<div key={key}>
                    <div className="text-sm text-gray-400">{key}</div>
                    <div className="text-lg font-medium">{value}</div>
                  </div>);
                })}
              </div>)}
          </div>); })}
      </div>
    </div>);
}
