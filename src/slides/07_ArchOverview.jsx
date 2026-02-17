import { motion, AnimatePresence } from 'framer-motion';
import SlideLayout from '../components/SlideLayout';
import { useState, useEffect } from 'react';
import {
  Monitor, DoorOpen, ShieldCheck, Cog, Database, Reply,
  ChevronRight, ChevronDown,
  Globe, Satellite, ShieldBan, Scale, KeyRound, Filter, Cpu,
  Layers, HardDrive, Package,
} from 'lucide-react';

/* ── Simple 6-step model (initial view) ──────────────────── */
const simpleSteps = [
  {
    num: 1,
    title: 'Client Request',
    desc: 'User or app sends an HTTP request',
    icon: Monitor,
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/10',
    ring: 'ring-cyan-500/20',
  },
  {
    num: 2,
    title: 'API Gateway',
    desc: 'Routes, rate-limits, and validates the incoming request',
    icon: DoorOpen,
    color: 'text-blue-400',
    bg: 'bg-blue-500/10',
    ring: 'ring-blue-500/20',
  },
  {
    num: 3,
    title: 'Authentication',
    desc: 'Verifies identity via tokens, API keys, or OAuth',
    icon: ShieldCheck,
    color: 'text-amber-400',
    bg: 'bg-amber-500/10',
    ring: 'ring-amber-500/20',
  },
  {
    num: 4,
    title: 'Backend Logic',
    desc: 'Business rules execute and data is processed',
    icon: Cog,
    color: 'text-violet-400',
    bg: 'bg-violet-500/10',
    ring: 'ring-violet-500/20',
  },
  {
    num: 5,
    title: 'Database',
    desc: 'Reads or writes persistent data',
    icon: Database,
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
    ring: 'ring-emerald-500/20',
  },
  {
    num: 6,
    title: 'Response',
    desc: 'Formatted result is returned to the client',
    icon: Reply,
    color: 'text-pink-400',
    bg: 'bg-pink-500/10',
    ring: 'ring-pink-500/20',
  },
];

/* ── Realistic 14-layer path (expanded view) ─────────────── */
const realisticSteps = [
  { title: 'Client', icon: Monitor, color: 'text-cyan-400', bg: 'bg-cyan-500/10', border: 'border-cyan-500/30' },
  { title: 'DNS', icon: Globe, color: 'text-blue-300', bg: 'bg-blue-400/10', border: 'border-blue-400/30' },
  { title: 'CDN', icon: Satellite, color: 'text-indigo-400', bg: 'bg-indigo-500/10', border: 'border-indigo-500/30' },
  { title: 'WAF', icon: ShieldBan, color: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/30' },
  { title: 'API Gateway', icon: DoorOpen, color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/30' },
  { title: 'Load Balancer', icon: Scale, color: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/30' },
  { title: 'Authentication', icon: ShieldCheck, color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/30' },
  { title: 'Authorization', icon: KeyRound, color: 'text-yellow-400', bg: 'bg-yellow-500/10', border: 'border-yellow-500/30' },
  { title: 'Backend Logic', icon: Cpu, color: 'text-violet-400', bg: 'bg-violet-500/10', border: 'border-violet-500/30' },
  { title: 'External Services', icon: Layers, color: 'text-indigo-400', bg: 'bg-indigo-500/10', border: 'border-indigo-500/30' },
  { title: 'Cache', icon: Layers, color: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/30' },
  { title: 'Database', icon: HardDrive, color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/30' },
  { title: 'Compression', icon: Package, color: 'text-sky-400', bg: 'bg-sky-500/10', border: 'border-sky-500/30' },
  { title: 'Response → Client', icon: Reply, color: 'text-pink-400', bg: 'bg-pink-500/10', border: 'border-pink-500/30' },
];

/* ── Simple-view card ────────────────────────────────────── */
function StepCard({ step, delay }) {
  const Icon = step.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="glass relative flex flex-col items-center rounded-2xl px-4 py-5 text-center"
      style={{ minWidth: 0 }}
    >
      <span
        className={`absolute -top-3 left-1/2 -translate-x-1/2 flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-bold ${step.bg} ${step.color} ring-1 ${step.ring}`}
      >
        {step.num}
      </span>
      <div
        className={`mb-2.5 flex h-11 w-11 items-center justify-center rounded-xl ${step.bg} ${step.color}`}
      >
        <Icon size={22} />
      </div>
      <h3 className="mb-1 text-sm font-semibold text-white leading-tight">
        {step.title}
      </h3>
    </motion.div>
  );
}

/* ── Simple-view arrow ───────────────────────────────────── */
function SimpleArrow({ delay, direction = 'right' }) {
  const isRight = direction === 'right';
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay }}
      className={`flex items-center justify-center ${isRight ? '' : 'py-1'}`}
    >
      {isRight ? (
        <ChevronRight size={20} className="text-slate-600" />
      ) : (
        <ChevronDown size={20} className="text-slate-600" />
      )}
    </motion.div>
  );
}

/* ── Expanded-view flow node ─────────────────────────────── */
function FlowNode({ step, delay }) {
  const Icon = step.icon;
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`relative z-10 flex items-center gap-2 rounded-lg border ${step.border} bg-slate-900/70 backdrop-blur-sm px-3 py-1`}
    >
      <div
        className={`flex h-4 w-4 shrink-0 items-center justify-center rounded ${step.bg}`}
      >
        <Icon size={11} className={step.color} />
      </div>
      <span className="text-[13px] font-medium text-white whitespace-nowrap">
        {step.title}
      </span>
    </motion.div>
  );
}

