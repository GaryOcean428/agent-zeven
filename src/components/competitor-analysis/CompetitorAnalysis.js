"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompetitorAnalysis = CompetitorAnalysis;
var react_1 = require("react");
var AnalysisParameters_1 = require("./AnalysisParameters");
var AnalysisDashboard_1 = require("./AnalysisDashboard");
var AnalysisReport_1 = require("./AnalysisReport");
var ComparisonMatrix_1 = require("./ComparisonMatrix");
var StrategicInsights_1 = require("./StrategicInsights");
var useCompetitorAnalysis_1 = require("../../hooks/useCompetitorAnalysis");
function CompetitorAnalysis() {
    var _this = this;
    var _a = (0, useCompetitorAnalysis_1.useCompetitorAnalysis)(), analyze = _a.analyze, isLoading = _a.isLoading, report = _a.report, competitors = _a.competitors, insights = _a.insights, metrics = _a.metrics;
    var _b = (0, react_1.useState)('dashboard'), activeTab = _b[0], setActiveTab = _b[1];
    var handleAnalysis = function (params) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, analyze(params)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); };
    var renderContent = function () {
        switch (activeTab) {
            case 'dashboard':
                return <AnalysisDashboard_1.AnalysisDashboard competitors={competitors} metrics={metrics}/>;
            case 'report':
                return <AnalysisReport_1.AnalysisReport report={report}/>;
            case 'matrix':
                return <ComparisonMatrix_1.ComparisonMatrix competitors={competitors}/>;
            case 'insights':
                return <StrategicInsights_1.StrategicInsights insights={insights}/>;
            default:
                return null;
        }
    };
    return (<div className="p-4 sm:p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Competitor Analysis</h1>
        <p className="text-gray-400">
          Comprehensive competitor analysis and strategic insights
        </p>
      </div>

      <AnalysisParameters_1.AnalysisParameters onAnalyze={handleAnalysis} isLoading={isLoading}/>

      {(competitors.length > 0 || report) && (<>
          <div className="flex flex-wrap gap-2 mb-6 bg-gray-800/50 p-2 rounded-lg backdrop-blur-sm">
            {[
                { id: 'dashboard', label: 'Dashboard' },
                { id: 'report', label: 'Detailed Report' },
                { id: 'matrix', label: 'Comparison Matrix' },
                { id: 'insights', label: 'Strategic Insights' }
            ].map(function (tab) { return (<button key={tab.id} onClick={function () { return setActiveTab(tab.id); }} className={"flex-1 min-w-[120px] px-4 py-2 rounded-lg text-sm font-medium transition-colors ".concat(activeTab === tab.id
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-gray-700')}>
                {tab.label}
              </button>); })}
          </div>

          <div className="space-y-6 overflow-x-auto">
            {renderContent()}
          </div>
        </>)}
    </div>);
}
