import { useState } from 'react';
import { MessageCircle, Loader2, ExternalLink, Image as ImageIcon, DollarSign, Calendar } from 'lucide-react';
import { Button } from './ui/Button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/Dialog';
import { verifyRecommendation } from '../services/llmService';
import { useCurrency } from '../contexts/CurrencyContext';
import type { Recommendation, VerificationResult } from '../types/recommendations';

interface AdepaVerifyButtonProps {
    recommendation: Recommendation;
}

export function AdepaVerifyButton({ recommendation }: AdepaVerifyButtonProps) {
    const { convertAndFormat } = useCurrency();
    const [isVerifying, setIsVerifying] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const [verificationResult, setVerificationResult] = useState<VerificationResult | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleVerify = async () => {
        setIsVerifying(true);
        setError(null);

        try {
            // Check cache first (5-minute TTL)
            const cacheKey = `verification_${recommendation.id}`;
            const cached = sessionStorage.getItem(cacheKey);

            if (cached) {
                const cachedData = JSON.parse(cached);
                const cacheAge = Date.now() - new Date(cachedData.timestamp).getTime();

                // Use cache if less than 5 minutes old
                if (cacheAge < 5 * 60 * 1000) {
                    setVerificationResult(cachedData.result);
                    setShowResults(true);
                    setIsVerifying(false);
                    return;
                }
            }

            // Perform verification via Adepa
            const result = await verifyRecommendation(recommendation);

            // Cache the result
            sessionStorage.setItem(cacheKey, JSON.stringify({
                result,
                timestamp: new Date().toISOString()
            }));

            setVerificationResult(result);
            setShowResults(true);
        } catch (err) {
            console.error('Verification error:', err);
            setError('Unable to verify at this time. Please try again later.');
        } finally {
            setIsVerifying(false);
        }
    };

    return (
        <>
            <Button
                variant="outline"
                size="sm"
                onClick={handleVerify}
                disabled={isVerifying}
                className="w-full gap-2 border-ghana-green text-ghana-green hover:bg-ghana-green hover:text-white"
            >
                {isVerifying ? (
                    <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Asking Adepa...
                    </>
                ) : (
                    <>
                        <MessageCircle className="h-4 w-4" />
                        Ask Adepa to Verify
                    </>
                )}
            </Button>

            {/* Verification Results Modal */}
            <Dialog open={showResults} onOpenChange={setShowResults}>
                <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                            <MessageCircle className="h-5 w-5 text-ghana-green" />
                            Adepa's Verification: {recommendation.name}
                        </DialogTitle>
                    </DialogHeader>

                    {error ? (
                        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                            {error}
                        </div>
                    ) : verificationResult ? (
                        <div className="space-y-6">
                            {/* Current Price */}
                            {verificationResult.currentPrice && (
                                <div className="p-4 bg-ghana-green/10 rounded-lg">
                                    <div className="flex items-center gap-2 mb-2">
                                        <DollarSign className="h-5 w-5 text-ghana-green" />
                                        <h3 className="font-semibold text-gray-900">Current Pricing</h3>
                                    </div>
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-2xl font-bold text-ghana-green">
                                            {convertAndFormat(verificationResult.currentPrice.min)}
                                        </span>
                                        {verificationResult.currentPrice.max > verificationResult.currentPrice.min && (
                                            <>
                                                <span className="text-gray-400">-</span>
                                                <span className="text-xl font-semibold text-ghana-green">
                                                    {convertAndFormat(verificationResult.currentPrice.max)}
                                                </span>
                                            </>
                                        )}
                                    </div>
                                    <p className="text-xs text-gray-600 mt-1">
                                        Source: {verificationResult.currentPrice.source}
                                    </p>
                                </div>
                            )}

                            {/* Availability */}
                            {verificationResult.availability && (
                                <div className="flex items-center gap-2">
                                    <Calendar className="h-4 w-4 text-gray-600" />
                                    <span className="text-sm text-gray-700">
                                        Availability: <span className="font-medium capitalize">{verificationResult.availability}</span>
                                    </span>
                                </div>
                            )}

                            {/* Reviews */}
                            {verificationResult.reviews && (
                                <div className="p-4 bg-gray-50 rounded-lg">
                                    <h3 className="font-semibold text-gray-900 mb-2">Reviews</h3>
                                    <div className="flex items-center gap-2">
                                        <span className="text-2xl font-bold text-ghana-yellow">
                                            {verificationResult.reviews.rating}
                                        </span>
                                        <span className="text-gray-600">
                                            ({verificationResult.reviews.count} reviews)
                                        </span>
                                    </div>
                                    <p className="text-xs text-gray-600 mt-1">
                                        Source: {verificationResult.reviews.source}
                                    </p>
                                </div>
                            )}

                            {/* Images */}
                            {verificationResult.images && verificationResult.images.length > 0 && (
                                <div>
                                    <div className="flex items-center gap-2 mb-3">
                                        <ImageIcon className="h-4 w-4 text-gray-600" />
                                        <h3 className="font-semibold text-gray-900">Recent Images</h3>
                                    </div>
                                    <div className="grid grid-cols-3 gap-2">
                                        {verificationResult.images.slice(0, 6).map((img, idx) => (
                                            <img
                                                key={idx}
                                                src={img}
                                                alt={`${recommendation.name} ${idx + 1}`}
                                                className="w-full h-32 object-cover rounded-lg"
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Booking Links */}
                            {verificationResult.bookingLinks && verificationResult.bookingLinks.length > 0 && (
                                <div>
                                    <h3 className="font-semibold text-gray-900 mb-3">Book Now</h3>
                                    <div className="space-y-2">
                                        {verificationResult.bookingLinks.map((link, idx) => (
                                            <a
                                                key={idx}
                                                href={link.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:border-ghana-green hover:bg-ghana-green/5 transition-colors"
                                            >
                                                <span className="font-medium text-gray-900">{link.platform}</span>
                                                <ExternalLink className="h-4 w-4 text-ghana-green" />
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Last Checked */}
                            <div className="text-xs text-gray-500 pt-4 border-t">
                                Last verified: {new Date(verificationResult.lastChecked).toLocaleString()}
                            </div>

                            {/* Sources */}
                            {verificationResult.sources && verificationResult.sources.length > 0 && (
                                <div className="text-xs text-gray-500">
                                    <p className="font-medium mb-1">Sources:</p>
                                    <ul className="list-disc list-inside space-y-1">
                                        {verificationResult.sources.map((source, idx) => (
                                            <li key={idx} className="truncate">{source}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    ) : null}
                </DialogContent>
            </Dialog>
        </>
    );
}
