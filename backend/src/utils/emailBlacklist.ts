export const DISPOSABLE_DOMAINS = [
    'mailinator.com', 'guerrillamail.com', 'tempmail.com', '10minutemail.com',
    'trashmail.com', 'yopmail.com', 'maildrop.cc', 'temp-mail.org', 'throwawaymail.com',
    'mailcatch.com', 'mailnesia.com', 'spam4.me', 'sharklasers.com'
];

export const isDisposableEmail = (email: string): boolean => {
    const domain = email.split('@')[1]?.toLowerCase();
    return domain ? DISPOSABLE_DOMAINS.includes(domain) : false;
};

export const isValidEmailFormat = (email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};
