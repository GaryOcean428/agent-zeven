"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogFilter = LogFilter;
var react_1 = require("react");
function LogFilter(_a) {
    var activeFilters = _a.activeFilters, onFilterChange = _a.onFilterChange;
    var sources = [
        'primary-agent',
        'specialist-agent',
        'task-agent',
        'tool-manager',
        'memory-system',
        'router'
    ];
    var toggleFilter = function (source) {
        var newFilters = new Set(activeFilters);
        if (newFilters.has(source)) {
            newFilters.delete(source);
        }
        else {
            newFilters.add(source);
        }
        onFilterChange(newFilters);
    };
    return (<div className="p-4 border-b border-gray-700">
      <div className="flex flex-wrap gap-2">
        {sources.map(function (source) { return (<button key={source} onClick={function () { return toggleFilter(source); }} className={"px-3 py-1 text-sm rounded-full transition-colors ".concat(activeFilters.has(source)
                ? 'bg-blue-500 text-white'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700')}>
            {source.replace('-', ' ')}
          </button>); })}
      </div>
    </div>);
}
