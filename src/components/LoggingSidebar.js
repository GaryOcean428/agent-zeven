"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggingSidebar = LoggingSidebar;
var react_1 = require("react");
var lucide_react_1 = require("lucide-react");
var utils_1 = require("../lib/utils");
var ScrollArea_1 = require("./ui/ScrollArea");
var framer_motion_1 = require("framer-motion");
var thought_logger_1 = require("../lib/logging/thought-logger");
function LoggingSidebar() {
    var _a = (0, react_1.useState)(false), isPaused = _a[0], setIsPaused = _a[1];
    var _b = (0, react_1.useState)(''), searchTerm = _b[0], setSearchTerm = _b[1];
    var _c = (0, react_1.useState)(new Set()), activeFilters = _c[0], setActiveFilters = _c[1];
    var _d = (0, react_1.useState)([]), thoughts = _d[0], setThoughts = _d[1];
    var _e = (0, react_1.useState)(false), isCollapsed = _e[0], setIsCollapsed = _e[1];
    var _f = (0, react_1.useState)(false), showFilters = _f[0], setShowFilters = _f[1];
    var logsEndRef = (0, react_1.useRef)(null);
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
    if (isCollapsed) {
        return (<framer_motion_1.motion.div initial={{ width: 320 }} animate={{ width: 48 }} transition={{ type: 'spring', damping: 20 }} className="bg-background/95 backdrop-blur-sm border-l border-border flex flex-col items-center py-4">
        <button onClick={function () { return setIsCollapsed(false); }} className="text-muted-foreground hover:text-foreground p-2">
          <lucide_react_1.ChevronLeft className="w-5 h-5"/>
        </button>
      </framer_motion_1.motion.div>);
    }
    return (<framer_motion_1.motion.div initial={{ width: 48 }} animate={{ width: 320 }} transition={{ type: 'spring', damping: 20 }} className="h-full bg-background/95 backdrop-blur-sm border-l border-border flex flex-col">
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
            <button onClick={function () { return setIsCollapsed(true); }} className="p-2 text-muted-foreground hover:text-foreground rounded-lg">
              <lucide_react_1.ChevronRight className="w-5 h-5"/>
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
      <ScrollArea_1.ScrollArea className="flex-1">
        <div className="p-4 space-y-3">
          <framer_motion_1.AnimatePresence initial={false}>
            {filteredThoughts.map(function (thought) { return (<framer_motion_1.motion.div key={thought.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className={(0, utils_1.cn)("rounded-lg border p-4", thought.level === 'error' && 'bg-red-500/10 border-red-500/20', thought.level === 'warning' && 'bg-yellow-500/10 border-yellow-500/20', thought.level === 'success' && 'bg-green-500/10 border-green-500/20', thought.level === 'info' && 'bg-blue-500/10 border-blue-500/20')}>
                <div className="flex items-center justify-between mb-2">
                  <span className={(0, utils_1.cn)("text-xs font-medium", thought.level === 'error' && 'text-red-400', thought.level === 'warning' && 'text-yellow-400', thought.level === 'success' && 'text-green-400', thought.level === 'info' && 'text-blue-400')}>
                    {thought.level.toUpperCase()}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {new Date(thought.timestamp).toLocaleTimeString()}
                  </span>
                </div>
                <p className="text-sm">{thought.message}</p>
                {thought.metadata && (<pre className="mt-2 text-xs bg-secondary/50 p-2 rounded overflow-x-auto">
                    {JSON.stringify(thought.metadata, null, 2)}
                  </pre>)}
              </framer_motion_1.motion.div>); })}
          </framer_motion_1.AnimatePresence>
          <div ref={logsEndRef}/>
        </div>
      </ScrollArea_1.ScrollArea>
    </framer_motion_1.motion.div>);
}
