"use strict";
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
exports.SaveButton = SaveButton;
var react_1 = require("react");
var lucide_react_1 = require("lucide-react");
var thought_logger_1 = require("../lib/logging/thought-logger");
function SaveButton(_a) {
    var _this = this;
    var onSave = _a.onSave, isDirty = _a.isDirty;
    var _b = react_1.default.useState(false), isSaving = _b[0], setIsSaving = _b[1];
    var _c = react_1.default.useState(null), error = _c[0], setError = _c[1];
    var handleSave = function () { return __awaiter(_this, void 0, void 0, function () {
        var err_1, message;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!isDirty || isSaving)
                        return [2 /*return*/];
                    setIsSaving(true);
                    setError(null);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, 4, 5]);
                    return [4 /*yield*/, onSave()];
                case 2:
                    _a.sent();
                    thought_logger_1.thoughtLogger.log('success', 'Changes saved successfully');
                    return [3 /*break*/, 5];
                case 3:
                    err_1 = _a.sent();
                    message = err_1 instanceof Error ? err_1.message : 'Failed to save changes';
                    setError(message);
                    thought_logger_1.thoughtLogger.log('error', 'Failed to save changes', { error: err_1 });
                    return [3 /*break*/, 5];
                case 4:
                    setIsSaving(false);
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    return (<div className="relative">
      <button onClick={handleSave} disabled={!isDirty || isSaving} className={"flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ".concat(isDirty
            ? 'bg-blue-600 hover:bg-blue-700 text-white'
            : 'bg-gray-700 text-gray-400 cursor-not-allowed')}>
        <lucide_react_1.Save className="w-4 h-4"/>
        <span>{isSaving ? 'Saving...' : 'Save Changes'}</span>
      </button>
      
      {error && (<div className="absolute top-full mt-2 left-0 right-0 bg-red-600 text-white text-sm rounded-lg p-2">
          {error}
        </div>)}
    </div>);
}
