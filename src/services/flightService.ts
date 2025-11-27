
// Service to interact with Amadeus Flight API
// Documentation: https://developers.amadeus.com/self-service/category/air/api-doc/flight-offers-search

const AMADEUS_BASE_URL = 'https://test.api.amadeus.com'; // Change to 'https://api.amadeus.com' for production
const CLIENT_ID = import.meta.env.VITE_AMADEUS_CLIENT_ID || ''; // Add to your .env file
const CLIENT_SECRET = import.meta.env.VITE_AMADEUS_CLIENT_SECRET || ''; // Add to your .env file

interface AuthToken {
    access_token: string;
    expires_in: number;
    timestamp: number;
}

let cachedToken: AuthToken | null = null;

/**
 * Authenticates with Amadeus to get an access token.
 * Implements caching to reuse the token until it expires.
 */
async function getAccessToken(): Promise<string> {
    const now = Date.now();

    // Return cached token if valid (with 60s buffer)
    if (cachedToken && (cachedToken.timestamp + cachedToken.expires_in * 1000 - 60000) > now) {
        return cachedToken.access_token;
    }

    const params = new URLSearchParams();
    params.append('grant_type', 'client_credentials');
    params.append('client_id', CLIENT_ID);
    params.append('client_secret', CLIENT_SECRET);

    try {
        const response = await fetch(`${AMADEUS_BASE_URL}/v1/security/oauth2/token`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: params
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Auth failed: ${errorData.error_description || response.statusText}`);
        }

        const data = await response.json();
        cachedToken = {
            access_token: data.access_token,
            expires_in: data.expires_in,
            timestamp: now
        };

        return data.access_token;
    } catch (error) {
        console.error('Error fetching Amadeus access token:', error);
        throw error;
    }
}

export interface FlightOffer {
    id: string;
    price: {
        total: string;
        currency: string;
    };
    itineraries: {
        duration: string;
        segments: {
            departure: { iataCode: string; at: string };
            arrival: { iataCode: string; at: string };
            carrierCode: string;
            number: string;
        }[];
    }[];
}

/**
 * Searches for flights using Amadeus Flight Offers Search API.
 * @param originLocationCode IATA code (e.g., 'ACC' for Accra, 'LHR' for London)
 * @param destinationLocationCode IATA code (e.g., 'KMS' for Kumasi)
 * @param departureDate YYYY-MM-DD format
 * @param adults Number of adult passengers (default 1)
 */
export async function searchFlights(
    originLocationCode: string,
    destinationLocationCode: string,
    departureDate: string,
    adults: number = 1
): Promise<FlightOffer[]> {
    if (!CLIENT_ID || !CLIENT_SECRET) {
        console.warn('Amadeus API keys are missing. Please add VITE_AMADEUS_CLIENT_ID and VITE_AMADEUS_CLIENT_SECRET to your .env file.');
        return [];
    }

    try {
        const token = await getAccessToken();
        const url = new URL(`${AMADEUS_BASE_URL}/v2/shopping/flight-offers`);
        url.searchParams.append('originLocationCode', originLocationCode);
        url.searchParams.append('destinationLocationCode', destinationLocationCode);
        url.searchParams.append('departureDate', departureDate);
        url.searchParams.append('adults', adults.toString());
        url.searchParams.append('max', '5'); // Limit results to 5 for the estimator
        url.searchParams.append('currencyCode', 'GHS'); // Request pricing in GHS

        const response = await fetch(url.toString(), {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error(`Flight search failed: ${response.statusText}`);
        }

        const data = await response.json();
        return data.data || [];
    } catch (error) {
        console.error('Error searching flights:', error);
        return [];
    }
}

/**
 * Helper to format duration from PT2H30M to 2h 30m
 */
export function formatDuration(isoDuration: string): string {
    return isoDuration.replace('PT', '').toLowerCase();
}
