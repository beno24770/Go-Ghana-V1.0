# Go Ghana AI

Ghana's first budget-first AI travel planner. A smart budget estimator, itinerary builder, and tour recommendation platform for travelers planning a trip to Ghana.

## Features

- **Smart Budget Calculation**: Estimates daily costs based on traveler type, accommodation level, and duration.
- **Custom Authentication**: Secure email/password login, email verification, and session management.
- **Dynamic Recommendations**: Suggests tours and activities based on user interests.
- **AI-Powered Itineraries**: Generates personalized travel plans.
- **Real-time Updates**: Interactive form with immediate feedback.

## Tech Stack

### Frontend
- **Framework**: React 18+ (Vite)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Context (AuthContext)
- **API Client**: Fetch API with custom service layer

### Backend
- **Runtime**: Node.js + Express
- **Database**: PostgreSQL (via Supabase) with Prisma ORM
- **Authentication**: JWT (JSON Web Tokens) + HTTP-only cookies
- **Email Service**: Resend

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- PostgreSQL (or Supabase URL)

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/beno24770/Go-Ghana-V1.0.git
   cd Go-Ghana-V1.0
   ```

2. **Install Frontend Dependencies**:
   ```bash
   npm install
   ```

3. **Install Backend Dependencies**:
   ```bash
   cd backend
   npm install
   ```

### Configuration

1. **Frontend**: Create `.env` in the root:
   ```env
   VITE_API_URL=http://localhost:4000
   ```

2. **Backend**: Create `.env` in `/backend` (see `backend/.env.example`):
   ```env
   DATABASE_URL="prisma+postgres://..."
   JWT_SECRET="your-secret"
   RESEND_API_KEY="re_..."
   FRONTEND_URL="http://localhost:5173"
   ```

### Running the App

1. **Start the Backend**:
   ```bash
   cd backend
   npm run dev
   ```
   (Server runs on http://localhost:4000)

2. **Start the Frontend** (in a new terminal):
   ```bash
   # from root
   npm run dev
   ```
   (App runs on http://localhost:5173)

## Project Structure

```
├── backend/            # Express Backend
│   ├── prisma/        # Database Schema
│   └── src/
│       ├── controllers/
│       ├── middleware/
│       ├── routes/
│       └── services/
├── src/               # React Frontend
│   ├── components/    # UI Components
│   ├── contexts/      # State Contexts (Auth, Chat)
│   ├── services/      # API Clients
│   └── pages/         # Route Pages
└── ...
```

## License
MIT

## Features

- **Smart Budget Calculation**: Estimates daily costs based on traveler type, accommodation level, and duration.
- **Dynamic Recommendations**: Suggests tours and activities based on user interests (Nature, Culture, Adventure, Relaxation).
- **Real-time Updates**: Interactive form with instant feedback.
- **Responsive Design**: Fully responsive UI optimized for mobile and desktop.
- **Accessibility**: Built with accessibility best practices in mind.

## Tech Stack

- **Frontend Framework**: React 18+
- **Build Tool**: Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS, `clsx`, `tailwind-merge`, `class-variance-authority`
- **Icons**: Lucide React
- **Form Handling**: React Hook Form + Zod
- **Testing**: Vitest + React Testing Library

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/beno24770/Go-Ghana-V1.0.git
   cd Go-Ghana-V1.0
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

### Running Tests

Run the test suite with:

```bash
npm test
```

## Project Structure

```
src/
├── components/         # React components
│   ├── ui/            # Reusable UI components (Button, Card, Input, etc.)
│   ├── BudgetForm.tsx # Main form component
│   ├── BudgetResult.tsx # Result display component
│   └── TourRecommendations.tsx # Recommendations component
├── data/              # Static data (tours, etc.)
├── lib/               # Utility libraries
├── types/             # TypeScript definitions
├── utils/             # Helper functions (calculations)
├── App.tsx            # Main application entry
└── index.css          # Global styles and Tailwind directives
```

## Deployment

### Vercel

1. Push your code to a GitHub repository.
2. Go to [Vercel](https://vercel.com) and sign up/login.
3. Click "Add New..." -> "Project".
4. Import your GitHub repository.
5. Vercel will automatically detect Vite. Click "Deploy".

### Netlify

1. Push your code to a GitHub repository.
2. Go to [Netlify](https://netlify.com) and sign up/login.
3. Click "Add new site" -> "Import an existing project".
4. Connect to GitHub and select your repository.
5. Netlify will automatically detect the build settings (`npm run build`, `dist`). Click "Deploy site".

## License

MIT
