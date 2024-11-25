"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useLocalStorage = useLocalStorage;
var react_1 = require("react");
function useLocalStorage(key, initialValue) {
    // Initialize state with value from localStorage or initial value
    var _a = (0, react_1.useState)(function () {
        try {
            var item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        }
        catch (error) {
            console.error('Error reading from localStorage:', error);
            return initialValue;
        }
    }), storedValue = _a[0], setStoredValue = _a[1];
    // Update localStorage when state changes
    (0, react_1.useEffect)(function () {
        try {
            window.localStorage.setItem(key, JSON.stringify(storedValue));
        }
        catch (error) {
            console.error('Error writing to localStorage:', error);
        }
    }, [key, storedValue]);
    return [storedValue, setStoredValue];
}
