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
Object.defineProperty(exports, "__esModule", { value: true });
exports.useStore = void 0;
var zustand_1 = require("zustand");
var middleware_1 = require("zustand/middleware");
exports.useStore = (0, zustand_1.create)()((0, middleware_1.persist)(function (set) { return ({
    activeView: 'chat',
    settingsPanelOpen: false,
    sidebarOpen: true,
    loggingOpen: true,
    theme: 'system',
    apiKeys: {
        xai: '',
        groq: '',
        perplexity: '',
        huggingface: '',
        github: '',
        pinecone: ''
    },
    setActiveView: function (view) { return set({ activeView: view }); },
    setSettingsPanelOpen: function (open) { return set({ settingsPanelOpen: open }); },
    setSidebarOpen: function (open) { return set({ sidebarOpen: open }); },
    setLoggingOpen: function (open) { return set({ loggingOpen: open }); },
    setTheme: function (theme) { return set({ theme: theme }); },
    setApiKey: function (provider, key) { return set(function (state) {
        var _a;
        return ({
            apiKeys: __assign(__assign({}, state.apiKeys), (_a = {}, _a[provider] = key, _a))
        });
    }); }
}); }, {
    name: 'gary8-storage',
    partialize: function (state) { return ({
        theme: state.theme,
        apiKeys: state.apiKeys,
        sidebarOpen: state.sidebarOpen,
        loggingOpen: state.loggingOpen
    }); }
}));
