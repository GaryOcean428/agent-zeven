"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeSystem = initializeSystem;
var thought_logger_1 = require("./logging/thought-logger");
var config_1 = require("./config");
var agent_system_1 = require("./agents/agent-system");
var router_1 = require("./routing/router");
var memory_manager_1 = require("./memory/memory-manager");
var github_client_1 = require("./github/github-client");
var pinecone_client_1 = require("./vector/pinecone-client");
function checkApiKeys() {
    var status = {
        xai: Boolean(config_1.config.apiKeys.xai),
        groq: Boolean(config_1.config.apiKeys.groq),
        perplexity: Boolean(config_1.config.apiKeys.perplexity),
        huggingface: Boolean(config_1.config.apiKeys.huggingface),
        github: Boolean(config_1.config.apiKeys.github),
        pinecone: Boolean(config_1.config.apiKeys.pinecone)
    };
    var missingKeys = Object.entries(status)
        .filter(function (_a) {
        var _ = _a[0], value = _a[1];
        return !value;
    })
        .map(function (_a) {
        var key = _a[0];
        return key;
    });
    return {
        valid: missingKeys.length === 0,
        missingKeys: missingKeys,
        status: status
    };
}
function initializeSystem() {
    return __awaiter(this, void 0, void 0, function () {
        var _a, valid, missingKeys, status_1, github, pinecone, modelRouter, memoryManager, _b, githubResult, pineconeResult, modelRouterResult, memoryResult, error_1;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 3, , 4]);
                    thought_logger_1.thoughtLogger.log('plan', 'Starting system initialization');
                    _a = checkApiKeys(), valid = _a.valid, missingKeys = _a.missingKeys, status_1 = _a.status;
                    if (!valid) {
                        thought_logger_1.thoughtLogger.log('warning', 'Missing required API keys', {
                            missingKeys: missingKeys,
                            apiKeys: status_1
                        });
                    }
                    github = github_client_1.GitHubClient.getInstance();
                    pinecone = pinecone_client_1.PineconeClient.getInstance();
                    modelRouter = router_1.ModelRouter.getInstance();
                    memoryManager = memory_manager_1.MemoryManager.getInstance();
                    return [4 /*yield*/, Promise.allSettled([
                            github.initialize(),
                            pinecone.initialize(),
                            modelRouter.initialize(),
                            memoryManager.initialize()
                        ])];
                case 1:
                    _b = _c.sent(), githubResult = _b[0], pineconeResult = _b[1], modelRouterResult = _b[2], memoryResult = _b[3];
                    // Initialize agent system last
                    return [4 /*yield*/, agent_system_1.agentSystem.initialize()];
                case 2:
                    // Initialize agent system last
                    _c.sent();
                    // Log initialization results
                    thought_logger_1.thoughtLogger.log('success', 'System initialization complete', {
                        githubReady: githubResult.status === 'fulfilled',
                        pineconeReady: pineconeResult.status === 'fulfilled',
                        modelRouterReady: modelRouterResult.status === 'fulfilled',
                        memoryManagerReady: memoryResult.status === 'fulfilled',
                        agentSystemReady: agent_system_1.agentSystem.isInitialized
                    });
                    // Return true to allow system to function with reduced capabilities
                    return [2 /*return*/, true];
                case 3:
                    error_1 = _c.sent();
                    thought_logger_1.thoughtLogger.log('error', 'System initialization failed', { error: error_1 });
                    // Return true to allow system to function with reduced capabilities
                    return [2 /*return*/, true];
                case 4: return [2 /*return*/];
            }
        });
    });
}
