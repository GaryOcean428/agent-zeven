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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingsProvider = SettingsProvider;
exports.useSettings = useSettings;
var react_1 = require("react");
var useLocalStorage_1 = require("../hooks/useLocalStorage");
var useToast_1 = require("../hooks/useToast");
var defaultSettings = {
    theme: 'system',
    apiKeys: {
        xai: '',
        groq: '',
        perplexity: '',
        huggingface: '',
        github: '',
        pinecone: ''
    },
    performance: {
        temperature: 0.7,
        maxTokens: 2048,
        streaming: true
    },
    memory: {
        enabled: true,
        contextSize: 4096,
        memoryLimit: 1000,
        vectorMemoryEnabled: true
    },
    models: {
        defaultModel: 'grok-beta',
        enabledModels: ['grok-beta', 'llama-3.2-70b-preview', 'llama-3.2-7b-preview']
    },
    notifications: {
        enabled: true,
        sound: true,
        showErrors: true,
        showSuccess: true
    }
};
var SettingsContext = (0, react_1.createContext)(undefined);
function SettingsProvider(_a) {
    var _this = this;
    var children = _a.children;
    var _b = (0, useLocalStorage_1.useLocalStorage)('gary8-settings', defaultSettings), settings = _b[0], setSettings = _b[1];
    var addToast = (0, useToast_1.useToast)().addToast;
    var updateSettings = (0, react_1.useCallback)(function (newSettings) { return __awaiter(_this, void 0, void 0, function () {
        var updated;
        return __generator(this, function (_a) {
            try {
                updated = __assign(__assign({}, settings), newSettings);
                setSettings(updated);
                addToast({
                    type: 'success',
                    message: 'Settings updated successfully',
                    duration: 3000
                });
            }
            catch (error) {
                addToast({
                    type: 'error',
                    title: 'Failed to update settings',
                    message: error instanceof Error ? error.message : 'An error occurred',
                    duration: 5000
                });
                throw error;
            }
            return [2 /*return*/];
        });
    }); }, [settings, setSettings, addToast]);
    var setTheme = (0, react_1.useCallback)(function (theme) {
        updateSettings({ theme: theme });
    }, [updateSettings]);
    // Apply theme effect
    react_1.default.useEffect(function () {
        var root = window.document.documentElement;
        root.classList.remove('light', 'dark');
        if (settings.theme === 'system') {
            var systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
                ? 'dark'
                : 'light';
            root.classList.add(systemTheme);
        }
        else {
            root.classList.add(settings.theme);
        }
    }, [settings.theme]);
    return (<SettingsContext.Provider value={{ settings: settings, updateSettings: updateSettings, setTheme: setTheme }}>
      {children}
    </SettingsContext.Provider>);
}
function useSettings() {
    var context = (0, react_1.useContext)(SettingsContext);
    if (!context) {
        throw new Error('useSettings must be used within a SettingsProvider');
    }
    return context;
}
