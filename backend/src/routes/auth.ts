import express from 'express';
import * as authController from '../controllers/auth.controller';
import { protect } from '../middleware/auth';

const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/google', authController.googleAuth);
router.get('/apple', authController.appleAuth);
router.post('/refresh', authController.refresh);
router.post('/logout', authController.logout);
router.post('/forgot-password', authController.forgotPassword);
router.get('/verify-email', authController.verifyEmail);
router.get('/me', protect, authController.getMe);

export default router;
