"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Layout = Layout;
var react_1 = require("react");
var Sidebar_1 = require("../Sidebar");
var LoggingSidebar_1 = require("../LoggingSidebar");
var SettingsProvider_1 = require("../../providers/SettingsProvider");
var utils_1 = require("../../lib/utils");
var lucide_react_1 = require("lucide-react");
var useLocalStorage_1 = require("../../hooks/useLocalStorage");
var framer_motion_1 = require("framer-motion");
function Layout(_a) {
    var children = _a.children, activePanel = _a.activePanel, onPanelChange = _a.onPanelChange;
    var _b = (0, useLocalStorage_1.useLocalStorage)('sidebar.open', true), isSidebarOpen = _b[0], setIsSidebarOpen = _b[1];
    var _c = (0, useLocalStorage_1.useLocalStorage)('logging.open', true), isLoggingOpen = _c[0], setIsLoggingOpen = _c[1];
    var settings = (0, SettingsProvider_1.useSettings)().settings;
    return (<div className={(0, utils_1.cn)("flex h-screen overflow-hidden", settings.theme === 'dark' ? 'dark' : '')}>
      {/* Background patterns */}
      <div className="absolute inset-0 bg-grid-white/[0.02] -z-10"/>
      <div className="absolute inset-0 bg-gradient-to-b from-black/5 to-black/20 -z-10"/>
      
      {/* Mobile Menu Button */}
      <button onClick={function () { return setIsSidebarOpen(!isSidebarOpen); }} className="fixed top-4 left-4 z-50 p-2 bg-secondary rounded-lg hover:bg-secondary/80 transition-colors lg:hidden" aria-label={isSidebarOpen ? 'Close menu' : 'Open menu'}>
        {isSidebarOpen ? <lucide_react_1.X className="w-6 h-6"/> : <lucide_react_1.Menu className="w-6 h-6"/>}
      </button>

      {/* Main Sidebar */}
      <framer_motion_1.AnimatePresence mode="wait">
        {(isSidebarOpen || !('ontouchstart' in window)) && (<framer_motion_1.motion.div initial={{ x: -320 }} animate={{ x: 0 }} exit={{ x: -320 }} transition={{ type: "spring", damping: 20 }} className="fixed inset-y-0 left-0 w-64 z-30 lg:relative">
            <Sidebar_1.Sidebar activePanel={activePanel} onPanelChange={onPanelChange}/>
          </framer_motion_1.motion.div>)}
      </framer_motion_1.AnimatePresence>

      {/* Mobile Sidebar Overlay */}
      <framer_motion_1.AnimatePresence>
        {isSidebarOpen && (<framer_motion_1.motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/50 z-20 lg:hidden backdrop-blur-sm" onClick={function () { return setIsSidebarOpen(false); }}/>)}
      </framer_motion_1.AnimatePresence>

      {/* Main Content */}
      <div className="flex flex-1 relative">
        <main className={(0, utils_1.cn)("flex-1 overflow-hidden transition-all duration-300", isSidebarOpen ? "lg:ml-64" : "lg:ml-0")}>
          {children}
        </main>

        {/* Logging Sidebar */}
        <framer_motion_1.AnimatePresence mode="wait">
          {(isLoggingOpen || !('ontouchstart' in window)) && (<framer_motion_1.motion.div initial={{ x: 320 }} animate={{ x: 0 }} exit={{ x: 320 }} transition={{ type: "spring", damping: 20 }} className="fixed inset-y-0 right-0 w-80 z-30 lg:relative">
              <LoggingSidebar_1.LoggingSidebar onClose={function () { return setIsLoggingOpen(false); }}/>
            </framer_motion_1.motion.div>)}
        </framer_motion_1.AnimatePresence>

        {/* Mobile Logging Toggle */}
        <button onClick={function () { return setIsLoggingOpen(!isLoggingOpen); }} className="fixed bottom-4 right-4 z-50 p-2 bg-secondary rounded-lg hover:bg-secondary/80 transition-colors lg:hidden" aria-label={isLoggingOpen ? 'Close logs' : 'Open logs'}>
          <lucide_react_1.Menu className="w-6 h-6"/>
        </button>
      </div>
    </div>);
}
