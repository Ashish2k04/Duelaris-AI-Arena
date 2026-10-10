import { useState } from 'react';
import { LightningIcon, BattleIcon, LoadingDots } from './Icons';

export default function QuestionInput({ onBattle, isLoading }) {
  const [question, setQuestion] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!question.trim() || isLoading) return;
    onBattle(question.trim());
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      handleSubmit(e);
    }
  };

  const exampleQuestions = [
    'What is quantum entanglement?',
    'Explain machine learning in simple terms',
    'What are black holes made of?',
    'How does the internet work?',
  ];

  return (
    <section className="relative z-10 max-w-4xl mx-auto px-6 py-10">
      {/* Section heading */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.04] border border-white/[0.08] mb-4">
          <LightningIcon size={14} />
          <span className="text-xs font-medium text-slate-400 tracking-wider uppercase">
            Start a Battle
          </span>
        </div>
        <h2 className="text-4xl md:text-5xl font-black text-white mb-3 leading-tight">
          Ask Anything.{' '}
          <span className="header-gradient">Let AI Fight.</span>
        </h2>
        <p className="text-slate-400 text-lg max-w-lg mx-auto leading-relaxed">
          Two AI models battle for the best answer. A third AI judge decides the winner.
        </p>
      </div>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="relative">
        <div className="glass-card p-1.5 border border-white/[0.08] shadow-2xl relative overflow-hidden">
          {/* Subtle top glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />

          <textarea
            id="question-input"
            className="arena-textarea w-full px-5 py-4 text-base min-h-[120px] leading-relaxed"
            placeholder="Ask a question for the AI models to battle over... (Ctrl+Enter to battle)"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isLoading}
            maxLength={2000}
          />

          {/* Bottom bar */}
          <div className="flex items-center justify-between px-3 py-2">
            <span className="text-xs text-slate-600 font-mono">
              {question.length}/2000
            </span>
            <button
              id="battle-btn"
              type="submit"
              disabled={!question.trim() || isLoading}
              className="battle-btn flex items-center gap-2.5 px-6 py-2.5 rounded-xl text-white font-bold text-sm"
            >
              {isLoading ? (
                <>
                  <LoadingDots />
                  <span>Battling...</span>
                </>
              ) : (
                <>
                  <BattleIcon size={16} />
                  <span>Battle!</span>
                </>
              )}
            </button>
          </div>
        </div>
      </form>

      {/* Example questions */}
      <div className="mt-5 flex flex-wrap items-center gap-2 justify-center">
        <span className="hidden sm:inline-block text-xs text-slate-600 font-medium">Try:</span>
        {exampleQuestions.map((q, i) => (
          <button
            key={i}
            id={`example-question-${i}`}
            onClick={() => setQuestion(q)}
            disabled={isLoading}
            className="text-xs px-3 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] text-slate-400 hover:text-white hover:border-white/20 hover:bg-white/[0.06] transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {q}
          </button>
        ))}
      </div>
    </section>
  );
}
