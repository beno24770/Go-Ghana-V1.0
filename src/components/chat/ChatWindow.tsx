import React, { useState, useRef, useEffect } from 'react';
import { useChat } from '../../contexts/ChatContext';
import { ChatMessage } from './ChatMessage';
import { X, Send, MapPin } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

export const ChatWindow: React.FC = () => {
    const { messages, isTyping, sendMessage, toggleChat } = useChat();
    const [inputValue, setInputValue] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (inputValue.trim()) {
            sendMessage(inputValue);
            setInputValue('');
        }
    };

    return (
        <div className="flex flex-col h-full bg-gray-50">
            {/* Header */}
            <div className="bg-ghana-red text-white p-3 sm:p-4 flex items-center justify-between shadow-md rounded-t-xl">
                <div className="flex items-center gap-2 sm:gap-3">
                    <div className="relative">
                        <div className="w-10 h-10 rounded-full bg-ghana-yellow border-2 border-white overflow-hidden flex items-center justify-center">
                            <img
                                src="/adepa-avatar.jpg"
                                alt="Adepa"
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    // Fallback if image fails to load
                                    (e.target as HTMLImageElement).style.display = 'none';
                                    (e.target as HTMLImageElement).parentElement!.innerText = '🇬🇭';
                                }}
                            />
                        </div>
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-ghana-green border-2 border-ghana-red rounded-full"></div>
                    </div>
                    <div>
                        <h3 className="font-bold text-base sm:text-lg leading-tight">Adepa</h3>
                        <p className="text-xs text-white/80 flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            Your Ghana Guide
                        </p>
                    </div>
                </div>
                <button
                    onClick={toggleChat}
                    className="p-2 hover:bg-white/20 rounded-full transition-colors"
                >
                    <X className="w-5 h-5" />
                </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-4">
                {messages.map((msg) => (
                    <ChatMessage key={msg.id} message={msg} />
                ))}

                {isTyping && (
                    <div className="flex items-center gap-2 text-gray-400 text-sm ml-2">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-3 sm:p-4 bg-white border-t border-gray-200 rounded-b-xl">
                <form onSubmit={handleSubmit} className="flex gap-2">
                    <Input
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Ask about Ghana..."
                        className="flex-1 bg-gray-50 border-gray-200 focus:border-ghana-yellow focus:ring-ghana-yellow text-sm"
                    />
                    <Button
                        type="submit"
                        disabled={!inputValue.trim() || isTyping}
                        className="bg-ghana-green hover:bg-ghana-green/90 text-white px-3 sm:px-4"
                    >
                        <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                    </Button>
                </form>
            </div>
        </div>
    );
};
