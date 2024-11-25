"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Loading = Loading;
var react_1 = require("react");
function Loading(_a) {
    var _b = _a.className, className = _b === void 0 ? "w-4 h-4" : _b;
    return (<div className="flex items-center justify-center">
      <div className={"animate-spin rounded-full border-2 border-primary border-t-transparent ".concat(className)}/>
    </div>);
}
