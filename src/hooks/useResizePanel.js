"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useResizePanel = useResizePanel;
var react_1 = require("react");
function useResizePanel(initialWidth, setWidth, minWidth, maxWidth) {
    if (minWidth === void 0) { minWidth = 300; }
    if (maxWidth === void 0) { maxWidth = 800; }
    var _a = (0, react_1.useState)(false), isDragging = _a[0], setIsDragging = _a[1];
    var startResize = function (event) {
        event.preventDefault();
        setIsDragging(true);
    };
    (0, react_1.useEffect)(function () {
        var handleResize = function (event) {
            if (!isDragging)
                return;
            var newWidth = window.innerWidth - event.clientX;
            if (newWidth >= minWidth && newWidth <= maxWidth) {
                setWidth(newWidth);
            }
        };
        var stopResize = function () {
            setIsDragging(false);
        };
        if (isDragging) {
            document.addEventListener('mousemove', handleResize);
            document.addEventListener('mouseup', stopResize);
        }
        return function () {
            document.removeEventListener('mousemove', handleResize);
            document.removeEventListener('mouseup', stopResize);
        };
    }, [isDragging, setWidth, minWidth, maxWidth]);
    return { isDragging: isDragging, startResize: startResize };
}
