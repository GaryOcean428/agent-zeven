"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigProvider = ConfigProvider;
exports.useConfig = useConfig;
var react_1 = require("react");
var config_1 = require("../lib/config");
var thought_logger_1 = require("../lib/logging/thought-logger");
var store_1 = require("../store");
var ConfigContext = (0, react_1.createContext)(undefined);
function ConfigProvider(_a) {
    var children = _a.children;
    var _b = (0, react_1.useState)(false), isInitialized = _b[0], setIsInitialized = _b[1];
    var _c = (0, react_1.useState)(false), hasValidConfig = _c[0], setHasValidConfig = _c[1];
    var _d = (0, react_1.useState)([]), missingKeys = _d[0], setMissingKeys = _d[1];
    var setSettingsPanelOpen = (0, store_1.useStore)().setSettingsPanelOpen;
    (0, react_1.useEffect)(function () {
        var checkConfig = function () {
            var _a = (0, config_1.validateApiKeys)(), valid = _a.valid, missingKeys = _a.missingKeys;
            if (!valid) {
                thought_logger_1.thoughtLogger.log('warning', 'Missing required API keys', { missingKeys: missingKeys });
                setSettingsPanelOpen(true);
            }
            setHasValidConfig(valid);
            setMissingKeys(missingKeys);
            setIsInitialized(true);
        };
        checkConfig();
    }, [setSettingsPanelOpen]);
    return (<ConfigContext.Provider value={{ isInitialized: isInitialized, hasValidConfig: hasValidConfig, missingKeys: missingKeys }}>
      {children}
    </ConfigContext.Provider>);
}
function useConfig() {
    var context = (0, react_1.useContext)(ConfigContext);
    if (!context) {
        throw new Error('useConfig must be used within a ConfigProvider');
    }
    return context;
}
