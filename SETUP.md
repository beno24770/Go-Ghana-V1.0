# GoGhana Custom Auth Backend Setup

The application now uses a custom Node.js/Express backend with PostgreSQL instead of Firebase Authentication.

## Prerequisites
1.  **Node.js** (v18+)
2.  **PostgreSQL** (Supabase recommended)
3.  **Resend API Key** (for emails)

## 1. Backend Setup

### Navigate to the backend directory
```bash
cd backend
```

### Install Dependencies
```bash
npm install
```

### Configure Environment Variables
Create a `.env` file in the `backend` directory (copy from `.env.example`):
```bash
cp .env.example .env
```

Update the `.env` file with your credentials:
-   **DATABASE_URL**: Your Supabase connection string.
    -   *Format:* `postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres`
    -   *Note:* Use port 5432 (Transaction) or 6543 (Session). Transaction recommended for serverless.
-   **JWT_SECRET**: Generate a random long string.
-   **RESEND_API_KEY**: Your Resend API key (starts with `re_`).
-   **FRONTEND_URL**: `http://localhost:5173` (default)

### Set up the Database
Run these commands to push the Prisma schema to your database:
```bash
npx prisma generate
npx prisma db push
```

### Start the Backend Server
```bash
npm run dev
```
The server will start on `http://localhost:4000`.

## 2. Frontend Setup

### Configure Environment Variables
Create or update `.env` in the root directory:
```bash
VITE_API_URL=http://localhost:4000
```

### Start the Frontend
```bash
npm run dev
```

## 3. Verification Steps
1.  Go to `http://localhost:5173/signup`.
2.  Create a new account.
3.  Check your email (or Resend dashboard) for the verification link.
4.  Click the link to verify your email.
5.  Login at `http://localhost:5173/login`.
6.  You should be redirected to the dashboard!

## Troubleshooting
-   **CORS Errors**: Ensure `FRONTEND_URL` in backend `.env` matches your frontend URL.
-   **DB Connection**: Double-check your Supabase password and connection string. Ensure "Mode: Transaction" if using port 6543, or just standard direct connection.
-   **Error P1001**: "Can't reach database server"
    -   This often means a firewall is blocking the connection.
    -   If using Supabase, try disabling "Supabase > Settings > Database > Network Restrictions".
    -   Try appending `?connect_timeout=30` to your connection string.
    -   Verify if your password has special characters (needs to be URL-encoded).
