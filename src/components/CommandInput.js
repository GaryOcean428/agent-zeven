"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandInput = CommandInput;
var react_1 = require("react");
var lucide_react_1 = require("lucide-react");
function CommandInput(_a) {
    var onSendMessage = _a.onSendMessage, isProcessing = _a.isProcessing;
    var _b = (0, react_1.useState)(''), input = _b[0], setInput = _b[1];
    var inputRef = (0, react_1.useRef)(null);
    (0, react_1.useEffect)(function () {
        var _a;
        (_a = inputRef.current) === null || _a === void 0 ? void 0 : _a.focus();
    }, [isProcessing]);
    var handleSubmit = function (e) {
        e.preventDefault();
        if (input.trim() && !isProcessing) {
            onSendMessage(input.trim());
            setInput('');
        }
    };
    return (<form onSubmit={handleSubmit} className="p-4 bg-gray-800 border-t border-gray-700">
      <div className="flex items-center bg-gray-900 rounded-lg border border-gray-700 focus-within:border-green-500 transition-colors">
        <input ref={inputRef} type="text" value={input} onChange={function (e) { return setInput(e.target.value); }} className="flex-1 bg-transparent text-white px-4 py-2 focus:outline-none font-mono" placeholder={isProcessing ? 'Waiting for response...' : 'Enter a command...'} disabled={isProcessing}/>
        <button type="submit" disabled={isProcessing || !input.trim()} className="p-2 text-green-400 hover:text-green-300 disabled:opacity-50 disabled:cursor-not-allowed">
          <lucide_react_1.Send className="w-5 h-5"/>
        </button>
      </div>
    </form>);
}
