"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatMessage = ChatMessage;
var utils_1 = require("@/lib/utils");
var card_1 = require("@/components/ui/card");
var avatar_1 = require("@/components/ui/avatar");
function ChatMessage(_a) {
    var message = _a.message;
    var isUser = message.type === 'user';
    return (<div className={(0, utils_1.cn)("flex gap-3 p-4", isUser ? "justify-end" : "justify-start")}>
      <card_1.Card className={(0, utils_1.cn)("max-w-[80%] p-4", isUser ? "bg-primary text-primary-foreground" : "bg-muted")}>
        <div className="flex items-start gap-2">
          <avatar_1.Avatar>
            {isUser ? 'U' : 'AI'}
          </avatar_1.Avatar>
          <div className="flex-1">
            <div className="prose dark:prose-invert">
              {message.content}
            </div>
            {message.metadata && (<div className="text-xs text-muted-foreground mt-2">
                {message.metadata.model && "Model: ".concat(message.metadata.model)}
                {message.metadata.tokens && " \u2022 Tokens: ".concat(message.metadata.tokens)}
              </div>)}
          </div>
        </div>
      </card_1.Card>
    </div>);
}
