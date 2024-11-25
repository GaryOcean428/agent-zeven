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
exports.AnalysisParameters = AnalysisParameters;
var react_1 = require("react");
var lucide_react_1 = require("lucide-react");
function AnalysisParameters(_a) {
    var onAnalyze = _a.onAnalyze, isLoading = _a.isLoading;
    var _b = (0, react_1.useState)({
        industry: '',
        region: '',
        competitors: [''],
        criteria: defaultCriteria
    }), params = _b[0], setParams = _b[1];
    var addCompetitor = function () {
        setParams(function (prev) { return (__assign(__assign({}, prev), { competitors: __spreadArray(__spreadArray([], prev.competitors, true), [''], false) })); });
    };
    var removeCompetitor = function (index) {
        setParams(function (prev) { return (__assign(__assign({}, prev), { competitors: prev.competitors.filter(function (_, i) { return i !== index; }) })); });
    };
    var updateCompetitor = function (index, value) {
        setParams(function (prev) { return (__assign(__assign({}, prev), { competitors: prev.competitors.map(function (c, i) { return i === index ? value : c; }) })); });
    };
    var updateCriterionWeight = function (id, weight) {
        setParams(function (prev) { return (__assign(__assign({}, prev), { criteria: prev.criteria.map(function (c) {
                return c.id === id ? __assign(__assign({}, c), { weight: weight }) : c;
            }) })); });
    };
    var handleSubmit = function (e) {
        e.preventDefault();
        onAnalyze(params);
    };
    return (<form onSubmit={handleSubmit} className="card p-6 mb-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Industry</label>
          <input type="text" value={params.industry} onChange={function (e) { return setParams(function (prev) { return (__assign(__assign({}, prev), { industry: e.target.value })); }); }} placeholder="e.g., Software Development, Healthcare" className="input"/>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Region</label>
          <input type="text" value={params.region} onChange={function (e) { return setParams(function (prev) { return (__assign(__assign({}, prev), { region: e.target.value })); }); }} placeholder="e.g., North America, Global" className="input"/>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-medium">Competitors</label>
          <button type="button" onClick={addCompetitor} className="text-blue-400 hover:text-blue-300 p-1">
            <lucide_react_1.Plus className="w-4 h-4"/>
          </button>
        </div>
        <div className="space-y-2">
          {params.competitors.map(function (competitor, index) { return (<div key={index} className="flex items-center space-x-2">
              <input type="text" value={competitor} onChange={function (e) { return updateCompetitor(index, e.target.value); }} placeholder="Competitor name or URL" className="input"/>
              {params.competitors.length > 1 && (<button type="button" onClick={function () { return removeCompetitor(index); }} className="p-2 text-red-400 hover:text-red-300">
                  <lucide_react_1.Trash2 className="w-4 h-4"/>
                </button>)}
            </div>); })}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-medium">Analysis Criteria</label>
          <button type="button" className="text-blue-400 hover:text-blue-300 p-1">
            <lucide_react_1.SlidersHorizontal className="w-4 h-4"/>
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {params.criteria.map(function (criterion) { return (<div key={criterion.id} className="flex items-center space-x-4">
              <span className="text-sm flex-1">{criterion.label}</span>
              <input type="range" min="1" max="5" value={criterion.weight} onChange={function (e) { return updateCriterionWeight(criterion.id, parseInt(e.target.value)); }} className="w-24"/>
              <span className="text-sm w-4">{criterion.weight}</span>
            </div>); })}
        </div>
      </div>

      <div className="flex justify-end">
        <button type="submit" disabled={isLoading || !params.industry || !params.region || !params.competitors[0]} className="btn btn-primary inline-flex items-center space-x-2">
          {isLoading ? (<>
              <lucide_react_1.RefreshCw className="w-5 h-5 animate-spin"/>
              <span>Analyzing...</span>
            </>) : (<>
              <lucide_react_1.Search className="w-5 h-5"/>
              <span>Analyze Competitors</span>
            </>)}
        </button>
      </div>
    </form>);
}
var defaultCriteria = [
    { id: 'branding', label: 'Visual Design & Branding', weight: 3, category: 'branding' },
    { id: 'features', label: 'Feature Set & Capabilities', weight: 4, category: 'features' },
    { id: 'ux', label: 'User Experience', weight: 4, category: 'ux' },
    { id: 'technical', label: 'Technical Infrastructure', weight: 3, category: 'technical' },
    { id: 'marketing', label: 'Content & Marketing', weight: 3, category: 'marketing' },
    { id: 'mobile', label: 'Mobile & Cross-platform', weight: 4, category: 'mobile' },
    { id: 'market', label: 'Market Positioning', weight: 5, category: 'market' },
    { id: 'innovation', label: 'Innovation & R&D', weight: 4, category: 'innovation' }
];
