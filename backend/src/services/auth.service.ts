import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
// import { User } from '@prisma/client';
import prisma from '../config/prisma';
import { AppError } from '../utils/AppError';
import { sendVerificationEmail, sendPasswordResetEmail } from './email.service';
import { isDisposableEmail, isValidEmailFormat } from '../utils/emailBlacklist';

const signToken = (id: string, secret: string, expiresIn: string) => {
    return jwt.sign({ id }, secret, { expiresIn: expiresIn } as jwt.SignOptions);
};

export const registerUser = async (email: string, password: string, displayName?: string) => {
    // Validate email format
    if (!isValidEmailFormat(email)) {
        throw new AppError('Invalid email format', 400);
    }

    // Block disposable emails
    if (isDisposableEmail(email)) {
        throw new AppError('Disposable email addresses are not allowed', 400);
    }

    // Check if user exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
        throw new AppError('Email already in use', 400);
    }

    // Hash password
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    // Generate verification token
    const verifyToken = jwt.sign({ email }, process.env.JWT_SECRET!, { expiresIn: '24h' });

    // Create user
    const newUser = await prisma.user.create({
        data: {
            email,
            passwordHash,
            displayName,
            verifyToken,
            provider: 'email',
        },
    });

    // Send verification email
    try {
        await sendVerificationEmail(email, verifyToken, displayName);
    } catch (error) {
        console.error('Failed to send verification email:', error);
    }

    return { user: newUser, verifyToken };
};

export const loginUser = async (email: string, password: string) => {
    // Check if user exists
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !user.passwordHash) {
        throw new AppError('Invalid email or password', 401);
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
        throw new AppError('Invalid email or password', 401);
    }

    // Check verification
    // if (!user.emailVerified) {
    //   throw new AppError('Please verify your email address', 401);
    // }

    // Generate tokens
    const accessToken = signToken(user.id, process.env.JWT_SECRET!, '15m');
    const refreshToken = signToken(user.id, process.env.JWT_REFRESH_SECRET!, '7d');

    // Save refresh token
    await prisma.refreshToken.create({
        data: {
            token: refreshToken,
            userId: user.id,
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
        },
    });

    return { user, accessToken, refreshToken };
};

export const refreshAccessToken = async (token: string) => {
    // Verify token
    let decoded: { id: string };
    try {
        decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET!) as { id: string };
    } catch {
        throw new AppError('Invalid refresh token', 401);
    }

    // Check if token exists in DB and is not revoked
    const storedToken = await prisma.refreshToken.findUnique({
        where: { token },
        include: { user: true },
    });

    if (!storedToken || storedToken.revoked || storedToken.userId !== decoded.id) {
        throw new AppError('Invalid refresh token', 401);
    }

    // Generate new access token
    const newAccessToken = signToken(storedToken.userId, process.env.JWT_SECRET!, '15m');

    return { newAccessToken };
};

export const forgotPassword = async (email: string) => {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
        // Don't reveal if email exists
        return { message: 'If an account exists, a reset email has been sent.' };
    }

    const resetToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, { expiresIn: '1h' });

    await prisma.user.update({
        where: { id: user.id },
        data: {
            resetToken,
            resetExpires: new Date(Date.now() + 60 * 60 * 1000), // 1 hour
        },
    });

    try {
        await sendPasswordResetEmail(email, resetToken);
    } catch (error) {
        console.error('Failed to send reset email:', error);
    }

    return { message: 'If an account exists, a reset email has been sent.' };
};

export const verifyEmail = async (token: string) => {
    try {
        jwt.verify(token, process.env.JWT_SECRET!) as { email: string };
    } catch {
        throw new AppError('Invalid or expired verification link', 400);
    }

    const user = await prisma.user.findFirst({
        where: { verifyToken: token },
    });

    if (!user) {
        throw new AppError('Invalid verification link', 400);
    }

    await prisma.user.update({
        where: { id: user.id },
        data: {
            emailVerified: true,
            verifyToken: null,
        },
    });

    return { message: 'Email verified successfully' };
};

export const getUserById = async (id: string) => {
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) throw new AppError('User not found', 404);
    return user;
};
