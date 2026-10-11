import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import QuestionInput from '../components/QuestionInput';
import BattleResults from '../components/BattleResults';

const BACKEND_URL = 'http://localhost:3000/invoke';

export default function App() {
  const [battleData, setBattleData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState('');

  const resultsRef = useRef(null);

  useEffect(() => {
    if (battleData && resultsRef.current) {
      setTimeout(() => {
        resultsRef.current.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, [battleData]);

  const handleBattle = async (question) => {
    setIsLoading(true);
    setError(null);
    setBattleData(null);
    setCurrentQuestion(question);

    try {
      const response = await axios.post(BACKEND_URL, {
        input: question,
      });

      const responseData = response.data?.data || response.data;
      setBattleData(responseData);
    } catch (err) {
      setError(
        err.response?.data?.message ||
        err.message ||
        'Something went wrong while connecting to the backend. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative" style={{ backgroundColor: '#05050f' }}>
      {/* Animated background */}
      <div className="fixed inset-0 grid-bg pointer-events-none" />


      {/* Content */}
      <div className="relative z-10">
        <Header />

        <main>
          <QuestionInput onBattle={handleBattle} isLoading={isLoading} />

          {/* Error state */}
          {error && (
            <div className="max-w-4xl mx-auto px-6 mb-8">
              <div className="glass-card border border-red-500/20 rounded-2xl px-5 py-4 flex items-center gap-3 bg-red-500/5">
                <div className="w-2 h-2 rounded-full bg-red-400 flex-shrink-0" />
                <p className="text-red-400 text-sm">{error}</p>
                <button
                  onClick={() => setError(null)}
                  className="ml-auto text-red-400/60 hover:text-red-400 transition-colors text-lg leading-none"
                >
                  ×
                </button>
              </div>
            </div>
          )}

          {/* Battle results */}
          <div ref={resultsRef}>
            <BattleResults
              data={battleData}
              isLoading={isLoading}
              question={currentQuestion}
            />
          </div>

          {/* Empty state (before first battle) */}
          {!isLoading && !battleData && !error && (
            <div className="max-w-2xl mx-auto px-6 pb-20 text-center">
              <h3 className="text-xl font-bold text-white mb-2">Ready for Battle</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Enter a question above and watch two AI models battle it out.
                An AI judge will score the responses and declare a winner!
              </p>
            </div>
          )}
        </main>

        {/* Footer */}
        <footer className="border-t border-white/[0.05] py-6 text-center">
          <p className="text-xs text-slate-600">
            Duelaris AI Arena &nbsp;·&nbsp; Built with React + TailwindCSS
          </p>
        </footer>
      </div>
    </div>
  );
}
