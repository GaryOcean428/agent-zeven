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
exports.WebDataTools = void 0;
var thought_logger_1 = require("../logging/thought-logger");
var AppError_1 = require("../errors/AppError");
var WebDataTools = /** @class */ (function () {
    function WebDataTools() {
    }
    WebDataTools.getInstance = function () {
        if (!WebDataTools.instance) {
            WebDataTools.instance = new WebDataTools();
        }
        return WebDataTools.instance;
    };
    WebDataTools.prototype.scrapeGitHubLinks = function (url) {
        return __awaiter(this, void 0, void 0, function () {
            var response, html, parser, doc, links, error_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        thought_logger_1.thoughtLogger.log('execution', "Scraping GitHub links from ".concat(url));
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, fetch(url)];
                    case 2:
                        response = _a.sent();
                        return [4 /*yield*/, response.text()];
                    case 3:
                        html = _a.sent();
                        parser = new DOMParser();
                        doc = parser.parseFromString(html, 'text/html');
                        links = Array.from(doc.querySelectorAll('a[href*="github.com"]'))
                            .map(function (link) {
                            var _a;
                            return ({
                                title: ((_a = link.textContent) === null || _a === void 0 ? void 0 : _a.trim()) || '',
                                url: link.getAttribute('href') || '',
                                category: _this.findCategory(link)
                            });
                        })
                            .filter(function (link) { return link.url.includes('github.com') && !link.url.includes('github.com/search'); });
                        thought_logger_1.thoughtLogger.log('success', "Found ".concat(links.length, " repository links"));
                        return [2 /*return*/, links];
                    case 4:
                        error_1 = _a.sent();
                        thought_logger_1.thoughtLogger.log('error', 'Failed to scrape GitHub links', { error: error_1 });
                        throw new AppError_1.AppError('Failed to scrape GitHub links', 'SCRAPING_ERROR');
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    WebDataTools.prototype.findCategory = function (link) {
        var _a;
        // Find the nearest heading element
        var element = link.parentElement;
        while (element) {
            var prevSibling = element.previousElementSibling;
            if (prevSibling === null || prevSibling === void 0 ? void 0 : prevSibling.tagName.match(/^H[1-6]$/)) {
                return ((_a = prevSibling.textContent) === null || _a === void 0 ? void 0 : _a.trim()) || 'Uncategorized';
            }
            element = element.parentElement;
        }
        return 'Uncategorized';
    };
    WebDataTools.prototype.exportToCSV = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var headers_1, csvContent;
            var _this = this;
            return __generator(this, function (_a) {
                thought_logger_1.thoughtLogger.log('execution', 'Exporting data to CSV');
                try {
                    if (!Array.isArray(data)) {
                        throw new AppError_1.AppError('Data must be an array', 'VALIDATION_ERROR');
                    }
                    if (data.length === 0) {
                        throw new AppError_1.AppError('Data array is empty', 'VALIDATION_ERROR');
                    }
                    headers_1 = Object.keys(data[0]);
                    csvContent = __spreadArray([
                        headers_1.join(',')
                    ], data.map(function (row) {
                        return headers_1.map(function (header) {
                            return _this.formatCSVValue(row[header]);
                        }).join(',');
                    }), true).join('\n');
                    thought_logger_1.thoughtLogger.log('success', 'Successfully created CSV content');
                    return [2 /*return*/, csvContent];
                }
                catch (error) {
                    thought_logger_1.thoughtLogger.log('error', "Failed to create CSV: ".concat(error));
                    throw error instanceof AppError_1.AppError ? error : new AppError_1.AppError('Failed to create CSV', 'EXPORT_ERROR');
                }
                return [2 /*return*/];
            });
        });
    };
    WebDataTools.prototype.formatCSVValue = function (value) {
        if (value === null || value === undefined) {
            return '';
        }
        var stringValue = String(value);
        // Escape quotes and wrap in quotes if necessary
        if (stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n')) {
            return "\"".concat(stringValue.replace(/"/g, '""'), "\"");
        }
        return stringValue;
    };
    return WebDataTools;
}());
exports.WebDataTools = WebDataTools;
