import { useState } from 'react';
import { Share2, Copy, Check, X } from 'lucide-react';
import { Button } from '../ui/Button';

interface ShareModalProps {
    isOpen: boolean;
    onClose: () => void;
    tripId: string;
    tripName: string;
    userId: string;
}

export function ShareModal({ isOpen, onClose, tripId, tripName, userId }: ShareModalProps) {
    const [copied, setCopied] = useState(false);

    // Construct share URL
    const shareUrl = `${window.location.origin}/plan/${userId}/${tripId}`;
    const shareText = `Check out my Ghana trip: ${tripName}! Planned with Go Ghana AI.`;

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(shareUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy', err);
        }
    };

    const socialLinks = [
        {
            name: 'WhatsApp',
            url: `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`,
            color: 'bg-[#25D366]',
        },
        {
            name: 'Twitter/X',
            url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
            color: 'bg-[#1DA1F2]',
        },
        {
            name: 'Facebook',
            url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
            color: 'bg-[#1877F2]',
        }
    ];

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
                <div className="p-6 space-y-6">
                    <div className="flex items-center justify-between">
                        <h3 className="text-xl font-bold flex items-center gap-2">
                            <Share2 className="h-5 w-5 text-ghana-green" />
                            Share Trip
                        </h3>
                        <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100 transition-colors">
                            <X className="h-5 w-5 text-gray-500" />
                        </button>
                    </div>

                    <div className="space-y-4">
                        <label className="block text-sm font-medium text-gray-700">Trip Link</label>
                        <div className="flex gap-2">
                            <input
                                readOnly
                                value={shareUrl}
                                className="flex-1 px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-600 focus:outline-none"
                            />
                            <Button onClick={handleCopy} variant="outline" className="min-w-[100px]">
                                {copied ? <><Check className="h-4 w-4 mr-2" /> Copied</> : <><Copy className="h-4 w-4 mr-2" /> Copy</>}
                            </Button>
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                        {socialLinks.map((social) => (
                            <a
                                key={social.name}
                                href={social.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`
                                    flex flex-col items-center justify-center gap-2 p-3 rounded-xl 
                                    text-white font-bold transition-transform hover:scale-105 active:scale-95
                                    ${social.color}
                                `}
                            >
                                <span>{social.name}</span>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
