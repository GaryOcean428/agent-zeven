"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatContext = void 0;
var ChatContext = /** @class */ (function () {
    function ChatContext() {
        this.recentMessages = [];
        this.maxRecentMessages = 10;
    }
    ChatContext.prototype.addMessage = function (message) {
        this.recentMessages.push(message);
        if (this.recentMessages.length > this.maxRecentMessages) {
            this.recentMessages.shift();
        }
    };
    ChatContext.prototype.getRecentContext = function () {
        return this.recentMessages
            .map(function (msg) { return "".concat(msg.role, ": ").concat(msg.content); })
            .join('\n');
    };
    ChatContext.prototype.clear = function () {
        this.recentMessages = [];
    };
    return ChatContext;
}());
exports.ChatContext = ChatContext;
