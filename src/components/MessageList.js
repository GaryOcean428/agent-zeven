"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageList = MessageList;
var react_1 = require("react");
var date_fns_1 = require("date-fns");
function MessageList(_a) {
    var messages = _a.messages;
    return (<div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map(function (message) { return (<div key={message.id} className={"animate-fade-in ".concat(message.role === 'user' ? 'flex justify-end' : 'flex justify-start')}>
          <div className={"max-w-[80%] ".concat(message.role === 'user'
                ? 'bg-blue-600 rounded-l-lg rounded-tr-lg'
                : 'bg-gray-800 rounded-r-lg rounded-tl-lg', " p-4")}>
            <div className="flex flex-col">
              <div className="whitespace-pre-wrap break-words">
                {message.content}
              </div>
              <div className="flex items-center justify-between mt-2 text-xs text-gray-400">
                <span>{message.role === 'user' ? 'You' : 'Agent One'}</span>
                <span>{(0, date_fns_1.formatDistanceToNow)(message.timestamp)} ago</span>
              </div>
              {message.model && (<div className="text-xs text-gray-500 mt-1">
                  {message.model}
                </div>)}
            </div>
          </div>
        </div>); })}
    </div>);
}
