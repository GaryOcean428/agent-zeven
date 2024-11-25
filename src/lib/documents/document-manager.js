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
exports.DocumentManager = void 0;
var thought_logger_1 = require("../logging/thought-logger");
var vector_store_1 = require("./vector-store");
var indexed_db_1 = require("../storage/indexed-db");
var auto_tagger_1 = require("./auto-tagger");
var AppError_1 = require("../errors/AppError");
var DocumentManager = /** @class */ (function () {
    function DocumentManager() {
        this.vectorStore = new vector_store_1.VectorStore();
        this.storage = new indexed_db_1.IndexedDBStorage();
        this.autoTagger = auto_tagger_1.AutoTagger.getInstance();
    }
    DocumentManager.getInstance = function () {
        if (!DocumentManager.instance) {
            DocumentManager.instance = new DocumentManager();
        }
        return DocumentManager.instance;
    };
    DocumentManager.prototype.addDocument = function (workspaceId_1, file_1) {
        return __awaiter(this, arguments, void 0, function (workspaceId, file, userTags) {
            var content, autoTags, tags, vectorId, document_1, error_1;
            if (userTags === void 0) { userTags = []; }
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        thought_logger_1.thoughtLogger.log('execution', 'Adding new document', {
                            workspaceId: workspaceId,
                            fileName: file.name,
                            fileType: file.type,
                            fileSize: file.size
                        });
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 8, , 9]);
                        // Initialize storage
                        return [4 /*yield*/, this.storage.init()];
                    case 2:
                        // Initialize storage
                        _a.sent();
                        // Validate file
                        if (!this.isValidFileType(file)) {
                            throw new AppError_1.AppError('Unsupported file type', 'VALIDATION_ERROR');
                        }
                        if (file.size > 10 * 1024 * 1024) { // 10MB limit
                            throw new AppError_1.AppError('File size exceeds limit', 'VALIDATION_ERROR');
                        }
                        return [4 /*yield*/, this.extractContent(file)];
                    case 3:
                        content = _a.sent();
                        if (!content) {
                            throw new AppError_1.AppError('Failed to extract content from file', 'PROCESSING_ERROR');
                        }
                        return [4 /*yield*/, this.autoTagger.generateTags(content, file.name, file.type)];
                    case 4:
                        autoTags = _a.sent();
                        tags = Array.from(new Set(__spreadArray(__spreadArray([], autoTags, true), userTags, true)));
                        return [4 /*yield*/, this.vectorStore.addDocument(content)];
                    case 5:
                        vectorId = _a.sent();
                        document_1 = {
                            id: crypto.randomUUID(),
                            name: file.name,
                            content: content,
                            mimeType: file.type,
                            tags: tags,
                            vectorId: vectorId,
                            workspaceId: workspaceId,
                            createdAt: Date.now(),
                            updatedAt: Date.now(),
                            metadata: {
                                fileSize: file.size,
                                wordCount: content.split(/\s+/).length,
                                processingTime: Date.now()
                            }
                        };
                        // Store document
                        return [4 /*yield*/, this.storage.put('documents', document_1)];
                    case 6:
                        // Store document
                        _a.sent();
                        // Update workspace
                        return [4 /*yield*/, this.updateWorkspaceDocuments(workspaceId, document_1.id)];
                    case 7:
                        // Update workspace
                        _a.sent();
                        thought_logger_1.thoughtLogger.log('success', 'Document added successfully', {
                            documentId: document_1.id,
                            autoTags: autoTags,
                            finalTags: tags
                        });
                        return [2 /*return*/, document_1];
                    case 8:
                        error_1 = _a.sent();
                        thought_logger_1.thoughtLogger.log('error', 'Failed to add document', { error: error_1 });
                        throw error_1 instanceof AppError_1.AppError ? error_1 : new AppError_1.AppError('Failed to add document', 'DOCUMENT_ERROR', error_1);
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    DocumentManager.prototype.extractContent = function (file) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, error_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 11, , 12]);
                        _a = file.type;
                        switch (_a) {
                            case 'text/plain': return [3 /*break*/, 1];
                            case 'text/markdown': return [3 /*break*/, 1];
                            case 'application/pdf': return [3 /*break*/, 3];
                            case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document': return [3 /*break*/, 5];
                        }
                        return [3 /*break*/, 7];
                    case 1: return [4 /*yield*/, file.text()];
                    case 2: return [2 /*return*/, _b.sent()];
                    case 3: return [4 /*yield*/, this.extractPDFContent(file)];
                    case 4: return [2 /*return*/, _b.sent()];
                    case 5: return [4 /*yield*/, this.extractDocxContent(file)];
                    case 6: return [2 /*return*/, _b.sent()];
                    case 7:
                        if (!file.type.startsWith('text/')) return [3 /*break*/, 9];
                        return [4 /*yield*/, file.text()];
                    case 8: return [2 /*return*/, _b.sent()];
                    case 9: throw new AppError_1.AppError("Unsupported file type: ".concat(file.type), 'VALIDATION_ERROR');
                    case 10: return [3 /*break*/, 12];
                    case 11:
                        error_2 = _b.sent();
                        thought_logger_1.thoughtLogger.log('error', 'Content extraction failed', { error: error_2 });
                        throw new AppError_1.AppError('Failed to extract content', 'PROCESSING_ERROR', error_2);
                    case 12: return [2 /*return*/];
                }
            });
        });
    };
    DocumentManager.prototype.extractPDFContent = function (file) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, file.text()];
                    case 1: 
                    // For now, return a simple text extraction
                    // In production, use a PDF parsing library
                    return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    DocumentManager.prototype.extractDocxContent = function (file) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, file.text()];
                    case 1: 
                    // For now, return a simple text extraction
                    // In production, use a DOCX parsing library
                    return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    DocumentManager.prototype.isValidFileType = function (file) {
        var supportedTypes = [
            'text/plain',
            'text/markdown',
            'application/pdf',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        ];
        return supportedTypes.includes(file.type) || file.type.startsWith('text/');
    };
    DocumentManager.prototype.updateWorkspaceDocuments = function (workspaceId, documentId) {
        return __awaiter(this, void 0, void 0, function () {
            var workspace, defaultWorkspace;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.storage.get('workspaces', workspaceId)];
                    case 1:
                        workspace = _a.sent();
                        if (!!workspace) return [3 /*break*/, 3];
                        defaultWorkspace = {
                            id: workspaceId,
                            name: 'Default Workspace',
                            documentIds: [documentId],
                            createdAt: Date.now(),
                            updatedAt: Date.now()
                        };
                        return [4 /*yield*/, this.storage.put('workspaces', defaultWorkspace)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 3:
                        workspace.documentIds.push(documentId);
                        workspace.updatedAt = Date.now();
                        return [4 /*yield*/, this.storage.put('workspaces', workspace)];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    DocumentManager.prototype.searchDocuments = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var vectorResults, documents, error_3;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        thought_logger_1.thoughtLogger.log('execution', 'Searching documents', options);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, this.vectorStore.search(options.query, options.similarity || 0.7, options.limit || 10)];
                    case 2:
                        vectorResults = _a.sent();
                        return [4 /*yield*/, Promise.all(vectorResults.map(function (result) { return __awaiter(_this, void 0, void 0, function () {
                                var doc;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, this.storage.get('documents', result.id)];
                                        case 1:
                                            doc = _a.sent();
                                            return [2 /*return*/, {
                                                    document: doc,
                                                    score: result.score,
                                                    excerpt: this.generateExcerpt(doc.content, options.query)
                                                }];
                                    }
                                });
                            }); }))];
                    case 3:
                        documents = _a.sent();
                        // Filter by workspace and tags if specified
                        return [2 /*return*/, documents.filter(function (result) {
                                if (options.workspaceId && result.document.workspaceId !== options.workspaceId) {
                                    return false;
                                }
                                if (options.tags && options.tags.length > 0) {
                                    return options.tags.every(function (tag) { return result.document.tags.includes(tag); });
                                }
                                return true;
                            })];
                    case 4:
                        error_3 = _a.sent();
                        thought_logger_1.thoughtLogger.log('error', 'Document search failed', { error: error_3 });
                        throw error_3 instanceof AppError_1.AppError ? error_3 : new AppError_1.AppError('Document search failed', 'SEARCH_ERROR', error_3);
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    DocumentManager.prototype.generateExcerpt = function (content, query) {
        var words = content.split(/\s+/);
        var queryWords = query.toLowerCase().split(/\s+/);
        var excerptLength = 50;
        // Find best matching position
        var bestPosition = 0;
        var maxMatches = 0;
        var _loop_1 = function (i) {
            var matches = queryWords.filter(function (qw) {
                return words.slice(i, i + excerptLength)
                    .some(function (w) { return w.toLowerCase().includes(qw); });
            }).length;
            if (matches > maxMatches) {
                maxMatches = matches;
                bestPosition = i;
            }
        };
        for (var i = 0; i < words.length - excerptLength; i++) {
            _loop_1(i);
        }
        return words
            .slice(bestPosition, bestPosition + excerptLength)
            .join(' ') + '...';
    };
    return DocumentManager;
}());
exports.DocumentManager = DocumentManager;
