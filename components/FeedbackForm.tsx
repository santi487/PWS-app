import React, { useState } from 'react';
import { Star, Send, CheckCircle } from 'lucide-react';

interface FeedbackFormProps {
  onSubmit: (rating: number, comment: string) => void;
}

export const FeedbackForm: React.FC<FeedbackFormProps> = ({ onSubmit }) => {
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>('');
  const [hoveredRating, setHoveredRating] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) return;
    setIsSubmitting(true);
    // Simulate network delay for effect
    setTimeout(() => {
        onSubmit(rating, comment);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-slate-50">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-8 border border-slate-100">
        <h2 className="text-2xl font-bold text-slate-800 mb-2 text-center">
            Klopt dit profiel met hoe jij jezelf ziet?
        </h2>
        <p className="text-slate-500 text-center mb-8">
            Geef een beoordeling en laat ons weten waarom wel of niet.
        </p>

        <form onSubmit={handleSubmit}>
            {/* Star Rating */}
            <div className="flex justify-center gap-2 mb-8">
                {[1, 2, 3, 4, 5].map((star) => (
                    <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoveredRating(star)}
                        onMouseLeave={() => setHoveredRating(0)}
                        className="transition-transform hover:scale-110 focus:outline-none"
                    >
                        <Star 
                            className={`w-10 h-10 ${
                                star <= (hoveredRating || rating) 
                                ? 'fill-yellow-400 text-yellow-400' 
                                : 'text-slate-300'
                            }`} 
                        />
                    </button>
                ))}
            </div>

            <div className="mb-6">
                <label htmlFor="comment" className="block text-sm font-medium text-slate-700 mb-2">
                    Waarom wel / waarom niet?
                </label>
                <textarea
                    id="comment"
                    rows={4}
                    className="w-full p-4 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all resize-none text-slate-700"
                    placeholder="Typ hier je toelichting..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    required
                ></textarea>
            </div>

            <button
                type="submit"
                disabled={rating === 0 || isSubmitting}
                className={`w-full py-4 rounded-xl font-bold text-white flex items-center justify-center gap-2 transition-all ${
                    rating === 0 || isSubmitting
                    ? 'bg-slate-300 cursor-not-allowed' 
                    : 'bg-emerald-600 hover:bg-emerald-700 shadow-lg hover:-translate-y-0.5'
                }`}
            >
                {isSubmitting ? (
                    'Versturen...'
                ) : (
                    <>
                        Antwoorden versturen <Send className="w-4 h-4" />
                    </>
                )}
            </button>
        </form>
      </div>
    </div>
  );
};

export const ThankYouScreen: React.FC = () => (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-slate-50 text-center animate-fade-in">
        <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mb-6">
            <CheckCircle className="w-10 h-10 text-emerald-600" />
        </div>
        <h1 className="text-3xl font-bold text-slate-800 mb-4">Bedankt!</h1>
        <p className="text-slate-600 max-w-md">
            Je antwoorden zijn succesvol verstuurd naar santeri.hirdes@gmail.com.
        </p>
    </div>
);
