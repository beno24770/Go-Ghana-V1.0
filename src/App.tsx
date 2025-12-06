import { useState, useEffect } from 'react';
import { ProgressIndicator } from './components/ProgressIndicator';
import { StepTransition } from './components/StepTransition';
import { LandingScreen } from './components/LandingScreen';
import { BudgetForm } from './components/BudgetForm';
import { LoadingScreen } from './components/LoadingScreen';
import { BudgetResult } from './components/BudgetResult';
import { BudgetRecommendations } from './components/BudgetRecommendations';
import { TourRecommendations } from './components/TourRecommendations';
import { DecisionNode } from './components/DecisionNode';
import { TripPlanner } from './components/TripPlanner';
import { SignUpPage } from './components/auth/SignUpPage';
import { LoginPage } from './components/auth/LoginPage';
import { ForgotPasswordForm } from './components/auth/ForgotPasswordForm';
import { LocalAuthPage } from './components/auth/LocalAuthPage';
import { TripSummary } from './components/TripSummary';
import { Dashboard } from './components/Dashboard';
import { LocalEstimator } from './components/local/LocalEstimator';
import { calculateBudget } from './utils/calculateBudget';
import { CurrencyProvider } from './contexts/CurrencyContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ChatProvider } from './contexts/ChatContext';
import { ChatWidget } from './components/chat/ChatWidget';
import { PWAInstallPrompt } from './components/PWAInstallPrompt';
import { knowledgeService } from './services/knowledgeService';
import type { BudgetFormData, BudgetBreakdown, Tour } from './types';
import type { SelectedRecommendations } from './types/recommendations';

