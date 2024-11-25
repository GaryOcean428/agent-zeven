"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToastProvider = ToastProvider;
var react_1 = require("react");
var Toast = require("@radix-ui/react-toast");
var useToast_1 = require("../hooks/useToast");
var utils_1 = require("../lib/utils");
var lucide_react_1 = require("lucide-react");
function ToastProvider(_a) {
    var children = _a.children;
    var _b = (0, useToast_1.useToast)(), toasts = _b.toasts, removeToast = _b.removeToast;
    return (<Toast.Provider>
      {children}
      {toasts.map(function (toast) { return (<Toast.Root key={toast.id} className={(0, utils_1.cn)('fixed bottom-4 right-4 z-50 flex items-start gap-4', 'bg-background border border-border rounded-lg shadow-lg p-4 w-96', 'data-[state=open]:animate-fade-in data-[state=closed]:animate-fade-out', 'data-[swipe=end]:animate-fade-out')}>
          <div className="flex-1">
            {toast.title && (<Toast.Title className="font-semibold mb-1">
                {toast.title}
              </Toast.Title>)}
            <Toast.Description className="text-foreground/80">
              {toast.message}
            </Toast.Description>
          </div>
          <Toast.Close className="p-2 hover:bg-secondary rounded-lg transition-colors" onClick={function () { return removeToast(toast.id); }}>
            <lucide_react_1.X className="w-4 h-4"/>
          </Toast.Close>
        </Toast.Root>); })}
      <Toast.Viewport />
    </Toast.Provider>);
}
