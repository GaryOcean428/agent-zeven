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
exports.ThemeSettings = ThemeSettings;
var react_1 = require("react");
var lucide_react_1 = require("lucide-react");
var SettingsContext_1 = require("../../../context/SettingsContext");
var SaveButton_1 = require("../../SaveButton");
var presetThemes = {
    default: {
        dark: {
            primary: '#3B82F6',
            secondary: '#6B7280',
            accent: '#10B981',
            background: '#111827',
            surface: '#1F2937',
            text: '#F3F4F6'
        },
        light: {
            primary: '#2563EB',
            secondary: '#4B5563',
            accent: '#059669',
            background: '#F9FAFB',
            surface: '#FFFFFF',
            text: '#111827'
        }
    },
    ocean: {
        dark: {
            primary: '#0EA5E9',
            secondary: '#64748B',
            accent: '#06B6D4',
            background: '#0F172A',
            surface: '#1E293B',
            text: '#F1F5F9'
        }
    },
    forest: {
        dark: {
            primary: '#22C55E',
            secondary: '#71717A',
            accent: '#10B981',
            background: '#14532D',
            surface: '#166534',
            text: '#ECFDF5'
        }
    }
};
function ThemeSettings() {
    var _this = this;
    var _a = (0, SettingsContext_1.useSettings)(), settings = _a.settings, updateSettings = _a.updateSettings;
    var _b = (0, react_1.useState)(settings.theme), localSettings = _b[0], setLocalSettings = _b[1];
    var isDirty = JSON.stringify(localSettings) !== JSON.stringify(settings.theme);
    var handleSave = function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, updateSettings('theme', localSettings)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); };
    var handleThemeChange = function (mode) {
        setLocalSettings(function (prev) { return (__assign(__assign({}, prev), { mode: mode, colors: mode === 'light' ? presetThemes.default.light : presetThemes.default.dark })); });
    };
    var handlePresetChange = function (preset) {
        setLocalSettings(function (prev) { return (__assign(__assign({}, prev), { colors: presetThemes[preset][prev.mode] })); });
    };
    return (<div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium">Theme Settings</h3>
          <p className="text-sm text-gray-400">Customize the application appearance</p>
        </div>
        <lucide_react_1.Palette className="w-5 h-5 text-blue-400"/>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block font-medium mb-2">Theme Mode</label>
          <div className="flex space-x-4">
            {['light', 'dark', 'system'].map(function (mode) { return (<button key={mode} onClick={function () { return handleThemeChange(mode); }} className={"px-4 py-2 rounded-lg ".concat(localSettings.mode === mode
                ? 'bg-blue-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600')}>
                {mode.charAt(0).toUpperCase() + mode.slice(1)}
              </button>); })}
          </div>
        </div>

        <div>
          <label className="block font-medium mb-2">Color Preset</label>
          <div className="grid grid-cols-3 gap-4">
            {Object.keys(presetThemes).map(function (preset) { return (<button key={preset} onClick={function () { return handlePresetChange(preset); }} className="p-4 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors">
                <div className="flex space-x-2 mb-2">
                  {Object.values(presetThemes[preset].dark).map(function (color, i) { return (<div key={i} className="w-4 h-4 rounded-full" style={{ backgroundColor: color }}/>); })}
                </div>
                <span className="text-sm">{preset.charAt(0).toUpperCase() + preset.slice(1)}</span>
              </button>); })}
          </div>
        </div>

        <div>
          <label className="block font-medium mb-2">Custom Colors</label>
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(localSettings.colors).map(function (_a) {
            var key = _a[0], value = _a[1];
            return (<div key={key}>
                <label className="block text-sm mb-1">
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </label>
                <input type="color" value={value} onChange={function (e) { return setLocalSettings(function (prev) {
                    var _a;
                    return (__assign(__assign({}, prev), { colors: __assign(__assign({}, prev.colors), (_a = {}, _a[key] = e.target.value, _a)) }));
                }); }} className="w-full h-8 rounded cursor-pointer"/>
              </div>);
        })}
          </div>
        </div>

        <div className="pt-4">
          <SaveButton_1.SaveButton onSave={handleSave} isDirty={isDirty}/>
        </div>
      </div>
    </div>);
}
