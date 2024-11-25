"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CanvasToolbar = CanvasToolbar;
var react_1 = require("react");
var lucide_react_1 = require("lucide-react");
function CanvasToolbar(_a) {
    var selectedTool = _a.selectedTool, onToolChange = _a.onToolChange, onShapeAdd = _a.onShapeAdd, onUndo = _a.onUndo, onRedo = _a.onRedo, onExport = _a.onExport;
    return (<div className="absolute left-4 top-20 bg-white rounded-lg shadow-lg p-2 space-y-2">
      <ToolButton icon={lucide_react_1.MousePointer} tooltip="Select" isSelected={selectedTool === 'select'} onClick={function () { return onToolChange('select'); }}/>
      <ToolButton icon={lucide_react_1.Square} tooltip="Rectangle" isSelected={selectedTool === 'rectangle'} onClick={function () { return onShapeAdd('rectangle'); }}/>
      <ToolButton icon={lucide_react_1.Circle} tooltip="Circle" isSelected={selectedTool === 'circle'} onClick={function () { return onShapeAdd('circle'); }}/>
      <ToolButton icon={lucide_react_1.Type} tooltip="Text" isSelected={selectedTool === 'text'} onClick={function () { return onShapeAdd('text'); }}/>
      <ToolButton icon={lucide_react_1.Pencil} tooltip="Draw" isSelected={selectedTool === 'draw'} onClick={function () { return onToolChange('draw'); }}/>
      <div className="border-t border-gray-200 my-2"/>
      <ToolButton icon={lucide_react_1.Undo} tooltip="Undo" onClick={onUndo} disabled={!onUndo}/>
      <ToolButton icon={lucide_react_1.Redo} tooltip="Redo" onClick={onRedo} disabled={!onRedo}/>
      <div className="border-t border-gray-200 my-2"/>
      <ToolButton icon={lucide_react_1.Code} tooltip="Export to React" onClick={function () { return onExport === null || onExport === void 0 ? void 0 : onExport('react'); }}/>
      <ToolButton icon={lucide_react_1.Download} tooltip="Export to HTML" onClick={function () { return onExport === null || onExport === void 0 ? void 0 : onExport('html'); }}/>
    </div>);
}
function ToolButton(_a) {
    var Icon = _a.icon, tooltip = _a.tooltip, isSelected = _a.isSelected, disabled = _a.disabled, onClick = _a.onClick;
    return (<button onClick={onClick} disabled={disabled} className={"relative group p-2 rounded-lg transition-colors ".concat(isSelected
            ? 'bg-blue-100 text-blue-700'
            : 'hover:bg-gray-100 text-gray-700', " ").concat(disabled ? 'opacity-50 cursor-not-allowed' : '')}>
      <Icon className="w-5 h-5"/>
      <span className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
        {tooltip}
      </span>
    </button>);
}
