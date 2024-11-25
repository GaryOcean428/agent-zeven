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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HTTPClient = void 0;
var AppError_1 = require("./errors/AppError");
var thought_logger_1 = require("./logging/thought-logger");
var HTTPClient = /** @class */ (function () {
    function HTTPClient(baseUrl, defaultOptions) {
        if (baseUrl === void 0) { baseUrl = ''; }
        if (defaultOptions === void 0) { defaultOptions = {}; }
        this.baseUrl = baseUrl;
        this.defaultOptions = __assign({ timeout: 10000, retries: 3, retryDelay: 1000, headers: {
                'Content-Type': 'application/json',
            } }, defaultOptions);
        this.cache = new Map();
    }
    HTTPClient.prototype.fetch = function (url_1) {
        return __awaiter(this, arguments, void 0, function (url, options, cacheOptions) {
            var fullUrl, finalOptions, cached, lastError, attempt, response, _a, _b, data, error_1;
            if (options === void 0) { options = {}; }
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        fullUrl = this.baseUrl + url;
                        finalOptions = __assign(__assign({}, this.defaultOptions), options);
                        if (cacheOptions) {
                            cached = this.getFromCache(cacheOptions.key || fullUrl);
                            if (cached)
                                return [2 /*return*/, cached];
                        }
                        lastError = null;
                        attempt = 0;
                        _c.label = 1;
                    case 1:
                        if (!(attempt <= finalOptions.retries)) return [3 /*break*/, 11];
                        _c.label = 2;
                    case 2:
                        _c.trys.push([2, 7, , 10]);
                        thought_logger_1.thoughtLogger.log('execution', "HTTP Request: ".concat(finalOptions.method || 'GET', " ").concat(fullUrl), {
                            attempt: attempt + 1
                        });
                        return [4 /*yield*/, this.timeoutFetch(fullUrl, finalOptions)];
                    case 3:
                        response = _c.sent();
                        if (!!response.ok) return [3 /*break*/, 5];
                        _a = AppError_1.AppError.bind;
                        _b = [void 0, "HTTP request failed with status ".concat(response.status), 'API_ERROR'];
                        return [4 /*yield*/, response.text()];
                    case 4: throw new (_a.apply(AppError_1.AppError, _b.concat([_c.sent()])))();
                    case 5: return [4 /*yield*/, response.json()];
                    case 6:
                        data = _c.sent();
                        if (cacheOptions) {
                            this.setCache(cacheOptions.key || fullUrl, data, cacheOptions.ttl);
                        }
                        thought_logger_1.thoughtLogger.log('success', 'HTTP request successful');
                        return [2 /*return*/, data];
                    case 7:
                        error_1 = _c.sent();
                        lastError = error_1;
                        if (!(attempt < finalOptions.retries)) return [3 /*break*/, 9];
                        thought_logger_1.thoughtLogger.log('warning', "Request failed, retrying... (".concat(attempt + 1, "/").concat(finalOptions.retries, ")"), {
                            error: error_1
                        });
                        return [4 /*yield*/, new Promise(function (resolve) {
                                return setTimeout(resolve, finalOptions.retryDelay);
                            })];
                    case 8:
                        _c.sent();
                        return [3 /*break*/, 10];
                    case 9: return [3 /*break*/, 11];
                    case 10:
                        attempt++;
                        return [3 /*break*/, 1];
                    case 11:
                        thought_logger_1.thoughtLogger.log('error', 'All request attempts failed', { lastError: lastError });
                        throw lastError || new Error('Request failed');
                }
            });
        });
    };
    HTTPClient.prototype.timeoutFetch = function (url, options) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, timeout, fetchOptions, controller, timeoutId, response;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = options.timeout, timeout = _a === void 0 ? 10000 : _a, fetchOptions = __rest(options, ["timeout"]);
                        controller = new AbortController();
                        timeoutId = setTimeout(function () { return controller.abort(); }, timeout);
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, , 3, 4]);
                        return [4 /*yield*/, fetch(url, __assign(__assign({}, fetchOptions), { signal: controller.signal }))];
                    case 2:
                        response = _b.sent();
                        return [2 /*return*/, response];
                    case 3:
                        clearTimeout(timeoutId);
                        return [7 /*endfinally*/];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    HTTPClient.prototype.getFromCache = function (key) {
        var cached = this.cache.get(key);
        if (!cached)
            return null;
        if (Date.now() > cached.expires) {
            this.cache.delete(key);
            return null;
        }
        return cached.data;
    };
    HTTPClient.prototype.setCache = function (key, data, ttl) {
        this.cache.set(key, {
            data: data,
            expires: Date.now() + ttl,
        });
    };
    return HTTPClient;
}());
exports.HTTPClient = HTTPClient;
