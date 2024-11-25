"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Toggle = Toggle;
var react_1 = require("react");
function Toggle(_a) {
    var enabled = _a.enabled, onChange = _a.onChange;
    return (<button type="button" onClick={function () { return onChange(!enabled); }} className={"relative inline-flex h-6 w-11 items-center rounded-full transition-colors ".concat(enabled ? 'bg-blue-600' : 'bg-gray-700')}>
      <span className={"inline-block h-4 w-4 transform rounded-full bg-white transition-transform ".concat(enabled ? 'translate-x-6' : 'translate-x-1')}/>
    </button>);
}
