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
exports.GitHubScraper = void 0;
var thought_logger_1 = require("../logging/thought-logger");
var AppError_1 = require("../errors/AppError");
var web_data_tools_1 = require("./web-data-tools");
var GitHubScraper = /** @class */ (function () {
    function GitHubScraper() {
        this.webDataTools = web_data_tools_1.WebDataTools.getInstance();
    }
    GitHubScraper.getInstance = function () {
        if (!GitHubScraper.instance) {
            GitHubScraper.instance = new GitHubScraper();
        }
        return GitHubScraper.instance;
    };
    GitHubScraper.prototype.scrapeRepoLinks = function (url) {
        return __awaiter(this, void 0, void 0, function () {
            var response, html, parser, doc, links_1, currentCategory_1, content, elements, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        thought_logger_1.thoughtLogger.log('execution', "Scraping GitHub repo links from ".concat(url));
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, fetch(url)];
                    case 2:
                        response = _a.sent();
                        if (!response.ok) {
                            throw new AppError_1.AppError("Failed to fetch GitHub page: ".concat(response.statusText), 'API_ERROR');
                        }
                        return [4 /*yield*/, response.text()];
                    case 3:
                        html = _a.sent();
                        parser = new DOMParser();
                        doc = parser.parseFromString(html, 'text/html');
                        links_1 = [];
                        currentCategory_1 = '';
                        content = doc.querySelector('#readme');
                        if (!content) {
                            throw new AppError_1.AppError('No README content found', 'PARSING_ERROR');
                        }
                        elements = content.querySelectorAll('h1, h2, h3, li');
                        elements.forEach(function (element) {
                            var _a, _b, _c;
                            if (element.tagName.toLowerCase().startsWith('h')) {
                                currentCategory_1 = ((_a = element.textContent) === null || _a === void 0 ? void 0 : _a.trim()) || '';
                            }
                            else if (element.tagName.toLowerCase() === 'li') {
                                var link = element.querySelector('a');
                                if (link && link.href.includes('github.com')) {
                                    links_1.push({
                                        name: ((_b = link.textContent) === null || _b === void 0 ? void 0 : _b.trim()) || '',
                                        url: link.href,
                                        description: ((_c = element.textContent) === null || _c === void 0 ? void 0 : _c.replace(link.textContent || '', '').trim()) || '',
                                        category: currentCategory_1
                                    });
                                }
                            }
                        });
                        thought_logger_1.thoughtLogger.log('success', "Found ".concat(links_1.length, " repository links"));
                        return [2 /*return*/, links_1];
                    case 4:
                        error_1 = _a.sent();
                        thought_logger_1.thoughtLogger.log('error', 'Failed to scrape GitHub links', { error: error_1 });
                        throw error_1 instanceof AppError_1.AppError ? error_1 : new AppError_1.AppError('Failed to scrape GitHub links', 'SCRAPING_ERROR');
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    GitHubScraper.prototype.exportToCSV = function (links) {
        return __awaiter(this, void 0, void 0, function () {
            var headers, rows, csvContent, blob, url, link;
            var _this = this;
            return __generator(this, function (_a) {
                thought_logger_1.thoughtLogger.log('execution', 'Generating CSV export');
                try {
                    headers = ['Name', 'URL', 'Description', 'Category'];
                    rows = __spreadArray([
                        headers.join(',')
                    ], links.map(function (link) { return [
                        _this.escapeCSV(link.name),
                        _this.escapeCSV(link.url),
                        _this.escapeCSV(link.description),
                        _this.escapeCSV(link.category)
                    ].join(','); }), true);
                    csvContent = rows.join('\n');
                    blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
                    url = URL.createObjectURL(blob);
                    link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', "github_repos_".concat(Date.now(), ".csv"));
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    URL.revokeObjectURL(url);
                    thought_logger_1.thoughtLogger.log('success', 'CSV export completed', {
                        rowCount: links.length
                    });
                    return [2 /*return*/, csvContent];
                }
                catch (error) {
                    thought_logger_1.thoughtLogger.log('error', 'Failed to export CSV', { error: error });
                    throw new AppError_1.AppError('Failed to export CSV', 'EXPORT_ERROR');
                }
                return [2 /*return*/];
            });
        });
    };
    GitHubScraper.prototype.escapeCSV = function (str) {
        if (!str)
            return '""';
        var escaped = str.replace(/"/g, '""');
        return "\"".concat(escaped, "\"");
    };
    return GitHubScraper;
}());
exports.GitHubScraper = GitHubScraper;
