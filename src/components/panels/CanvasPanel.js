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
exports.CanvasPanel = CanvasPanel;
var react_1 = require("react");
var fabric_1 = require("fabric");
var CanvasPrompt_1 = require("../canvas/CanvasPrompt");
var CanvasToolbar_1 = require("../canvas/CanvasToolbar");
var CanvasProperties_1 = require("../canvas/CanvasProperties");
var ai_designer_1 = require("../../lib/canvas/ai-designer");
var canvas_manager_1 = require("../../lib/canvas/canvas-manager");
var useToast_1 = require("../../hooks/useToast");
function CanvasPanel() {
    var _this = this;
    var canvasRef = (0, react_1.useRef)(null);
    var _a = (0, react_1.useState)(null), fabricCanvas = _a[0], setFabricCanvas = _a[1];
    var _b = (0, react_1.useState)(null), selectedObject = _b[0], setSelectedObject = _b[1];
    var _c = (0, react_1.useState)('select'), selectedTool = _c[0], setSelectedTool = _c[1];
    var _d = (0, react_1.useState)(false), isGenerating = _d[0], setIsGenerating = _d[1];
    var addToast = (0, useToast_1.useToast)().addToast;
    (0, react_1.useEffect)(function () {
        if (canvasRef.current && !fabricCanvas) {
            var canvas_1 = new fabric_1.fabric.Canvas(canvasRef.current, {
                width: window.innerWidth - 300,
                height: window.innerHeight - 100,
                backgroundColor: '#ffffff'
            });
            canvas_1.on('selection:created', function (e) { var _a; return setSelectedObject(((_a = e.selected) === null || _a === void 0 ? void 0 : _a[0]) || null); });
            canvas_1.on('selection:updated', function (e) { var _a; return setSelectedObject(((_a = e.selected) === null || _a === void 0 ? void 0 : _a[0]) || null); });
            canvas_1.on('selection:cleared', function () { return setSelectedObject(null); });
            setFabricCanvas(canvas_1);
            canvas_manager_1.CanvasManager.getInstance().initialize(canvas_1);
            var handleResize_1 = function () {
                canvas_1.setDimensions({
                    width: window.innerWidth - 300,
                    height: window.innerHeight - 100
                });
            };
            window.addEventListener('resize', handleResize_1);
            return function () {
                window.removeEventListener('resize', handleResize_1);
                canvas_1.dispose();
            };
        }
    }, [fabricCanvas]);
    var handlePromptSubmit = function (prompt) { return __awaiter(_this, void 0, void 0, function () {
        var error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!fabricCanvas)
                        return [2 /*return*/];
                    setIsGenerating(true);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, 4, 5]);
                    return [4 /*yield*/, ai_designer_1.AIDesigner.getInstance().generateDesign(prompt, fabricCanvas)];
                case 2:
                    _a.sent();
                    addToast({
                        type: 'success',
                        message: 'Design generated successfully'
                    });
                    return [3 /*break*/, 5];
                case 3:
                    error_1 = _a.sent();
                    addToast({
                        type: 'error',
                        title: 'Failed to generate design',
                        message: error_1 instanceof Error ? error_1.message : 'An unknown error occurred'
                    });
                    return [3 /*break*/, 5];
                case 4:
                    setIsGenerating(false);
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    var handleShapeAdd = function (type) {
        if (!fabricCanvas)
            return;
        var shape;
        var center = fabricCanvas.getCenter();
        switch (type) {
            case 'rectangle':
                shape = new fabric_1.fabric.Rect({
                    left: center.left - 50,
                    top: center.top - 25,
                    width: 100,
                    height: 50,
                    fill: '#3B82F6',
                    stroke: '#2563EB',
                    strokeWidth: 1
                });
                break;
            case 'circle':
                shape = new fabric_1.fabric.Circle({
                    left: center.left - 25,
                    top: center.top - 25,
                    radius: 25,
                    fill: '#3B82F6',
                    stroke: '#2563EB',
                    strokeWidth: 1
                });
                break;
            case 'text':
                shape = new fabric_1.fabric.Text('Text', {
                    left: center.left - 25,
                    top: center.top - 12,
                    fontSize: 24,
                    fill: '#1F2937'
                });
                break;
            default:
                return;
        }
        fabricCanvas.add(shape);
        fabricCanvas.setActiveObject(shape);
        fabricCanvas.renderAll();
    };
    var handlePropertyChange = function (property, value) {
        if (!selectedObject)
            return;
        selectedObject.set(property, value);
        fabricCanvas === null || fabricCanvas === void 0 ? void 0 : fabricCanvas.renderAll();
    };
    var handleUndo = function () {
        canvas_manager_1.CanvasManager.getInstance().undo();
    };
    var handleRedo = function () {
        canvas_manager_1.CanvasManager.getInstance().redo();
    };
    var handleExport = function (format) { return __awaiter(_this, void 0, void 0, function () {
        var code, blob, url, a;
        return __generator(this, function (_a) {
            try {
                code = canvas_manager_1.CanvasManager.getInstance().exportToCode(format);
                blob = new Blob([code], { type: 'text/plain' });
                url = URL.createObjectURL(blob);
                a = document.createElement('a');
                a.href = url;
                a.download = "design.".concat(format === 'react' ? 'tsx' : 'html');
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
                addToast({
                    type: 'success',
                    message: "Design exported as ".concat(format.toUpperCase(), " successfully")
                });
            }
            catch (error) {
                addToast({
                    type: 'error',
                    title: 'Export failed',
                    message: error instanceof Error ? error.message : 'Failed to export design'
                });
            }
            return [2 /*return*/];
        });
    }); };
    return (<div className="relative flex-1 bg-gray-50">
      <CanvasPrompt_1.CanvasPrompt onSubmit={handlePromptSubmit} isGenerating={isGenerating}/>
      
      <CanvasToolbar_1.CanvasToolbar selectedTool={selectedTool} onToolChange={setSelectedTool} onShapeAdd={handleShapeAdd} onUndo={handleUndo} onRedo={handleRedo} onExport={handleExport}/>

      {selectedObject && (<CanvasProperties_1.CanvasProperties selectedObject={selectedObject} onPropertyChange={handlePropertyChange}/>)}

      <canvas ref={canvasRef} className="absolute inset-0"/>

      {isGenerating && (<div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 shadow-xl">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"/>
            <p className="mt-4 text-gray-900">Generating design...</p>
          </div>
        </div>)}
    </div>);
}
