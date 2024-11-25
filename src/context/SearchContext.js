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
exports.SearchProvider = SearchProvider;
exports.useSearch = useSearch;
var react_1 = require("react");
var search_service_1 = require("../services/search-service");
var thought_logger_1 = require("../lib/logging/thought-logger");
var SearchContext = (0, react_1.createContext)(undefined);
function SearchProvider(_a) {
    var _this = this;
    var children = _a.children;
    var _b = (0, react_1.useState)([]), results = _b[0], setResults = _b[1];
    var _c = (0, react_1.useState)(false), isStreaming = _c[0], setIsStreaming = _c[1];
    var search = function (query) { return __awaiter(_this, void 0, void 0, function () {
        var searchResults_1, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setIsStreaming(true);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, 4, 5]);
                    thought_logger_1.thoughtLogger.log('execution', 'Starting search', { query: query });
                    return [4 /*yield*/, search_service_1.searchService.search(query)];
                case 2:
                    searchResults_1 = _a.sent();
                    setResults(function (prev) { return __spreadArray(__spreadArray([], prev, true), [{
                            success: true,
                            content: searchResults_1,
                            metadata: {
                                source: 'aggregated',
                                timestamp: new Date().toISOString(),
                                query: query
                            }
                        }], false); });
                    thought_logger_1.thoughtLogger.log('success', 'Search completed');
                    return [3 /*break*/, 5];
                case 3:
                    error_1 = _a.sent();
                    thought_logger_1.thoughtLogger.log('error', 'Search failed', { error: error_1 });
                    setResults(function (prev) { return __spreadArray(__spreadArray([], prev, true), [{
                            success: false,
                            content: error_1 instanceof Error ? error_1.message : 'Search failed',
                            metadata: {
                                source: 'error',
                                timestamp: new Date().toISOString(),
                                query: query
                            }
                        }], false); });
                    return [3 /*break*/, 5];
                case 4:
                    setIsStreaming(false);
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    var clearResults = function () {
        setResults([]);
        thought_logger_1.thoughtLogger.log('success', 'Search results cleared');
    };
    return (<SearchContext.Provider value={{ results: results, isStreaming: isStreaming, search: search, clearResults: clearResults }}>
      {children}
    </SearchContext.Provider>);
}
function useSearch() {
    var context = (0, react_1.useContext)(SearchContext);
    if (!context) {
        throw new Error('useSearch must be used within a SearchProvider');
    }
    return context;
}
