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
exports.AIDesigner = void 0;
var thought_logger_1 = require("../logging/thought-logger");
var canvas_manager_1 = require("./canvas-manager");
var model_router_1 = require("../routing/model-router");
var fabric_1 = require("fabric");
var AIDesigner = /** @class */ (function () {
    function AIDesigner() {
        this.canvasManager = canvas_manager_1.CanvasManager.getInstance();
        this.modelRouter = new model_router_1.ModelRouter();
    }
    AIDesigner.getInstance = function () {
        if (!AIDesigner.instance) {
            AIDesigner.instance = new AIDesigner();
        }
        return AIDesigner.instance;
    };
    AIDesigner.prototype.generateDesign = function (prompt, canvas) {
        return __awaiter(this, void 0, void 0, function () {
            var routerConfig, designSpec, _i, _a, layout, container, _b, _c, component, element, buttonGroup, buttonBg, buttonText, inputGroup, inputBg, placeholder, error_1;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        thought_logger_1.thoughtLogger.log('plan', 'Generating design from prompt', { prompt: prompt });
                        _d.label = 1;
                    case 1:
                        _d.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, this.modelRouter.route(prompt, [])];
                    case 2:
                        routerConfig = _d.sent();
                        return [4 /*yield*/, this.generateDesignSpec(prompt, routerConfig)];
                    case 3:
                        designSpec = _d.sent();
                        // Clear canvas
                        canvas.clear();
                        // Create layout containers
                        for (_i = 0, _a = designSpec.layout; _i < _a.length; _i++) {
                            layout = _a[_i];
                            container = new fabric_1.fabric.Rect({
                                left: layout.x,
                                top: layout.y,
                                width: layout.width,
                                height: layout.height,
                                fill: 'transparent',
                                stroke: '#e5e7eb',
                                strokeWidth: 1,
                                strokeDashArray: [5, 5],
                                selectable: false
                            });
                            canvas.add(container);
                        }
                        // Create components
                        for (_b = 0, _c = designSpec.components; _b < _c.length; _b++) {
                            component = _c[_b];
                            element = void 0;
                            switch (component.type) {
                                case 'text':
                                    element = new fabric_1.fabric.Text(component.text || '', {
                                        left: component.x,
                                        top: component.y,
                                        fontSize: this.getFontSize(component.variant || 'body'),
                                        fontFamily: 'Inter',
                                        fill: '#1f2937'
                                    });
                                    break;
                                case 'button':
                                    buttonGroup = new fabric_1.fabric.Group([], {
                                        left: component.x,
                                        top: component.y
                                    });
                                    buttonBg = new fabric_1.fabric.Rect({
                                        width: component.width || 120,
                                        height: component.height || 40,
                                        fill: '#3b82f6',
                                        rx: 6,
                                        ry: 6
                                    });
                                    buttonText = new fabric_1.fabric.Text(component.text || 'Button', {
                                        fontSize: 14,
                                        fill: '#ffffff',
                                        originX: 'center',
                                        originY: 'center',
                                        left: (component.width || 120) / 2,
                                        top: (component.height || 40) / 2
                                    });
                                    buttonGroup.addWithUpdate(buttonBg);
                                    buttonGroup.addWithUpdate(buttonText);
                                    element = buttonGroup;
                                    break;
                                case 'input':
                                    inputGroup = new fabric_1.fabric.Group([], {
                                        left: component.x,
                                        top: component.y
                                    });
                                    inputBg = new fabric_1.fabric.Rect({
                                        width: component.width || 200,
                                        height: component.height || 40,
                                        fill: '#ffffff',
                                        stroke: '#d1d5db',
                                        strokeWidth: 1,
                                        rx: 6,
                                        ry: 6
                                    });
                                    placeholder = new fabric_1.fabric.Text(component.text || 'Enter text...', {
                                        fontSize: 14,
                                        fill: '#9ca3af',
                                        left: 12,
                                        top: (component.height || 40) / 2 - 7
                                    });
                                    inputGroup.addWithUpdate(inputBg);
                                    inputGroup.addWithUpdate(placeholder);
                                    element = inputGroup;
                                    break;
                                default:
                                    element = new fabric_1.fabric.Rect({
                                        left: component.x,
                                        top: component.y,
                                        width: component.width || 100,
                                        height: component.height || 100,
                                        fill: '#ffffff',
                                        stroke: '#d1d5db',
                                        strokeWidth: 1
                                    });
                            }
                            // Apply styles
                            if (designSpec.styles[component.type]) {
                                element.set(designSpec.styles[component.type]);
                            }
                            canvas.add(element);
                        }
                        canvas.renderAll();
                        thought_logger_1.thoughtLogger.log('success', 'Design generated successfully');
                        return [3 /*break*/, 5];
                    case 4:
                        error_1 = _d.sent();
                        thought_logger_1.thoughtLogger.log('error', 'Failed to generate design', { error: error_1 });
                        throw error_1;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    AIDesigner.prototype.generateDesignSpec = function (prompt, config) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                // This would normally call an LLM to generate the design spec
                // For now, return a simple example spec
                return [2 /*return*/, {
                        layout: [
                            {
                                type: 'container',
                                x: 50,
                                y: 50,
                                width: 800,
                                height: 600,
                                name: 'main'
                            }
                        ],
                        components: [
                            {
                                type: 'text',
                                x: 100,
                                y: 100,
                                text: 'Welcome to Your Design',
                                variant: 'h1'
                            },
                            {
                                type: 'button',
                                x: 100,
                                y: 200,
                                width: 120,
                                height: 40,
                                text: 'Get Started'
                            },
                            {
                                type: 'input',
                                x: 100,
                                y: 300,
                                width: 200,
                                height: 40,
                                text: 'Enter your email...'
                            }
                        ],
                        styles: {
                            text: {
                                fontFamily: 'Inter',
                                fill: '#1f2937'
                            },
                            button: {
                                fill: '#3b82f6',
                                stroke: null
                            },
                            input: {
                                fill: '#ffffff',
                                stroke: '#d1d5db',
                                strokeWidth: 1
                            }
                        }
                    }];
            });
        });
    };
    AIDesigner.prototype.getFontSize = function (variant) {
        switch (variant) {
            case 'h1': return 40;
            case 'h2': return 32;
            case 'h3': return 28;
            case 'h4': return 24;
            case 'h5': return 20;
            case 'h6': return 18;
            case 'body': return 16;
            case 'small': return 14;
            default: return 16;
        }
    };
    return AIDesigner;
}());
exports.AIDesigner = AIDesigner;
