"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = App;
var react_1 = require("react");
var Layout_1 = require("./components/layout/Layout");
var ToastProvider_1 = require("./providers/ToastProvider");
var SettingsProvider_1 = require("./providers/SettingsProvider");
var ConfigProvider_1 = require("./providers/ConfigProvider");
var SearchContext_1 = require("./context/SearchContext");
var ErrorBoundary_1 = require("./components/ErrorBoundary");
var initialize_1 = require("./lib/initialize");
var useToast_1 = require("./hooks/useToast");
var Chat_1 = require("./components/Chat");
var Canvas_1 = require("./components/Canvas");
var Agent_1 = require("./components/Agent");
var Tools_1 = require("./components/Tools");
var Documents_1 = require("./components/Documents");
var Settings_1 = require("./components/Settings");
var SearchPanel_1 = require("./components/panels/SearchPanel");
var AIProvider_1 = require("./components/providers/AIProvider");
function AppContent() {
    var _this = this;
    var _a = (0, react_1.useState)('chat'), activePanel = _a[0], setActivePanel = _a[1];
    var _b = (0, react_1.useState)(false), isInitialized = _b[0], setIsInitialized = _b[1];
    var addToast = (0, useToast_1.useToast)().addToast;
    (0, react_1.useEffect)(function () {
        var init = function () { return __awaiter(_this, void 0, void 0, function () {
            var success, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, (0, initialize_1.initializeSystem)()];
                    case 1:
                        success = _a.sent();
                        if (success) {
                            setIsInitialized(true);
                            addToast({
                                type: 'success',
                                message: 'System initialized successfully'
                            });
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        addToast({
                            type: 'error',
                            title: 'Initialization Error',
                            message: error_1 instanceof Error ? error_1.message : 'Failed to initialize system'
                        });
                        setIsInitialized(true);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        init();
    }, [addToast]);
    if (!isInitialized) {
        return (<div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg">Initializing system...</p>
        </div>
      </div>);
    }
    return (<Layout_1.Layout activePanel={activePanel} onPanelChange={setActivePanel}>
      <div className="h-full">
        {(function () {
            switch (activePanel) {
                case 'chat':
                    return <Chat_1.Chat />;
                case 'canvas':
                    return <Canvas_1.Canvas />;
                case 'agent':
                    return <Agent_1.Agent />;
                case 'tools':
                    return <Tools_1.Tools />;
                case 'documents':
                    return <Documents_1.Documents />;
                case 'search':
                    return <SearchPanel_1.SearchPanel />;
                case 'settings':
                    return <Settings_1.Settings />;
                default:
                    return <Chat_1.Chat />;
            }
        })()}
      </div>
    </Layout_1.Layout>);
}
function App() {
    return (<ErrorBoundary_1.ErrorBoundary>
      <ToastProvider_1.ToastProvider>
        <ConfigProvider_1.ConfigProvider>
          <SettingsProvider_1.SettingsProvider>
            <SearchContext_1.SearchProvider>
              <AIProvider_1.AIProvider>
                <AppContent />
              </AIProvider_1.AIProvider>
            </SearchContext_1.SearchProvider>
          </SettingsProvider_1.SettingsProvider>
        </ConfigProvider_1.ConfigProvider>
      </ToastProvider_1.ToastProvider>
    </ErrorBoundary_1.ErrorBoundary>);
}
