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
exports.CompetitorAnalysisTool = void 0;
var thought_logger_1 = require("../logging/thought-logger");
var web_data_tools_1 = require("./web-data-tools");
var CompetitorAnalysisTool = /** @class */ (function () {
    function CompetitorAnalysisTool() {
        this.webDataTools = web_data_tools_1.WebDataTools.getInstance();
    }
    CompetitorAnalysisTool.getInstance = function () {
        if (!CompetitorAnalysisTool.instance) {
            CompetitorAnalysisTool.instance = new CompetitorAnalysisTool();
        }
        return CompetitorAnalysisTool.instance;
    };
    CompetitorAnalysisTool.prototype.analyzeCompetitors = function (industry, region) {
        return __awaiter(this, void 0, void 0, function () {
            var competitors, report, csvData, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        thought_logger_1.thoughtLogger.log('plan', "Starting competitor analysis for ".concat(industry, " in ").concat(region));
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.fetchCompetitorData(industry, region)];
                    case 2:
                        competitors = _a.sent();
                        report = this.generateReport(competitors);
                        csvData = this.prepareCSVData(competitors);
                        thought_logger_1.thoughtLogger.log('success', "Completed competitor analysis for ".concat(industry));
                        return [2 /*return*/, {
                                success: true,
                                result: {
                                    report: report,
                                    csvData: csvData,
                                    competitors: competitors
                                }
                            }];
                    case 3:
                        error_1 = _a.sent();
                        thought_logger_1.thoughtLogger.log('error', "Competitor analysis failed: ".concat(error_1));
                        return [2 /*return*/, {
                                success: false,
                                error: error_1 instanceof Error ? error_1.message : 'Unknown error'
                            }];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    CompetitorAnalysisTool.prototype.fetchCompetitorData = function (industry, region) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                thought_logger_1.thoughtLogger.log('execution', 'Fetching competitor data from sources');
                // Example GTO competitors (in production, this would fetch from APIs/databases)
                return [2 /*return*/, [
                        {
                            name: "MEGT",
                            website: "https://www.megt.com.au",
                            location: "National",
                            services: ["Apprenticeships", "Traineeships", "RTO Services"],
                            pricing: {
                                hostEmployerRate: "$150-200/week",
                                trainingCost: "Government funded"
                            },
                            specializations: ["Trade", "Business", "Healthcare"],
                            lastUpdated: new Date().toISOString()
                        },
                        {
                            name: "MAS National",
                            website: "https://www.masnational.com.au",
                            location: "National",
                            services: ["Apprenticeships", "Traineeships", "Employment Services"],
                            pricing: {
                                hostEmployerRate: "$160-220/week",
                                trainingCost: "Government funded"
                            },
                            specializations: ["Manufacturing", "Hospitality", "Retail"],
                            lastUpdated: new Date().toISOString()
                        },
                        {
                            name: "Apprenticeship Support Australia",
                            website: "https://www.apprenticeshipsupport.com.au",
                            location: "National",
                            services: ["Apprenticeships", "Traineeships", "Business Advisory"],
                            pricing: {
                                hostEmployerRate: "$140-190/week",
                                trainingCost: "Government funded"
                            },
                            specializations: ["Construction", "Engineering", "Business"],
                            lastUpdated: new Date().toISOString()
                        }
                    ]];
            });
        });
    };
    CompetitorAnalysisTool.prototype.generateReport = function (competitors) {
        thought_logger_1.thoughtLogger.log('execution', 'Generating competitor analysis report');
        return "\n# Group Training Organisation (GTO) Competitor Analysis Report\n\n## Overview\nAnalysis of ".concat(competitors.length, " major GTOs operating in Australia.\n\n## Key Findings\n").concat(this.generateKeyFindings(competitors), "\n\n## Detailed Analysis\n").concat(this.generateDetailedAnalysis(competitors), "\n\n## Pricing Analysis\n").concat(this.generatePricingAnalysis(competitors), "\n\n## Market Opportunities\n").concat(this.generateOpportunities(competitors), "\n\nReport generated: ").concat(new Date().toLocaleDateString(), "\n    ").trim();
    };
    CompetitorAnalysisTool.prototype.generateKeyFindings = function (competitors) {
        var services = new Set(competitors.flatMap(function (c) { return c.services; }));
        var specializations = new Set(competitors.flatMap(function (c) { return c.specializations; }));
        return "\n- ".concat(competitors.length, " major GTOs analyzed\n- Core services: ").concat(Array.from(services).join(', '), "\n- Key specializations: ").concat(Array.from(specializations).join(', '), "\n- Price range for host employers: ").concat(this.getPriceRange(competitors), "\n    ").trim();
    };
    CompetitorAnalysisTool.prototype.generateDetailedAnalysis = function (competitors) {
        return competitors.map(function (c) { return "\n### ".concat(c.name, "\n- Website: ").concat(c.website, "\n- Location: ").concat(c.location, "\n- Services: ").concat(c.services.join(', '), "\n- Specializations: ").concat(c.specializations.join(', '), "\n").concat(c.pricing ? "- Host Employer Rate: ".concat(c.pricing.hostEmployerRate) : '', "\n    ").trim(); }).join('\n\n');
    };
    CompetitorAnalysisTool.prototype.generatePricingAnalysis = function (competitors) {
        var priceRange = this.getPriceRange(competitors);
        return "\nAverage host employer rates across analyzed GTOs range from ".concat(priceRange, ".\nMost GTOs offer government-funded training programs with additional support services.\n    ").trim();
    };
    CompetitorAnalysisTool.prototype.generateOpportunities = function (competitors) {
        return "\n1. Market gaps in specialized industry sectors\n2. Potential for competitive pricing strategies\n3. Opportunities for enhanced digital services\n4. Regional expansion possibilities\n    ".trim();
    };
    CompetitorAnalysisTool.prototype.getPriceRange = function (competitors) {
        var rates = competitors
            .filter(function (c) { var _a; return (_a = c.pricing) === null || _a === void 0 ? void 0 : _a.hostEmployerRate; })
            .map(function (c) { return c.pricing.hostEmployerRate; });
        return rates.length ? rates.join(' - ') : 'Pricing data not available';
    };
    CompetitorAnalysisTool.prototype.prepareCSVData = function (competitors) {
        return competitors.map(function (c) {
            var _a, _b;
            return ({
                Name: c.name,
                Website: c.website,
                Location: c.location,
                Services: c.services.join('; '),
                HostEmployerRate: ((_a = c.pricing) === null || _a === void 0 ? void 0 : _a.hostEmployerRate) || 'N/A',
                TrainingCost: ((_b = c.pricing) === null || _b === void 0 ? void 0 : _b.trainingCost) || 'N/A',
                Specializations: c.specializations.join('; '),
                LastUpdated: c.lastUpdated
            });
        });
    };
    return CompetitorAnalysisTool;
}());
exports.CompetitorAnalysisTool = CompetitorAnalysisTool;
