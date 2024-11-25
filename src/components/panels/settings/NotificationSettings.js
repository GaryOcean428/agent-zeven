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
exports.NotificationSettings = NotificationSettings;
var react_1 = require("react");
var SettingsContext_1 = require("../../../context/SettingsContext");
var Toggle_1 = require("../../Toggle");
var SaveButton_1 = require("../../SaveButton");
function NotificationSettings() {
    var _this = this;
    var _a = (0, SettingsContext_1.useSettings)(), settings = _a.settings, updateSettings = _a.updateSettings;
    var _b = (0, react_1.useState)(settings.notifications), localSettings = _b[0], setLocalSettings = _b[1];
    var isDirty = JSON.stringify(localSettings) !== JSON.stringify(settings.notifications);
    var handleSave = function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, updateSettings('notifications', localSettings)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); };
    return (<div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Notification Settings</h3>
        <SaveButton_1.SaveButton onSave={handleSave} isDirty={isDirty}/>
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            System Notifications
            <span className="text-gray-400 ml-2">Status and error alerts</span>
          </label>
          <div className="space-y-2 mt-2">
            <div className="flex items-center justify-between">
              <span className="text-sm">Show error notifications</span>
              <Toggle_1.Toggle enabled={localSettings.showErrors} onChange={function (enabled) { return setLocalSettings(function (prev) { return (__assign(__assign({}, prev), { showErrors: enabled })); }); }}/>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Show success notifications</span>
              <Toggle_1.Toggle enabled={localSettings.showSuccess} onChange={function (enabled) { return setLocalSettings(function (prev) { return (__assign(__assign({}, prev), { showSuccess: enabled })); }); }}/>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Agent Status Updates
            <span className="text-gray-400 ml-2">Agent activity notifications</span>
          </label>
          <div className="space-y-2 mt-2">
            <div className="flex items-center justify-between">
              <span className="text-sm">Show agent assignments</span>
              <Toggle_1.Toggle enabled={localSettings.showAgentAssignments} onChange={function (enabled) { return setLocalSettings(function (prev) { return (__assign(__assign({}, prev), { showAgentAssignments: enabled })); }); }}/>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Show task completion</span>
              <Toggle_1.Toggle enabled={localSettings.showTaskCompletion} onChange={function (enabled) { return setLocalSettings(function (prev) { return (__assign(__assign({}, prev), { showTaskCompletion: enabled })); }); }}/>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Sound Effects
            <span className="text-gray-400 ml-2">Notification sounds</span>
          </label>
          <div className="space-y-2 mt-2">
            <div className="flex items-center justify-between">
              <span className="text-sm">Enable sound effects</span>
              <Toggle_1.Toggle enabled={localSettings.soundEnabled} onChange={function (enabled) { return setLocalSettings(function (prev) { return (__assign(__assign({}, prev), { soundEnabled: enabled })); }); }}/>
            </div>
            <div>
              <label className="block text-sm mb-1">Volume</label>
              <input type="range" min="0" max="100" value={localSettings.volume} onChange={function (e) { return setLocalSettings(function (prev) { return (__assign(__assign({}, prev), { volume: parseInt(e.target.value) })); }); }} className="w-full"/>
            </div>
          </div>
        </div>
      </div>
    </div>);
}
