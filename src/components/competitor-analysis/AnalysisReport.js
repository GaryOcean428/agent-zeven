"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalysisReport = AnalysisReport;
var react_1 = require("react");
var lucide_react_1 = require("lucide-react");
var react_markdown_1 = require("react-markdown");
function AnalysisReport(_a) {
    var report = _a.report;
    var handleDownload = function () {
        var blob = new Blob([report], { type: 'text/markdown' });
        var url = URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = "competitor-analysis-".concat(new Date().toISOString().split('T')[0], ".md");
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };
    return (<div className="card p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Detailed Analysis Report</h2>
        <button onClick={handleDownload} className="btn btn-secondary inline-flex items-center space-x-2">
          <lucide_react_1.Download className="w-4 h-4"/>
          <span>Download Report</span>
        </button>
      </div>

      <div className="prose prose-invert max-w-none">
        <react_markdown_1.default>{report}</react_markdown_1.default>
      </div>
    </div>);
}
