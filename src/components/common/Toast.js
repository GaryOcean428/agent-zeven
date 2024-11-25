"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Toast = Toast;
var react_1 = require("react");
var framer_motion_1 = require("framer-motion");
var useToast_1 = require("../../hooks/useToast");
var lucide_react_1 = require("lucide-react");
function Toast() {
    var _a = (0, useToast_1.useToast)(), toasts = _a.toasts, removeToast = _a.removeToast;
    var getIcon = function (type) {
        switch (type) {
            case 'success':
                return <lucide_react_1.CheckCircle className="w-5 h-5 text-green-400"/>;
            case 'error':
                return <lucide_react_1.AlertCircle className="w-5 h-5 text-red-400"/>;
            default:
                return <lucide_react_1.Info className="w-5 h-5 text-blue-400"/>;
        }
    };
    return (<div aria-live="polite" aria-atomic="true" className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      <framer_motion_1.AnimatePresence>
        {toasts.map(function (toast) { return (<framer_motion_1.motion.div key={toast.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: 100 }} className={"\n              min-w-[300px] max-w-md p-4 rounded-lg shadow-lg backdrop-blur-sm\n              ".concat(toast.type === 'success' ? 'bg-green-500/10 border border-green-500/20' :
                toast.type === 'error' ? 'bg-red-500/10 border border-red-500/20' :
                    'bg-blue-500/10 border border-blue-500/20', "\n            ")}>
            <div className="flex items-start gap-3">
              {getIcon(toast.type)}
              <div className="flex-1">
                {toast.title && (<h3 className="font-medium mb-1">{toast.title}</h3>)}
                <p className="text-sm opacity-90">{toast.message}</p>
              </div>
              <button onClick={function () { return removeToast(toast.id); }} className="text-gray-400 hover:text-gray-300" aria-label="Close notification">
                <lucide_react_1.X className="w-5 h-5"/>
              </button>
            </div>
          </framer_motion_1.motion.div>); })}
      </framer_motion_1.AnimatePresence>
    </div>);
}
