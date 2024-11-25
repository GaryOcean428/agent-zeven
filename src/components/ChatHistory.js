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
exports.ChatHistory = ChatHistory;
var react_1 = require("react");
var lucide_react_1 = require("lucide-react");
var date_fns_1 = require("date-fns");
var useChat_1 = require("../hooks/useChat");
var auto_tagger_1 = require("../lib/auto-tagger");
var export_1 = require("../utils/export");
function ChatHistory() {
    var _this = this;
    var _a = (0, react_1.useState)(false), isOpen = _a[0], setIsOpen = _a[1];
    var _b = (0, react_1.useState)(''), searchTerm = _b[0], setSearchTerm = _b[1];
    var _c = (0, react_1.useState)([]), selectedTags = _c[0], setSelectedTags = _c[1];
    var _d = (0, useChat_1.useChat)(), savedChats = _d.savedChats, loadChat = _d.loadChat, deleteChat = _d.deleteChat;
    var autoTagger = auto_tagger_1.AutoTagger.getInstance();
    var filteredChats = (savedChats === null || savedChats === void 0 ? void 0 : savedChats.filter(function (chat) {
        var matchesSearch = chat.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            chat.messages.some(function (msg) { return msg.content.toLowerCase().includes(searchTerm.toLowerCase()); });
        var matchesTags = selectedTags.length === 0 ||
            selectedTags.every(function (tag) { var _a; return (_a = chat.tags) === null || _a === void 0 ? void 0 : _a.includes(tag); });
        return matchesSearch && matchesTags;
    })) || [];
    var allTags = Array.from(new Set((savedChats === null || savedChats === void 0 ? void 0 : savedChats.flatMap(function (chat) { return chat.tags || []; })) || []));
    var handleChatSelect = function (chatId) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, loadChat(chatId)];
                case 1:
                    _a.sent();
                    setIsOpen(false);
                    return [2 /*return*/];
            }
        });
    }); };
    var handleExport = function (chat) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, export_1.downloadAsDocx)(chat)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); };
    var toggleTag = function (tag) {
        setSelectedTags(function (prev) {
            return prev.includes(tag)
                ? prev.filter(function (t) { return t !== tag; })
                : __spreadArray(__spreadArray([], prev, true), [tag], false);
        });
    };
    return (<div className="fixed bottom-4 left-4 z-50">
      <div className={"transition-all duration-200 ease-in-out ".concat(isOpen ? 'w-96' : 'w-auto')}>
        <button onClick={function () { return setIsOpen(!isOpen); }} className="bg-gray-800 p-3 rounded-lg hover:bg-gray-700 transition-colors" title="Chat History">
          <lucide_react_1.History className="w-5 h-5"/>
        </button>

        {isOpen && (<div className="absolute bottom-full mb-2 w-full bg-gray-800 rounded-lg shadow-xl border border-gray-700">
            <div className="p-4 border-b border-gray-700">
              <div className="relative">
                <input type="text" value={searchTerm} onChange={function (e) { return setSearchTerm(e.target.value); }} placeholder="Search conversations..." className="w-full bg-gray-700 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                <lucide_react_1.Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18}/>
              </div>

              {allTags.length > 0 && (<div className="mt-2 flex flex-wrap gap-2">
                  {allTags.map(function (tag) { return (<button key={tag} onClick={function () { return toggleTag(tag); }} className={"inline-flex items-center px-2 py-1 rounded-full text-xs transition-colors ".concat(selectedTags.includes(tag)
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600')}>
                      <lucide_react_1.Tag className="w-3 h-3 mr-1"/>
                      {tag}
                    </button>); })}
                </div>)}
            </div>

            <div className="max-h-96 overflow-y-auto p-2 space-y-2">
              {filteredChats.length === 0 ? (<div className="text-center text-gray-400 py-4">
                  No chats found
                </div>) : (filteredChats.map(function (chat) { return (<div key={chat.id} className="bg-gray-700 rounded-lg p-3 hover:bg-gray-600 transition-colors">
                    <div className="flex items-start justify-between">
                      <button onClick={function () { return handleChatSelect(chat.id); }} className="flex-1 text-left">
                        <h3 className="font-medium">{chat.title}</h3>
                        <div className="text-sm text-gray-400 flex items-center mt-1">
                          <lucide_react_1.Clock className="w-3 h-3 mr-1"/>
                          {(0, date_fns_1.formatDistanceToNow)(chat.timestamp)} ago
                        </div>
                      </button>
                      <div className="flex items-center space-x-2">
                        <button onClick={function () { return handleExport(chat); }} className="p-1 text-gray-400 hover:text-gray-300 transition-colors" title="Export as DOCX">
                          <lucide_react_1.Download className="w-4 h-4"/>
                        </button>
                        <button onClick={function () { return deleteChat(chat.id); }} className="p-1 text-gray-400 hover:text-red-400 transition-colors" title="Delete chat">
                          <lucide_react_1.X className="w-4 h-4"/>
                        </button>
                      </div>
                    </div>
                    {chat.tags && chat.tags.length > 0 && (<div className="mt-2 flex flex-wrap gap-1">
                        {chat.tags.map(function (tag) { return (<span key={tag} className="px-2 py-0.5 rounded-full bg-gray-600 text-xs text-gray-300">
                            {tag}
                          </span>); })}
                      </div>)}
                  </div>); }))}
            </div>
          </div>)}
      </div>
    </div>);
}
