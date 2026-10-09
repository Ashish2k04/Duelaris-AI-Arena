// Sword crossed icon for the logo
export function SwordIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="swordGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00d4ff" />
          <stop offset="100%" stopColor="#a855f7" />
        </linearGradient>
      </defs>
      {/* Sword 1 */}
      <line x1="6" y1="6" x2="30" y2="30" stroke="url(#swordGrad1)" strokeWidth="2.5" strokeLinecap="round" />
      <polygon points="4,4 10,4 4,10" fill="url(#swordGrad1)" />
      <line x1="14" y1="22" x2="11" y2="25" stroke="url(#swordGrad1)" strokeWidth="2" strokeLinecap="round" />
      {/* Sword 2 */}
      <line x1="30" y1="6" x2="6" y2="30" stroke="url(#swordGrad1)" strokeWidth="2.5" strokeLinecap="round" />
      <polygon points="32,4 26,4 32,10" fill="url(#swordGrad1)" />
      <line x1="22" y1="22" x2="25" y2="25" stroke="url(#swordGrad1)" strokeWidth="2" strokeLinecap="round" />
      {/* Center glow dot */}
      <circle cx="18" cy="18" r="2.5" fill="white" opacity="0.9" />
    </svg>
  );
}

// Lightning bolt icon for VS divider
export function LightningIcon({ size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="lightningGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00d4ff" />
          <stop offset="100%" stopColor="#a855f7" />
        </linearGradient>
      </defs>
      <path d="M13 2L4.5 13.5H11L10 22L20.5 10H14L13 2Z" fill="url(#lightningGrad)" />
    </svg>
  );
}

// Gavel/Judge icon
export function GavelIcon({ size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="gavelGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#fbbf24" />
        </linearGradient>
      </defs>
      <rect x="10" y="3" width="5" height="10" rx="1" transform="rotate(45 10 3)" fill="url(#gavelGrad)" />
      <rect x="2" y="11" width="5" height="10" rx="1" transform="rotate(45 2 11)" fill="url(#gavelGrad)" opacity="0.7" />
      <line x1="13" y1="19" x2="20" y2="19" stroke="url(#gavelGrad)" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

// Cohere brain icon
export function CohereIcon({ size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" stroke="#00d4ff" strokeWidth="1.5" opacity="0.4" />
      <circle cx="12" cy="12" r="6" stroke="#00d4ff" strokeWidth="1.5" opacity="0.6" />
      <circle cx="12" cy="12" r="2.5" fill="#00d4ff" />
      <line x1="2" y1="12" x2="6" y2="12" stroke="#00d4ff" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="18" y1="12" x2="22" y2="12" stroke="#00d4ff" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="12" y1="2" x2="12" y2="6" stroke="#00d4ff" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="12" y1="18" x2="12" y2="22" stroke="#00d4ff" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

// Groq lightning icon
export function GroqIcon({ size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2L6 13H11L9 22L18 9H13L12 2Z" fill="#a855f7" />
    </svg>
  );
}

// Gemini star icon
export function GeminiIcon({ size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="geminiGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="50%" stopColor="#fbbf24" />
          <stop offset="100%" stopColor="#ef4444" />
        </linearGradient>
      </defs>
      <path d="M12 2C12 2 12 9.5 6 12C12 14.5 12 22 12 22C12 22 12 14.5 18 12C12 9.5 12 2 12 2Z" fill="url(#geminiGrad)" />
      <path d="M2 12C2 12 9.5 12 12 6C14.5 12 22 12 22 12C22 12 14.5 12 12 18C9.5 12 2 12 2 12Z" fill="url(#geminiGrad)" opacity="0.5" />
    </svg>
  );
}

// Send/Battle icon
export function BattleIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Loading spinner
export function LoadingDots() {
  return (
    <div className="flex items-center gap-1.5">
      {[0, 1, 2].map(i => (
        <div
          key={i}
          className="pulse-dot w-2 h-2 rounded-full bg-white/70"
          style={{ animationDelay: `${i * 0.2}s` }}
        />
      ))}
    </div>
  );
}

// Crown icon for winner
export function CrownIcon({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 19L5 9L9 14L12 6L15 14L19 9L22 19H2Z" fill="#f59e0b" />
    </svg>
  );
}
