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
exports.default = Terminal;
var react_1 = require("react");
var PromptEnhancer_1 = require("./PromptEnhancer");
var lucide_react_1 = require("lucide-react");
var react_markdown_1 = require("react-markdown");
function Terminal(_a) {
    var _this = this;
    var messages = _a.messages, onSendMessage = _a.onSendMessage, isProcessing = _a.isProcessing, isPaused = _a.isPaused, onPauseToggle = _a.onPauseToggle;
    var _b = (0, react_1.useState)(''), input = _b[0], setInput = _b[1];
    var _c = (0, react_1.useState)(false), showEnhancer = _c[0], setShowEnhancer = _c[1];
    var _d = (0, react_1.useState)(null), activeEnhancement = _d[0], setActiveEnhancement = _d[1];
    var messagesEndRef = (0, react_1.useRef)(null);
    var inputRef = (0, react_1.useRef)(null);
    (0, react_1.useEffect)(function () {
        var _a;
        (_a = messagesEndRef.current) === null || _a === void 0 ? void 0 : _a.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);
    (0, react_1.useEffect)(function () {
        if (inputRef.current) {
            inputRef.current.style.height = 'auto';
            inputRef.current.style.height = "".concat(inputRef.current.scrollHeight, "px");
        }
    }, [input]);
    var handleSubmit = function (e) { return __awaiter(_this, void 0, void 0, function () {
        var message, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    e.preventDefault();
                    if (!input.trim() || isProcessing)
                        return [2 /*return*/];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    message = input.trim();
                    setInput('');
                    setShowEnhancer(false);
                    return [4 /*yield*/, onSendMessage(activeEnhancement ? "".concat(message, "\n\n").concat(activeEnhancement) : message)];
                case 2:
                    _a.sent();
                    setActiveEnhancement(null);
                    if (inputRef.current) {
                        inputRef.current.style.height = '48px';
                    }
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    console.error('Failed to process message:', error_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    var handleKeyDown = function (e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
        }
    };
    var handleEnhance = function (enhancement) {
        setActiveEnhancement(enhancement);
        setShowEnhancer(false);
    };
    return (<div className="flex-1 flex flex-col bg-gray-900">
      <div className="flex-1 overflow-auto p-4 space-y-4">
        {messages.map(function (message) { return (<div key={message.id} className={"message-container ".concat(message.role === 'user' ? 'user-container' : 'ai-container')}>
            <div className={"message ".concat(message.role === 'user' ? 'message-user' : 'message-ai', " p-4")}>
              <div className="flex items-start">
                <span className="font-mono text-sm text-gray-400 mr-2">
                  {message.role === 'user' ? '>' : '#'}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="prose prose-invert max-w-none">
                    <react_markdown_1.default>{message.content}</react_markdown_1.default>
                  </div>
                  {message.role === 'assistant' && message.model && (<div className="text-xs text-gray-500 mt-2">{message.model}</div>)}
                </div>
              </div>
            </div>
          </div>); })}
        <div ref={messagesEndRef}/>
      </div>

      <div className="border-t border-gray-800 bg-gray-900 p-4">
        <form onSubmit={handleSubmit} className="flex items-end gap-4">
          <button type="button" onClick={onPauseToggle} className={"flex-none w-10 h-10 flex items-center justify-center rounded-lg transition-colors ".concat(isPaused
            ? 'text-green-400 hover:text-green-300 hover:bg-gray-800'
            : 'text-yellow-400 hover:text-yellow-300 hover:bg-gray-800')} title={isPaused ? 'Resume' : 'Pause'}>
            {isPaused ?
            <lucide_react_1.PlayCircle className="w-6 h-6"/> :
            <lucide_react_1.PauseCircle className="w-6 h-6"/>}
          </button>

          <div className="flex-1 relative">
            <textarea ref={inputRef} value={input} onChange={function (e) { return setInput(e.target.value); }} onKeyDown={handleKeyDown} className="w-full bg-gray-800 text-gray-100 rounded-lg p-3 pr-12 resize-none min-h-[48px] max-h-[200px] focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder={isProcessing ? 'Processing...' : 'Enter a message...'} disabled={isProcessing} rows={1} style={{ height: '48px', lineHeight: '24px' }}/>
            <button type="button" onClick={function () { return setShowEnhancer(!showEnhancer); }} className={"absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full transition-colors ".concat(activeEnhancement
            ? 'text-blue-400 hover:text-blue-300'
            : 'text-gray-400 hover:text-white hover:bg-gray-700')} title={activeEnhancement ? 'Enhancement active' : 'Enhance prompt'}>
              <lucide_react_1.Sparkles className="w-5 h-5"/>
            </button>
          </div>

          <button type="submit" disabled={!input.trim() || isProcessing} className="flex-none w-10 h-10 flex items-center justify-center rounded-lg transition-colors bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed">
            <lucide_react_1.Send className="w-5 h-5"/>
          </button>
        </form>

        {showEnhancer && (<div className="absolute bottom-20 right-4">
            <PromptEnhancer_1.PromptEnhancer onEnhance={handleEnhance} activeEnhancement={activeEnhancement}/>
          </div>)}
      </div>
    </div>);
}
