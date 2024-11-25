"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentUpload = DocumentUpload;
var react_1 = require("react");
var lucide_react_1 = require("lucide-react");
var document_manager_1 = require("../lib/documents/document-manager");
var thought_logger_1 = require("../lib/logging/thought-logger");
function DocumentUpload(_a) {
    var _this = this;
    var workspaceId = _a.workspaceId, onUploadComplete = _a.onUploadComplete, onUploadError = _a.onUploadError;
    var _b = (0, react_1.useState)(false), isDragging = _b[0], setIsDragging = _b[1];
    var _c = (0, react_1.useState)([]), files = _c[0], setFiles = _c[1];
    var _d = (0, react_1.useState)(false), isUploading = _d[0], setIsUploading = _d[1];
    var _e = (0, react_1.useState)(null), error = _e[0], setError = _e[1];
    var _f = (0, react_1.useState)({}), uploadProgress = _f[0], setUploadProgress = _f[1];
    var fileInputRef = (0, react_1.useRef)(null);
    var documentManager = document_manager_1.DocumentManager.getInstance();
    var handleDragOver = function (e) {
        e.preventDefault();
        setIsDragging(true);
    };
    var handleDragLeave = function (e) {
        e.preventDefault();
        setIsDragging(false);
    };
    var handleDrop = function (e) {
        e.preventDefault();
        setIsDragging(false);
        setError(null);
        var droppedFiles = Array.from(e.dataTransfer.files);
        setFiles(function (prev) { return __spreadArray(__spreadArray([], prev, true), droppedFiles, true); });
    };
    var handleFileSelect = function (e) {
        if (e.target.files) {
            setError(null);
            var selectedFiles_1 = Array.from(e.target.files);
            setFiles(function (prev) { return __spreadArray(__spreadArray([], prev, true), selectedFiles_1, true); });
        }
    };
    var removeFile = function (index) {
        setFiles(function (prev) { return prev.filter(function (_, i) { return i !== index; }); });
        setError(null);
    };
    var uploadFiles = function () { return __awaiter(_this, void 0, void 0, function () {
        var error_1;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setIsUploading(true);
                    setError(null);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, 4, 5]);
                    thought_logger_1.thoughtLogger.log('execution', 'Starting document upload', {
                        fileCount: files.length,
                        workspaceId: workspaceId
                    });
                    return [4 /*yield*/, Promise.all(files.map(function (file, index) { return __awaiter(_this, void 0, void 0, function () {
                            var progressInterval, error_2;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        _a.trys.push([0, 2, , 3]);
                                        setUploadProgress(function (prev) {
                                            var _a;
                                            return (__assign(__assign({}, prev), (_a = {}, _a[file.name] = 0, _a)));
                                        });
                                        progressInterval = setInterval(function () {
                                            setUploadProgress(function (prev) {
                                                var _a;
                                                return (__assign(__assign({}, prev), (_a = {}, _a[file.name] = Math.min((prev[file.name] || 0) + 10, 90), _a)));
                                            });
                                        }, 200);
                                        return [4 /*yield*/, documentManager.addDocument(workspaceId, file)];
                                    case 1:
                                        _a.sent();
                                        clearInterval(progressInterval);
                                        setUploadProgress(function (prev) {
                                            var _a;
                                            return (__assign(__assign({}, prev), (_a = {}, _a[file.name] = 100, _a)));
                                        });
                                        thought_logger_1.thoughtLogger.log('success', 'Document uploaded successfully', {
                                            fileName: file.name
                                        });
                                        return [3 /*break*/, 3];
                                    case 2:
                                        error_2 = _a.sent();
                                        thought_logger_1.thoughtLogger.log('error', "Failed to upload ".concat(file.name), { error: error_2 });
                                        throw error_2;
                                    case 3: return [2 /*return*/];
                                }
                            });
                        }); }))];
                case 2:
                    _a.sent();
                    setFiles([]);
                    onUploadComplete === null || onUploadComplete === void 0 ? void 0 : onUploadComplete();
                    return [3 /*break*/, 5];
                case 3:
                    error_1 = _a.sent();
                    setError(error_1 instanceof Error ? error_1.message : 'Upload failed');
                    onUploadError === null || onUploadError === void 0 ? void 0 : onUploadError();
                    return [3 /*break*/, 5];
                case 4:
                    setIsUploading(false);
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    return (<div className="space-y-4">
      {/* Drop Zone */}
      <div onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop} className={"border-2 border-dashed rounded-lg p-4 sm:p-8 text-center transition-colors ".concat(isDragging
            ? 'border-blue-500 bg-blue-50/5'
            : 'border-gray-600 hover:border-gray-500')}>
        <input ref={fileInputRef} type="file" multiple onChange={handleFileSelect} className="hidden" accept=".pdf,.docx,.txt,.md"/>

        <lucide_react_1.Upload className="mx-auto h-12 w-12 text-gray-400"/>
        <p className="mt-2 text-sm text-gray-300">
          Drag and drop files here, or{' '}
          <button onClick={function () { var _a; return (_a = fileInputRef.current) === null || _a === void 0 ? void 0 : _a.click(); }} className="text-blue-400 hover:text-blue-300">
            browse
          </button>
        </p>
        <p className="mt-1 text-xs text-gray-400">
          Supported formats: PDF, DOCX, TXT, MD
        </p>
      </div>

      {/* File List */}
      {files.length > 0 && (<div className="space-y-2">
          {files.map(function (file, index) { return (<div key={index} className="flex items-center justify-between bg-gray-800/50 backdrop-blur-sm rounded-lg p-3">
              <div className="flex items-center space-x-3 flex-1 min-w-0">
                <lucide_react_1.FileText className="w-5 h-5 text-blue-400 flex-shrink-0"/>
                <div className="flex-1 min-w-0">
                  <p className="text-sm truncate">{file.name}</p>
                  {uploadProgress[file.name] !== undefined && (<div className="mt-1 h-1 w-full bg-gray-700 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 transition-all duration-200" style={{ width: "".concat(uploadProgress[file.name], "%") }}/>
                    </div>)}
                </div>
              </div>
              <button onClick={function () { return removeFile(index); }} className="ml-2 p-2 text-gray-400 hover:text-gray-300" disabled={isUploading}>
                <lucide_react_1.X className="w-5 h-5"/>
              </button>
            </div>); })}

          <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3">
            <button onClick={function () { return setFiles([]); }} className="px-4 py-2 text-gray-400 hover:text-gray-300 w-full sm:w-auto" disabled={isUploading}>
              Clear All
            </button>
            <button onClick={uploadFiles} disabled={isUploading} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors w-full sm:w-auto">
              {isUploading ? 'Uploading...' : 'Upload Files'}
            </button>
          </div>
        </div>)}

      {/* Error Message */}
      {error && (<div className="p-4 bg-red-500/10 border border-red-500/50 rounded-lg">
          <div className="flex items-start space-x-2">
            <lucide_react_1.AlertCircle className="w-5 h-5 text-red-400 mt-0.5"/>
            <div className="flex-1">
              <h4 className="text-sm font-medium text-red-400">Upload Failed</h4>
              <p className="text-sm text-red-300/90 mt-1">{error}</p>
            </div>
          </div>
        </div>)}
    </div>);
}
