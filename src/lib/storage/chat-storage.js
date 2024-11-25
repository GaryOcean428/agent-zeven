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
exports.chatStorage = exports.ChatStorage = void 0;
var db_init_1 = require("./db-init");
var db_config_1 = require("./db-config");
var ChatStorage = /** @class */ (function () {
    function ChatStorage() {
    }
    ChatStorage.getInstance = function () {
        if (!ChatStorage.instance) {
            ChatStorage.instance = new ChatStorage();
        }
        return ChatStorage.instance;
    };
    ChatStorage.prototype.saveChat = function (chat) {
        return __awaiter(this, void 0, void 0, function () {
            var db, transaction, chatsStore, messagesStore;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db_init_1.dbInitializer.getDatabase()];
                    case 1:
                        db = _a.sent();
                        transaction = db.transaction([db_config_1.DBConfig.STORES.CHATS, db_config_1.DBConfig.STORES.MESSAGES], 'readwrite');
                        chatsStore = transaction.objectStore(db_config_1.DBConfig.STORES.CHATS);
                        messagesStore = transaction.objectStore(db_config_1.DBConfig.STORES.MESSAGES);
                        return [2 /*return*/, new Promise(function (resolve, reject) {
                                // Save chat metadata
                                var chatRequest = chatsStore.put({
                                    id: chat.id,
                                    title: chat.title,
                                    timestamp: chat.timestamp,
                                    metadata: chat.metadata
                                });
                                // Save messages
                                var messagePromises = chat.messages.map(function (message) {
                                    return new Promise(function (resolveMessage, rejectMessage) {
                                        var messageRequest = messagesStore.put(__assign(__assign({}, message), { chatId: chat.id }));
                                        messageRequest.onsuccess = function () { return resolveMessage(); };
                                        messageRequest.onerror = function () { return rejectMessage(messageRequest.error); };
                                    });
                                });
                                Promise.all(__spreadArray([
                                    new Promise(function (resolve, reject) {
                                        chatRequest.onsuccess = function () { return resolve(); };
                                        chatRequest.onerror = function () { return reject(chatRequest.error); };
                                    })
                                ], messagePromises, true)).then(function () { return resolve(); })
                                    .catch(reject);
                            })];
                }
            });
        });
    };
    ChatStorage.prototype.getChat = function (chatId) {
        return __awaiter(this, void 0, void 0, function () {
            var db, transaction, chatsStore, messagesStore, messageIndex;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db_init_1.dbInitializer.getDatabase()];
                    case 1:
                        db = _a.sent();
                        transaction = db.transaction([db_config_1.DBConfig.STORES.CHATS, db_config_1.DBConfig.STORES.MESSAGES], 'readonly');
                        chatsStore = transaction.objectStore(db_config_1.DBConfig.STORES.CHATS);
                        messagesStore = transaction.objectStore(db_config_1.DBConfig.STORES.MESSAGES);
                        messageIndex = messagesStore.index('chatId');
                        return [2 /*return*/, new Promise(function (resolve, reject) {
                                var chatRequest = chatsStore.get(chatId);
                                chatRequest.onsuccess = function () {
                                    if (!chatRequest.result) {
                                        resolve(null);
                                        return;
                                    }
                                    var messagesRequest = messageIndex.getAll(chatId);
                                    messagesRequest.onsuccess = function () {
                                        resolve(__assign(__assign({}, chatRequest.result), { messages: messagesRequest.result }));
                                    };
                                    messagesRequest.onerror = function () { return reject(messagesRequest.error); };
                                };
                                chatRequest.onerror = function () { return reject(chatRequest.error); };
                            })];
                }
            });
        });
    };
    ChatStorage.prototype.getAllChats = function () {
        return __awaiter(this, void 0, void 0, function () {
            var db, transaction, store;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db_init_1.dbInitializer.getDatabase()];
                    case 1:
                        db = _a.sent();
                        transaction = db.transaction([db_config_1.DBConfig.STORES.CHATS], 'readonly');
                        store = transaction.objectStore(db_config_1.DBConfig.STORES.CHATS);
                        return [2 /*return*/, new Promise(function (resolve, reject) {
                                var request = store.getAll();
                                request.onsuccess = function () { return resolve(request.result); };
                                request.onerror = function () { return reject(request.error); };
                            })];
                }
            });
        });
    };
    ChatStorage.prototype.deleteChat = function (chatId) {
        return __awaiter(this, void 0, void 0, function () {
            var db, transaction, chatsStore, messagesStore, messageIndex;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db_init_1.dbInitializer.getDatabase()];
                    case 1:
                        db = _a.sent();
                        transaction = db.transaction([db_config_1.DBConfig.STORES.CHATS, db_config_1.DBConfig.STORES.MESSAGES], 'readwrite');
                        chatsStore = transaction.objectStore(db_config_1.DBConfig.STORES.CHATS);
                        messagesStore = transaction.objectStore(db_config_1.DBConfig.STORES.MESSAGES);
                        messageIndex = messagesStore.index('chatId');
                        return [2 /*return*/, new Promise(function (resolve, reject) {
                                var deleteChat = chatsStore.delete(chatId);
                                var getMessages = messageIndex.getAll(chatId);
                                getMessages.onsuccess = function () {
                                    var messages = getMessages.result;
                                    var messagePromises = messages.map(function (message) {
                                        return new Promise(function (resolveMessage, rejectMessage) {
                                            var deleteMessage = messagesStore.delete(message.id);
                                            deleteMessage.onsuccess = function () { return resolveMessage(); };
                                            deleteMessage.onerror = function () { return rejectMessage(deleteMessage.error); };
                                        });
                                    });
                                    Promise.all(__spreadArray([
                                        new Promise(function (resolve, reject) {
                                            deleteChat.onsuccess = function () { return resolve(); };
                                            deleteChat.onerror = function () { return reject(deleteChat.error); };
                                        })
                                    ], messagePromises, true)).then(function () { return resolve(); })
                                        .catch(reject);
                                };
                                getMessages.onerror = function () { return reject(getMessages.error); };
                            })];
                }
            });
        });
    };
    return ChatStorage;
}());
exports.ChatStorage = ChatStorage;
exports.chatStorage = ChatStorage.getInstance();
