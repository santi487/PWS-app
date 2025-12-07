import React from 'react';
import { Question } from '../types';
import { ArrowLeft, ChevronRight } from 'lucide-react';

interface QuizStepProps {
  question: Question;
  onAnswer: (choiceId: string) => void;
  onBack: () => void;
  canGoBack: boolean;
}

export const QuizStep: React.FC<QuizStepProps> = ({ question, onAnswer, onBack, canGoBack }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 animate-fade-in">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-8 border border-slate-100">
        <div className="mb-8">
            <h2 className="text-sm font-bold text-emerald-600 uppercase tracking-widest mb-2">
                Vraag {question.id}
            </h2>
            <h1 className="text-2xl font-bold text-slate-800 leading-tight">
                {question.text}
            </h1>
        </div>

        <div className="space-y-3">
          {question.choices.map((choice) => (
            <button
              key={choice.id}
              onClick={() => onAnswer(choice.id)}
              className="w-full text-left p-4 rounded-xl border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50 hover:text-emerald-700 transition-all duration-200 group flex items-center justify-between"
            >
              <span className="font-medium text-slate-700 group-hover:text-emerald-700">
                {choice.label}
              </span>
              <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          ))}
        </div>

        {canGoBack && (
          <button
            onClick={onBack}
            className="mt-8 flex items-center text-slate-400 hover:text-slate-600 transition-colors text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Vorige vraag
          </button>
        )}
      </div>
    </div>
  );
};
