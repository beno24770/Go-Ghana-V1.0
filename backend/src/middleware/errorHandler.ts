/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response, NextFunction } from 'express';

export const errorHandler = (err: any, _req: Request, res: Response, _next: NextFunction) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    if (process.env.NODE_ENV === 'development') {
        res.status(err.statusCode).json({
            status: err.status,
            error: err,
            message: err.message,
            stack: err.stack,
        });
    } else {
        // Production: Temporarily leak errors for debugging "Something went very wrong"
        console.error('ERROR 💥', err);
        res.status(err.statusCode || 500).json({
            status: 'error',
            message: err.message || 'Something went very wrong!',
            // Add a hint if it's likely a DB issue
            hint: err.code ? `Prisma Error Code: ${err.code}` : undefined
        });
    }
};
