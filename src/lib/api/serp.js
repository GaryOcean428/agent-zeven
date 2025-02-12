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
exports.SerpAPI = void 0;
var config_1 = require("../config");
var AppError_1 = require("../errors/AppError");
var SerpAPI = /** @class */ (function () {
    function SerpAPI() {
        this.apiKey = config_1.config.apiKeys.serp;
        this.baseUrl = config_1.config.services.serp.baseUrl;
        if (!this.apiKey) {
            console.warn('SERP API key not configured');
        }
    }
    SerpAPI.prototype.search = function (query) {
        return __awaiter(this, void 0, void 0, function () {
            var url, response, data, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.apiKey) {
                            throw new AppError_1.AppError('SERP API key not configured', 'API_ERROR');
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        url = new URL(this.baseUrl);
                        url.searchParams.append('api_key', this.apiKey);
                        url.searchParams.append('q', query);
                        url.searchParams.append('num', config_1.config.services.serp.resultsPerPage.toString());
                        return [4 /*yield*/, fetch(url.toString())];
                    case 2:
                        response = _a.sent();
                        if (!response.ok) {
                            throw new AppError_1.AppError("SERP API request failed with status ".concat(response.status), 'API_ERROR');
                        }
                        return [4 /*yield*/, response.json()];
                    case 3:
                        data = _a.sent();
                        return [2 /*return*/, this.formatSearchResults(data.organic_results || [])];
                    case 4:
                        error_1 = _a.sent();
                        if (error_1 instanceof AppError_1.AppError)
                            throw error_1;
                        throw new AppError_1.AppError('Failed to communicate with SERP API', 'API_ERROR', error_1);
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    SerpAPI.prototype.formatSearchResults = function (results) {
        if (!results.length) {
            return 'No results found.';
        }
        return results.map(function (result) {
            var title = result.title || 'Untitled';
            var snippet = result.snippet || 'No description available.';
            return "**".concat(title, "**\n").concat(snippet, "\n");
        }).join('\n');
    };
    return SerpAPI;
}());
exports.SerpAPI = SerpAPI;
