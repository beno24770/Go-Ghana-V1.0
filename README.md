# Goghana Budget Estimator

A smart budget estimator and tour recommendation application for travelers planning a trip to Ghana. Built with React, TypeScript, Vite, and Tailwind CSS.

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
   git clone https://github.com/yourusername/goghana-budget-estimator.git
   cd goghana-budget-estimator
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
