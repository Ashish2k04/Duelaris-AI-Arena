import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/atom-one-dark.css';
import { CrownIcon } from './Icons';

/**
 * Formats response text using ReactMarkdown.
 */
function ResponseText({ text }) {
  if (!text) return null;
  return (
    <div className="text-sm leading-relaxed text-slate-300 markdown-content overflow-x-auto">
      <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
        {text}
      </ReactMarkdown>
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
  const scrollClass = colorClass === 'cohere-card' ? 'scroll-cyan' : 'scroll-purple';

  return (
    <div
      className={`glass-card ${colorClass} rounded-2xl overflow-hidden slide-up flex flex-col h-[520px] md:h-[580px]`}
      style={{ animationDelay: `${animDelay}s`, opacity: 0 }}
    >
      {/* Card header */}
      <div className="px-5 py-4 flex items-center justify-between border-b border-white/[0.05] flex-shrink-0">
        <div className="flex items-center gap-2.5">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
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

      {/* Scrollable Response body & reasoning */}
      <div className={`px-5 py-4 flex-1 overflow-y-auto model-card-scroll ${scrollClass}`}>
        <ResponseText text={response} />

        {/* Reasoning (if provided) */}
        {reasoning && (
          <div className="mt-4 pt-1">
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
    </div>
  );
}

/**
 * Shimmer skeleton while loading
 */
export function ModelCardSkeleton({ colorClass }) {
  return (
    <div className={`glass-card ${colorClass} rounded-2xl overflow-hidden flex flex-col h-[520px] md:h-[580px]`}>
      <div className="px-5 py-4 border-b border-white/[0.05] flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl shimmer" />
          <div className="space-y-2">
            <div className="w-32 h-3.5 rounded shimmer" />
            <div className="w-20 h-2.5 rounded shimmer" />
          </div>
        </div>
        <div className="w-16 h-10 rounded shimmer" />
      </div>
      <div className="px-5 py-4 space-y-3 flex-1 overflow-hidden">
        <div className="w-full h-3 rounded shimmer" />
        <div className="w-5/6 h-3 rounded shimmer" />
        <div className="w-4/6 h-3 rounded shimmer" />
        <div className="w-full h-3 rounded shimmer" />
        <div className="w-3/4 h-3 rounded shimmer" />
        <div className="w-full h-3 rounded shimmer" />
        <div className="w-2/3 h-3 rounded shimmer" />
        <div className="w-4/5 h-3 rounded shimmer" />
      </div>
    </div>
  );
}
