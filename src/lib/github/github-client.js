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
exports.githubClient = exports.GitHubClient = void 0;
var octokit_1 = require("octokit");
var thought_logger_1 = require("../logging/thought-logger");
var AppError_1 = require("../errors/AppError");
var config_1 = require("../config");
var rate_limiter_1 = require("../api/rate-limiter");
var GitHubClient = /** @class */ (function () {
    function GitHubClient() {
        this.octokit = null;
        this.initialized = false;
        this.rateLimiter = new rate_limiter_1.RateLimiter({
            maxRequests: 5000,
            interval: 60 * 60 * 1000 // 1 hour
        });
        if (!config_1.config.apiKeys.github) {
            thought_logger_1.thoughtLogger.log('warning', 'GitHub API key not configured');
        }
    }
    GitHubClient.getInstance = function () {
        if (!GitHubClient.instance) {
            GitHubClient.instance = new GitHubClient();
        }
        return GitHubClient.instance;
    };
    GitHubClient.prototype.initialize = function () {
        return __awaiter(this, void 0, void 0, function () {
            var user, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.initialized)
                            return [2 /*return*/];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        if (!config_1.config.apiKeys.github) {
                            throw new AppError_1.AppError('GitHub API key not configured', 'CONFIG_ERROR');
                        }
                        this.octokit = new octokit_1.Octokit({
                            auth: config_1.config.apiKeys.github,
                            baseUrl: config_1.config.services.github.baseUrl,
                            headers: {
                                'X-GitHub-Api-Version': config_1.config.services.github.apiVersion
                            }
                        });
                        return [4 /*yield*/, this.octokit.rest.users.getAuthenticated()];
                    case 2:
                        user = (_a.sent()).data;
                        thought_logger_1.thoughtLogger.log('success', 'GitHub client initialized successfully', {
                            username: user.login
                        });
                        this.initialized = true;
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        thought_logger_1.thoughtLogger.log('error', 'Failed to initialize GitHub client', { error: error_1 });
                        throw new AppError_1.AppError('GitHub initialization failed', 'GITHUB_ERROR', error_1);
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    GitHubClient.prototype.listRepositories = function () {
        return __awaiter(this, arguments, void 0, function (options) {
            var data, error_2;
            if (options === void 0) { options = {}; }
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!this.initialized) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.initialize()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [4 /*yield*/, this.rateLimiter.acquire()];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        _a.trys.push([4, 6, , 7]);
                        return [4 /*yield*/, this.octokit.rest.repos.listForAuthenticatedUser(options)];
                    case 5:
                        data = (_a.sent()).data;
                        return [2 /*return*/, data];
                    case 6:
                        error_2 = _a.sent();
                        thought_logger_1.thoughtLogger.log('error', 'Failed to list repositories', { error: error_2 });
                        throw new AppError_1.AppError('Failed to list repositories', 'GITHUB_ERROR', error_2);
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    GitHubClient.prototype.getRepository = function (owner, repo) {
        return __awaiter(this, void 0, void 0, function () {
            var data, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!this.initialized) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.initialize()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [4 /*yield*/, this.rateLimiter.acquire()];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        _a.trys.push([4, 6, , 7]);
                        return [4 /*yield*/, this.octokit.rest.repos.get({ owner: owner, repo: repo })];
                    case 5:
                        data = (_a.sent()).data;
                        return [2 /*return*/, data];
                    case 6:
                        error_3 = _a.sent();
                        thought_logger_1.thoughtLogger.log('error', 'Failed to get repository', { error: error_3 });
                        throw new AppError_1.AppError('Failed to get repository', 'GITHUB_ERROR', error_3);
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    GitHubClient.prototype.createRepository = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var data, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!this.initialized) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.initialize()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [4 /*yield*/, this.rateLimiter.acquire()];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        _a.trys.push([4, 6, , 7]);
                        return [4 /*yield*/, this.octokit.rest.repos.createForAuthenticatedUser(options)];
                    case 5:
                        data = (_a.sent()).data;
                        return [2 /*return*/, data];
                    case 6:
                        error_4 = _a.sent();
                        thought_logger_1.thoughtLogger.log('error', 'Failed to create repository', { error: error_4 });
                        throw new AppError_1.AppError('Failed to create repository', 'GITHUB_ERROR', error_4);
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    GitHubClient.prototype.getFileContent = function (owner, repo, path) {
        return __awaiter(this, void 0, void 0, function () {
            var data, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!this.initialized) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.initialize()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [4 /*yield*/, this.rateLimiter.acquire()];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        _a.trys.push([4, 6, , 7]);
                        return [4 /*yield*/, this.octokit.rest.repos.getContent({
                                owner: owner,
                                repo: repo,
                                path: path
                            })];
                    case 5:
                        data = (_a.sent()).data;
                        if ('content' in data) {
                            return [2 /*return*/, Buffer.from(data.content, 'base64').toString('utf-8')];
                        }
                        throw new Error('Not a file');
                    case 6:
                        error_5 = _a.sent();
                        thought_logger_1.thoughtLogger.log('error', 'Failed to get file content', { error: error_5 });
                        throw new AppError_1.AppError('Failed to get file content', 'GITHUB_ERROR', error_5);
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    GitHubClient.prototype.createOrUpdateFile = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!this.initialized) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.initialize()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [4 /*yield*/, this.rateLimiter.acquire()];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        _a.trys.push([4, 6, , 7]);
const maxRetries = 3;
let retryCount = 0;
while (retryCount < maxRetries) {
    try {
        return [4 /*yield*/ this.octokit.rest.repos.createOrUpdateFileContents(__assign(__assign({}, params), { content: Buffer.from(params.content).toString('base64') }))];
    } catch (error) {
        if (error.status === 429 || (error.status >= 500 && error.status <= 599)) {
            retryCount++;
            await new Promise(resolve => setTimeout(resolve, Math.pow(2, retryCount) * 1000));
            continue;
        }
        throw error;
    }
}
                    case 5:
                        _a.sent();
                        return [3 /*break*/, 7];
                    case 6:
                        error_6 = _a.sent();
                        thought_logger_1.thoughtLogger.log('error', 'Failed to create/update file', { error: error_6 });
                        throw new AppError_1.AppError('Failed to create/update file', 'GITHUB_ERROR', error_6);
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    GitHubClient.prototype.createPullRequest = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var data, error_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!this.initialized) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.initialize()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [4 /*yield*/, this.rateLimiter.acquire()];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        _a.trys.push([4, 6, , 7]);
                        return [4 /*yield*/, this.octokit.rest.pulls.create(params)];
                    case 5:
                        data = (_a.sent()).data;
                        return [2 /*return*/, data];
                    case 6:
                        error_7 = _a.sent();
                        thought_logger_1.thoughtLogger.log('error', 'Failed to create pull request', { error: error_7 });
                        throw new AppError_1.AppError('Failed to create pull request', 'GITHUB_ERROR', error_7);
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    GitHubClient.prototype.mergePullRequest = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var error_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!this.initialized) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.initialize()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [4 /*yield*/, this.rateLimiter.acquire()];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        _a.trys.push([4, 6, , 7]);
                        return [4 /*yield*/, this.octokit.rest.pulls.merge(params)];
                    case 5:
                        _a.sent();
                        return [3 /*break*/, 7];
                    case 6:
                        error_8 = _a.sent();
                        thought_logger_1.thoughtLogger.log('error', 'Failed to merge pull request', { error: error_8 });
                        throw new AppError_1.AppError('Failed to merge pull request', 'GITHUB_ERROR', error_8);
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    Object.defineProperty(GitHubClient.prototype, "isInitialized", {
        get: function () {
            return this.initialized;
        },
        enumerable: false,
        configurable: true
    });
    return GitHubClient;
}());
exports.GitHubClient = GitHubClient;
exports.githubClient = GitHubClient.getInstance();
