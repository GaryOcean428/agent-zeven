"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComparisonMatrix = ComparisonMatrix;
var react_1 = require("react");
var lucide_react_1 = require("lucide-react");
function ComparisonMatrix(_a) {
    var competitors = _a.competitors;
    var categories = [
        'Features & Capabilities',
        'User Experience',
        'Technical Infrastructure',
        'Mobile Support',
        'Marketing & Content',
        'Customer Support',
        'Pricing & Plans',
        'Integration Options'
    ];
    return (<div className="card overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-700">
            <th className="p-4 text-left font-medium">Category</th>
            {competitors.map(function (competitor) { return (<th key={competitor.id} className="p-4 text-left font-medium">
                {competitor.name}
              </th>); })}
          </tr>
        </thead>
        <tbody>
          {categories.map(function (category, i) { return (<tr key={category} className={i % 2 === 0 ? 'bg-gray-800/50' : ''}>
              <td className="p-4 font-medium">{category}</td>
              {competitors.map(function (competitor) { return (<td key={competitor.id} className="p-4">
                  <div className="flex items-center space-x-2">
                    {getComparisonIcon(competitor.scores[category.toLowerCase()])}
                    <span>{getScoreLabel(competitor.scores[category.toLowerCase()])}</span>
                  </div>
                </td>); })}
            </tr>); })}
        </tbody>
      </table>
    </div>);
}
function getComparisonIcon(score) {
    if (score >= 8) {
        return <lucide_react_1.Check className="w-4 h-4 text-green-400"/>;
    }
    if (score >= 5) {
        return <lucide_react_1.Minus className="w-4 h-4 text-yellow-400"/>;
    }
    return <lucide_react_1.X className="w-4 h-4 text-red-400"/>;
}
function getScoreLabel(score) {
    if (score >= 8)
        return 'Excellent';
    if (score >= 6)
        return 'Good';
    if (score >= 4)
        return 'Average';
    return 'Poor';
}
