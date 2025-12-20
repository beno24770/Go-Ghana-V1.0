import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import prisma from '../config/prisma';
import { AppError } from '../utils/AppError';

export interface AuthRequest extends Request {
    user?: {
        id: string;
        email: string;
    };
}

export const protect = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        let token: string | undefined;
        if (req.headers.authorization?.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }

        if (!token) {
            return next(new AppError('You are not logged in.', 401));
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };

        const currentUser = await prisma.user.findUnique({
            where: { id: decoded.id },
        });

        if (!currentUser) {
            return next(new AppError('User no longer exists.', 401));
        }

        req.user = { id: currentUser.id, email: currentUser.email };
        next();
    } catch {
        return next(new AppError('Invalid token.', 401));
    }
};

export const requireEmailVerified = async (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) return next(new AppError('User not found', 401));

    const user = await prisma.user.findUnique({ where: { id: req.user.id } });
    if (!user?.emailVerified) {
        return next(new AppError('Please verify your email.', 403));
    }
    next();
};
