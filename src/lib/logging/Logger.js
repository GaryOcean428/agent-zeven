"use strict";
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
exports.logger = exports.Logger = void 0;
var Logger = /** @class */ (function () {
    function Logger() {
        this.logs = [];
        this.maxLogs = 1000;
    }
    Logger.getInstance = function () {
        if (!Logger.instance) {
            Logger.instance = new Logger();
        }
        return Logger.instance;
    };
    Logger.prototype.debug = function (message, details) {
        this.log('debug', message, details);
    };
    Logger.prototype.info = function (message, details) {
        this.log('info', message, details);
    };
    Logger.prototype.warn = function (message, details) {
        this.log('warn', message, details);
    };
    Logger.prototype.error = function (message, details) {
        this.log('error', message, details);
    };
    Logger.prototype.log = function (level, message, details) {
        var entry = {
            timestamp: Date.now(),
            level: level,
            message: message,
            details: details
        };
        this.logs.push(entry);
        if (this.logs.length > this.maxLogs) {
            this.logs = this.logs.slice(-this.maxLogs);
        }
        // Also log to console for development
        console[level](message, details || '');
    };
    Logger.prototype.getLogs = function () {
        return __spreadArray([], this.logs, true);
    };
    Logger.prototype.clear = function () {
        this.logs = [];
    };
    return Logger;
}());
exports.Logger = Logger;
exports.logger = Logger.getInstance();
