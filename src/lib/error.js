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
exports.AgentError = exports.APIError = void 0;
var APIError = /** @class */ (function (_super) {
    __extends(APIError, _super);
    function APIError(message, status, response) {
        var _this = _super.call(this, message) || this;
        _this.status = status;
        _this.response = response;
        _this.name = 'APIError';
        return _this;
    }
    return APIError;
}(Error));
exports.APIError = APIError;
var AgentError = /** @class */ (function (_super) {
    __extends(AgentError, _super);
    function AgentError(message) {
        var _this = _super.call(this, message) || this;
        _this.name = 'AgentError';
        return _this;
    }
    return AgentError;
}(Error));
exports.AgentError = AgentError;
