"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventEmitter = void 0;
var EventEmitter = /** @class */ (function () {
    function EventEmitter() {
        this.events = {};
    }
    EventEmitter.prototype.on = function (event, callback) {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push(callback);
    };
    EventEmitter.prototype.off = function (event, callback) {
        if (!this.events[event])
            return;
        this.events[event] = this.events[event].filter(function (cb) { return cb !== callback; });
    };
    EventEmitter.prototype.emit = function (event) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (!this.events[event])
            return;
        this.events[event].forEach(function (callback) { return callback.apply(void 0, args); });
    };
    EventEmitter.prototype.once = function (event, callback) {
        var _this = this;
        var wrapper = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            callback.apply(void 0, args);
            _this.off(event, wrapper);
        };
        this.on(event, wrapper);
    };
    EventEmitter.prototype.removeAllListeners = function (event) {
        if (event) {
            delete this.events[event];
        }
        else {
            this.events = {};
        }
    };
    return EventEmitter;
}());
exports.EventEmitter = EventEmitter;
