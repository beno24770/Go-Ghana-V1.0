/**
 * Utility function for creating delays
 * Can be mocked in tests to avoid waiting for real timeouts
 */
export const sleep = (ms: number): Promise<void> => {
    return new Promise(resolve => setTimeout(resolve, ms));
};
