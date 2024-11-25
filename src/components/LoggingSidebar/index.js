"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggingSidebar = LoggingSidebar;
var react_1 = require("react");
var lucide_react_1 = require("lucide-react");
var ThoughtLog_1 = require("./ThoughtLog");
var useLocalStorage_1 = require("../../hooks/useLocalStorage");
var useResizePanel_1 = require("../../hooks/useResizePanel");
var thought_logger_1 = require("../../lib/logging/thought-logger");
var utils_1 = require("../../lib/utils");
var framer_motion_1 = require("framer-motion");
function LoggingSidebar(_a) {
    var onClose = _a.onClose;
    var _b = (0, react_1.useState)(false), isPaused = _b[0], setIsPaused = _b[1];
    var _c = (0, react_1.useState)(''), searchTerm = _c[0], setSearchTerm = _c[1];
    var _d = (0, react_1.useState)(new Set()), activeFilters = _d[0], setActiveFilters = _d[1];
    var _e = (0, react_1.useState)([]), thoughts = _e[0], setThoughts = _e[1];
    var _f = (0, useLocalStorage_1.useLocalStorage)('logSidebar.width', 400), width = _f[0], setWidth = _f[1];
    var _g = (0, react_1.useState)(false), showFilters = _g[0], setShowFilters = _g[1];
    var logsEndRef = (0, react_1.useRef)(null);
    var _h = (0, useResizePanel_1.useResizePanel)(width, setWidth, 300, 600), isDragging = _h.isDragging, startResize = _h.startResize;
    (0, react_1.useEffect)(function () {
        var unsubscribe = thought_logger_1.thoughtLogger.subscribe(function (newThoughts) {
            if (!isPaused) {
                setThoughts(newThoughts);
            }
        });
        return function () { return unsubscribe(); };
    }, [isPaused]);
    (0, react_1.useEffect)(function () {
        if (!isPaused && logsEndRef.current) {
            logsEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [thoughts, isPaused]);
    var filteredThoughts = thoughts.filter(function (thought) {
        var matchesSearch = searchTerm === '' ||
            thought.message.toLowerCase().includes(searchTerm.toLowerCase());
        var matchesFilter = activeFilters.size === 0 ||
            activeFilters.has(thought.level);
        return matchesSearch && matchesFilter;
    });
    var toggleFilter = function (type) {
        var newFilters = new Set(activeFilters);
        if (newFilters.has(type)) {
            newFilters.delete(type);
        }
        else {
            newFilters.add(type);
        }
        setActiveFilters(newFilters);
    };
    var clearFilters = function () {
        setActiveFilters(new Set());
        setSearchTerm('');
    };
    return (<div className={(0, utils_1.cn)("h-full bg-background/95 backdrop-blur-sm border-l border-border flex flex-col", isDragging && "select-none")} style={{ width: width }}>
      {/* Resize Handle */}
      <div className={(0, utils_1.cn)("absolute left-0 top-0 w-1 h-full cursor-ew-resize hover:bg-primary transition-colors", isDragging && "bg-primary")} onMouseDown={startResize}/>

      {/* Header */}
      <div className="flex-none p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">System Thoughts</h2>
          <div className="flex items-center gap-2">
            <button onClick={function () { return setShowFilters(!showFilters); }} className={(0, utils_1.cn)("p-2 rounded-lg transition-colors", showFilters || activeFilters.size > 0
            ? "text-primary hover:text-primary/80"
            : "text-muted-foreground hover:text-foreground")}>
              <lucide_react_1.Filter className="w-5 h-5"/>
            </button>
            <button onClick={function () { return setIsPaused(!isPaused); }} className={(0, utils_1.cn)("p-2 rounded-lg", isPaused ? "text-green-400 hover:text-green-300" : "text-yellow-400 hover:text-yellow-300")}>
              {isPaused ? <lucide_react_1.Play className="w-5 h-5"/> : <lucide_react_1.Pause className="w-5 h-5"/>}
            </button>
            <button onClick={onClose} className="p-2 text-muted-foreground hover:text-foreground rounded-lg lg:hidden">
              <lucide_react_1.X className="w-5 h-5"/>
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <input type="text" value={searchTerm} onChange={function (e) { return setSearchTerm(e.target.value); }} placeholder="Search thoughts..." className="w-full bg-secondary text-foreground rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"/>
          <lucide_react_1.Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18}/>
        </div>

        {/* Filters */}
        <framer_motion_1.AnimatePresence>
          {showFilters && (<framer_motion_1.motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="mt-4 space-y-2 overflow-hidden">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Thought Types</span>
                {activeFilters.size > 0 && (<button onClick={clearFilters} className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1">
                    <lucide_react_1.X className="w-3 h-3"/>
                    Clear filters
                  </button>)}
              </div>
              <div className="flex flex-wrap gap-2">
                {Object.values(thought_logger_1.thoughtLogger.getThoughtTypes()).map(function (type) { return (<button key={type} onClick={function () { return toggleFilter(type); }} className={(0, utils_1.cn)("px-3 py-1 text-xs rounded-full transition-colors", activeFilters.has(type)
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-muted-foreground hover:text-foreground")}>
                    {type}
                  </button>); })}
              </div>
            </framer_motion_1.motion.div>)}
        </framer_motion_1.AnimatePresence>
      </div>

      {/* Thoughts */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        <framer_motion_1.AnimatePresence initial={false}>
          {filteredThoughts.map(function (thought) { return (<ThoughtLog_1.ThoughtLog key={thought.id} thought={thought}/>); })}
        </framer_motion_1.AnimatePresence>
        <div ref={logsEndRef}/>
      </div>
    </div>);
}
