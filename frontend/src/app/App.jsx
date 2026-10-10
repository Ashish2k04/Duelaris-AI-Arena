import { useState, useRef, useEffect } from 'react';
import Header from '../components/Header';
import QuestionInput from '../components/QuestionInput';
import BattleResults from '../components/BattleResults';

// ─── Mock data for demo / development ────────────────────────────────────────
const MOCK_RESPONSE = {
  problem: "Capital of india is ? and how many states are in india?",
  solution_1: "**Capital of India:** New Delhi  \n\n**Number of states (as of 2026):** 28 states  \n\n*(India also has 8 Union territories, but the count of states is 28.)*",
  solution_2: "The capital of India is New Delhi. It is the seat of the Government of India and is located in the northern part of the country.\n\nAs of 2023, India is composed of 28 states and 8 union territories. These states and territories vary in size, population, and culture, contributing to the rich diversity of the country.",
  judge: {
    solution_1_score: 10,
    solution_2_score: 9,
    solution_1_reasoning: "Solution 1 correctly identifies the capital as New Delhi and states that there are 28 states (and mentions 8 union territories). It accurately looks ahead or correctly notes the current count without getting stuck on an outdated year. Formatting is clean and concise.",
    solution_2_reasoning: "Solution 2 correctly identifies the capital as New Delhi and gives the correct number of states and union territories (28 and 8). However, it specifies 'As of 2023', which is slightly outdated given the prompt's context, but the factual information is correct."
  }
};

// ─── API base URL (update to your backend URL) ────────────────────────────────
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

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
      // ── Uncomment this block when backend is ready ──
      // const response = await fetch(`${API_URL}/battle`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ question }),
      // });
      // if (!response.ok) throw new Error(`Server error: ${response.status}`);
      // const data = await response.json();
      // setBattleData(data);

      // ── DEMO MODE: simulates a 2.5s API call with mock data ──
      await new Promise(resolve => setTimeout(resolve, 2500));
      setBattleData({ ...MOCK_RESPONSE, problem: question });

    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
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
