import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// ─── Preset Quick-Load List (UI only – presets already live in Redux initial state) ─
const PRESETS_LIST = [
  'write the fabonacci series code using cpp',
  'write a python function to solve the knapsack problem efficiently',
  'write a javascript function for binary search',
  'design a thread-safe singleton class in java',
  'implement quicksort in rust with custom pivot selection',
];

// ─── Syntax Highlighter ───────────────────────────────────────────────────────
function syntaxHighlight(code) {
  if (!code) return '';

  const keywords =
    /\b(const|let|var|function|def|return|if|else|for|while|import|from|class|include|using|namespace|int|void|float|double|public|private|static|struct|fn|impl|use|new|this|self|super|extends|implements|interface|type|enum|export|default|async|await|try|catch|throw|finally|switch|case|break|continue|typeof|instanceof)\b/g;
  const strings = /(["'`])(.*?)\1/g;
  const comments = /(\/\/.*|#.*|\/\*[\s\S]*?\*\/)/g;
  const numbers = /\b(\d+\.?\d*)\b/g;
  const functions = /\b([a-zA-Z_]\w*)(?=\()/g;

  let html = code
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  html = html.replace(comments, '<span class="code-comment">$1</span>');
  html = html.replace(strings, '<span class="code-string">$1$2$1</span>');
  html = html.replace(keywords, '<span class="code-keyword">$1</span>');
  html = html.replace(numbers, '<span class="code-number">$1</span>');
  html = html.replace(functions, '<span class="code-function">$1</span>');

  return html;
}

// ─── Markdown Renderer ────────────────────────────────────────────────────────
function MarkdownRenderer({ content }) {
  if (!content) return null;

  const parts = content
    .split(/(```[a-zA-Z]*\n[\s\S]*?\n```)/g)
    .filter((p) => p && p.trim() !== '');

  return (
    <div className="space-y-4">
      {parts.map((part, index) => {
        if (part.startsWith('```')) {
          const lines = part.split('\n');
          const lang = lines[0].replace('```', '').trim() || 'code';
          const codeLines = lines.slice(1, lines.length - 1).join('\n');
          const highlightedHtml = syntaxHighlight(codeLines);

          return (
            <div
              key={index}
              className="glass-card rounded-lg overflow-hidden border border-white/10 my-4 shadow-lg"
            >
              <div className="bg-[#192122]/60 px-4 py-2 border-b border-white/5 flex justify-between items-center text-xs text-[#b9cacb] font-code">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#00f2ff] inline-block"></span>
                  {lang.toUpperCase()} CODE
                </span>
                <button
                  onClick={() => navigator.clipboard.writeText(codeLines)}
                  className="hover:text-[#00f2ff] p-1 rounded transition-colors flex items-center gap-1 cursor-pointer active:scale-95"
                  title="Copy Code"
                >
                  <span className="material-symbols-outlined text-sm">content_copy</span>
                  <span>Copy</span>
                </button>
              </div>
              <div className="p-4 bg-[#080d0d] overflow-x-auto text-xs md:text-sm font-code leading-relaxed text-[#dce4e4]">
                <pre>
                  <code dangerouslySetInnerHTML={{ __html: highlightedHtml }} />
                </pre>
              </div>
            </div>
          );
        }

        // Plain markdown section
        return (
          <div
            key={index}
            className="space-y-2 text-[#dce4e4]/90 text-sm md:text-base leading-relaxed"
          >
            {part.split('\n').map((line, li) => {
              const t = line.trim();
              if (!t) return null;
              if (t.startsWith('### '))
                return (
                  <h5 key={li} className="font-headline font-semibold text-base mt-4 mb-2 text-[#74f5ff]">
                    {t.slice(4)}
                  </h5>
                );
              if (t.startsWith('## '))
                return (
                  <h4 key={li} className="font-headline font-bold text-lg mt-5 mb-2 text-white border-b border-white/5 pb-1">
                    {t.slice(3)}
                  </h4>
                );
              if (t.startsWith('# '))
                return (
                  <h3 key={li} className="font-headline font-extrabold text-xl mt-6 mb-3 text-[#00f2ff]">
                    {t.slice(2)}
                  </h3>
                );
              if (t.startsWith('- ') || t.startsWith('* '))
                return (
                  <ul key={li} className="list-disc pl-5 my-1 text-[#b9cacb]">
                    <li>{renderInline(t.slice(2))}</li>
                  </ul>
                );
              if (/^\d+\.\s/.test(t)) {
                const m = t.match(/^(\d+)\.\s(.*)/);
                return (
                  <ol key={li} className="list-decimal pl-5 my-1 text-[#b9cacb]">
                    <li value={+m[1]}>{renderInline(m[2])}</li>
                  </ol>
                );
              }
              return <p key={li} className="my-1.5">{renderInline(t)}</p>;
            })}
          </div>
        );
      })}
    </div>
  );
}

// Inline: **bold** and `code`
function renderInline(text) {
  return text.split(/(\*\*.*?\*\*|`.*?`)/g).map((seg, i) => {
    if (seg.startsWith('**') && seg.endsWith('**'))
      return <strong key={i} className="text-white font-semibold">{seg.slice(2, -2)}</strong>;
    if (seg.startsWith('`') && seg.endsWith('`'))
      return (
        <code key={i} className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 font-code text-xs text-[#74f5ff]">
          {seg.slice(1, -1)}
        </code>
      );
    return seg;
  });
}

// ─── Score Ring ───────────────────────────────────────────────────────────────
function ScoreRing({ score, maxScore = 10, purple = false }) {
  const r = 27;
  const circumference = 2 * Math.PI * r;
  const offset = circumference - (score / maxScore) * circumference;
  const color = purple ? '#b600f8' : '#00f2ff';
  const textColor = purple ? '#ebb2ff' : '#74f5ff';

  return (
    <div className="relative flex items-center justify-center w-20 h-20 shrink-0">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 70 70">
        <circle cx="35" cy="35" r={r} fill="transparent" stroke="#232b2c" strokeWidth="6" />
        <circle
          cx="35" cy="35" r={r}
          fill="transparent"
          stroke={color}
          strokeWidth="6"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 1s ease-out', filter: `drop-shadow(0 0 6px ${color}80)` }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-headline font-bold text-lg" style={{ color: textColor }}>{score}</span>
        <span className="text-[9px] uppercase tracking-wider text-[#b9cacb]/70">/10</span>
      </div>
    </div>
  );
}

// ─── App Component ────────────────────────────────────────────────────────────
export default function App() {
  // ── Redux state ──────────────────────────────────────────────────────────────
  const dispatch = useDispatch();
  const history = useSelector((s) => s.battle.history);
  const activeBattleId = useSelector((s) => s.battle.activeBattleId);
  const loading = useSelector((s) => s.battle.loading);
  const error = useSelector((s) => s.battle.error);
  const mode = useSelector((s) => s.battle.mode);

  // ── UI-only local state ──────────────────────────────────────────────────────
  const [inputProblem, setInputProblem] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const activeBattle = history.find((b) => b.id === activeBattleId);

  // Responsive sidebar auto-close
  useEffect(() => {
    const handler = () => setSidebarOpen(window.innerWidth >= 768);
    window.addEventListener('resize', handler);
    handler();
    return () => window.removeEventListener('resize', handler);
  }, []);

  // ── Handlers ─────────────────────────────────────────────────────────────────
  const startBattle = (e) => {
    e.preventDefault();
    if (!inputProblem.trim()) return;
    dispatch(invokeBattle({ 
      problem: inputProblem.trim(), mode })).then(() =>
      setInputProblem('')
    );
  };

  const handleClearHistory = () => {
    if (window.confirm('Are you sure you want to wipe the clash logs?')) {
      dispatch(clearHistory());
    }
  };

  const handleDismissError = () => dispatch(clearError());

  const switchMode = (newMode) => dispatch(setMode(newMode));

  // ── Render ────────────────────────────────────────────────────────────────────
  return (
    <div className="bg-[#0a0a0c] text-[#dce4e4] min-h-screen flex flex-col md:flex-row relative overflow-hidden">
      {/* Ambient neon blobs */}
      <div className="absolute top-[-300px] left-[-300px] w-[600px] h-[600px] rounded-full bg-[#00f2ff]/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-300px] right-[-300px] w-[600px] h-[600px] rounded-full bg-[#b600f8]/5 blur-[120px] pointer-events-none" />

      {/* ── Sidebar ─────────────────────────────────────────────────────────── */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-30 w-72
          bg-[#0c1213]/90 md:bg-transparent
          backdrop-blur-2xl border-r border-white/5
          py-6 px-4 shrink-0
          transition-transform duration-300 flex flex-col h-full
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          md:relative md:translate-x-0
        `}
      >
        {/* Brand */}
        <div className="flex items-center gap-3 mb-8 px-2">
          <div className="w-8 h-8 rounded-full bg-[#00f2ff]/10 flex items-center justify-center border border-[#00f2ff]/30 shadow-[0_0_12px_rgba(0,242,255,0.2)]">
            <span className="material-symbols-outlined text-[#00f2ff] text-base" style={{ fontVariationSettings: "'FILL' 1" }}>swords</span>
          </div>
          <div>
            <h1 className="font-headline font-bold text-base tracking-wider text-white">NEURAL_ARENA</h1>
            <p className="text-[10px] uppercase tracking-widest text-[#00f2ff] font-code">System: Online</p>
          </div>
        </div>

        {/* Preset quick-loads */}
        <div className="mb-6 px-1">
          <h3 className="text-[10px] uppercase font-code tracking-widest text-[#b9cacb]/60 mb-2.5">Preset Arenas</h3>
          <div className="flex flex-col gap-1.5 max-h-36 overflow-y-auto pr-1">
            {PRESETS_LIST.map((preset, idx) => (
              <button
                key={idx}
                onClick={() => setInputProblem(preset)}
                title={preset}
                className="w-full text-left text-xs p-2 rounded bg-white/5 hover:bg-[#00f2ff]/10 hover:text-white border border-white/5 transition-all text-[#b9cacb] font-medium truncate cursor-pointer"
              >
                {preset}
              </button>
            ))}
          </div>
        </div>

        {/* Battle history list */}
        <div className="flex-1 flex flex-col min-h-0">
          <div className="flex justify-between items-center px-1 mb-3">
            <h3 className="text-[10px] uppercase font-code tracking-widest text-[#b9cacb]/60">Clash Logs</h3>
            {history.length > 0 && (
              <button
                onClick={handleClearHistory}
                className="text-[10px] text-red-400 hover:text-red-300 font-semibold cursor-pointer active:scale-95 transition-all"
              >
                CLEAR ALL
              </button>
            )}
          </div>

          <div className="flex-1 overflow-y-auto space-y-2 pr-1">
            {history.length === 0 ? (
              <div className="text-center py-6 text-xs text-[#b9cacb]/50 border border-dashed border-white/5 rounded-lg">
                No battles logged yet.
              </div>
            ) : (
              history.map((battle) => {
                const s1 = battle.judge?.solution_1_score ?? 0;
                const s2 = battle.judge?.solution_2_score ?? 0;
                const winner = s1 > s2 ? 'Mistral' : s2 > s1 ? 'Cohere' : 'Draw';
                const isActive = battle.id === activeBattleId;

                return (
                  <div
                    key={battle.id}
                    onClick={() => {
                      dispatch(setActiveBattle(battle.id));
                      if (window.innerWidth < 768) setSidebarOpen(false);
                    }}
                    className={`glass-card p-3 rounded-lg border-l-2 cursor-pointer hover:bg-white/5 transition-all ${
                      isActive ? 'border-l-[#00f2ff] bg-white/5' : 'border-l-white/10'
                    }`}
                  >
                    <p className="font-semibold text-xs text-white truncate">{battle.problem}</p>
                    <div className="flex justify-between items-center mt-2 text-[10px]">
                      <span className="text-[#b9cacb] font-code">Mistral vs Cohere</span>
                      <span
                        className={`px-1.5 py-0.5 rounded font-bold text-[9px] ${
                          winner === 'Mistral'
                            ? 'bg-[#00f2ff]/10 text-[#00f2ff]'
                            : winner === 'Cohere'
                            ? 'bg-[#b600f8]/10 text-[#ebb2ff]'
                            : 'bg-white/10 text-white'
                        }`}
                      >
                        {winner === 'Draw' ? 'DRAW' : `${winner.toUpperCase()} WON`}
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        <div className="mt-auto pt-4 border-t border-white/5 text-center text-[10px] text-[#b9cacb]/60 font-code">
          <p>© 2026 NEURAL ARENA</p>
          <p>Powered by Redux Toolkit</p>
        </div>
      </aside>

      {/* Mobile backdrop */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-20 bg-black/60 md:hidden backdrop-blur-sm"
        />
      )}

      {/* ── Main Content ─────────────────────────────────────────────────────── */}
      <main className="flex-1 min-w-0 flex flex-col h-screen overflow-hidden">

        {/* Top Navbar */}
        <div className="h-16 border-b border-white/5 px-4 md:px-8 flex justify-between items-center z-10 shrink-0">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-1 rounded bg-white/5 border border-white/10 text-[#b9cacb] hover:text-white transition-all cursor-pointer active:scale-95"
            >
              <span className="material-symbols-outlined text-lg block">
                {sidebarOpen ? 'menu_open' : 'menu'}
              </span>
            </button>
            <h2 className="font-headline font-bold text-sm md:text-base text-white tracking-wide flex items-center gap-2">
              <span>BATTLEFIELD CANVAS</span>
              <span className="hidden md:inline-block h-4 w-px bg-white/10" />
              <span className="hidden md:inline-flex items-center gap-1.5 text-xs text-[#b9cacb]/80 font-normal">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Redux Store Active
              </span>
            </h2>
          </div>

          {/* Mode switcher */}
          <div className="flex items-center gap-2.5">
            <span className="text-[10px] md:text-xs font-code text-[#b9cacb]">Mode:</span>
            <div className="bg-white/5 border border-white/10 p-0.5 rounded-lg flex items-center">
              <button
                type="button"
                onClick={() => switchMode('live')}
                className={`px-2.5 py-1 text-[10px] md:text-xs rounded font-medium transition-all cursor-pointer ${
                  mode === 'live'
                    ? 'bg-[#00f2ff] text-black font-semibold shadow-[0_0_8px_rgba(0,242,255,0.4)]'
                    : 'text-[#b9cacb] hover:text-white'
                }`}
              >
                Live API
              </button>
              <button
                type="button"
                onClick={() => switchMode('simulation')}
                className={`px-2.5 py-1 text-[10px] md:text-xs rounded font-medium transition-all cursor-pointer ${
                  mode === 'simulation'
                    ? 'bg-[#b600f8] text-white font-semibold shadow-[0_0_8px_rgba(182,0,248,0.4)]'
                    : 'text-[#b9cacb] hover:text-white'
                }`}
              >
                Simulation
              </button>
            </div>
          </div>
        </div>

        {/* Scrollable battle board */}
        <div className="flex-1 overflow-y-auto px-4 py-6 md:px-8 space-y-6">

          {/* Error banner */}
          {error && (
            <div className="p-4 bg-red-950/40 border border-red-500/30 text-red-200 text-xs md:text-sm rounded-lg flex items-start gap-3">
              <span className="material-symbols-outlined text-red-400 text-lg shrink-0">error</span>
              <div className="flex-1">
                <p className="font-semibold">Connection Alert</p>
                <p className="opacity-90">{error}</p>
              </div>
              <button onClick={handleDismissError} className="text-red-400 hover:text-red-200 cursor-pointer">
                <span className="material-symbols-outlined text-base">close</span>
              </button>
            </div>
          )}

          {/* Prompt entry */}
          <div className="glass-card rounded-xl p-4 md:p-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-[#00f2ff] animate-neon-pulse" />
            <form onSubmit={startBattle} className="space-y-4">
              <div className="flex items-center gap-2 mb-1">
                <span className="material-symbols-outlined text-[#00f2ff] text-lg">terminal</span>
                <label className="text-[10px] uppercase font-code tracking-widest text-[#00f2ff] font-bold">
                  Deploy New Arena Battle
                </label>
                <span className="ml-auto text-[10px] font-code text-[#b9cacb]/50">
                  store: <span className={mode === 'live' ? 'text-[#00f2ff]' : 'text-[#ebb2ff]'}>{mode}</span>
                </span>
              </div>

              <div className="flex flex-col md:flex-row gap-3">
                <textarea
                  value={inputProblem}
                  onChange={(e) => setInputProblem(e.target.value)}
                  placeholder="Enter your problem statement (e.g. 'write quicksort in python')..."
                  className="flex-1 bg-black/40 border border-white/10 rounded-lg p-3 text-sm text-white placeholder-[#b9cacb]/50 focus:outline-none focus:border-[#00f2ff] focus:ring-1 focus:ring-[#00f2ff]/30 transition-all resize-none h-16 min-h-16"
                  disabled={loading}
                />
                <button
                  type="submit"
                  disabled={loading || !inputProblem.trim()}
                  className={`px-6 py-3 rounded-lg font-headline font-semibold text-sm transition-all cursor-pointer flex items-center justify-center gap-2 shrink-0 select-none ${
                    loading
                      ? 'bg-white/10 text-[#b9cacb] cursor-not-allowed border border-white/5'
                      : 'bg-[#00f2ff] text-black hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_15px_rgba(0,242,255,0.3)] hover:shadow-[0_0_25px_rgba(0,242,255,0.5)]'
                  }`}
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 rounded-full border-2 border-[#b9cacb]/40 border-t-white animate-spin" />
                      <span>Fighting...</span>
                    </>
                  ) : (
                    <>
                      <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>swords</span>
                      <span>Engage Battle</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Battle results */}
          {!activeBattle ? (
            <div className="glass-card rounded-xl p-12 text-center border border-dashed border-white/5">
              <span className="material-symbols-outlined text-5xl text-[#b9cacb]/30 mb-3 block">rocket_launch</span>
              <h3 className="font-headline font-bold text-lg text-white mb-1">Begin the AI Showcase</h3>
              <p className="text-xs md:text-sm text-[#b9cacb]/70 max-w-md mx-auto">
                Select a clash log from the sidebar or enter a custom prompt above to start the arena.
              </p>
            </div>
          ) : (
            <div className="space-y-6">

              {/* Challenge header */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white/2 border border-white/5 p-4 rounded-lg">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2 py-0.5 rounded-full bg-red-500/10 text-red-400 border border-red-500/20 text-[9px] font-bold tracking-wider uppercase inline-flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
                      CLASH LOGGED
                    </span>
                    <span className="text-[10px] text-[#b9cacb] font-code">ID: {activeBattle.id}</span>
                  </div>
                  <h3 className="font-headline font-bold text-white text-base md:text-lg">
                    Prompt: &quot;{activeBattle.problem}&quot;
                  </h3>
                </div>
                <div className="px-3.5 py-1 rounded bg-[#00f2ff]/10 border border-[#00f2ff]/20 text-[#74f5ff] text-xs font-code font-bold uppercase shrink-0">
                  Mistral vs Cohere
                </div>
              </div>

              {/* Side-by-side solutions */}
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

                {/* Solution 1 — Mistral */}
                <div className="flex flex-col space-y-4">
                  <div className="glass-card p-3 rounded-lg border-t-2 border-t-[#00f2ff] flex justify-between items-center">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-[#00f2ff]/10 border border-[#00f2ff]/20 flex items-center justify-center text-[#00f2ff]">
                        <span className="material-symbols-outlined text-base">psychology</span>
                      </div>
                      <div>
                        <h4 className="font-headline font-bold text-xs text-white">MODEL_ONE: Mistral Large</h4>
                        <p className="text-[9px] text-[#74f5ff] font-code">PROVIDER: Mistral AI</p>
                      </div>
                    </div>
                    {activeBattle.judge.solution_1_score >= activeBattle.judge.solution_2_score && (
                      <span className="px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[8px] font-bold tracking-wide uppercase border border-emerald-500/20">
                        WINNER
                      </span>
                    )}
                  </div>
                  <div className="glass-card rounded-xl p-5 flex-1 border border-white/5">
                    <MarkdownRenderer content={activeBattle.solution_1} />
                  </div>
                </div>

                {/* Solution 2 — Cohere */}
                <div className="flex flex-col space-y-4">
                  <div className="glass-card p-3 rounded-lg border-t-2 border-t-[#b600f8] flex justify-between items-center">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-[#b600f8]/10 border border-[#b600f8]/20 flex items-center justify-center text-[#ebb2ff]">
                        <span className="material-symbols-outlined text-base">neurology</span>
                      </div>
                      <div>
                        <h4 className="font-headline font-bold text-xs text-white">MODEL_TWO: Cohere Command R+</h4>
                        <p className="text-[9px] text-[#ebb2ff] font-code">PROVIDER: Cohere Inc</p>
                      </div>
                    </div>
                    {activeBattle.judge.solution_2_score >= activeBattle.judge.solution_1_score && (
                      <span className="px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[8px] font-bold tracking-wide uppercase border border-emerald-500/20">
                        WINNER
                      </span>
                    )}
                  </div>
                  <div className="glass-card rounded-xl p-5 flex-1 border border-white/5">
                    <MarkdownRenderer content={activeBattle.solution_2} />
                  </div>
                </div>
              </div>

              {/* Judge Verdict */}
              <div className="glass-card rounded-xl p-5 md:p-6 border border-white/10 relative overflow-hidden shadow-xl">
                <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#00f2ff] to-[#b600f8]" />
                <h4 className="font-headline font-bold text-sm text-white mb-5 flex items-center gap-2 border-b border-white/5 pb-3">
                  <span className="material-symbols-outlined text-yellow-500">gavel</span>
                  COURTROOM VERDICT &amp; JUDGE SCORING
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex gap-4 p-4 rounded-lg bg-white/2 border border-white/5 items-center">
                    <ScoreRing score={activeBattle.judge.solution_1_score} />
                    <div>
                      <h5 className="font-headline font-bold text-xs text-white uppercase tracking-wider flex items-center gap-1.5 mb-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#00f2ff]" />
                        Mistral Large Score
                      </h5>
                      <p className="text-xs text-[#b9cacb] leading-relaxed">{activeBattle.judge.solution_1_reasoning}</p>
                    </div>
                  </div>

                  <div className="flex gap-4 p-4 rounded-lg bg-white/2 border border-white/5 items-center">
                    <ScoreRing score={activeBattle.judge.solution_2_score} purple />
                    <div>
                      <h5 className="font-headline font-bold text-xs text-white uppercase tracking-wider flex items-center gap-1.5 mb-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#b600f8]" />
                        Cohere Command R+ Score
                      </h5>
                      <p className="text-xs text-[#b9cacb] leading-relaxed">{activeBattle.judge.solution_2_reasoning}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-3">
                  <div className="text-xs font-code text-[#b9cacb]/80">
                    Judge: <span className="text-[#00f2ff]">Gemini-1.5-Flash</span> · State via <span className="text-[#ebb2ff]">Redux Toolkit</span>
                  </div>
                  <span
                    className={`px-2.5 py-1 rounded text-xs font-headline font-black tracking-wide border shadow-md uppercase ${
                      activeBattle.judge.solution_1_score > activeBattle.judge.solution_2_score
                        ? 'bg-[#00f2ff]/20 text-[#00f2ff] border-[#00f2ff]/30'
                        : activeBattle.judge.solution_2_score > activeBattle.judge.solution_1_score
                        ? 'bg-[#b600f8]/20 text-[#ebb2ff] border-[#b600f8]/30'
                        : 'bg-white/10 text-white border-white/20'
                    }`}
                  >
                    {activeBattle.judge.solution_1_score > activeBattle.judge.solution_2_score
                      ? 'Mistral Large Won!'
                      : activeBattle.judge.solution_2_score > activeBattle.judge.solution_1_score
                      ? 'Cohere Command R+ Won!'
                      : "It's a Draw!"}
                  </span>
                </div>
              </div>

            </div>
          )}
        </div>
      </main>
    </div>
  );
}
