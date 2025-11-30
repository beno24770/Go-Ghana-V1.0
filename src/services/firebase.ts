import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Firebase configuration from environment variables
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'fake_key',
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'fake_domain',
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'fake_project',
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'fake_bucket',
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || 'fake_sender',
    appId: import.meta.env.VITE_FIREBASE_APP_ID || 'fake_app_id',
};

// Validate config
const requiredKeys = ['apiKey', 'authDomain', 'projectId'];
const missingKeys = requiredKeys.filter(key => !firebaseConfig[key as keyof typeof firebaseConfig]);

if (missingKeys.length > 0) {
    console.error(`Missing Firebase configuration keys: ${missingKeys.join(', ')}`);
    console.error('Check your .env file or Netlify environment variables.');
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
export default app;
