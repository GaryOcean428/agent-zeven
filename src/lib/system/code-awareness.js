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
exports.CodeAwareness = void 0;
var thought_logger_1 = require("../logging/thought-logger");
var github_client_1 = require("../github/github-client");
var codespace_client_1 = require("../github/codespace-client");
var CodeAwareness = /** @class */ (function () {
    function CodeAwareness() {
        this.sourceFiles = new Map();
        this.capabilities = new Map();
        this.initialized = false;
        this.githubClient = github_client_1.GitHubClient.getInstance();
        this.codespaceClient = codespace_client_1.CodespaceClient.getInstance();
    }
    CodeAwareness.getInstance = function () {
        if (!CodeAwareness.instance) {
            CodeAwareness.instance = new CodeAwareness();
        }
        return CodeAwareness.instance;
    };
    CodeAwareness.prototype.initialize = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, githubConnected, codespaceAvailable, codespaceInfo, _b, owner, repo, error_1;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (this.initialized)
                            return [2 /*return*/];
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 8, , 9]);
                        thought_logger_1.thoughtLogger.log('plan', 'Initializing code awareness system');
                        // Load local source files first
                        return [4 /*yield*/, this.loadLocalSourceFiles()];
                    case 2:
                        // Load local source files first
                        _c.sent();
                        return [4 /*yield*/, Promise.all([
                                this.githubClient.verifyConnection(),
                                this.codespaceClient.verifyCodespaceAccess()
                            ])];
                    case 3:
                        _a = _c.sent(), githubConnected = _a[0], codespaceAvailable = _a[1];
                        if (!githubConnected) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.codespaceClient.getCurrentCodespaceInfo()];
                    case 4:
                        codespaceInfo = _c.sent();
                        _b = ((codespaceInfo === null || codespaceInfo === void 0 ? void 0 : codespaceInfo.repository) || '').split('/'), owner = _b[0], repo = _b[1];
                        if (!(owner && repo)) return [3 /*break*/, 6];
                        // Load repository files
                        return [4 /*yield*/, this.loadRepositoryFiles(owner, repo)];
                    case 5:
                        // Load repository files
                        _c.sent();
                        _c.label = 6;
                    case 6: 
                    // Extract capabilities from all source files
                    return [4 /*yield*/, this.extractAllCapabilities()];
                    case 7:
                        // Extract capabilities from all source files
                        _c.sent();
                        this.initialized = true;
                        thought_logger_1.thoughtLogger.log('success', 'Code awareness system initialized', {
                            filesLoaded: this.sourceFiles.size,
                            capabilitiesFound: this.capabilities.size,
                            codespaceAvailable: codespaceAvailable
                        });
                        return [3 /*break*/, 9];
                    case 8:
                        error_1 = _c.sent();
                        thought_logger_1.thoughtLogger.log('error', 'Failed to initialize code awareness', { error: error_1 });
                        throw error_1;
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    CodeAwareness.prototype.loadLocalSourceFiles = function () {
        return __awaiter(this, void 0, void 0, function () {
            var files, _i, files_1, file, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.getLocalFiles('/src')];
                    case 1:
                        files = _a.sent();
                        for (_i = 0, files_1 = files; _i < files_1.length; _i++) {
                            file = files_1[_i];
                            if (this.isRelevantFile(file.path)) {
                                this.sourceFiles.set(file.path, file.content);
                            }
                        }
                        thought_logger_1.thoughtLogger.log('success', 'Local source files loaded', {
                            fileCount: this.sourceFiles.size
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        error_2 = _a.sent();
                        thought_logger_1.thoughtLogger.log('error', 'Failed to load local source files', { error: error_2 });
                        throw error_2;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    CodeAwareness.prototype.getLocalFiles = function (dir) {
        return __awaiter(this, void 0, void 0, function () {
            var files, knownFiles, _i, knownFiles_1, path, content, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        files = [];
                        knownFiles = [
knownFiles = [
  '/src/lib/system/code-awareness.ts',
  '/src/lib/github/github-client.ts',
  '/src/lib/services/search-service.ts',
].filter(async (path) => {
  try {
    await this.getFileContent(path);
    return true;
  } catch {
    thoughtLogger.log('warning', `File not found: ${path}`);
    return false;
  }
});
                        _i = 0, knownFiles_1 = knownFiles;
                        _a.label = 1;
                    case 1:
                        if (!(_i < knownFiles_1.length)) return [3 /*break*/, 6];
                        path = knownFiles_1[_i];
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, this.getFileContent(path)];
                    case 3:
                        content = _a.sent();
                        if (content) {
                            files.push({ path: path, content: content });
                        }
                        return [3 /*break*/, 5];
                    case 4:
                        error_3 = _a.sent();
                        thought_logger_1.thoughtLogger.log('warning', "Failed to load file: ".concat(path), { error: error_3 });
                        return [3 /*break*/, 5];
                    case 5:
                        _i++;
                        return [3 /*break*/, 1];
                    case 6: return [2 /*return*/, files];
                }
            });
        });
    };
    CodeAwareness.prototype.loadRepositoryFiles = function (owner, repo) {
        return __awaiter(this, void 0, void 0, function () {
            var files, _i, files_2, file, content, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        return [4 /*yield*/, this.githubClient.getRepositoryFiles(owner, repo)];
                    case 1:
                        files = _a.sent();
                        _i = 0, files_2 = files;
                        _a.label = 2;
                    case 2:
                        if (!(_i < files_2.length)) return [3 /*break*/, 5];
                        file = files_2[_i];
                        if (!this.isRelevantFile(file.path)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.githubClient.getFileContent(owner, repo, file.path)];
                    case 3:
                        content = _a.sent();
                        this.sourceFiles.set(file.path, content);
                        _a.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 2];
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        error_4 = _a.sent();
                        thought_logger_1.thoughtLogger.log('error', 'Failed to load repository files', { error: error_4 });
                        throw error_4;
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    CodeAwareness.prototype.extractAllCapabilities = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _i, _a, _b, path, content, fileCapabilities;
            var _this = this;
            return __generator(this, function (_c) {
                for (_i = 0, _a = this.sourceFiles.entries(); _i < _a.length; _i++) {
                    _b = _a[_i], path = _b[0], content = _b[1];
                    fileCapabilities = this.extractCapabilities(content, path);
                    fileCapabilities.forEach(function (cap) { return _this.capabilities.set(cap.name, cap); });
                }
                return [2 /*return*/];
            });
        });
    };
    CodeAwareness.prototype.isRelevantFile = function (path) {
        var relevantExtensions = ['.ts', '.tsx', '.js', '.jsx', '.json', '.md'];
        var excludedPaths = ['node_modules', 'dist', '.git'];
        return (relevantExtensions.some(function (ext) { return path.endsWith(ext); }) &&
            !excludedPaths.some(function (excluded) { return path.includes(excluded); }));
    };
    CodeAwareness.prototype.getFileContent = function (path) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!this.initialized) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.initialize()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/, this.sourceFiles.get(path) || null];
                }
            });
        });
    };
    CodeAwareness.prototype.searchCode = function (query) {
        return __awaiter(this, void 0, void 0, function () {
            var results, searchRegex, _i, _a, _b, path, content, matches;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!!this.initialized) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.initialize()];
                    case 1:
                        _c.sent();
                        _c.label = 2;
                    case 2:
                        results = [];
                        searchRegex = new RegExp(query, 'gi');
                        for (_i = 0, _a = this.sourceFiles.entries(); _i < _a.length; _i++) {
                            _b = _a[_i], path = _b[0], content = _b[1];
                            matches = content.match(searchRegex);
                            if (matches) {
                                results.push({
                                    path: path,
                                    content: content,
                                    matches: matches
                                });
                            }
                        }
                        return [2 /*return*/, results];
                }
            });
        });
    };
    CodeAwareness.prototype.getCapabilities = function () {
        return Array.from(this.capabilities.values());
    };
    CodeAwareness.prototype.hasCapability = function (name) {
        return this.capabilities.has(name);
    };
    CodeAwareness.prototype.extractCapabilities = function (content, path) {
        var capabilities = [];
        // Extract classes
        var classMatches = content.matchAll(/(?:export\s+)?class\s+(\w+)(?:\s+extends\s+\w+)?(?:\s+implements\s+\w+(?:\s*,\s*\w+)*)?/g);
        for (var _i = 0, classMatches_1 = classMatches; _i < classMatches_1.length; _i++) {
            var match = classMatches_1[_i];
            capabilities.push({
                name: match[1],
                type: 'class',
                path: path,
                description: this.extractDescription(content, match.index || 0)
            });
        }
        // Extract interfaces
        var interfaceMatches = content.matchAll(/(?:export\s+)?interface\s+(\w+)(?:\s+extends\s+\w+(?:\s*,\s*\w+)*)?/g);
        for (var _a = 0, interfaceMatches_1 = interfaceMatches; _a < interfaceMatches_1.length; _a++) {
            var match = interfaceMatches_1[_a];
            capabilities.push({
                name: match[1],
                type: 'interface',
                path: path,
                description: this.extractDescription(content, match.index || 0)
            });
        }
        // Extract functions
        var functionMatches = content.matchAll(/(?:export\s+)?(?:async\s+)?function\s+(\w+)/g);
        for (var _b = 0, functionMatches_1 = functionMatches; _b < functionMatches_1.length; _b++) {
            var match = functionMatches_1[_b];
            capabilities.push({
                name: match[1],
                type: 'function',
                path: path,
                description: this.extractDescription(content, match.index || 0)
            });
        }
        return capabilities;
    };
    CodeAwareness.prototype.extractDescription = function (content, index) {
        // Look for JSDoc comment above the declaration
        var beforeDeclaration = content.slice(0, index).trim();
        var commentMatch = beforeDeclaration.match(/\/\*\*\s*([\s\S]*?)\s*\*\/\s*$/);
        if (commentMatch) {
            return commentMatch[1]
                .split('\n')
                .map(function (line) { return line.trim().replace(/^\*\s*/, ''); })
                .filter(Boolean)
                .join(' ');
        }
        return undefined;
    };
    CodeAwareness.prototype.getSystemCapabilities = function () {
        return __awaiter(this, void 0, void 0, function () {
            var capabilities;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!this.initialized) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.initialize()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        capabilities = this.getCapabilities();
                        return [2 /*return*/, {
                                services: capabilities
                                    .filter(function (cap) { return cap.path.includes('/services/'); })
                                    .map(function (cap) { return cap.name; }),
                                features: capabilities
                                    .filter(function (cap) { return cap.type === 'class' && !cap.path.includes('/services/'); })
                                    .map(function (cap) { return cap.name; }),
                                integrations: capabilities
                                    .filter(function (cap) { return cap.path.includes('/integrations/') || cap.path.includes('/api/'); })
                                    .map(function (cap) { return cap.name; })
                            }];
                }
            });
        });
    };
    Object.defineProperty(CodeAwareness.prototype, "isInitialized", {
        get: function () {
            return this.initialized;
        },
        enumerable: false,
        configurable: true
    });
    return CodeAwareness;
}());
exports.CodeAwareness = CodeAwareness;
