"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseParser = void 0;
var ResponseParser = /** @class */ (function () {
    function ResponseParser() {
    }
    ResponseParser.parseJSON = function (text) {
        try {
            return JSON.parse(text);
        }
        catch (error) {
            throw new Error("Invalid JSON: ".concat(error instanceof Error ? error.message : 'Unknown error'));
        }
    };
    ResponseParser.extractLinks = function (html) {
        var linkRegex = /<a[^>]+href=["']([^"']+)["'][^>]*>/g;
        var links = [];
        var match;
        while ((match = linkRegex.exec(html)) !== null) {
            links.push(match[1]);
        }
        return links;
    };
    ResponseParser.sanitizeHTML = function (html) {
        return html
            .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
            .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
            .replace(/<[^>]+>/g, ' ')
            .replace(/\s+/g, ' ')
            .trim();
    };
    ResponseParser.validateURL = function (url) {
        try {
            new URL(url);
            return true;
        }
        catch (_a) {
            return false;
        }
    };
    return ResponseParser;
}());
exports.ResponseParser = ResponseParser;
