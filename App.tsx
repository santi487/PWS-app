import React, { useState, useMemo } from 'react';
import { QUESTIONS, FOOTBALLERS } from './constants';
import { Category, FootballerProfile } from './types';
import { QuizStep } from './components/QuizStep';
import { ResultCard } from './components/ResultCard';
import { FeedbackForm, ThankYouScreen } from './components/FeedbackForm';
import { Play } from 'lucide-react';

enum AppStep {
  INTRO,
  QUIZ,
  PROCESSING,
  RESULT,
  FEEDBACK,
  THANK_YOU
}

const IntroScreen: React.FC<{ onStart: () => void }> = ({ onStart }) => (
  <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-emerald-500 to-emerald-700 text-white text-center">
    <div className="max-w-xl animate-fade-in">
        <div className="inline-block p-4 rounded-full bg-white/10 backdrop-blur-md mb-6 border border-white/20">
            <Play className="w-8 h-8 text-white ml-1" fill="currentColor" />
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight drop-shadow-sm">
            Wie is jouw voetballer?
        </h1>
        <p className="text-xl md:text-2xl text-emerald-100 mb-10 font-light leading-relaxed">
            Ontdek in 3 korte vragen op welke wereldberoemde voetballer jij het meeste lijkt.
        </p>
        <button 
            onClick={onStart}
            className="bg-white text-emerald-700 hover:bg-emerald-50 font-bold py-4 px-10 rounded-full text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
        >
            Start de Quiz
        </button>
    </div>
  </div>
);

const App: React.FC = () => {
  const [step, setStep] = useState<AppStep>(AppStep.INTRO);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userCategories, setUserCategories] = useState<Category[]>([]);
  const [matchedFootballer, setMatchedFootballer] = useState<FootballerProfile | null>(null);

  const handleStart = () => {
    setStep(AppStep.QUIZ);
    setCurrentQuestionIndex(0);
    setUserCategories([]);
  };

  const handleAnswer = (choiceId: string) => {
    const currentQuestion = QUESTIONS[currentQuestionIndex];
    const choice = currentQuestion.choices.find(c => c.id === choiceId);
    
    if (choice) {
      // Accumulate categories
      const newCategories = [...userCategories, ...choice.categories];
      setUserCategories(newCategories);

      if (currentQuestionIndex < QUESTIONS.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
      } else {
        // Quiz finished, find match
        calculateMatch(newCategories);
      }
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      // We need to remove the last added categories. 
      // Since we don't store history explicitly by question, a simple undo is slightly complex.
      // Simplest way for this linear flow: recalculate or just slice off the last N.
      // Better: Store answers in an object { questionId: choiceId } and derive categories.
      // But for this quick prototype, let's just use the index to reset state is tricky without history.
      // Re-architect slightly:
      
      // Actually, let's just go back and we will overwrite the categories when they answer again.
      // Wait, "accumulate" logic above `[...userCategories, ...choice.categories]` is problematic if we go back.
      // Let's fix the state management to store *Choices* not just categories.
      // See `handleAnswerRefined` below.
    }
    setCurrentQuestionIndex(prev => prev - 1);
  };

  // State refinement for back button support
  const [answers, setAnswers] = useState<Record<number, string>>({}); // questionIndex -> choiceId

  const handleAnswerWithHistory = (choiceId: string) => {
    const newAnswers = { ...answers, [currentQuestionIndex]: choiceId };
    setAnswers(newAnswers);

    if (currentQuestionIndex < QUESTIONS.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
    } else {
        // Calculate result
        setStep(AppStep.PROCESSING);
        
        // Derive all categories from final answers
        const finalCategories: Category[] = [];
        QUESTIONS.forEach((q, index) => {
            const cId = newAnswers[index];
            const choice = q.choices.find(c => c.id === cId);
            if (choice) {
                finalCategories.push(...choice.categories);
            }
        });

        calculateMatch(finalCategories);
    }
  };

  const calculateMatch = (categories: Category[]) => {
    // Scoring Algorithm
    // Each footballer has 2 main traits.
    // We count how many of those traits are present in the user's category list.
    // Bonus points if *both* match.

    // Helper: Count occurrences if needed, or just set presence.
    // Since categories in questions are diverse, we check set inclusion.
    
    const scores = FOOTBALLERS.map(footballer => {
        let score = 0;
        let matches = 0;
        
        footballer.traits.forEach(trait => {
            if (categories.includes(trait)) {
                score += 1;
                matches += 1;
            } else {
                 // Special handling for Messi (Introvert) / Rodri (Rustig/Reflectief) logic
                 // If the user has 'Rustig' and the footballer needs 'Introvert', maybe count it?
                 if (trait === 'Introvert' && categories.includes('Rustig')) {
                     score += 0.8; // Partial match proxy
                     matches += 1;
                 }
            }
        });

        // Bonus for full pair match
        if (matches === 2) {
            score += 2; 
        }

        return { footballer, score };
    });

    // Sort by score desc
    scores.sort((a, b) => b.score - a.score);

    // Pick winner
    // If tie, just pick the first one (or could be random).
    // For demo, first is fine.
    const winner = scores[0].footballer;

    // Simulate processing delay
    setTimeout(() => {
        setMatchedFootballer(winner);
        setStep(AppStep.RESULT);
    }, 1500);
  };

  const handleFeedbackSubmit = (rating: number, comment: string) => {
    // Construct the payload as per Step 5
    const payload = {
        footballer: matchedFootballer?.name,
        answers: answers,
        feedback: { rating, comment },
        recipient: 'santeri.hirdes@gmail.com'
    };

    console.log("Sending email payload:", payload);
    
    // In a real app: await api.sendEmail(payload);
    // For this frontend demo:
    setStep(AppStep.THANK_YOU);
  };

  // --- Renders ---

  if (step === AppStep.INTRO) {
    return <IntroScreen onStart={handleStart} />;
  }

  if (step === AppStep.QUIZ) {
    return (
      <QuizStep 
        question={QUESTIONS[currentQuestionIndex]}
        onAnswer={handleAnswerWithHistory}
        onBack={handleBack}
        canGoBack={currentQuestionIndex > 0}
      />
    );
  }

  if (step === AppStep.PROCESSING) {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
            <div className="w-16 h-16 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin mb-4"></div>
            <h2 className="text-xl font-semibold text-slate-700 animate-pulse">Jouw profiel analyseren...</h2>
            <p className="text-slate-400 mt-2">Momentje geduld aub</p>
        </div>
    );
  }

  if (step === AppStep.RESULT && matchedFootballer) {
    return (
        <ResultCard 
            footballer={matchedFootballer} 
            onRestart={() => setStep(AppStep.INTRO)}
            onNext={() => setStep(AppStep.FEEDBACK)}
        />
    );
  }

  if (step === AppStep.FEEDBACK) {
      return <FeedbackForm onSubmit={handleFeedbackSubmit} />;
  }

  if (step === AppStep.THANK_YOU) {
      return <ThankYouScreen />;
  }

  return null;
};

export default App;
