import { GavelIcon } from './Icons';

function ScoreBar({ label, score, color, isWinner }) {
  const percentage = (score / 10) * 100;

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-white">{label}</span>
          {isWinner && (
            <span className="text-xs px-2 py-0.5 rounded-full font-bold bg-green-700/30 text-green-400 border border-green-600/30">
              ✓ Winner
            </span>
          )}
        </div>
        <div className="flex items-baseline gap-0.5">
          <span className="text-2xl font-black" style={{ color }}>{score}</span>
          <span className="text-slate-500 text-sm">/10</span>
        </div>
      </div>
      <div className="score-bar">
        <div
          className="score-fill"
          style={{
            width: `${percentage}%`,
            background: color
          }}
        />
      </div>
    </div>
  );
}

export default function JudgeCard({ judge, animDelay = 0 }) {
  const { solution_1_score, solution_2_score, solution_1_reasoning, solution_2_reasoning } = judge;
  const s1Wins = solution_1_score > solution_2_score;
  const s2Wins = solution_2_score > solution_1_score;
  const tied = solution_1_score === solution_2_score;

  const m1Color = tied ? '#64748b' : (s1Wins ? '#16a34a' : '#dc2626');
  const m2Color = tied ? '#64748b' : (s2Wins ? '#16a34a' : '#dc2626');

  return (
    <div
      className="glass-card judge-card rounded-2xl overflow-hidden slide-up"
      style={{ animationDelay: `${animDelay}s`, opacity: 0 }}
    >
      {/* Judge header */}
      <div className="px-6 py-5 border-b border-white/[0.05]">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-white/[0.05] border border-white/[0.1]">
              <GavelIcon size={20} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-white">AI Judge</h3>
                <span className="text-xs px-2 py-0.5 rounded-full bg-white/[0.07] text-slate-300 border border-white/[0.1] font-medium">
                  Final Verdict
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Evaluating both responses
              </p>
            </div>
          </div>

          {/* Overall verdict badge */}
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.04] border border-white/[0.07]">
            {tied ? (
              <span className="text-sm font-bold text-slate-300">⚖️ It&apos;s a Tie!</span>
            ) : (
              <>
                <span className="text-sm text-slate-400">Winner:</span>
                <span className="text-sm font-bold" style={{ color: s1Wins ? m1Color : m2Color }}>
                  {s1Wins ? '🏆 AI Model 1' : '🏆 AI Model 2'}
                </span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Score comparison */}
      <div className="px-6 py-5 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Score bars */}
        <div className="space-y-4">
          <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Score Comparison</h4>
          <ScoreBar
            label="AI Model 1"
            score={solution_1_score}
            color={m1Color}
            isWinner={s1Wins}
          />
          <ScoreBar
            label="AI Model 2"
            score={solution_2_score}
            color={m2Color}
            isWinner={s2Wins}
          />
        </div>

        {/* Visual score display */}
        <div className="flex items-center justify-center gap-6">
          <div className="text-center">
            <div className="relative w-20 h-20 mx-auto mb-2">
              <svg viewBox="0 0 80 80" className="w-full h-full -rotate-90">
                <circle cx="40" cy="40" r="34" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="6" />
                <circle
                  cx="40" cy="40" r="34"
                  fill="none"
                  stroke={m1Color}
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 34 * solution_1_score / 10} ${2 * Math.PI * 34}`}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xl font-black" style={{ color: m1Color }}>{solution_1_score}</span>
              </div>
            </div>
            <p className="text-xs text-slate-500 font-medium">AI Model 1</p>
          </div>

          <div className="text-2xl font-black text-slate-600">VS</div>

          <div className="text-center">
            <div className="relative w-20 h-20 mx-auto mb-2">
              <svg viewBox="0 0 80 80" className="w-full h-full -rotate-90">
                <circle cx="40" cy="40" r="34" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="6" />
                <circle
                  cx="40" cy="40" r="34"
                  fill="none"
                  stroke={m2Color}
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 34 * solution_2_score / 10} ${2 * Math.PI * 34}`}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xl font-black" style={{ color: m2Color }}>{solution_2_score}</span>
              </div>
            </div>
            <p className="text-xs text-slate-500 font-medium">AI Model 2</p>
          </div>
        </div>
      </div>

      {/* Reasoning section */}
      <div className="px-6 pb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Model 1 reasoning */}
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider mb-2 flex items-center gap-1.5" style={{ color: m1Color }}>
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: m1Color }} />
            Model 1 Reasoning
          </h4>
          <div className="reasoning-text" style={{ borderLeftColor: m1Color }}>
            {solution_1_reasoning}
          </div>
        </div>

        {/* Model 2 reasoning */}
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider mb-2 flex items-center gap-1.5" style={{ color: m2Color }}>
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: m2Color }} />
            Model 2 Reasoning
          </h4>
          <div className="reasoning-text" style={{ borderLeftColor: m2Color }}>
            {solution_2_reasoning}
          </div>
        </div>
      </div>
    </div>
  );
}
