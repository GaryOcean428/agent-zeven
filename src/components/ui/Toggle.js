"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Toggle = Toggle;
var React = require("react");
var TogglePrimitive = require("@radix-ui/react-switch");
var utils_1 = require("../../lib/utils");
function Toggle(_a) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return (<TogglePrimitive.Root className={(0, utils_1.cn)('peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent', 'transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary', 'disabled:cursor-not-allowed disabled:opacity-50', 'data-[state=checked]:bg-primary data-[state=unchecked]:bg-secondary', className)} {...props}>
      <TogglePrimitive.Thumb className={(0, utils_1.cn)('pointer-events-none block h-4 w-4 rounded-full bg-background shadow-lg ring-0', 'transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0')}/>
    </TogglePrimitive.Root>);
}
