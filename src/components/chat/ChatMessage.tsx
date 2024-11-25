import { cn } from "@/lib/utils";
import { Message } from "@/lib/types/Message";
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.type === 'user';
  
  return (
    <div className={cn(
      "flex gap-3 p-4",
      isUser ? "justify-end" : "justify-start"
    )}>
      <Card className={cn(
        "max-w-[80%] p-4",
        isUser ? "bg-primary text-primary-foreground" : "bg-muted"
      )}>
        <div className="flex items-start gap-2">
          <Avatar>
            {isUser ? 'U' : 'AI'}
          </Avatar>
          <div className="flex-1">
            <div className="prose dark:prose-invert">
              {message.content}
            </div>
            {message.metadata && (
              <div className="text-xs text-muted-foreground mt-2">
                {message.metadata.model && `Model: ${message.metadata.model}`}
                {message.metadata.tokens && ` • Tokens: ${message.metadata.tokens}`}
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
} 