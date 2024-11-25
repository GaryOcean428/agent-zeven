"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToastProvider = ToastProvider;
exports.useToast = useToast;
var react_1 = require("react");
var useToast_1 = require("../hooks/useToast");
var ToastContext = (0, react_1.createContext)(undefined);
function ToastProvider(_a) {
    var children = _a.children;
    var _b = (0, useToast_1.useToast)(), addToast = _b.addToast, removeToast = _b.removeToast;
    return (<ToastContext.Provider value={{ addToast: addToast, removeToast: removeToast }}>
      {children}
    </ToastContext.Provider>);
}
function useToast() {
    var context = (0, react_1.useContext)(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
}
