"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogGroup = LogGroup;
var react_1 = require("react");
var lucide_react_1 = require("lucide-react");
function LogGroup(_a) {
    var logs = _a.logs;
    var _b = (0, react_1.useState)(true), isExpanded = _b[0], setIsExpanded = _b[1];
    var getLogLevelColor = function (level) {
        switch (level) {
            case 'error': return 'text-red-400';
            case 'warning': return 'text-yellow-400';
            case 'debug': return 'text-purple-400';
            default: return 'text-blue-400';
        }
    };
    var formatTimestamp = function (timestamp) {
        var date = new Date(timestamp);
        return date.toLocaleTimeString();
    };
    return (<div className="bg-gray-800 rounded-lg overflow-hidden">
      <button onClick={function () { return setIsExpanded(!isExpanded); }} className="w-full p-3 flex items-center justify-between hover:bg-gray-700">
        <div className="flex items-center space-x-2">
          {isExpanded ? <lucide_react_1.ChevronDown size={16}/> : <lucide_react_1.ChevronRight size={16}/>}
          <span className="font-medium">{logs[0].source}</span>
          <span className="text-sm text-gray-400">
            {formatTimestamp(logs[0].timestamp)}
          </span>
        </div>
        <span className="text-sm text-gray-400">{logs.length} entries</span>
      </button>

      {isExpanded && (<div className="px-3 pb-3 space-y-2">
          {logs.map(function (log) { return (<div key={log.id} className="pl-6 border-l-2 border-gray-700">
              <div className="flex items-start space-x-2">
                <span className={"text-sm ".concat(getLogLevelColor(log.level))}>
                  [{log.level}]
                </span>
                <span className="text-sm">{log.message}</span>
                <span className="text-xs text-gray-500">
                  {formatTimestamp(log.timestamp)}
                </span>
              </div>
              {log.metadata && (<pre className="mt-1 text-xs text-gray-400 overflow-x-auto">
                  {JSON.stringify(log.metadata, null, 2)}
                </pre>)}
            </div>); })}
        </div>)}
    </div>);
}