/* ── Main slide ──────────────────────────────────────────── */
export default function ArchOverview() {
  const [expanded, setExpanded] = useState(false);
  const baseDelay = 0.2;
  const stagger = 0.15;

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

      if ((e.key === 'ArrowRight' || e.key === ' ') && !expanded) {
        e.preventDefault();
        e.stopPropagation();
        setExpanded(true);
      } else if (e.key === 'ArrowLeft' && expanded) {
        e.preventDefault();
        e.stopPropagation();
        setExpanded(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown, true);
    return () => window.removeEventListener('keydown', handleKeyDown, true);
  }, [expanded]);

  return (
    <SlideLayout>
      <div className="flex w-full max-w-5xl flex-col items-center">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-2 text-center"
        >
          <span className="mb-2 inline-block rounded-full bg-violet-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-violet-400">
            Architecture
          </span>
          <h2 className="text-4xl font-bold text-white md:text-5xl">
            How It All Fits Together
          </h2>
        </motion.div>

        {/* Subtitle — crossfades on toggle */}
        <AnimatePresence mode="wait">
          <motion.p
            key={expanded ? 'exp' : 'simple'}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="mb-6 max-w-2xl text-center text-slate-400"
          >
            {expanded
              ? 'A more realistic request pipeline.'
              : 'A simple request pipeline.'}
          </motion.p>
        </AnimatePresence>

        {/* ─── Content: simple pipeline OR expanded flow ─── */}
        <AnimatePresence mode="wait">
          {!expanded ? (
            <motion.div
              key="simple"
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              className="w-full"
            >
              {/* Large screens: horizontal row */}
              <div className="hidden w-full items-center justify-center lg:flex">
                {simpleSteps.map((step, i) => {
                  const cardDelay = baseDelay + i * stagger * 2;
                  const arrowDelay = cardDelay + stagger;
                  return (
                    <div
                      key={step.num}
                      className="flex items-center"
                      style={{ flex: '1 1 0' }}
                    >
                      <div className="flex-1">
                        <StepCard step={step} delay={cardDelay} />
                      </div>
                      {i < simpleSteps.length - 1 && (
                        <div className="flex-shrink-0 px-1">
                          <SimpleArrow delay={arrowDelay} direction="right" />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Medium screens: 2-column paired rows */}
              <div className="hidden w-full max-w-lg flex-col items-center gap-2 md:flex lg:hidden">
                {[0, 2, 4].map((pairStart) => {
                  const left = simpleSteps[pairStart];
                  const right = simpleSteps[pairStart + 1];
                  const pairDelay = baseDelay + pairStart * stagger;
                  const isLastPair = pairStart === 4;

                  return (
                    <div key={pairStart} className="w-full">
                      <div
                        className="grid w-full items-center gap-3"
                        style={{ gridTemplateColumns: '1fr auto 1fr' }}
                      >
                        <StepCard step={left} delay={pairDelay} />
                        <SimpleArrow
                          delay={pairDelay + stagger * 0.5}
                          direction="right"
                        />
                        <StepCard step={right} delay={pairDelay + stagger} />
                      </div>
                      {!isLastPair && (
                        <div className="flex justify-center py-1">
                          <SimpleArrow
                            delay={pairDelay + stagger * 1.5}
                            direction="down"
                          />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Small screens: stacked single column */}
              <div className="flex w-full max-w-xs flex-col items-center gap-2 md:hidden">
                {simpleSteps.map((step, i) => {
                  const cardDelay = baseDelay + i * stagger;
                  return (
                    <div
                      key={step.num}
                      className="flex w-full flex-col items-center"
                    >
                      <StepCard step={step} delay={cardDelay} />
                      {i < simpleSteps.length - 1 && (
                        <SimpleArrow
                          delay={cardDelay + stagger * 0.5}
                          direction="down"
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </motion.div>
          ) : (
            /* ─── Expanded realistic path ─── */
            <motion.div
              key="expanded"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
              className="flex w-full justify-center"
            >
              <div className="relative flex flex-col items-center">
                {/* Gradient flow line behind items */}
                <motion.div
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' }}
                  className="absolute left-1/2 top-2 bottom-2 w-px -translate-x-1/2 origin-top"
                  style={{
                    background:
                      'linear-gradient(to bottom, rgba(34,211,238,0.25), rgba(99,102,241,0.25), rgba(139,92,246,0.25), rgba(236,72,153,0.25))',
                  }}
                />

                {realisticSteps.map((step, i) => (
                  <div key={i} className="flex flex-col items-center">
                    <FlowNode step={step} delay={i * 0.06} />
                    {i < realisticSteps.length - 1 && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{
                          duration: 0.15,
                          delay: i * 0.06 + 0.03,
                        }}
                        className="py-px"
                      >
                        <ChevronDown size={10} className="text-slate-600" />
                      </motion.div>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </SlideLayout>
  );
}
