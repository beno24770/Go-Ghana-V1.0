import React from 'react';
import type { ChatMessage as ChatMessageType } from '../../types/chat';
import { cn } from '../../lib/utils';
import { Bot, User } from 'lucide-react';
import { useChat } from '../../contexts/ChatContext';

interface ChatMessageProps {
    message: ChatMessageType;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
    const isBot = message.role === 'assistant';
    const { handleAction } = useChat();

    return (
        <div className={cn(
            "flex w-full gap-2 mb-4",
            isBot ? "justify-start" : "justify-end"
        )}>
            {isBot && (
                <div className="w-8 h-8 rounded-full bg-ghana-yellow flex items-center justify-center flex-shrink-0 border border-ghana-black/10">
                    <Bot className="w-5 h-5 text-ghana-black" />
                </div>
            )}

            <div className={cn(
                "max-w-[80%] rounded-2xl px-4 py-3 text-sm",
                isBot
                    ? "bg-white border border-gray-100 text-gray-800 rounded-tl-none shadow-sm"
                    : "bg-ghana-red text-white rounded-tr-none shadow-md"
            )}>
                <p className="leading-relaxed whitespace-pre-wrap">{message.content}</p>

                {message.actions && message.actions.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                        {message.actions.map((action, idx) => (
                            <button
                                key={idx}
                                onClick={() => handleAction(action.type, action.payload)}
                                className="text-xs bg-ghana-green/10 text-ghana-green hover:bg-ghana-green hover:text-white border border-ghana-green/20 px-3 py-1.5 rounded-full transition-colors font-medium"
                            >
                                {action.label}
                            </button>
                        ))}
                    </div>
                )}

                <span className="text-[10px] opacity-50 mt-1 block text-right">
                    {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
            </div>

            {!isBot && (
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                    <User className="w-5 h-5 text-gray-500" />
                </div>
            )}
        </div>
    );
};
