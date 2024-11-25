"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AutoTagger = void 0;
var AutoTagger = /** @class */ (function () {
    function AutoTagger() {
    }
    AutoTagger.getInstance = function () {
        if (!AutoTagger.instance) {
            AutoTagger.instance = new AutoTagger();
        }
        return AutoTagger.instance;
    };
    AutoTagger.prototype.generateTags = function (messages) {
        var tags = new Set();
        var content = messages.map(function (m) { return m.content; }).join(' ').toLowerCase();
        // Topic-based tags
        this.addTopicTags(content, tags);
        // Technical tags
        this.addTechnicalTags(content, tags);
        // Length-based tags
        this.addLengthTags(messages, tags);
        // Interaction-based tags
        this.addInteractionTags(messages, tags);
        return Array.from(tags);
    };
    AutoTagger.prototype.addTopicTags = function (content, tags) {
        var topics = {
            coding: ['code', 'programming', 'function', 'api', 'debug'],
            design: ['design', 'ui', 'ux', 'layout', 'style'],
            data: ['data', 'database', 'query', 'analytics'],
            business: ['business', 'strategy', 'market', 'customer']
        };
        Object.entries(topics).forEach(function (_a) {
            var topic = _a[0], keywords = _a[1];
            if (keywords.some(function (keyword) { return content.includes(keyword); })) {
                tags.add(topic);
            }
        });
    };
    AutoTagger.prototype.addTechnicalTags = function (content, tags) {
        var technologies = {
            javascript: ['javascript', 'js', 'node', 'react'],
            python: ['python', 'django', 'flask'],
            database: ['sql', 'mongodb', 'database'],
            cloud: ['aws', 'azure', 'cloud']
        };
        Object.entries(technologies).forEach(function (_a) {
            var tech = _a[0], keywords = _a[1];
            if (keywords.some(function (keyword) { return content.includes(keyword); })) {
                tags.add(tech);
            }
        });
    };
    AutoTagger.prototype.addLengthTags = function (messages, tags) {
        var totalLength = messages.reduce(function (sum, msg) { return sum + msg.content.length; }, 0);
        if (totalLength < 500)
            tags.add('short');
        else if (totalLength > 2000)
            tags.add('long');
        if (messages.length > 10)
            tags.add('detailed-conversation');
    };
    AutoTagger.prototype.addInteractionTags = function (messages, tags) {
        var hasCode = messages.some(function (m) { return m.content.includes('```'); });
        if (hasCode)
            tags.add('contains-code');
        var hasLinks = messages.some(function (m) { return m.content.includes('http'); });
        if (hasLinks)
            tags.add('contains-links');
    };
    return AutoTagger;
}());
exports.AutoTagger = AutoTagger;
