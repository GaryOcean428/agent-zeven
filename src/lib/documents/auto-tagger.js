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
exports.AutoTagger = void 0;
var thought_logger_1 = require("../logging/thought-logger");
var AutoTagger = /** @class */ (function () {
    function AutoTagger() {
        // Common technical terms and their categories
        this.tagCategories = {
            programming: [
                'javascript', 'typescript', 'python', 'java', 'c++', 'code', 'function',
                'class', 'api', 'react', 'vue', 'angular', 'node', 'express', 'database'
            ],
            documentation: [
                'readme', 'docs', 'documentation', 'guide', 'tutorial', 'manual',
                'reference', 'specification', 'api doc', 'changelog'
            ],
            configuration: [
                'config', 'settings', 'env', 'environment', 'setup', 'installation',
                'docker', 'kubernetes', 'deployment', 'build'
            ],
            data: [
                'json', 'xml', 'csv', 'database', 'sql', 'nosql', 'schema',
                'model', 'dataset', 'analytics'
            ],
            security: [
                'security', 'auth', 'authentication', 'authorization', 'encryption',
                'token', 'jwt', 'oauth', 'password', 'credentials'
            ]
        };
        // File type tags
        this.fileTypeTags = {
            'application/pdf': ['pdf', 'document'],
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['docx', 'document'],
            'text/plain': ['txt', 'text'],
            'text/markdown': ['markdown', 'documentation']
        };
    }
    AutoTagger.getInstance = function () {
        if (!AutoTagger.instance) {
            AutoTagger.instance = new AutoTagger();
        }
        return AutoTagger.instance;
    };
    AutoTagger.prototype.generateTags = function (content, fileName, mimeType) {
        return __awaiter(this, void 0, void 0, function () {
            var tags, finalTags;
            return __generator(this, function (_a) {
                thought_logger_1.thoughtLogger.log('execution', 'Generating tags for document', { fileName: fileName });
                try {
                    tags = new Set();
                    // Add file type tags
                    this.addFileTypeTags(tags, mimeType);
                    // Add content-based tags
                    this.addContentTags(tags, content);
                    // Add filename-based tags
                    this.addFilenameTags(tags, fileName);
                    finalTags = Array.from(tags).slice(0, 10);
                    thought_logger_1.thoughtLogger.log('success', 'Tags generated successfully', {
                        fileName: fileName,
                        tagCount: finalTags.length,
                        tags: finalTags
                    });
                    return [2 /*return*/, finalTags];
                }
                catch (error) {
                    thought_logger_1.thoughtLogger.log('error', 'Failed to generate tags', { error: error });
                    return [2 /*return*/, []];
                }
                return [2 /*return*/];
            });
        });
    };
    AutoTagger.prototype.addFileTypeTags = function (tags, mimeType) {
        var typeTags = this.fileTypeTags[mimeType] || [];
        typeTags.forEach(function (tag) { return tags.add(tag); });
    };
    AutoTagger.prototype.addContentTags = function (tags, content) {
        var normalizedContent = content.toLowerCase();
        // Add category-based tags
        for (var _i = 0, _a = Object.entries(this.tagCategories); _i < _a.length; _i++) {
            var _b = _a[_i], category = _b[0], terms = _b[1];
            var hasTerms = terms.some(function (term) { return normalizedContent.includes(term); });
            if (hasTerms) {
                tags.add(category);
                // Add specific matching terms as tags
                terms
                    .filter(function (term) { return normalizedContent.includes(term); })
                    .forEach(function (term) { return tags.add(term); });
            }
        }
        // Add language-specific tags
        this.detectLanguages(normalizedContent).forEach(function (lang) { return tags.add(lang); });
    };
    AutoTagger.prototype.addFilenameTags = function (tags, fileName) {
        var _a;
        var normalizedName = fileName.toLowerCase();
        // Add tags based on common filename patterns
        if (normalizedName.includes('readme'))
            tags.add('documentation');
        if (normalizedName.includes('config'))
            tags.add('configuration');
        if (normalizedName.includes('test'))
            tags.add('testing');
        if (normalizedName.includes('example'))
            tags.add('example');
        // Add extension as tag
        var extension = (_a = fileName.split('.').pop()) === null || _a === void 0 ? void 0 : _a.toLowerCase();
        if (extension && extension !== fileName.toLowerCase()) {
            tags.add(extension);
        }
    };
    AutoTagger.prototype.detectLanguages = function (content) {
        var languages = [];
        // Simple language detection based on common patterns
        if (content.includes('function') || content.includes('const') || content.includes('let')) {
            languages.push('javascript');
        }
        if (content.includes('interface') || content.includes('type ') || content.includes(': string')) {
            languages.push('typescript');
        }
        if (content.includes('def ') || content.includes('import ') || content.includes('class ')) {
            languages.push('python');
        }
        if (content.includes('public class') || content.includes('private void')) {
            languages.push('java');
        }
        return languages;
    };
    return AutoTagger;
}());
exports.AutoTagger = AutoTagger;
