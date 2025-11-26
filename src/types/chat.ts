export type ChatRole = 'user' | 'assistant' | 'system';

export type ChatActionType =
    | 'NAVIGATE'
    | 'FILL_FORM'
    | 'SHOW_TOURS'
    | 'CALCULATE_BUDGET'
    | 'OPEN_PLANNER';

export interface ChatAction {
    label: string;
    type: ChatActionType;
    payload?: unknown;
}

export interface ChatMessage {
    id: string;
    role: ChatRole;
    content: string;
    timestamp: number;
    actions?: ChatAction[];
    isTyping?: boolean;
}

export interface ChatState {
    isOpen: boolean;
    messages: ChatMessage[];
    isTyping: boolean;
    unreadCount: number;
}

export interface ChatIntent {
    id: string;
    keywords: string[];
    response: (context?: unknown) => string;
    actions?: ChatAction[];
}
