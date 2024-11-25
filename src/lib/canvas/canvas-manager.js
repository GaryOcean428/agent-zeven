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
exports.CanvasManager = void 0;
var fabric_1 = require("fabric");
var thought_logger_1 = require("../logging/thought-logger");
var CanvasManager = /** @class */ (function () {
    function CanvasManager() {
        this.canvas = null;
        this.state = {
            elements: [],
            selectedIds: [],
            scale: 1,
            history: {
                past: [],
                future: []
            }
        };
    }
    CanvasManager.getInstance = function () {
        if (!CanvasManager.instance) {
            CanvasManager.instance = new CanvasManager();
        }
        return CanvasManager.instance;
    };
    CanvasManager.prototype.initialize = function (canvas) {
        this.canvas = canvas;
        thought_logger_1.thoughtLogger.log('success', 'Canvas manager initialized');
    };
    CanvasManager.prototype.addElement = function (element) {
        if (!this.canvas) {
            throw new Error('Canvas not initialized');
        }
        var id = crypto.randomUUID();
        var fabricObject = this.createFabricObject(__assign(__assign({}, element), { id: id }));
        this.canvas.add(fabricObject);
        this.state.elements.push(__assign(__assign({}, element), { id: id }));
        this.saveToHistory();
        thought_logger_1.thoughtLogger.log('success', 'Element added to canvas', { elementId: id });
    };
    CanvasManager.prototype.createFabricObject = function (element) {
        switch (element.type) {
            case 'shape':
                if (element.data.type === 'button') {
                    var group = new fabric_1.fabric.Group([], {
                        left: element.x,
                        top: element.y,
                        width: element.width,
                        height: element.height
                    });
                    var rect = new fabric_1.fabric.Rect({
                        width: element.width,
                        height: element.height,
                        fill: element.style.fill,
                        stroke: element.style.stroke,
                        strokeWidth: element.style.strokeWidth,
                        rx: 4,
                        ry: 4
                    });
                    var text = new fabric_1.fabric.Text(element.data.text || '', {
                        fontSize: 16,
                        fill: '#ffffff',
                        originX: 'center',
                        originY: 'center',
                        left: element.width / 2,
                        top: element.height / 2
                    });
                    group.addWithUpdate(rect);
                    group.addWithUpdate(text);
                    return group;
                }
                else {
                    return new fabric_1.fabric.Rect({
                        left: element.x,
                        top: element.y,
                        width: element.width,
                        height: element.height,
                        fill: element.style.fill,
                        stroke: element.style.stroke,
                        strokeWidth: element.style.strokeWidth,
                        opacity: element.style.opacity
                    });
                }
            case 'text':
                return new fabric_1.fabric.Text(element.data.text || '', {
                    left: element.x,
                    top: element.y,
                    fontSize: element.style.fontSize,
                    fontFamily: element.style.fontFamily,
                    fill: element.style.fill,
                    width: element.width
                });
            case 'image':
                return new fabric_1.fabric.Image(element.data.src, {
                    left: element.x,
                    top: element.y,
                    width: element.width,
                    height: element.height
                });
            default:
                throw new Error("Unsupported element type: ".concat(element.type));
        }
    };
    CanvasManager.prototype.updateElement = function (id, updates) {
        if (!this.canvas) {
            throw new Error('Canvas not initialized');
        }
        var element = this.state.elements.find(function (e) { return e.id === id; });
        if (!element)
            return;
        var fabricObject = this.canvas.getObjects().find(function (obj) { return obj.id === id; });
        if (fabricObject) {
            Object.assign(element, updates);
            fabricObject.set(updates);
            this.canvas.renderAll();
            this.saveToHistory();
        }
    };
    CanvasManager.prototype.removeElement = function (id) {
        if (!this.canvas) {
            throw new Error('Canvas not initialized');
        }
        var fabricObject = this.canvas.getObjects().find(function (obj) { return obj.id === id; });
        if (fabricObject) {
            this.canvas.remove(fabricObject);
            this.state.elements = this.state.elements.filter(function (e) { return e.id !== id; });
            this.saveToHistory();
        }
    };
    CanvasManager.prototype.saveToHistory = function () {
        this.state.history.past.push(__spreadArray([], this.state.elements, true));
        this.state.history.future = [];
        // Limit history size
        if (this.state.history.past.length > 50) {
            this.state.history.past.shift();
        }
    };
    CanvasManager.prototype.undo = function () {
        if (this.state.history.past.length === 0)
            return;
        var current = this.state.elements;
        var previous = this.state.history.past.pop();
        this.state.history.future.push(current);
        this.state.elements = previous;
        this.redrawCanvas();
    };
    CanvasManager.prototype.redo = function () {
        if (this.state.history.future.length === 0)
            return;
        var current = this.state.elements;
        var next = this.state.history.future.pop();
        this.state.history.past.push(current);
        this.state.elements = next;
        this.redrawCanvas();
    };
    CanvasManager.prototype.redrawCanvas = function () {
        var _this = this;
        if (!this.canvas)
            return;
        this.canvas.clear();
        this.state.elements.forEach(function (element) {
            var fabricObject = _this.createFabricObject(element);
            _this.canvas.add(fabricObject);
        });
        this.canvas.renderAll();
    };
    CanvasManager.prototype.exportToCode = function (format) {
        switch (format) {
            case 'react':
                return this.generateReactCode();
            case 'html':
                return this.generateHTMLCode();
            default:
                throw new Error("Unsupported export format: ".concat(format));
        }
    };
    CanvasManager.prototype.generateReactCode = function () {
        var components = this.state.elements.map(function (element) {
            switch (element.type) {
                case 'text':
                    return "<Text\n  style={{\n    position: 'absolute',\n    left: ".concat(element.x, ",\n    top: ").concat(element.y, ",\n    fontSize: ").concat(element.style.fontSize, ",\n    fontFamily: '").concat(element.style.fontFamily, "',\n    color: '").concat(element.style.fill, "'\n  }}\n>\n  ").concat(element.data.text, "\n</Text>");
                case 'shape':
                    if (element.data.type === 'button') {
                        return "<Button\n  style={{\n    position: 'absolute',\n    left: ".concat(element.x, ",\n    top: ").concat(element.y, ",\n    width: ").concat(element.width, ",\n    height: ").concat(element.height, ",\n    backgroundColor: '").concat(element.style.fill, "',\n    border: '").concat(element.style.strokeWidth, "px solid ").concat(element.style.stroke, "'\n  }}\n>\n  ").concat(element.data.text, "\n</Button>");
                    }
                    return "<div\n  style={{\n    position: 'absolute',\n    left: ".concat(element.x, ",\n    top: ").concat(element.y, ",\n    width: ").concat(element.width, ",\n    height: ").concat(element.height, ",\n    backgroundColor: '").concat(element.style.fill, "',\n    border: '").concat(element.style.strokeWidth, "px solid ").concat(element.style.stroke, "',\n    opacity: ").concat(element.style.opacity, "\n  }}\n/>");
                default:
                    return '';
            }
        });
        return "export default function GeneratedComponent() {\n  return (\n    <div className=\"relative\">\n      ".concat(components.join('\n      '), "\n    </div>\n  );\n}");
    };
    CanvasManager.prototype.generateHTMLCode = function () {
        var styles = this.state.elements.map(function (element, index) {
            return ".element-".concat(index, " {\n  position: absolute;\n  left: ").concat(element.x, "px;\n  top: ").concat(element.y, "px;\n  ").concat(element.type === 'text' ? "\n  font-size: ".concat(element.style.fontSize, "px;\n  font-family: ").concat(element.style.fontFamily, ";\n  color: ").concat(element.style.fill, ";") : "\n  width: ".concat(element.width, "px;\n  height: ").concat(element.height, "px;\n  background-color: ").concat(element.style.fill, ";\n  border: ").concat(element.style.strokeWidth, "px solid ").concat(element.style.stroke, ";\n  opacity: ").concat(element.style.opacity, ";"), "\n}");
        }).join('\n\n');
        var elements = this.state.elements.map(function (element, index) {
            switch (element.type) {
                case 'text':
                    return "<div class=\"element-".concat(index, "\">").concat(element.data.text, "</div>");
                case 'shape':
                    if (element.data.type === 'button') {
                        return "<button class=\"element-".concat(index, "\">").concat(element.data.text, "</button>");
                    }
                    return "<div class=\"element-".concat(index, "\"></div>");
                default:
                    return '';
            }
        });
        return "<!DOCTYPE html>\n<html>\n<head>\n  <style>\n    .container {\n      position: relative;\n      width: 100%;\n      height: 100vh;\n    }\n    ".concat(styles, "\n  </style>\n</head>\n<body>\n  <div class=\"container\">\n    ").concat(elements.join('\n    '), "\n  </div>\n</body>\n</html>");
    };
    return CanvasManager;
}());
exports.CanvasManager = CanvasManager;
