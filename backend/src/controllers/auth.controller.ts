import { Request, Response, NextFunction } from 'express';
import { catchAsync } from '../utils/catchAsync';
import * as authService from '../services/auth.service';
import { AuthRequest } from '../middleware/auth';

export const register = catchAsync(async (req: Request, res: Response, _next: NextFunction) => {
    const { email, password, displayName } = req.body;

    if (!email || !password) {
        return _next(new Error('Email and password are required')); // Should use zod validation later
    }

    const { user } = await authService.registerUser(email, password, displayName);

    // Don't send password hash back
    const userResponse = {
        id: user.id,
        email: user.email,
        displayName: user.displayName,
        emailVerified: user.emailVerified,
    };

    res.status(201).json({
        status: 'success',
        message: 'User registered. Please check your email to verify your account.',
        data: { user: userResponse },
    });
});

export const login = catchAsync(async (req: Request, res: Response, _next: NextFunction) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return _next(new Error('Email and password are required'));
    }

    const { user, accessToken, refreshToken } = await authService.loginUser(email, password);

    // Send refresh token in HTTP-only cookie
    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.status(200).json({
        status: 'success',
        data: {
            user: {
                id: user.id,
                email: user.email,
                displayName: user.displayName,
                emailVerified: user.emailVerified,
            },
            accessToken,
        },
    });
});

export const refresh = catchAsync(async (req: Request, res: Response, _next: NextFunction) => {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
        return _next(new Error('No refresh token found'));
    }

    const { newAccessToken } = await authService.refreshAccessToken(refreshToken);

    res.status(200).json({
        status: 'success',
        data: { accessToken: newAccessToken },
    });
});

export const logout = catchAsync(async (_req: Request, res: Response, _next: NextFunction) => {
    res.clearCookie('refreshToken');
    res.status(200).json({ status: 'success', message: 'Logged out successfully' });
});

export const forgotPassword = catchAsync(async (req: Request, res: Response, _next: NextFunction) => {
    const { email } = req.body;

    if (!email) {
        return _next(new Error('Email is required'));
    }

    const result = await authService.forgotPassword(email);
    res.status(200).json({ status: 'success', message: result.message });
});

export const verifyEmail = catchAsync(async (req: Request, res: Response, _next: NextFunction) => {
    const { token } = req.query;

    if (!token || typeof token !== 'string') {
        return _next(new Error('Verification token is required'));
    }

    const result = await authService.verifyEmail(token);
    res.status(200).json({ status: 'success', message: result.message });
});

export const getMe = catchAsync(async (req: AuthRequest, res: Response, next: NextFunction) => {
    const userId = req.user?.id;

    if (!userId) {
        return next(new Error('Not authenticated'));
    }

    const user = await authService.getUserById(userId);

    res.status(200).json({
        status: 'success',
        data: {
            user: {
                id: user.id,
                email: user.email,
                displayName: user.displayName,
                emailVerified: user.emailVerified,
            },
        },
    });
});

export const googleAuth = catchAsync(async (_req: Request, res: Response) => {
    // For now, return a message or redirect if you had the URL
    // In a real implementation, this would redirect to Google OAuth
    const googleClientId = process.env.GOOGLE_CLIENT_ID;

    if (!googleClientId || googleClientId === 'your_google_client_id') {
        return res.status(400).json({
            status: 'error',
            message: 'Google OAuth is not configured on the server.'
        });
    }

    // Placeholder redirect URL
    const redirectUri = `${process.env.FRONTEND_URL}/auth/callback`;
    const googleUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${googleClientId}&redirect_uri=${redirectUri}&response_type=code&scope=email%20profile`;

    res.redirect(googleUrl);
});

export const appleAuth = catchAsync(async (_req: Request, res: Response) => {
    const appleClientId = process.env.APPLE_CLIENT_ID;

    if (!appleClientId || appleClientId === 'your_apple_client_id') {
        return res.status(400).json({
            status: 'error',
            message: 'Apple OAuth is not configured on the server.'
        });
    }

    // Apple OAuth redirect placeholder
    res.status(200).json({
        status: 'success',
        message: 'Apple OAuth redirection logic would go here.'
    });
});
