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
exports.CodespaceClient = void 0;
var thought_logger_1 = require("../logging/thought-logger");
var AppError_1 = require("../errors/AppError");
var github_client_1 = require("./github-client");
var CodespaceClient = /** @class */ (function () {
    function CodespaceClient() {
        this.githubClient = github_client_1.GitHubClient.getInstance();
    }
    CodespaceClient.getInstance = function () {
        if (!CodespaceClient.instance) {
            CodespaceClient.instance = new CodespaceClient();
        }
        return CodespaceClient.instance;
    };
    CodespaceClient.prototype.verifyCodespaceAccess = function () {
        return __awaiter(this, void 0, void 0, function () {
            var isGitHubConnected, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.githubClient.verifyConnection()];
                    case 1:
                        isGitHubConnected = _a.sent();
                        if (!isGitHubConnected) {
                            thought_logger_1.thoughtLogger.log('warning', 'GitHub connection required for Codespace access');
                            return [2 /*return*/, false];
                        }
                        thought_logger_1.thoughtLogger.log('success', 'Codespace access verified');
                        return [2 /*return*/, true];
                    case 2:
                        error_1 = _a.sent();
                        thought_logger_1.thoughtLogger.log('error', 'Failed to verify Codespace access', { error: error_1 });
                        return [2 /*return*/, false];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    CodespaceClient.prototype.getCurrentCodespaceInfo = function () {
        return __awaiter(this, void 0, void 0, function () {
            var data, error_2;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.githubClient.octokit.rest.codespaces.get({
                                codespace_name: import.meta.env.CODESPACE_NAME || ''
                            })];
                    case 1:
                        data = (_c.sent()).data;
                        return [2 /*return*/, {
                                name: data.name,
                                repository: (_a = data.repository) === null || _a === void 0 ? void 0 : _a.full_name,
                                branch: (_b = data.git_status) === null || _b === void 0 ? void 0 : _b.ref,
                                environment: data.environment
                            }];
                    case 2:
                        error_2 = _c.sent();
                        throw new AppError_1.AppError('Failed to get Codespace info', 'CODESPACE_ERROR', error_2);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    CodespaceClient.prototype.syncWithRepository = function () {
        return __awaiter(this, void 0, void 0, function () {
            var info, _a, owner, repo, error_3;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.getCurrentCodespaceInfo()];
                    case 1:
                        info = _b.sent();
                        if (!info.repository) {
                            throw new AppError_1.AppError('No repository associated with Codespace', 'CODESPACE_ERROR');
                        }
                        _a = info.repository.split('/'), owner = _a[0], repo = _a[1];
                        return [4 /*yield*/, this.githubClient.getRepository(owner, repo)];
                    case 2:
                        _b.sent();
                        thought_logger_1.thoughtLogger.log('success', 'Synced with repository successfully');
                        return [3 /*break*/, 4];
                    case 3:
                        error_3 = _b.sent();
                        throw new AppError_1.AppError('Failed to sync with repository', 'CODESPACE_ERROR', error_3);
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    CodespaceClient.prototype.isCodespaceEnvironment = function () {
        return Boolean(import.meta.env.CODESPACE_NAME);
    };
    return CodespaceClient;
}());
exports.CodespaceClient = CodespaceClient;
