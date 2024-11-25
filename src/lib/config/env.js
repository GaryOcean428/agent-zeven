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
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateEnv = validateEnv;
var zod_1 = require("zod");
var envSchema = zod_1.z.object({
    VITE_API_URL: zod_1.z.string().optional(),
    VITE_PUBLIC_APP_MODE: zod_1.z.string().optional(),
    XAI_TOKEN: zod_1.z.string().optional(),
    GROQ_TOKEN: zod_1.z.string().optional(),
    PERPLEXITY_TOKEN: zod_1.z.string().optional(),
    HUGGINGFACE_TOKEN: zod_1.z.string().optional(),
    GITHUB_TOKEN: zod_1.z.string().optional(),
    PINECONE_TOKEN: zod_1.z.string().optional(),
    PINECONE_ENV: zod_1.z.string().optional(),
    PINECONE_INDEX: zod_1.z.string().optional()
});
function validateEnv() {
    var publicEnv = import.meta.env;
    var privateEnv = process.env;
    var combinedEnv = __assign(__assign({}, publicEnv), privateEnv);
    var result = envSchema.safeParse(combinedEnv);
    if (!result.success) {
        var missing = result.error.issues.map(function (issue) { return issue.path.join('.'); });
        return { valid: false, missing: missing };
    }
    return { valid: true, missing: [] };
}
