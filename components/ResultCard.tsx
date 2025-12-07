import React from 'react';
import { FootballerProfile } from '../types';
import { Share2, RefreshCw } from 'lucide-react';

interface ResultCardProps {
  footballer: FootballerProfile;
  onRestart: () => void;
  onNext: () => void;
}

export const ResultCard: React.FC<ResultCardProps> = ({ footballer, onRestart, onNext }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-slate-50">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100">
        
        {/* Header / Hero Section */}
        <div className="bg-emerald-600 p-8 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
            <h2 className="text-emerald-100 font-medium uppercase tracking-wider mb-2 relative z-10">Jouw match is</h2>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 relative z-10 drop-shadow-md">
                {footballer.name}
            </h1>
            <div className="flex justify-center gap-3 relative z-10 flex-wrap">
                {footballer.traits.map(trait => (
                    <span key={trait} className="px-4 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-semibold border border-white/30">
                        {trait}
                    </span>
                ))}
            </div>
        </div>

        {/* Content */}
        <div className="p-8 md:p-12">
            <div className="mb-8">
                <h3 className="text-xl font-bold text-slate-800 mb-3">Waarom deze match?</h3>
                <p className="text-slate-600 leading-relaxed text-lg">
                    {footballer.description}
                </p>
            </div>

            <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 mb-8">
                <h4 className="text-sm font-bold text-slate-500 uppercase mb-2">Rationale</h4>
                <p className="text-slate-700 italic">"{footballer.rationale}"</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
                <button 
                    onClick={onNext}
                    className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center justify-center"
                >
                    Klopt dit? (Feedback)
                </button>
                <button 
                    onClick={onRestart}
                    className="flex-1 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-bold py-4 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-2"
                >
                    <RefreshCw className="w-4 h-4" />
                    Opnieuw proberen
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};
