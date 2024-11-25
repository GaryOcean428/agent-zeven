"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useToast = void 0;
var zustand_1 = require("zustand");
exports.useToast = (0, zustand_1.create)(function (set) { return ({
    toasts: [],
    addToast: function (toast) {
        var id = crypto.randomUUID();
        set(function (state) { return ({
            toasts: __spreadArray(__spreadArray([], state.toasts, true), [__assign(__assign({}, toast), { id: id })], false),
        }); });
        if (toast.duration !== 0) {
            setTimeout(function () {
                set(function (state) { return ({
                    toasts: state.toasts.filter(function (t) { return t.id !== id; }),
                }); });
            }, toast.duration || 5000);
        }
    },
    removeToast: function (id) {
        return set(function (state) { return ({
            toasts: state.toasts.filter(function (t) { return t.id !== id; }),
        }); });
    },
}); });
