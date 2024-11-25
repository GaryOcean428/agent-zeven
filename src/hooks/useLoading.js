"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useLoading = void 0;
var zustand_1 = require("zustand");
exports.useLoading = (0, zustand_1.create)(function (set) { return ({
    isLoading: false,
    message: null,
    setLoading: function (isLoading, message) { return set({ isLoading: isLoading, message: message || null }); },
}); });
