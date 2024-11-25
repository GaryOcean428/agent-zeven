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
exports.PersistenceManager = void 0;
var indexed_db_1 = require("./indexed-db");
var thought_logger_1 = require("../logging/thought-logger");
var PersistenceManager = /** @class */ (function () {
    function PersistenceManager() {
        this.initialized = false;
        this.storage = new indexed_db_1.IndexedDBStorage();
    }
    PersistenceManager.getInstance = function () {
        if (!PersistenceManager.instance) {
            PersistenceManager.instance = new PersistenceManager();
        }
        return PersistenceManager.instance;
    };
    PersistenceManager.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            var error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.initialized)
                            return [2 /*return*/];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.storage.init()];
                    case 2:
                        _a.sent();
                        this.initialized = true;
                        thought_logger_1.thoughtLogger.log('success', 'PersistenceManager initialized successfully');
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        thought_logger_1.thoughtLogger.log('error', 'Failed to initialize PersistenceManager', { error: error_1 });
                        throw error_1;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    PersistenceManager.prototype.ensureInitialized = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!this.initialized) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.init()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    // Chat Management
    PersistenceManager.prototype.saveChat = function (title, messages, tags) {
        return __awaiter(this, void 0, void 0, function () {
            var id, chat;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.ensureInitialized()];
                    case 1:
                        _a.sent();
                        id = crypto.randomUUID();
                        chat = {
                            id: id,
                            title: title,
                            messages: messages,
                            createdAt: Date.now(),
                            updatedAt: Date.now(),
                            tags: tags
                        };
                        return [4 /*yield*/, this.storage.put('chats', chat)];
                    case 2:
                        _a.sent();
                        thought_logger_1.thoughtLogger.log('success', 'Chat saved successfully', { chatId: id });
                        return [2 /*return*/, id];
                }
            });
        });
    };
    PersistenceManager.prototype.getChat = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.ensureInitialized()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, this.storage.get('chats', id)];
                }
            });
        });
    };
    PersistenceManager.prototype.listChats = function () {
        return __awaiter(this, void 0, void 0, function () {
            var chats, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.ensureInitialized()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, this.storage.getAll('chats')];
                    case 3:
                        chats = _a.sent();
                        return [2 /*return*/, chats.sort(function (a, b) { return b.updatedAt - a.updatedAt; })];
                    case 4:
                        error_2 = _a.sent();
                        thought_logger_1.thoughtLogger.log('error', 'Failed to list chats', { error: error_2 });
                        return [2 /*return*/, []];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    PersistenceManager.prototype.deleteChat = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.ensureInitialized()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.storage.delete('chats', id)];
                    case 2:
                        _a.sent();
                        thought_logger_1.thoughtLogger.log('success', 'Chat deleted', { chatId: id });
                        return [2 /*return*/];
                }
            });
        });
    };
    // Workflow Management
    PersistenceManager.prototype.saveWorkflow = function (workflow) {
        return __awaiter(this, void 0, void 0, function () {
            var id, fullWorkflow;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.ensureInitialized()];
                    case 1:
                        _a.sent();
                        id = crypto.randomUUID();
                        fullWorkflow = __assign(__assign({}, workflow), { id: id, createdAt: Date.now(), updatedAt: Date.now() });
                        return [4 /*yield*/, this.storage.put('workflows', fullWorkflow)];
                    case 2:
                        _a.sent();
                        thought_logger_1.thoughtLogger.log('success', 'Workflow saved', { workflowId: id });
                        return [2 /*return*/, id];
                }
            });
        });
    };
    PersistenceManager.prototype.getWorkflow = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.ensureInitialized()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, this.storage.get('workflows', id)];
                }
            });
        });
    };
    PersistenceManager.prototype.listWorkflows = function () {
        return __awaiter(this, void 0, void 0, function () {
            var workflows, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.ensureInitialized()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, this.storage.getAll('workflows')];
                    case 3:
                        workflows = _a.sent();
                        return [2 /*return*/, workflows.sort(function (a, b) { return b.updatedAt - a.updatedAt; })];
                    case 4:
                        error_3 = _a.sent();
                        thought_logger_1.thoughtLogger.log('error', 'Failed to list workflows', { error: error_3 });
                        return [2 /*return*/, []];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    PersistenceManager.prototype.deleteWorkflow = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.ensureInitialized()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.storage.delete('workflows', id)];
                    case 2:
                        _a.sent();
                        thought_logger_1.thoughtLogger.log('success', 'Workflow deleted', { workflowId: id });
                        return [2 /*return*/];
                }
            });
        });
    };
    PersistenceManager.prototype.updateWorkflowLastRun = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var workflow;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.ensureInitialized()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.getWorkflow(id)];
                    case 2:
                        workflow = _a.sent();
                        if (!workflow) return [3 /*break*/, 4];
                        workflow.lastRun = Date.now();
                        workflow.updatedAt = Date.now();
                        return [4 /*yield*/, this.storage.put('workflows', workflow)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    // Settings Management
    PersistenceManager.prototype.saveSettings = function (category, values) {
        return __awaiter(this, void 0, void 0, function () {
            var settings;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.ensureInitialized()];
                    case 1:
                        _a.sent();
                        settings = {
                            id: category,
                            category: category,
                            values: values,
                            updatedAt: Date.now()
                        };
                        return [4 /*yield*/, this.storage.put('settings', settings)];
                    case 2:
                        _a.sent();
                        thought_logger_1.thoughtLogger.log('success', 'Settings saved', { category: category });
                        return [2 /*return*/];
                }
            });
        });
    };
    PersistenceManager.prototype.getSettings = function (category) {
        return __awaiter(this, void 0, void 0, function () {
            var settings;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.ensureInitialized()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.storage.get('settings', category)];
                    case 2:
                        settings = _a.sent();
                        return [2 /*return*/, (settings === null || settings === void 0 ? void 0 : settings.values) || null];
                }
            });
        });
    };
    PersistenceManager.prototype.getAllSettings = function () {
        return __awaiter(this, void 0, void 0, function () {
            var settings, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.ensureInitialized()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, this.storage.getAll('settings')];
                    case 3:
                        settings = _a.sent();
                        return [2 /*return*/, settings.reduce(function (acc, setting) {
                                acc[setting.category] = setting.values;
                                return acc;
                            }, {})];
                    case 4:
                        error_4 = _a.sent();
                        thought_logger_1.thoughtLogger.log('error', 'Failed to get all settings', { error: error_4 });
                        return [2 /*return*/, {}];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    return PersistenceManager;
}());
exports.PersistenceManager = PersistenceManager;
