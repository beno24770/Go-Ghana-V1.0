import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import type { ChatMessage, ChatState } from '../types/chat';
import type { BudgetBreakdown, BudgetFormData } from '../types';
import { chatService } from '../services/chatService';
import { v4 as uuidv4 } from 'uuid';

export interface BudgetContext {
    breakdown: BudgetBreakdown;
    formData: BudgetFormData;
    // Detailed calculations for intelligent chat responses
    calculations?: {
        dailyCosts: {
            accommodation: number;
            food: number;
            transport: number;
            activities: number;
        };
        interRegionTransport?: {
            moves: number;
            costPerMove: number;
            total: number;
        };
        multipliers: {
            regional: number;
            seasonal: number;
        };
        baseCosts: {
            accommodation: number;
            food: number;
            transport: number;
            activities: number;
        };
    };
}

interface ChatContextType extends ChatState {
    budgetContext: BudgetContext | null;
    setBudgetContext: (context: BudgetContext | null) => void;
    toggleChat: () => void;
    sendMessage: (content: string) => void;
    handleAction: (actionType: string, payload?: unknown) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: React.ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [isTyping, setIsTyping] = useState(false);
    const [unreadCount, setUnreadCount] = useState(0);
    const [budgetContext, setBudgetContextState] = useState<BudgetContext | null>(null);

    // Initialize chat with welcome message
    useEffect(() => {
        const initialMsg = chatService.getInitialMessage();
        setMessages([initialMsg]);
        setUnreadCount(1);
    }, []);

    const toggleChat = useCallback(() => {
        setIsOpen(prev => {
            const newState = !prev;
            if (newState) {
                setUnreadCount(0);
            }
            return newState;
        });
    }, []);

    const setBudgetContext = useCallback((context: BudgetContext | null) => {
        setBudgetContextState(context);
        // If setting budget context, add a contextual welcome message
        if (context) {
            const contextMsg: ChatMessage = {
                id: uuidv4(),
                role: 'assistant',
                content: "Great! I can now see your budget details. Feel free to ask me anything about your budget breakdown, daily costs, or specific expenses. What would you like to know?",
                timestamp: Date.now()
            };
            setMessages(prev => [...prev, contextMsg]);
        }
    }, []);

    const sendMessage = useCallback(async (content: string) => {
        // Add user message
        const userMsg: ChatMessage = {
            id: uuidv4(),
            role: 'user',
            content,
            timestamp: Date.now()
        };

        setMessages(prev => [...prev, userMsg]);
        setIsTyping(true);

        // Simulate network delay for "AI" feel, but await the actual processing
        // We wrap the async call in a timeout to ensure the UI shows "typing" for at least a bit
        setTimeout(async () => {
            try {
                const response = await chatService.processMessage(content, budgetContext);
                setMessages(prev => [...prev, response]);
            } catch (error) {
                console.error("Failed to process message:", error);
                // Optional: Add error message to chat
            } finally {
                setIsTyping(false);
                if (!isOpen) {
                    setUnreadCount(prev => prev + 1);
                }
            }
        }, 1000);
    }, [isOpen, budgetContext]);

    const handleAction = useCallback((actionType: string, payload?: unknown) => {
        // Handle specific actions by converting them to user messages
        if (actionType === 'NAVIGATE') {
            if (payload === 'safety') {
                sendMessage("Is it safe to visit Ghana?");
            } else if (payload === 'weather') {
                sendMessage("When is the best time to visit?");
            }
        } else if (actionType === 'CALCULATE_BUDGET') {
            sendMessage("I want to start planning my budget.");
        }
    }, [sendMessage]);

    return (
        <ChatContext.Provider value={{
            isOpen,
            messages,
            isTyping,
            unreadCount,
            budgetContext,
            setBudgetContext,
            toggleChat,
            sendMessage,
            handleAction
        }}>
            {children}
        </ChatContext.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useChat() {
    const context = useContext(ChatContext);
    if (context === undefined) {
        throw new Error('useChat must be used within a ChatProvider');
    }
    return context;
}
