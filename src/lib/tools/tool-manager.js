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
exports.ToolManager = void 0;
var AppError_1 = require("../errors/AppError");
var ToolManager = /** @class */ (function () {
    function ToolManager() {
        this.tools = new Map();
        this.metadata = new Map();
        this.maxTools = 100;
    }
    ToolManager.prototype.registerTool = function (name, tool, metadata) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.tools.size >= this.maxTools)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.pruneTools()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        if (this.tools.has(name)) {
                            throw new AppError_1.AppError("Tool ".concat(name, " already exists"), 'TOOL_ERROR');
                        }
                        this.tools.set(name, tool);
                        this.metadata.set(name, __assign(__assign({}, metadata), { created: Date.now(), usageCount: 0 }));
                        return [2 /*return*/];
                }
            });
        });
    };
    ToolManager.prototype.executeTool = function (name) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return __awaiter(this, void 0, void 0, function () {
            var tool, meta, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        tool = this.tools.get(name);
                        if (!tool) {
                            throw new AppError_1.AppError("Tool ".concat(name, " not found"), 'TOOL_ERROR');
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        meta = this.metadata.get(name);
                        meta.lastUsed = Date.now();
                        meta.usageCount++;
                        return [4 /*yield*/, tool.execute.apply(tool, args)];
                    case 2: return [2 /*return*/, _a.sent()];
                    case 3:
                        error_1 = _a.sent();
                        throw new AppError_1.AppError("Failed to execute tool ".concat(name), 'TOOL_ERROR', error_1);
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ToolManager.prototype.purgeTool = function (name) {
        return __awaiter(this, void 0, void 0, function () {
            var tool, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        tool = this.tools.get(name);
                        if (!tool)
                            return [2 /*return*/];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        if (!tool.cleanup) return [3 /*break*/, 3];
                        return [4 /*yield*/, tool.cleanup()];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        this.tools.delete(name);
                        this.metadata.delete(name);
                        return [3 /*break*/, 5];
                    case 4:
                        error_2 = _a.sent();
                        throw new AppError_1.AppError("Failed to purge tool ".concat(name), 'TOOL_ERROR', error_2);
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    ToolManager.prototype.pruneTools = function () {
        return __awaiter(this, void 0, void 0, function () {
            var toolEntries, toolsToRemove;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        toolEntries = Array.from(this.metadata.entries())
                            .sort(function (_a, _b) {
                            var a = _a[1];
                            var b = _b[1];
                            var timeA = a.lastUsed || a.created;
                            var timeB = b.lastUsed || b.created;
                            // Prioritize keeping frequently used tools
                            if (Math.abs(a.usageCount - b.usageCount) > 10) {
                                return b.usageCount - a.usageCount;
                            }
                            return timeB - timeA;
                        });
                        toolsToRemove = toolEntries
                            .slice(this.maxTools / 2)
                            .map(function (_a) {
                            var name = _a[0];
                            return name;
                        });
                        return [4 /*yield*/, Promise.all(toolsToRemove.map(function (name) { return _this.purgeTool(name); }))];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ToolManager.prototype.getToolMetadata = function (name) {
        return this.metadata.get(name);
    };
    ToolManager.prototype.listTools = function () {
        return Array.from(this.metadata.entries())
            .map(function (_a) {
            var name = _a[0], metadata = _a[1];
            return ({ name: name, metadata: metadata });
        });
    };
    return ToolManager;
}());
exports.ToolManager = ToolManager;
