"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MainContent = MainContent;
var react_1 = require("react");
var framer_motion_1 = require("framer-motion");
function MainContent(_a) {
    var activePanel = _a.activePanel, children = _a.children;
    var variants = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -20 }
    };
    return (<div className="h-full flex flex-col">
      <framer_motion_1.AnimatePresence mode="wait">
        <framer_motion_1.motion.div key={activePanel} variants={variants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.2 }} className="h-full">
          {children}
        </framer_motion_1.motion.div>
      </framer_motion_1.AnimatePresence>
    </div>);
}
