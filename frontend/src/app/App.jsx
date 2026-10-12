import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import QuestionInput from '../components/QuestionInput';
import BattleResults from '../components/BattleResults';
import { ClockIcon } from '../components/Icons';

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';
const BACKEND_URL = `${API_BASE_URL.replace(/\/+$/, '')}/invoke`;

export default function App() {
  const [battleData, setBattleData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [rateLimitSeconds, setRateLimitSeconds] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState('');

  const resultsRef = useRef(null);

  useEffect(() => {
    if (battleData && resultsRef.current) {
      setTimeout(() => {
        resultsRef.current.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, [battleData]);

  // Handle countdown timer for rate limit cooldown
  useEffect(() => {
    if (rateLimitSeconds <= 0) return;

    const timer = setInterval(() => {
      setRateLimitSeconds((prev) => {
        if (prev <= 1) {
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [rateLimitSeconds]);

  const handleBattle = async (question) => {
    if (rateLimitSeconds > 0) return;

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
      // Check for express-rate-limit 429 error
      const isRateLimit =
        err.response?.status === 429 ||
        (typeof err.response?.data === 'string' &&
          err.response.data.toLowerCase().includes('too many requests')) ||
        (err.response?.data?.message &&
          typeof err.response.data.message === 'string' &&
          err.response.data.message.toLowerCase().includes('too many requests'));

      if (isRateLimit) {
        // Extract error message returned by backend rate limiter
        const backendMsg =
          typeof err.response?.data === 'string' && err.response.data.trim()
            ? err.response.data
            : err.response?.data?.message || 'Too many requests, please try again later.';

        // Check Retry-After header if exposed, otherwise default to 60s (1 minute)
        let retrySeconds = 60;
        const retryHeader = err.response?.headers?.['retry-after'];
        if (retryHeader) {
          const parsed = parseInt(retryHeader, 10);
          if (!isNaN(parsed) && parsed > 0) {
            retrySeconds = parsed;
          }
        }

        setRateLimitSeconds(retrySeconds);
        setError({
          isRateLimit: true,
          message: backendMsg,
        });
      } else {
        const message =
          (typeof err.response?.data === 'string' && err.response.data.trim())
            ? err.response.data
            : err.response?.data?.message ||
              err.message ||
              'Something went wrong while connecting to the backend. Please try again.';

        setError({
          isRateLimit: false,
          message,
        });
      }
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
          <QuestionInput
            onBattle={handleBattle}
            isLoading={isLoading}
            rateLimitSeconds={rateLimitSeconds}
          />

          {/* Error state */}
          {error && (
            <div className="max-w-4xl mx-auto px-6 mb-8">
              {error.isRateLimit ? (
                <div
                  className={`glass-card border rounded-2xl p-5 transition-all duration-300 ${
                    rateLimitSeconds > 0
                      ? 'border-amber-500/30 bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent'
                      : 'border-emerald-500/30 bg-gradient-to-r from-emerald-500/10 via-emerald-500/5 to-transparent'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 border ${
                        rateLimitSeconds > 0
                          ? 'bg-amber-500/10 border-amber-500/30 text-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.2)]'
                          : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.2)]'
                      }`}
                    >
                      {rateLimitSeconds > 0 ? (
                        <ClockIcon size={20} />
                      ) : (
                        <span className="text-lg">✓</span>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 flex-wrap mb-1">
                        <h4 className="text-white font-bold text-sm tracking-wide">
                          {rateLimitSeconds > 0
                            ? 'Too Many Requests (Rate Limit Reached)'
                            : 'Cooldown Finished'}
                        </h4>
                        {rateLimitSeconds > 0 ? (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-mono font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
                            Try again in {rateLimitSeconds}s
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-mono font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                            Ready to battle!
                          </span>
                        )}
                      </div>

                      <p className="text-slate-300 text-sm leading-relaxed">
                        {rateLimitSeconds > 0
                          ? `${error.message || 'Too many requests, please try again later.'} You can only send a maximum of 3 requests per minute.`
                          : 'Your rate limit cooldown has ended. Feel free to submit your question now!'}
                      </p>

                      {rateLimitSeconds > 0 && (
                        <div className="w-full bg-white/[0.08] rounded-full h-1.5 overflow-hidden mt-3">
                          <div
                            className="h-full bg-gradient-to-r from-amber-500 to-rose-500 transition-all duration-1000 ease-linear rounded-full"
                            style={{
                              width: `${Math.min(100, Math.max(0, (rateLimitSeconds / 60) * 100))}%`,
                            }}
                          />
                        </div>
                      )}
                    </div>

                    <button
                      onClick={() => setError(null)}
                      className="text-slate-400 hover:text-white transition-colors text-lg leading-none p-1"
                      title="Dismiss"
                    >
                      ×
                    </button>
                  </div>
                </div>
              ) : (
                <div className="glass-card border border-red-500/20 rounded-2xl px-5 py-4 flex items-center gap-3 bg-red-500/5">
                  <div className="w-2 h-2 rounded-full bg-red-400 flex-shrink-0" />
                  <p className="text-red-400 text-sm">{error.message}</p>
                  <button
                    onClick={() => setError(null)}
                    className="ml-auto text-red-400/60 hover:text-red-400 transition-colors text-lg leading-none"
                  >
                    ×
                  </button>
                </div>
              )}
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
