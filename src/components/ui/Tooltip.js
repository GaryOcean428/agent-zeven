"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tooltip = Tooltip;
var React = require("react");
var TooltipPrimitive = require("@radix-ui/react-tooltip");
var utils_1 = require("../../lib/utils");
function Tooltip(_a) {
    var children = _a.children, content = _a.content, _b = _a.side, side = _b === void 0 ? 'top' : _b, _c = _a.align, align = _c === void 0 ? 'center' : _c;
    return (<TooltipPrimitive.Provider>
      <TooltipPrimitive.Root>
        <TooltipPrimitive.Trigger asChild>
          {children}
        </TooltipPrimitive.Trigger>
        <TooltipPrimitive.Portal>
          <TooltipPrimitive.Content side={side} align={align} className={(0, utils_1.cn)('z-50 overflow-hidden rounded-md bg-primary px-3 py-1.5 text-xs text-primary-foreground animate-in fade-in-0 zoom-in-95', 'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95', 'data-[side=bottom]:slide-in-from-top-2', 'data-[side=left]:slide-in-from-right-2', 'data-[side=right]:slide-in-from-left-2', 'data-[side=top]:slide-in-from-bottom-2')}>
            {content}
            <TooltipPrimitive.Arrow className="fill-primary"/>
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>);
}
