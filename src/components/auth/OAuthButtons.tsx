import { Loader2 } from 'lucide-react';
import { Button } from '../ui/Button';

export function GoogleButton({ onClick, isLoading }: { onClick: () => void; isLoading?: boolean }) {
    return (
        <Button
            variant="outline"
            onClick={onClick}
            disabled={isLoading}
            className="w-full relative h-11 border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700 font-medium"
        >
            {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
                <>
                    <img
                        src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                        alt="Google"
                        className="w-5 h-5 absolute left-4"
                    />
                    <span>Continue with Google</span>
                </>
            )}
        </Button>
    );
}

export function AppleButton({ onClick, isLoading }: { onClick: () => void; isLoading?: boolean }) {
    return (
        <Button
            variant="outline"
            onClick={onClick}
            disabled={isLoading}
            className="w-full relative h-11 bg-black text-white hover:bg-gray-900 hover:text-white border-transparent"
        >
            {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin text-white" />
            ) : (
                <>
                    <svg className="w-5 h-5 absolute left-4 fill-white" viewBox="0 0 24 24">
                        <path d="M14.2 2.5c.7-.9 1.2-2.1 1-3.2-1 .1-2.3.7-3 1.5-.7.8-1.2 2-1 3.2 1.1-.1 2.3-.7 3.1-1.5zM17.6 19.3c-1.5 2.2-3 2.2-4.4 0-1.1-1.6-2.1-1.6-3.1 0-1.4 2.2-2.9 2.2-4.5 0-2.8-4-4.7-11.2 1.3-13.6 1.7-.7 3.1.2 4.1.2 1.1 0 2.9-1.2 5.1-.3 2.1.9 3.1 3.2 3.8 4.3-3.3 1.9-2.7 6.4.5 7.8-.5 1.5-1.9 4-2.8 5.6z" />
                    </svg>
                    <span>Continue with Apple</span>
                </>
            )}
        </Button>
    );
}
