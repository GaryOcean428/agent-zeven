"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CanvasProperties = CanvasProperties;
var react_1 = require("react");
function CanvasProperties(_a) {
    var _b, _c, _d;
    var selectedObject = _a.selectedObject, onPropertyChange = _a.onPropertyChange;
    if (!selectedObject)
        return null;
    return (<div className="absolute right-4 top-20 bg-white rounded-lg shadow-lg p-4 w-64">
      <h3 className="text-lg font-semibold mb-4 text-gray-900">Properties</h3>
      
      <div className="space-y-4">
        {/* Position */}
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">X</label>
            <input type="number" value={Math.round(selectedObject.left || 0)} onChange={function (e) { return onPropertyChange('left', parseInt(e.target.value)); }} className="w-full px-2 py-1 border rounded text-gray-900 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"/>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">Y</label>
            <input type="number" value={Math.round(selectedObject.top || 0)} onChange={function (e) { return onPropertyChange('top', parseInt(e.target.value)); }} className="w-full px-2 py-1 border rounded text-gray-900 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"/>
          </div>
        </div>

        {/* Size */}
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">Width</label>
            <input type="number" value={Math.round(selectedObject.width || 0)} onChange={function (e) { return onPropertyChange('width', parseInt(e.target.value)); }} className="w-full px-2 py-1 border rounded text-gray-900 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"/>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">Height</label>
            <input type="number" value={Math.round(selectedObject.height || 0)} onChange={function (e) { return onPropertyChange('height', parseInt(e.target.value)); }} className="w-full px-2 py-1 border rounded text-gray-900 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"/>
          </div>
        </div>

        {/* Style */}
        {selectedObject.type === 'rect' && (<>
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">Fill Color</label>
              <input type="color" value={((_b = selectedObject.fill) === null || _b === void 0 ? void 0 : _b.toString()) || '#000000'} onChange={function (e) { return onPropertyChange('fill', e.target.value); }} className="w-full h-8 rounded cursor-pointer"/>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">Border Color</label>
              <input type="color" value={((_c = selectedObject.stroke) === null || _c === void 0 ? void 0 : _c.toString()) || '#000000'} onChange={function (e) { return onPropertyChange('stroke', e.target.value); }} className="w-full h-8 rounded cursor-pointer"/>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">Border Width</label>
              <input type="number" value={selectedObject.strokeWidth || 0} onChange={function (e) { return onPropertyChange('strokeWidth', parseInt(e.target.value)); }} className="w-full px-2 py-1 border rounded text-gray-900 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"/>
            </div>
          </>)}

        {/* Text Properties */}
        {selectedObject.type === 'text' && (<>
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">Text</label>
              <input type="text" value={selectedObject.text} onChange={function (e) { return onPropertyChange('text', e.target.value); }} className="w-full px-2 py-1 border rounded text-gray-900 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"/>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">Font Size</label>
              <input type="number" value={selectedObject.fontSize || 16} onChange={function (e) { return onPropertyChange('fontSize', parseInt(e.target.value)); }} className="w-full px-2 py-1 border rounded text-gray-900 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"/>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">Text Color</label>
              <input type="color" value={((_d = selectedObject.fill) === null || _d === void 0 ? void 0 : _d.toString()) || '#000000'} onChange={function (e) { return onPropertyChange('fill', e.target.value); }} className="w-full h-8 rounded cursor-pointer"/>
            </div>
          </>)}
      </div>
    </div>);
}
