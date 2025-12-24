import { registerUser } from './src/services/auth.service';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

async function runDiagnostics() {
    console.log('--- Signup Diagnostics ---');
    console.log('Testing registration with: kwame.test@example.com');

    try {
        const result = await registerUser('kwame.test' + Date.now() + '@example.com', 'Password123!', 'Kwame Test');
        console.log('SUCCESS: Registration works!');
        console.log('User ID:', result.user.id);
    } catch (error: any) {
        console.error('FAILURE: Registration failed!');
        console.error('Error Name:', error.name);
        console.error('Error Message:', error.message);
        if (error.code) console.error('Error Code:', error.code);
        if (error.meta) console.error('Error Meta:', JSON.stringify(error.meta));
        if (error.stack) console.error('Stack Trace:', error.stack);
    } finally {
        process.exit();
    }
}

runDiagnostics();
