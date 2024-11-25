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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchPanel = SearchPanel;
var react_1 = require("react");
var lucide_react_1 = require("lucide-react");
var SearchContext_1 = require("../../context/SearchContext");
var SearchResults_1 = require("../SearchResults");
var framer_motion_1 = require("framer-motion");
var Toggle_1 = require("../ui/Toggle");
function SearchPanel() {
    var _this = this;
    var _a = (0, react_1.useState)(''), query = _a[0], setQuery = _a[1];
    var _b = (0, react_1.useState)(false), isSearching = _b[0], setIsSearching = _b[1];
    var _c = (0, react_1.useState)(false), showFilters = _c[0], setShowFilters = _c[1];
    var _d = (0, react_1.useState)({
        includeWeb: true,
        includeMemory: true,
        maxResults: 10
    }), filters = _d[0], setFilters = _d[1];
    var resultsEndRef = (0, react_1.useRef)(null);
    var _e = (0, SearchContext_1.useSearch)(), search = _e.search, results = _e.results, isStreaming = _e.isStreaming;
    var handleSearch = function (e) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    e.preventDefault();
                    if (!query.trim() || isSearching)
                        return [2 /*return*/];
                    setIsSearching(true);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, , 3, 4]);
                    return [4 /*yield*/, search(query, filters)];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    setIsSearching(false);
                    return [7 /*endfinally*/];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    (0, react_1.useEffect)(function () {
        var _a;
        if (results.length > 0) {
            (_a = resultsEndRef.current) === null || _a === void 0 ? void 0 : _a.scrollIntoView({ behavior: 'smooth' });
        }
    }, [results]);
    return (<div className="flex-1 flex flex-col">
      {/* Search Header */}
      <header className="bg-background/50 backdrop-blur-sm border-b border-border p-4">
        <div className="max-w-4xl mx-auto space-y-4">
          <form onSubmit={handleSearch}>
            <div className="relative flex items-center">
              <input type="text" value={query} onChange={function (e) { return setQuery(e.target.value); }} placeholder="Search anything..." className="w-full bg-secondary text-foreground rounded-lg pl-12 pr-12 py-3 focus:outline-none focus:ring-2 focus:ring-primary" disabled={isSearching}/>
              <lucide_react_1.Search className="absolute left-4 w-5 h-5 text-muted-foreground"/>
              <button type="submit" disabled={isSearching || !query.trim()} className="absolute right-4 text-primary hover:text-primary/80 disabled:opacity-50">
                <lucide_react_1.Sparkles className="w-5 h-5"/>
              </button>
            </div>
          </form>

          {/* Filters */}
          <div className="flex items-center justify-between">
            <button onClick={function () { return setShowFilters(!showFilters); }} className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-2">
              <lucide_react_1.Filter className="w-4 h-4"/>
              {showFilters ? 'Hide Filters' : 'Show Filters'}
            </button>
            <button className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-2">
              <lucide_react_1.History className="w-4 h-4"/>
              Search History
            </button>
          </div>

          <framer_motion_1.AnimatePresence>
            {showFilters && (<framer_motion_1.motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="space-y-2 overflow-hidden">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Include Web Results</span>
                  <Toggle_1.Toggle checked={filters.includeWeb} onCheckedChange={function (checked) {
                return setFilters(function (prev) { return (__assign(__assign({}, prev), { includeWeb: checked })); });
            }}/>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Include Memory</span>
                  <Toggle_1.Toggle checked={filters.includeMemory} onCheckedChange={function (checked) {
                return setFilters(function (prev) { return (__assign(__assign({}, prev), { includeMemory: checked })); });
            }}/>
                </div>
                <div>
                  <label className="block text-sm mb-1">Max Results</label>
                  <select value={filters.maxResults} onChange={function (e) { return setFilters(function (prev) { return (__assign(__assign({}, prev), { maxResults: parseInt(e.target.value) })); }); }} className="w-full bg-secondary rounded-lg px-3 py-2 text-sm">
                    <option value={5}>5 results</option>
                    <option value={10}>10 results</option>
                    <option value={20}>20 results</option>
                    <option value={50}>50 results</option>
                  </select>
                </div>
              </framer_motion_1.motion.div>)}
          </framer_motion_1.AnimatePresence>
        </div>
      </header>

      {/* Search Results */}
      <div className="flex-1 overflow-auto p-4">
        <div className="max-w-4xl mx-auto space-y-6">
          <framer_motion_1.AnimatePresence mode="wait">
            {isSearching ? (<framer_motion_1.motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="flex items-center justify-center py-12">
                <div className="flex flex-col items-center space-y-4">
                  <div className="relative">
                    <div className="w-12 h-12 border-4 border-primary/30 rounded-full animate-spin border-t-primary"/>
                    <lucide_react_1.Sparkles className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 text-primary"/>
                  </div>
                  <p className="text-muted-foreground">Searching...</p>
                </div>
              </framer_motion_1.motion.div>) : (<SearchResults_1.SearchResults />)}
          </framer_motion_1.AnimatePresence>
          <div ref={resultsEndRef}/>
        </div>
      </div>
    </div>);
}
