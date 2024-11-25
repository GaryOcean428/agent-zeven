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
exports.DocumentPanel = DocumentPanel;
var react_1 = require("react");
var lucide_react_1 = require("lucide-react");
var DocumentList_1 = require("../DocumentList");
var DocumentUpload_1 = require("../DocumentUpload");
var document_manager_1 = require("../../lib/documents/document-manager");
function DocumentPanel() {
    var _this = this;
    var _a = (0, react_1.useState)([]), documents = _a[0], setDocuments = _a[1];
    var _b = (0, react_1.useState)(''), searchQuery = _b[0], setSearchQuery = _b[1];
    var _c = (0, react_1.useState)([]), selectedTags = _c[0], setSelectedTags = _c[1];
    var _d = (0, react_1.useState)('grid'), viewMode = _d[0], setViewMode = _d[1];
    var _e = (0, react_1.useState)(false), isUploadOpen = _e[0], setIsUploadOpen = _e[1];
    var _f = (0, react_1.useState)(true), isLoading = _f[0], setIsLoading = _f[1];
    var _g = (0, react_1.useState)(null), uploadSuccess = _g[0], setUploadSuccess = _g[1];
    react_1.default.useEffect(function () {
        loadDocuments();
    }, [searchQuery, selectedTags]);
    var loadDocuments = function () { return __awaiter(_this, void 0, void 0, function () {
        var searchOptions, results, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setIsLoading(true);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, 4, 5]);
                    searchOptions = {
                        query: searchQuery,
                        tags: selectedTags.length > 0 ? selectedTags : undefined,
                        limit: 50
                    };
                    return [4 /*yield*/, document_manager_1.DocumentManager.getInstance().searchDocuments(searchOptions)];
                case 2:
                    results = _a.sent();
                    setDocuments(results.map(function (r) { return r.document; }));
                    return [3 /*break*/, 5];
                case 3:
                    error_1 = _a.sent();
                    console.error('Failed to load documents:', error_1);
                    return [3 /*break*/, 5];
                case 4:
                    setIsLoading(false);
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    var handleUploadComplete = function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setUploadSuccess(true);
                    setIsUploadOpen(false);
                    return [4 /*yield*/, loadDocuments()];
                case 1:
                    _a.sent();
                    setTimeout(function () {
                        setUploadSuccess(null);
                    }, 3000);
                    return [2 /*return*/];
            }
        });
    }); };
    var handleUploadError = function () {
        setUploadSuccess(false);
        setTimeout(function () {
            setUploadSuccess(null);
        }, 3000);
    };
    return (<div className="flex-1 flex flex-col h-full bg-background">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border-b border-border bg-background/50 backdrop-blur-sm gap-4">
        <div className="flex-1 max-w-xl">
          <h1 className="text-xl font-bold mb-1">Documents</h1>
          <p className="text-sm text-muted-foreground">
            Manage and search through your documents
          </p>
        </div>

        <div className="flex items-center w-full sm:w-auto gap-4">
          <div className="flex items-center space-x-2 bg-secondary rounded-lg p-1">
            <button onClick={function () { return setViewMode('grid'); }} className={"p-2 rounded ".concat(viewMode === 'grid'
            ? 'bg-primary text-primary-foreground'
            : 'text-muted-foreground hover:text-foreground')} title="Grid View" aria-label="Grid View">
              <lucide_react_1.Grid size={20}/>
            </button>
            <button onClick={function () { return setViewMode('list'); }} className={"p-2 rounded ".concat(viewMode === 'list'
            ? 'bg-primary text-primary-foreground'
            : 'text-muted-foreground hover:text-foreground')} title="List View" aria-label="List View">
              <lucide_react_1.List size={20}/>
            </button>
          </div>

          <button onClick={function () { return setIsUploadOpen(true); }} className="flex items-center space-x-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors w-full sm:w-auto justify-center" title="Upload Document" aria-label="Upload Document">
            <lucide_react_1.Upload size={20}/>
            <span>Upload</span>
          </button>
        </div>
      </div>

      {/* Upload Status Messages */}
      {uploadSuccess !== null && (<div className={"p-4 ".concat(uploadSuccess
                ? 'bg-green-500/10 border-green-500/50 text-green-400'
                : 'bg-destructive/10 border-destructive/50 text-destructive', " border backdrop-blur-sm")}>
          <div className="flex items-center space-x-2 max-w-4xl mx-auto">
            <lucide_react_1.FileText className="w-5 h-5"/>
            <p>
              {uploadSuccess
                ? 'Document uploaded successfully!'
                : 'Failed to upload document. Please try again.'}
            </p>
          </div>
        </div>)}

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        {isUploadOpen ? (<div className="p-4">
            <DocumentUpload_1.DocumentUpload workspaceId="default" onUploadComplete={handleUploadComplete} onUploadError={handleUploadError}/>
          </div>) : (<DocumentList_1.DocumentList documents={documents} viewMode={viewMode} isLoading={isLoading} selectedTags={selectedTags} onTagSelect={setSelectedTags} onRefresh={loadDocuments} onSearch={setSearchQuery}/>)}
      </div>
    </div>);
}
