import { useEffect, useState } from 'react';
import { CrownIcon } from './Icons';

/**
 * Renders markdown-style bold text (**text**) inline.
 */
function renderMarkdown(text) {
  if (!text) return '';
  // Split by **...**
  const parts = text.split(/\*\*(.*?)\*\*/g);
  return parts.map((part, i) =>
    i % 2 === 1
      ? <strong key={i} className="font-semibold text-white">{part}</strong>
      : <span key={i}>{part}</span>
  );
}

/**
 * Formats response text preserving line breaks.
 */
function ResponseText({ text }) {
  if (!text) return null;
  const lines = text.split('\n');
  return (
    <div className="space-y-1.5 text-sm leading-relaxed text-slate-300">
      {lines.map((line, i) => (
        line.trim() === ''
          ? <div key={i} className="h-2" />
          : <p key={i}>{renderMarkdown(line)}</p>
      ))}
    </div>
  );
}

/**
 * Animated score display
 */
function ScoreDisplay({ score, color, label }) {
  const [displayed, setDisplayed] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1200;
    const step = duration / (score * 10);
    const timer = setInterval(() => {
      start++;
      setDisplayed(Math.min(start / 10, score));
      if (start / 10 >= score) clearInterval(timer);
    }, step);
    return () => clearInterval(timer);
  }, [score]);

  const percentage = (score / 10) * 100;

  return (
    <div className="flex flex-col items-end gap-1.5">
      <div className="text-right">
        <span className="text-3xl font-black" style={{ color }}>{Math.round(displayed)}</span>
        <span className="text-slate-500 text-lg font-medium">/10</span>
      </div>
      <div className="w-24 score-bar">
        <div
          className="score-fill"
          style={{
            width: `${percentage}%`,
            background: `linear-gradient(90deg, ${color}88, ${color})`
          }}
        />
      </div>
      <span className="text-xs text-slate-500 font-medium">{label}</span>
    </div>
  );
}

/**
 * Single model response card
 */
export function ModelCard({ title, modelLabel, icon: Icon, response, score, reasoning, colorClass, accentColor, scoreLabel, isWinner, animDelay = 0 }) {
  return (
    <div
      className={`glass-card ${colorClass} rounded-2xl overflow-hidden slide-up`}
      style={{ animationDelay: `${animDelay}s`, opacity: 0 }}
    >
      {/* Card header */}
      <div className="px-5 py-4 flex items-center justify-between border-b border-white/[0.05]">
        <div className="flex items-center gap-2.5">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{ background: `${accentColor}18`, border: `1px solid ${accentColor}30` }}
          >
            <Icon size={18} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-white text-sm">{title}</h3>
              {isWinner && (
                <div className="flex items-center gap-1 winner-badge">
                  <CrownIcon size={10} />
                  <span>Winner</span>
                </div>
              )}
            </div>
            <p className="text-xs text-slate-500 mt-0.5">{modelLabel}</p>
          </div>
        </div>

        {/* Score */}
        {score !== undefined && (
          <ScoreDisplay score={score} color={accentColor} label={scoreLabel} />
        )}
      </div>

      {/* Response body */}
      <div className="px-5 py-4 min-h-[140px]">
        <ResponseText text={response} />
      </div>

      {/* Reasoning (if provided) */}
      {reasoning && (
        <div className="px-5 pb-5">
          <div
            className="reasoning-text"
            style={{ borderLeftColor: `${accentColor}60` }}
          >
            <p className="text-xs font-semibold mb-1.5" style={{ color: accentColor }}>
              AI Judge Reasoning
            </p>
            {reasoning}
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * Shimmer skeleton while loading
 */
export function ModelCardSkeleton({ colorClass }) {
  return (
    <div className={`glass-card ${colorClass} rounded-2xl overflow-hidden`}>
      <div className="px-5 py-4 border-b border-white/[0.05] flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl shimmer" />
          <div className="space-y-2">
            <div className="w-32 h-3.5 rounded shimmer" />
            <div className="w-20 h-2.5 rounded shimmer" />
          </div>
        </div>
        <div className="w-16 h-10 rounded shimmer" />
      </div>
      <div className="px-5 py-4 space-y-2.5">
        <div className="w-full h-3 rounded shimmer" />
        <div className="w-5/6 h-3 rounded shimmer" />
        <div className="w-4/6 h-3 rounded shimmer" />
        <div className="w-full h-3 rounded shimmer" />
        <div className="w-3/4 h-3 rounded shimmer" />
      </div>
    </div>
  );
}
