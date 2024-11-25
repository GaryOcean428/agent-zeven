"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigurationError = exports.ValidationError = exports.MemoryError = exports.ToolError = exports.ProcessingError = exports.SearchError = exports.APIError = exports.AppError = void 0;
var AppError = /** @class */ (function (_super) {
    __extends(AppError, _super);
    function AppError(message, code, details) {
        if (code === void 0) { code = 'UNKNOWN_ERROR'; }
        var _this = _super.call(this, message) || this;
        _this.code = code;
        _this.details = details;
        _this.name = 'AppError';
        return _this;
    }
    return AppError;
}(Error));
exports.AppError = AppError;
var APIError = /** @class */ (function (_super) {
    __extends(APIError, _super);
    function APIError(message, details) {
        var _this = _super.call(this, message, 'API_ERROR', details) || this;
        _this.name = 'APIError';
        return _this;
    }
    return APIError;
}(AppError));
exports.APIError = APIError;
var SearchError = /** @class */ (function (_super) {
    __extends(SearchError, _super);
    function SearchError(message, details) {
        var _this = _super.call(this, message, 'SEARCH_ERROR', details) || this;
        _this.name = 'SearchError';
        return _this;
    }
    return SearchError;
}(AppError));
exports.SearchError = SearchError;
var ProcessingError = /** @class */ (function (_super) {
    __extends(ProcessingError, _super);
    function ProcessingError(message, details) {
        var _this = _super.call(this, message, 'PROCESSING_ERROR', details) || this;
        _this.name = 'ProcessingError';
        return _this;
    }
    return ProcessingError;
}(AppError));
exports.ProcessingError = ProcessingError;
var ToolError = /** @class */ (function (_super) {
    __extends(ToolError, _super);
    function ToolError(message, details) {
        var _this = _super.call(this, message, 'TOOL_ERROR', details) || this;
        _this.name = 'ToolError';
        return _this;
    }
    return ToolError;
}(AppError));
exports.ToolError = ToolError;
var MemoryError = /** @class */ (function (_super) {
    __extends(MemoryError, _super);
    function MemoryError(message, details) {
        var _this = _super.call(this, message, 'MEMORY_ERROR', details) || this;
        _this.name = 'MemoryError';
        return _this;
    }
    return MemoryError;
}(AppError));
exports.MemoryError = MemoryError;
var ValidationError = /** @class */ (function (_super) {
    __extends(ValidationError, _super);
    function ValidationError(message, details) {
        var _this = _super.call(this, message, 'VALIDATION_ERROR', details) || this;
        _this.name = 'ValidationError';
        return _this;
    }
    return ValidationError;
}(AppError));
exports.ValidationError = ValidationError;
var ConfigurationError = /** @class */ (function (_super) {
    __extends(ConfigurationError, _super);
    function ConfigurationError(message, details) {
        var _this = _super.call(this, message, 'CONFIGURATION_ERROR', details) || this;
        _this.name = 'ConfigurationError';
        return _this;
    }
    return ConfigurationError;
}(AppError));
exports.ConfigurationError = ConfigurationError;
