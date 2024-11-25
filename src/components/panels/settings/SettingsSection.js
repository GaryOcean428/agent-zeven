"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingsSection = SettingsSection;
var react_1 = require("react");
function SettingsSection(_a) {
    var children = _a.children, title = _a.title;
    return (<div className="bg-gray-800 rounded-lg p-6">
      {title && <h3 className="text-lg font-semibold mb-4">{title}</h3>}
      {children}
    </div>);
}
