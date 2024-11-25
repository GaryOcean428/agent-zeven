"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompetitorAnalysis = CompetitorAnalysis;
var react_1 = require("react");
var lucide_react_1 = require("lucide-react");
var tool_registry_1 = require("../lib/tools/tool-registry");
var DataTable_1 = require("./DataTable");
var react_markdown_1 = require("react-markdown");
function CompetitorAnalysis() {
    var _this = this;
    var _a = (0, react_1.useState)(false), isLoading = _a[0], setIsLoading = _a[1];
    var _b = (0, react_1.useState)(''), report = _b[0], setReport = _b[1];
    var _c = (0, react_1.useState)([]), csvData = _c[0], setCsvData = _c[1];
    var _d = (0, react_1.useState)({
        industry: '',
        region: '',
        criteria: ['market_share', 'pricing', 'services', 'technology']
    }), params = _d[0], setParams = _d[1];
    var analysisCriteria = [
        { id: 'market_share', label: 'Market Share' },
        { id: 'pricing', label: 'Pricing Strategy' },
        { id: 'services', label: 'Services Offered' },
        { id: 'technology', label: 'Technology Stack' },
        { id: 'customer_base', label: 'Customer Base' },
        { id: 'growth', label: 'Growth Rate' },
        { id: 'reputation', label: 'Brand Reputation' },
        { id: 'innovation', label: 'Innovation' }
    ];
    var analyzeCompetitors = function () { return __awaiter(_this, void 0, void 0, function () {
        var result, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!params.industry || !params.region)
                        return [2 /*return*/];
                    setIsLoading(true);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, 4, 5]);
                    return [4 /*yield*/, tool_registry_1.toolRegistry.executeTool('analyze-competitors', params.industry, params.region, params.criteria)];
                case 2:
                    result = _a.sent();
                    if (result.success && result.result) {
                        setReport(result.result.report);
                        setCsvData(result.result.csvData);
                    }
                    return [3 /*break*/, 5];
                case 3:
                    error_1 = _a.sent();
                    console.error('Analysis failed:', error_1);
                    return [3 /*break*/, 5];
                case 4:
                    setIsLoading(false);
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    var toggleCriterion = function (criterionId) {
        setParams(function (prev) { return (__assign(__assign({}, prev), { criteria: prev.criteria.includes(criterionId)
                ? prev.criteria.filter(function (c) { return c !== criterionId; })
                : __spreadArray(__spreadArray([], prev.criteria, true), [criterionId], false) })); });
    };
    return (<div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Competitor Analysis</h1>
          <p className="text-gray-400 mt-1">
            Analyze competitors in your industry using AI-powered insights
          </p>
        </div>
        <button onClick={analyzeCompetitors} disabled={isLoading || !params.industry || !params.region} className="btn btn-primary inline-flex items-center space-x-2">
          {isLoading ? (<>
              <lucide_react_1.RefreshCw className="w-5 h-5 animate-spin"/>
              <span>Analyzing...</span>
            </>) : (<>
              <lucide_react_1.Search className="w-5 h-5"/>
              <span>Analyze Competitors</span>
            </>)}
        </button>
      </div>

      {/* Analysis Parameters */}
      <div className="card p-6 mb-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Industry</label>
            <input type="text" value={params.industry} onChange={function (e) { return setParams(function (prev) { return (__assign(__assign({}, prev), { industry: e.target.value })); }); }} placeholder="e.g., Software Development, Healthcare, Retail" className="input"/>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Region</label>
            <input type="text" value={params.region} onChange={function (e) { return setParams(function (prev) { return (__assign(__assign({}, prev), { region: e.target.value })); }); }} placeholder="e.g., North America, Europe, Global" className="input"/>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Analysis Criteria
          </label>
          <div className="flex flex-wrap gap-2">
            {analysisCriteria.map(function (criterion) { return (<button key={criterion.id} onClick={function () { return toggleCriterion(criterion.id); }} className={"inline-flex items-center px-3 py-1 rounded-full text-sm transition-colors ".concat(params.criteria.includes(criterion.id)
                ? 'bg-blue-600 text-white'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700')}>
                <lucide_react_1.Filter className="w-3 h-3 mr-1"/>
                {criterion.label}
              </button>); })}
          </div>
        </div>
      </div>

      {/* Analysis Results */}
      {report && (<div className="space-y-6">
          <div className="card p-6">
            <div className="prose prose-invert max-w-none">
              <react_markdown_1.default>{report}</react_markdown_1.default>
            </div>
          </div>

          {csvData.length > 0 && (<div className="card p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Competitor Data</h2>
                <button onClick={function () {
                    // Export functionality
                }} className="btn btn-secondary inline-flex items-center space-x-2">
                  <lucide_react_1.Download className="w-4 h-4"/>
                  <span>Export CSV</span>
                </button>
              </div>
              <DataTable_1.DataTable data={csvData}/>
            </div>)}
        </div>)}
    </div>);
}
