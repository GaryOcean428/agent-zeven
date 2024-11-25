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
exports.useChat = useChat;
var react_1 = require("react");
var auto_tagger_1 = require("../lib/auto-tagger");
var useLocalStorage_1 = require("./useLocalStorage");
var useToast_1 = require("./useToast");
function useChat() {
    var _this = this;
    var _a = (0, react_1.useState)([]), messages = _a[0], setMessages = _a[1];
    var _b = (0, useLocalStorage_1.useLocalStorage)('chat-history', []), savedChats = _b[0], setSavedChats = _b[1];
    var _c = (0, react_1.useState)(null), currentChatId = _c[0], setCurrentChatId = _c[1];
    var addToast = (0, useToast_1.useToast)().addToast;
    var autoTagger = auto_tagger_1.AutoTagger.getInstance();
    var addMessage = (0, react_1.useCallback)(function (messageOrUpdater) {
        setMessages(function (prev) {
            if (typeof messageOrUpdater === 'function') {
                return messageOrUpdater(prev);
            }
            return __spreadArray(__spreadArray([], prev, true), [messageOrUpdater], false);
        });
    }, []);
    var saveChat = (0, react_1.useCallback)(function (title) { return __awaiter(_this, void 0, void 0, function () {
        var newChat;
        return __generator(this, function (_a) {
            newChat = {
                id: crypto.randomUUID(),
                title: title,
                messages: messages,
                timestamp: Date.now(),
                tags: autoTagger.generateTags(messages)
            };
            setSavedChats(function (prev) { return __spreadArray(__spreadArray([], prev, true), [newChat], false); });
            setCurrentChatId(newChat.id);
            addToast({
                type: 'success',
                message: 'Chat saved successfully',
                duration: 3000
            });
            return [2 /*return*/, newChat.id];
        });
    }); }, [messages, setSavedChats, addToast]);
    var loadChat = (0, react_1.useCallback)(function (chatId) { return __awaiter(_this, void 0, void 0, function () {
        var chat;
        return __generator(this, function (_a) {
            chat = savedChats.find(function (c) { return c.id === chatId; });
            if (chat) {
                setMessages(chat.messages);
                setCurrentChatId(chatId);
                addToast({
                    type: 'success',
                    message: 'Chat loaded successfully',
                    duration: 3000
                });
            }
            return [2 /*return*/];
        });
    }); }, [savedChats, addToast]);
    var deleteChat = (0, react_1.useCallback)(function (chatId) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            setSavedChats(function (prev) { return prev.filter(function (chat) { return chat.id !== chatId; }); });
            if (currentChatId === chatId) {
                setMessages([]);
                setCurrentChatId(null);
            }
            addToast({
                type: 'success',
                message: 'Chat deleted successfully',
                duration: 3000
            });
            return [2 /*return*/];
        });
    }); }, [currentChatId, setSavedChats, addToast]);
    var clearMessages = (0, react_1.useCallback)(function () {
        setMessages([]);
        setCurrentChatId(null);
    }, []);
    return {
        messages: messages,
        savedChats: savedChats,
        currentChatId: currentChatId,
        addMessage: addMessage,
        clearMessages: clearMessages,
        saveChat: saveChat,
        loadChat: loadChat,
        deleteChat: deleteChat
    };
}
