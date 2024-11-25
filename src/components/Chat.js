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
exports.Chat = Chat;
var react_1 = require("react");
var lucide_react_1 = require("lucide-react");
var agent_system_1 = require("../lib/agent-system");
var useToast_1 = require("../hooks/useToast");
var utils_1 = require("../lib/utils");
var ScrollArea_1 = require("./ui/ScrollArea");
var framer_motion_1 = require("framer-motion");
var store_1 = require("../store");
var Tooltip_1 = require("./ui/Tooltip");
var LoadingIndicator_1 = require("./LoadingIndicator");
var MarkdownContent_1 = require("./MarkdownContent");
var SettingsProvider_1 = require("../providers/SettingsProvider");
function Chat() {
    var _this = this;
    var _a = (0, react_1.useState)(''), input = _a[0], setInput = _a[1];
    var _b = (0, react_1.useState)(false), isProcessing = _b[0], setIsProcessing = _b[1];
    var _c = (0, react_1.useState)(false), isPaused = _c[0], setIsPaused = _c[1];
    var _d = (0, react_1.useState)([]), messages = _d[0], setMessages = _d[1];
    var _e = (0, react_1.useState)(), processingState = _e[0], setProcessingState = _e[1];
    var _f = (0, react_1.useState)(), processingSubText = _f[0], setProcessingSubText = _f[1];
    var messagesEndRef = (0, react_1.useRef)(null);
    var addToast = (0, useToast_1.useToast)().addToast;
    var setSettingsPanelOpen = (0, store_1.useStore)().setSettingsPanelOpen;
    var _g = (0, react_1.useState)(true), autoScroll = _g[0], setAutoScroll = _g[1];
    var settings = (0, SettingsProvider_1.useSettings)().settings;
    var _h = (0, react_1.useState)(false), isSettingsHovered = _h[0], setIsSettingsHovered = _h[1];
    (0, react_1.useEffect)(function () {
        var _a;
        if (autoScroll) {
            (_a = messagesEndRef.current) === null || _a === void 0 ? void 0 : _a.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages, autoScroll]);
    var handleScroll = function (event) {
        var _a = event.currentTarget, scrollTop = _a.scrollTop, scrollHeight = _a.scrollHeight, clientHeight = _a.clientHeight;
        var isScrolledToBottom = Math.abs(scrollHeight - clientHeight - scrollTop) < 10;
        setAutoScroll(isScrolledToBottom);
    };
    var handleSubmit = function (e) { return __awaiter(_this, void 0, void 0, function () {
        var userMessage, assistantMessage_1, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    e.preventDefault();
                    if (!input.trim() || isProcessing)
                        return [2 /*return*/];
                    userMessage = { role: 'user', content: input.trim() };
                    setMessages(function (prev) { return __spreadArray(__spreadArray([], prev, true), [userMessage], false); });
                    setInput('');
                    setIsProcessing(true);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, 4, 5]);
                    assistantMessage_1 = { role: 'assistant', content: '' };
                    setMessages(function (prev) { return __spreadArray(__spreadArray([], prev, true), [assistantMessage_1], false); });
                    return [4 /*yield*/, agent_system_1.agentSystem.processMessage(userMessage.content, function (content) {
                            if (!isPaused) {
                                assistantMessage_1.content += content;
                                setMessages(function (prev) { return __spreadArray(__spreadArray([], prev.slice(0, -1), true), [
                                    __assign({}, assistantMessage_1)
                                ], false); });
                            }
                        }, function (state) {
                            setProcessingState(state);
                            switch (state) {
                                case 'thinking':
                                    setProcessingSubText('Analyzing request...');
                                    break;
                                case 'searching':
                                    setProcessingSubText('Gathering information...');
                                    break;
                                case 'reasoning':
                                    setProcessingSubText('Formulating response...');
                                    break;
                                case 'synthesizing':
                                    setProcessingSubText('Combining results...');
                                    break;
                                default:
                                    setProcessingSubText(undefined);
                            }
                        })];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 5];
                case 3:
                    error_1 = _a.sent();
                    addToast({
                        type: 'error',
                        title: 'Error',
                        message: error_1 instanceof Error ? error_1.message : 'An error occurred'
                    });
                    return [3 /*break*/, 5];
                case 4:
                    setIsProcessing(false);
                    setProcessingState(undefined);
                    setProcessingSubText(undefined);
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    return (<div className="flex flex-col h-full max-h-screen">
      {/* Header */}
      <div className="flex-none flex items-center justify-between p-4 border-b border-border bg-background/50 backdrop-blur-sm">
        <h1 className="text-lg font-semibold">Chat</h1>
        <div className="flex items-center gap-2">
          <Tooltip_1.Tooltip content={isPaused ? 'Resume' : 'Pause'}>
            <button onClick={function () { return setIsPaused(!isPaused); }} className={(0, utils_1.cn)('p-2 rounded-lg transition-colors', isPaused ? 'text-green-400 hover:bg-green-400/10' : 'text-yellow-400 hover:bg-yellow-400/10')}>
              {isPaused ? <lucide_react_1.Play className="w-5 h-5"/> : <lucide_react_1.Pause className="w-5 h-5"/>}
            </button>
          </Tooltip_1.Tooltip>
          <Tooltip_1.Tooltip content="Settings">
            <button onClick={function () { return setSettingsPanelOpen(true); }} onMouseEnter={function () { return setIsSettingsHovered(true); }} onMouseLeave={function () { return setIsSettingsHovered(false); }} className={(0, utils_1.cn)('p-2 rounded-lg transition-colors', isSettingsHovered || settings.theme === 'dark'
            ? 'text-primary hover:bg-primary/10'
            : 'text-muted-foreground hover:text-foreground hover:bg-secondary')}>
              <lucide_react_1.Settings className="w-5 h-5"/>
            </button>
          </Tooltip_1.Tooltip>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea_1.ScrollArea className="flex-1" onScroll={handleScroll}>
        <div className="p-4 space-y-4 max-w-5xl mx-auto">
          <framer_motion_1.AnimatePresence initial={false}>
            {messages.map(function (message, index) { return (<framer_motion_1.motion.div key={index} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className={(0, utils_1.cn)('max-w-[85%] rounded-lg p-4', message.role === 'user'
                ? 'ml-auto bg-primary text-primary-foreground'
                : 'bg-secondary text-secondary-foreground')}>
                {isProcessing && index === messages.length - 1 ? (<LoadingIndicator_1.LoadingIndicator state={processingState} subText={processingSubText}/>) : (<MarkdownContent_1.MarkdownContent content={message.content}/>)}
              </framer_motion_1.motion.div>); })}
          </framer_motion_1.AnimatePresence>
          <div ref={messagesEndRef}/>
        </div>
      </ScrollArea_1.ScrollArea>

      {/* New Messages Button */}
      {!autoScroll && (<button onClick={function () {
                var _a;
                setAutoScroll(true);
                (_a = messagesEndRef.current) === null || _a === void 0 ? void 0 : _a.scrollIntoView({ behavior: 'smooth' });
            }} className="absolute bottom-24 right-8 bg-primary text-primary-foreground px-4 py-2 rounded-full shadow-lg hover:bg-primary/90 transition-colors">
          ↓ New messages
        </button>)}

      {/* Input */}
      <form onSubmit={handleSubmit} className="flex-none p-4 border-t border-border bg-background/50 backdrop-blur-sm">
        <div className="relative flex items-end gap-2 max-w-5xl mx-auto">
          <div className="flex-1 relative">
            <textarea value={input} onChange={function (e) { return setInput(e.target.value); }} onKeyDown={function (e) {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
            }
        }} placeholder={isProcessing ? 'Processing...' : 'Type a message...'} disabled={isProcessing} className="w-full bg-secondary rounded-lg pl-4 pr-12 py-3 min-h-[48px] max-h-[200px] resize-none focus:outline-none focus:ring-2 focus:ring-primary" rows={1}/>
            <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-foreground/60 hover:text-foreground rounded-lg transition-colors" title="AI Suggestions">
              <lucide_react_1.Sparkles className="w-5 h-5"/>
            </button>
          </div>
          <button type="submit" disabled={!input.trim() || isProcessing} className="flex-none p-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:hover:bg-primary transition-colors">
            <lucide_react_1.Send className="w-5 h-5"/>
          </button>
        </div>
      </form>
    </div>);
}
