"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AIClient = void 0;

var AIClient = /** @class */ (function () {
    function AIClient() {
        // Simplified constructor
    }
    AIClient.prototype.generateResponse = function (options) {
        return Promise.resolve({ 
            text: "Development mode response", 
            toolResults: [] 
        });
    };
    AIClient.prototype.streamResponse = function (options) {
        return Promise.resolve({
            text: "Development mode stream",
            toolResults: []
        });
    };
    return AIClient;
}());
exports.AIClient = AIClient;
