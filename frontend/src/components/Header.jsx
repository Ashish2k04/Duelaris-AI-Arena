import { SwordIcon } from './Icons';

export default function Header() {
  return (
    <header className="relative z-10 w-full">
      <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="absolute inset-0 blur-md bg-cyan-400/30 rounded-full scale-150" />
            <SwordIcon />
          </div>
          <div>
            <h1 className="text-xl font-black tracking-tight header-gradient leading-none">
              Duelaris
            </h1>
            <p className="text-xs text-slate-500 font-medium tracking-widest uppercase">
              AI Arena
            </p>
          </div>
        </div>

        {/* Right badge */}
        <div className="hidden md:flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.07]">
            <span className="text-xs font-semibold text-slate-300">AI Model 1</span>
            <span className="text-slate-600 text-xs">×</span>
            <span className="text-xs font-semibold text-slate-300">AI Model 2</span>
            <span className="text-slate-600 text-xs">×</span>
            <span className="text-xs font-semibold text-slate-300">AI Judge</span>
          </div>
        </div>
      </div>

      {/* Bottom border gradient */}
      <div className="neon-divider" />
    </header>
  );
}