function AppContent() {
  // Auth context is available but not currently needed in this component
  useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<BudgetFormData | null>(null);
  const [budgetResult, setBudgetResult] = useState<BudgetBreakdown | null>(null);
  const [selectedTour, setSelectedTour] = useState<Tour | null>(null);
  const [isLocalMode, setIsLocalMode] = useState(false);
  const [budgetFormInitialStep, setBudgetFormInitialStep] = useState(1);
  const [selectedRecommendations, setSelectedRecommendations] = useState<SelectedRecommendations>({});

  // Initialize Knowledge Service with mock data
  useEffect(() => {
    knowledgeService.ingestMockData().catch(console.error);
  }, []);

  // Load state from localStorage on mount
  // Note: We intentionally do NOT restore currentStep to ensure all visitors
  // start at the Landing Screen for a consistent user experience
  useEffect(() => {
    const savedFormData = localStorage.getItem('formData');
    const savedBudgetResult = localStorage.getItem('budgetResult');
    const savedSelectedTour = localStorage.getItem('selectedTour');
    const savedIsLocalMode = localStorage.getItem('isLocalMode');

    if (savedFormData) setFormData(JSON.parse(savedFormData));
    if (savedBudgetResult) setBudgetResult(JSON.parse(savedBudgetResult));
    if (savedSelectedTour) setSelectedTour(JSON.parse(savedSelectedTour));
    if (savedIsLocalMode) setIsLocalMode(savedIsLocalMode === 'true');
  }, []);

  // Note: We intentionally do NOT save currentStep to localStorage
  // to ensure all visitors start at the Landing Screen

  useEffect(() => {
    if (formData) {
      localStorage.setItem('formData', JSON.stringify(formData));
    } else {
      localStorage.removeItem('formData');
    }
  }, [formData]);

  useEffect(() => {
    if (budgetResult) {
      localStorage.setItem('budgetResult', JSON.stringify(budgetResult));
    } else {
      localStorage.removeItem('budgetResult');
    }
  }, [budgetResult]);

  useEffect(() => {
    if (selectedTour) {
      localStorage.setItem('selectedTour', JSON.stringify(selectedTour));
    } else {
      localStorage.removeItem('selectedTour');
    }
  }, [selectedTour]);

  useEffect(() => {
    localStorage.setItem('isLocalMode', isLocalMode.toString());
  }, [isLocalMode]);

  // Step 1: Landing Screen
  const handleStart = () => {
    // Go to Budget Form directly (Bypass Auth for Testing)
    setCurrentStep(3);
  };

  // Step 2: Sign‑Up Page
  const handleSignUpSuccess = () => {
    // After successful sign‑up, go to Budget Form
    setCurrentStep(3);
  };

  // Step 3: Budget Form
  const handleFormSubmit = (data: BudgetFormData) => {
    setFormData(data);
    setCurrentStep(4); // Go to loading
  };

  // Step 4: Loading Screen
  const handleLoadingComplete = () => {
    if (formData) {
      const result = calculateBudget(formData);
      setBudgetResult(result);
      setCurrentStep(5); // Go to budget result
    }
  };

  // Step 5: Budget Result - Edit Budget
  const handleEditBudget = (stepNumber: number = 1) => {
    // Go back to Budget Form (Step 3) with existing data
    setBudgetFormInitialStep(stepNumber);
    setCurrentStep(3);
  };

  // Step 5: Budget Result - Continue to Recommendations
  const handleContinueToRecommendations = () => {
    setCurrentStep(6); // New recommendations page
  };

  // Step 6: Recommendations - Continue to Tours
  const handleContinueToTours = () => {
    setCurrentStep(7); // Tours moved to step 7
  };

  // Step 6: Tour Recommendations
  const handleSelectTour = (tour: Tour) => {
    setSelectedTour(tour);
    setCurrentStep(7); // Go to decision node
  };

  const handleSkipTours = () => {
    setSelectedTour(null);
    setCurrentStep(7); // Go to decision node without tour
  };

  // Step 7: Decision Node
  const handleBackToTours = () => {
    setCurrentStep(6);
  };

  const handlePlanTrip = () => {
    setCurrentStep(8); // Go to trip planner
  };

  // Step 8: Trip Planner
  const handleContinueToSummary = () => {
    setCurrentStep(9); // Go to final summary
  };

  // Step 9: Trip Summary
  const handleStartOver = () => {
    setCurrentStep(1);
    setFormData(null);
    setBudgetResult(null);
    setSelectedTour(null);
    // Clear localStorage
    localStorage.removeItem('formData');
    localStorage.removeItem('budgetResult');
    localStorage.removeItem('selectedTour');
    // Keep isLocalMode preference? Maybe reset it too if starting over completely.
    // For now, let's keep isLocalMode as is, or reset if desired. User said "system resets", so let's be clean.
    // Actually, if they start over, they probably want to start fresh.
  };

  // Step 11: Login Page
  const handleLoginSuccess = () => {
    setCurrentStep(3); // Go to Budget Form for better UX
  };

  const handleForgotPassword = () => {
    setCurrentStep(14); // Go to Forgot Password
  };

  // Local Mode Toggle Handler
  const handleLocalModeToggle = (enabled: boolean) => {
    setIsLocalMode(enabled);
    if (enabled) {
      // Skip authentication for Local Mode (temporary fix for Firebase issue)
      // TODO: Re-enable authentication once Firebase is properly configured
      setCurrentStep(12); // Go directly to Local Estimator
    } else {
      setCurrentStep(1);
    }
  };

  // Local Auth Success
  const handleLocalAuthSuccess = () => {
    setCurrentStep(12); // Proceed to Local Estimator
  };

  // Navigation helper
  const goToStep = (step: number) => {
    if (step < currentStep) {
      setCurrentStep(step);
    }
  };

  return (
    <div className="min-h-screen font-sans text-foreground">
      {/* Progress Indicator - Show from step 2 onwards */}
      {currentStep > 1 && currentStep < 8 && (
        <ProgressIndicator
          currentStep={currentStep - 1} // Adjust for display (1-7 instead of 2-8)
          totalSteps={7}
          onStepClick={(step) => goToStep(step + 1)}
        />
      )}

      {/* Step Content */}
      <StepTransition direction={currentStep > 1 ? 'forward' : 'backward'}>
        {currentStep === 1 && (
          <LandingScreen
            onStart={handleStart}
            isLocalMode={isLocalMode}
            onLocalModeToggle={handleLocalModeToggle}
          />
        )}

        {currentStep === 2 && (
          <SignUpPage
            onSuccess={handleSignUpSuccess}
            onSwitchToLogin={() => setCurrentStep(11)}
          />
        )}

        {currentStep === 3 && (
          <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
            <div className="max-w-4xl mx-auto">
              <div className="text-center space-y-4 mb-12">
                <h2 className="text-4xl font-extrabold tracking-tight">
                  Tell Us About Your Trip
                </h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  Answer a few questions to get your personalized budget estimate
                </p>
              </div>
              <BudgetForm onSubmit={handleFormSubmit} initialStep={budgetFormInitialStep} />
            </div>
          </div>
        )}

        {currentStep === 4 && (
          <LoadingScreen onComplete={handleLoadingComplete} />
        )}

        {currentStep === 5 && budgetResult && formData && (
          <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
            <BudgetResult
              breakdown={budgetResult}
              formData={formData}
              onContinue={handleContinueToRecommendations}
              onEditBudget={handleEditBudget}
            />
          </div>
        )}

        {currentStep === 6 && budgetResult && formData && (
          <BudgetRecommendations
            breakdown={budgetResult}
            formData={formData}
            selectedRecommendations={selectedRecommendations}
            onSelectionsChange={setSelectedRecommendations}
            onContinue={handleContinueToTours}
            onBack={() => setCurrentStep(5)}
          />
        )}

        {currentStep === 7 && formData && budgetResult && (
          <TourRecommendations
            interests={formData.activities}
            budget={budgetResult.total}
            regions={formData.regions}
            month={formData.month}
            onSelectTour={handleSelectTour}
            onSkip={handleSkipTours}
          />
        )}

        {currentStep === 8 && (
          <DecisionNode
            selectedTour={selectedTour}
            onSelectTour={handleBackToTours}
            onPlanTrip={handlePlanTrip}
          />
        )}

        {currentStep === 9 && formData && budgetResult && (
          <TripPlanner
            formData={formData}
            budgetTotal={budgetResult.total}
            selectedTour={selectedTour}
            onContinue={handleContinueToSummary}
          />
        )}

        {currentStep === 10 && formData && budgetResult && (
          <TripSummary
            formData={formData}
            budgetBreakdown={budgetResult}
            selectedTour={selectedTour}
            onStartOver={handleStartOver}
          />
        )}

        {currentStep === 10 && (
          <Dashboard />
        )}

        {currentStep === 11 && (
          <LoginPage
            onSuccess={handleLoginSuccess}
            onSwitchToSignup={() => setCurrentStep(2)}
            onForgotPassword={handleForgotPassword}
          />
        )}

        {currentStep === 12 && (
          <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
            <div className="max-w-4xl mx-auto">
              <LocalEstimator />
            </div>
          </div>
        )}

        {currentStep === 13 && (
          <LocalAuthPage
            onSuccess={handleLocalAuthSuccess}
            onCancel={() => handleLocalModeToggle(false)}
          />
        )}

        {currentStep === 14 && (
          <ForgotPasswordForm
            onBack={() => setCurrentStep(11)}
          />
        )}
      </StepTransition>

      {/* Navigation Bar */}
      <div className="fixed top-2 sm:top-4 left-2 right-2 sm:left-auto sm:right-4 z-50">
        <div className="flex flex-wrap gap-2 items-center justify-end">
          {/* Local Mode Toggle - Global */}
          {currentStep !== 1 && currentStep !== 13 && (
            <div className="flex items-center gap-2 px-2 sm:px-3 py-1.5 sm:py-2 bg-white/90 backdrop-blur shadow-md rounded-full">
              <span className="text-xs font-medium text-gray-600 hidden sm:inline">Local</span>
              <button
                onClick={() => handleLocalModeToggle(!isLocalMode)}
                className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#006B3F] focus:ring-offset-2 ${isLocalMode ? 'bg-[#006B3F]' : 'bg-gray-300'}`}
                role="switch"
                aria-checked={isLocalMode}
                aria-label="Toggle Local Mode"
                title="Switch between International and Local Mode"
              >
                <span
                  className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${isLocalMode ? 'translate-x-5' : 'translate-x-1'}`}
                />
              </button>
            </div>
          )}
          {/* Home Button */}
          {currentStep !== 1 && (
            <button
              onClick={() => {
                setCurrentStep(1);
                setIsLocalMode(false); // Optional: Reset local mode when going home
              }}
              className="px-3 sm:px-4 py-1.5 sm:py-2 bg-white/90 backdrop-blur shadow-md rounded-full text-xs sm:text-sm font-medium hover:bg-white transition-colors flex items-center gap-1 sm:gap-2 min-h-[44px] whitespace-nowrap"
            >
              <span>🏠</span> <span className="hidden sm:inline">Home</span>
            </button>
          )}
          {currentStep !== 1 && currentStep !== 10 && currentStep !== 11 && currentStep !== 12 && currentStep !== 13 && currentStep !== 14 && (
            <button
              onClick={() => setCurrentStep(10)}
              className="px-3 sm:px-4 py-1.5 sm:py-2 bg-white/90 backdrop-blur shadow-md rounded-full text-xs sm:text-sm font-medium hover:bg-white transition-colors min-h-[44px] whitespace-nowrap"
            >
              My Trips
            </button>
          )}
          {(currentStep === 2 || currentStep === 10 || currentStep === 11 || currentStep === 12 || currentStep === 13 || currentStep === 14) && (
            <button
              onClick={() => {
                if (currentStep === 2 || currentStep === 11) {
                  // If on Sign Up or Login, go back to Landing
                  setCurrentStep(1);
                } else if (currentStep === 10 && formData) {
                  // If on Dashboard and have data, go back to Summary (Step 9)
                  setCurrentStep(9);
                } else if (currentStep === 12) {
                  // If on Local Mode, go back to Home and toggle off
                  handleLocalModeToggle(false);
                } else if (currentStep === 13) {
                  // If on Local Auth, cancel
                  handleLocalModeToggle(false);
                } else if (currentStep === 14) {
                  // If on Forgot Password, go back to Login (Step 11)
                  setCurrentStep(11);
                } else {
                  // Default to Home
                  setCurrentStep(1);
                }
              }}
              className="px-3 sm:px-4 py-1.5 sm:py-2 bg-white/90 backdrop-blur shadow-md rounded-full text-xs sm:text-sm font-medium hover:bg-white transition-colors min-h-[44px] whitespace-nowrap"
            >
              {currentStep === 10 && formData ? 'Back to Summary' : 'Back'}
            </button>
          )}
        </div>
      </div>

      {/* Chat Widget */}
      <ChatWidget />

      {/* PWA Install Prompt */}
      <PWAInstallPrompt />
    </div>
  );
}

function App() {
  return (
    <CurrencyProvider>
      <AuthProvider>
        <ChatProvider>
          <AppContent />
        </ChatProvider>
      </AuthProvider>
    </CurrencyProvider>
  );
}

export default App;
