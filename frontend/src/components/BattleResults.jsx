import { ModelCard, ModelCardSkeleton } from './ModelCard';
import JudgeCard from './JudgeCard';
import { CohereIcon, GroqIcon, LightningIcon } from './Icons';

function VSDivider({ isLoading }) {
  return (
    <div className="vs-divider flex-shrink-0 py-4 md:py-0">
      <div className="flex flex-col items-center gap-3">
        <div className="w-px h-10 bg-gradient-to-b from-transparent via-white/10 to-transparent hidden md:block" />
        <div className="relative">
          <div className="absolute inset-0 blur-md rounded-full" style={{ background: isLoading ? 'rgba(100,100,100,0.3)' : 'rgba(0,212,255,0.2)' }} />
          <div className="relative w-10 h-10 rounded-full flex items-center justify-center border border-white/10 bg-white/[0.03]">
            <LightningIcon size={18} />
          </div>
        </div>
        <span className="vs-text text-sm">VS</span>
        <div className="w-px h-10 bg-gradient-to-b from-transparent via-white/10 to-transparent hidden md:block" />
      </div>
    </div>
  );
}

function JudgeSkeletonCard() {
  return (
    <div className="glass-card judge-card rounded-2xl overflow-hidden">
      <div className="px-6 py-5 border-b border-white/[0.05] flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl shimmer" />
        <div className="space-y-2 flex-1">
          <div className="w-40 h-4 rounded shimmer" />
          <div className="w-28 h-3 rounded shimmer" />
        </div>
      </div>
      <div className="px-6 py-5 space-y-4">
        <div className="w-full h-3 rounded shimmer" />
        <div className="w-4/5 h-3 rounded shimmer" />
        <div className="w-full h-3 rounded shimmer" />
        <div className="w-3/4 h-3 rounded shimmer" />
        <div className="w-full h-3 rounded shimmer" />
      </div>
    </div>
  );
}

export default function BattleResults({ data, isLoading, question }) {
  if (!isLoading && !data) return null;

  const s1Score = data?.judge?.solution_1_score;
  const s2Score = data?.judge?.solution_2_score;
  const s1Wins = s1Score > s2Score;
  const s2Wins = s2Score > s1Score;

  return (
    <section className="relative z-10 max-w-7xl mx-auto px-6 pb-16">
      {/* Question banner */}
      <div className="mb-8 glass-card border border-white/[0.07] rounded-2xl px-6 py-4 flex items-start gap-3">
        <span className="text-xs text-slate-500 font-medium uppercase tracking-wider mt-0.5 flex-shrink-0">Question</span>
        <p className="text-white font-medium leading-relaxed">{question}</p>
      </div>

      {/* Model response cards - side by side with VS divider */}
      <div className="flex flex-col md:flex-row gap-3 md:gap-0 items-stretch mb-5">
        {/* Cohere card */}
        <div className="flex-1 min-w-0">
          {isLoading ? (
            <ModelCardSkeleton colorClass="cohere-card" />
          ) : (
            <ModelCard
              title="AI Model 1 Response"
              modelLabel="Language Model"
              icon={CohereIcon}
              response={data.solution_1}
              score={s1Score}
              reasoning={data.judge?.solution_1_reasoning}
              colorClass="cohere-card"
              accentColor="#00d4ff"
              scoreLabel="Judge Score"
              isWinner={s1Wins}
              animDelay={0}
            />
          )}
        </div>

        {/* VS Divider */}
        <div className="flex items-center justify-center px-3">
          <VSDivider isLoading={isLoading} />
        </div>

        {/* Groq card */}
        <div className="flex-1 min-w-0">
          {isLoading ? (
            <ModelCardSkeleton colorClass="groq-card" />
          ) : (
            <ModelCard
              title="AI Model 2 Response"
              modelLabel="Language Model"
              icon={GroqIcon}
              response={data.solution_2}
              score={s2Score}
              reasoning={data.judge?.solution_2_reasoning}
              colorClass="groq-card"
              accentColor="#a855f7"
              scoreLabel="Judge Score"
              isWinner={s2Wins}
              animDelay={0.15}
            />
          )}
        </div>
      </div>

      {/* Divider */}
      <div className="neon-divider mb-5" />

      {/* Judge card - full width */}
      {isLoading ? (
        <JudgeSkeletonCard />
      ) : (
        data?.judge && <JudgeCard judge={data.judge} animDelay={0.3} />
      )}
    </section>
  );
}
