import React from 'react';
import { useChat } from '../../contexts/ChatContext';
import { ChatWindow } from './ChatWindow';
import { MessageCircle } from 'lucide-react';
import { cn } from '../../lib/utils';

export const ChatWidget: React.FC = () => {
    const { isOpen, toggleChat, unreadCount } = useChat();

    return (
        <div className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-[100] flex flex-col items-end">
            {/* Chat Window */}
            <div className={cn(
                "transition-all duration-300 ease-in-out origin-bottom-right mb-4 shadow-2xl rounded-xl overflow-hidden border border-gray-200",
                isOpen
                    ? "w-[calc(100vw-2rem)] sm:w-[350px] md:w-[400px] h-[500px] sm:h-[550px] opacity-100 scale-100 translate-y-0 pointer-events-auto"
                    : "w-[calc(100vw-2rem)] sm:w-[350px] md:w-[400px] h-[500px] sm:h-[550px] opacity-0 scale-95 translate-y-4 pointer-events-none hidden"
            )}>
                <ChatWindow />
            </div>

            {/* Toggle Button */}
            <button
                onClick={toggleChat}
                className={cn(
                    "relative w-12 h-12 sm:w-14 sm:h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95",
                    isOpen
                        ? "bg-gray-800 hover:bg-gray-900 text-white rotate-90"
                        : "bg-ghana-red hover:bg-ghana-red/90 text-white rotate-0"
                )}
                aria-label={isOpen ? "Close chat" : "Chat with Adepa"}
                title={isOpen ? "Close chat" : "Chat with Adepa"}
            >
                {isOpen ? (
                    <span className="text-2xl font-bold">×</span>
                ) : (
                    <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7" />
                )}

                {/* Unread Badge */}
                {!isOpen && unreadCount > 0 && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-ghana-yellow text-ghana-black text-xs font-bold rounded-full flex items-center justify-center border-2 border-white animate-pulse">
                        {unreadCount}
                    </div>
                )}
            </button>
        </div>
    );
};
