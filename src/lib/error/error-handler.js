"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorHandler = void 0;
var ErrorHandler = /** @class */ (function () {
    function ErrorHandler() {
    }
    ErrorHandler.createError = function (code, message, details) {
        var error = new Error(message);
        error.code = code;
        error.details = details;
        return error;
    };
    ErrorHandler.handleError = function (error) {
        if (error.code) {
            return error;
        }
        return this.createError('UNKNOWN_ERROR', error.message || 'An unknown error occurred', { originalError: error });
    };
    ErrorHandler.isProcessingError = function (error) {
        return error && typeof error === 'object' && 'code' in error;
    };
    return ErrorHandler;
}());
exports.ErrorHandler = ErrorHandler;
