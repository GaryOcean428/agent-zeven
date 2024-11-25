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
exports.toolRegistry = void 0;
var AppError_1 = require("../errors/AppError");
var web_data_tools_1 = require("./web-data-tools");
var github_tools_1 = require("./github-tools");
var competitor_analysis_1 = require("./competitor-analysis");
var thought_logger_1 = require("../logging/thought-logger");
var ToolRegistry = /** @class */ (function () {
    function ToolRegistry() {
        this.tools = new Map();
        this.webDataTools = web_data_tools_1.WebDataTools.getInstance();
        this.githubTools = github_tools_1.GitHubTools.getInstance();
        this.competitorAnalysisTool = competitor_analysis_1.CompetitorAnalysisTool.getInstance();
        this.registerDefaultTools();
    }
    ToolRegistry.getInstance = function () {
        if (!ToolRegistry.instance) {
            ToolRegistry.instance = new ToolRegistry();
        }
        return ToolRegistry.instance;
    };
    ToolRegistry.prototype.registerDefaultTools = function () {
        var _this = this;
        try {
            // Register GitHub tools
            this.githubTools.getTools().forEach(function (tool) { return _this.register(tool); });
            // Register web data tools
            this.register({
                name: 'scrape-github-links',
                description: 'Scrape repository links from a GitHub page and export to CSV',
                execute: function (url) { return __awaiter(_this, void 0, void 0, function () {
                    var links, csv, error_1;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                thought_logger_1.thoughtLogger.log('plan', "Starting GitHub scraping for ".concat(url));
                                _a.label = 1;
                            case 1:
                                _a.trys.push([1, 4, , 5]);
                                return [4 /*yield*/, this.webDataTools.scrapeGitHubLinks(url)];
                            case 2:
                                links = _a.sent();
                                return [4 /*yield*/, this.webDataTools.exportToCSV(links)];
                            case 3:
                                csv = _a.sent();
                                return [2 /*return*/, {
                                        success: true,
                                        result: {
                                            linkCount: links.length,
                                            csv: csv
                                        }
                                    }];
                            case 4:
                                error_1 = _a.sent();
                                return [2 /*return*/, {
                                        success: false,
                                        error: error_1 instanceof Error ? error_1.message : 'Failed to scrape GitHub links'
                                    }];
                            case 5: return [2 /*return*/];
                        }
                    });
                }); }
            });
            // Register competitor analysis tool
            this.register({
                name: 'analyze-competitors',
                description: 'Analyze competitors in a specific industry and region',
                execute: function (industry, region) { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        thought_logger_1.thoughtLogger.log('plan', "Starting competitor analysis for ".concat(industry, " in ").concat(region));
                        return [2 /*return*/, this.competitorAnalysisTool.analyzeCompetitors(industry, region)];
                    });
                }); }
            });
            thought_logger_1.thoughtLogger.log('success', 'Default tools registered successfully');
        }
        catch (error) {
            thought_logger_1.thoughtLogger.log('error', 'Failed to register default tools', { error: error });
            throw new AppError_1.ToolError('Failed to register default tools', error);
        }
    };
    ToolRegistry.prototype.register = function (tool) {
        try {
            if (!tool.name || !tool.execute) {
                throw new AppError_1.ToolError('Invalid tool configuration');
            }
            this.tools.set(tool.name, tool);
            thought_logger_1.thoughtLogger.log('success', "Tool registered: ".concat(tool.name));
        }
        catch (error) {
            thought_logger_1.thoughtLogger.log('error', "Failed to register tool: ".concat(tool.name), { error: error });
            throw new AppError_1.ToolError("Failed to register tool: ".concat(tool.name), error);
        }
    };
    ToolRegistry.prototype.executeTool = function (name) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return __awaiter(this, void 0, void 0, function () {
            var tool, error, result, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        tool = this.tools.get(name);
                        if (!tool) {
                            error = "Tool \"".concat(name, "\" not found");
                            thought_logger_1.thoughtLogger.log('error', error);
                            return [2 /*return*/, {
                                    success: false,
                                    error: error
                                }];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        thought_logger_1.thoughtLogger.log('execution', "Executing tool: ".concat(name), { args: args });
                        return [4 /*yield*/, tool.execute.apply(tool, args)];
                    case 2:
                        result = _a.sent();
                        thought_logger_1.thoughtLogger.log('success', "Tool execution completed: ".concat(name));
                        return [2 /*return*/, result];
                    case 3:
                        error_2 = _a.sent();
                        thought_logger_1.thoughtLogger.log('error', "Tool execution failed: ".concat(name), { error: error_2 });
                        return [2 /*return*/, {
                                success: false,
                                error: error_2 instanceof Error ? error_2.message : 'Unknown error'
                            }];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ToolRegistry.prototype.getTools = function () {
        return Array.from(this.tools.values());
    };
    return ToolRegistry;
}());
// Create and export the singleton instance
exports.toolRegistry = ToolRegistry.getInstance();
