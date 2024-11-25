"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoadingIndicator = LoadingIndicator;
var react_1 = require("react");
var lucide_react_1 = require("lucide-react");
var framer_motion_1 = require("framer-motion");
function LoadingIndicator(_a) {
    var state = _a.state, subText = _a.subText;
    if (!state)
        return null;
    var getIcon = function () {
        switch (state) {
            case 'thinking':
                return lucide_react_1.Brain;
            case 'searching':
                return lucide_react_1.Search;
            case 'coding':
                return lucide_react_1.Code;
            case 'analyzing':
                return lucide_react_1.Calculator;
            case 'reasoning':
                return lucide_react_1.Clock;
            case 'retrieving':
                return lucide_react_1.Database;
            case 'synthesizing':
                return lucide_react_1.Sparkles;
            case 'planning':
                return lucide_react_1.RefreshCw;
            default:
                return lucide_react_1.Zap;
        }
    };
    var getMessage = function () {
        switch (state) {
            case 'thinking':
                return 'Analyzing request...';
            case 'searching':
                return 'Searching for information...';
            case 'coding':
                return 'Generating code...';
            case 'analyzing':
                return 'Analyzing data...';
            case 'reasoning':
                return 'Reasoning about the problem...';
            case 'retrieving':
                return 'Retrieving from memory...';
            case 'synthesizing':
                return 'Synthesizing results...';
            case 'planning':
                return 'Planning next steps...';
            default:
                return 'Processing...';
        }
    };
    var Icon = getIcon();
    return (<framer_motion_1.AnimatePresence mode="wait">
      <framer_motion_1.motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="flex flex-col items-center space-y-4 p-6 bg-gray-800/50 rounded-lg backdrop-blur-sm border border-gray-700/50">
        {/* Icon Animation */}
        <framer_motion_1.motion.div animate={{
            scale: [1, 1.2, 1],
            rotate: state === 'thinking' ? [0, 360] : 0
        }} transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
        }} className="relative">
          <Icon className="w-8 h-8 text-blue-400"/>
          
          {/* Orbital Particles */}
          <framer_motion_1.motion.div animate={{ rotate: 360 }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }} className="absolute inset-0">
            {[0, 120, 240].map(function (degree, i) { return (<framer_motion_1.motion.div key={i} className="absolute w-2 h-2 bg-blue-400 rounded-full" style={{
                left: '50%',
                top: '50%',
                transform: "rotate(".concat(degree, "deg) translateX(20px)")
            }} animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5]
            }} transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.5
            }}/>); })}
          </framer_motion_1.motion.div>
        </framer_motion_1.motion.div>

        {/* Message */}
        <div className="text-center space-y-2">
          <framer_motion_1.motion.div animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity }} className="font-medium">
            {getMessage()}
          </framer_motion_1.motion.div>
          
          {subText && (<framer_motion_1.motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm text-gray-400">
              {subText}
            </framer_motion_1.motion.div>)}
        </div>

        {/* Progress Bar */}
        <framer_motion_1.motion.div className="w-48 h-1 bg-gray-700 rounded-full overflow-hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
          <framer_motion_1.motion.div className="h-full bg-blue-500" animate={{
            x: ["-100%", "100%"]
        }} transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "linear"
        }}/>
        </framer_motion_1.motion.div>
      </framer_motion_1.motion.div>
    </framer_motion_1.AnimatePresence>);
}
