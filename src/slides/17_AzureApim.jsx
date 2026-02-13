import { motion, AnimatePresence } from 'framer-motion';
import SlideLayout from '../components/SlideLayout';
import { useState, useEffect, useCallback } from 'react';
import {
  Smartphone,
  Shield,
  ShieldCheck,
  ArrowDown,
  ArrowRight,
  Zap,
  BarChart3,
  HardDrive,
  RotateCcw,
  ServerCog,
} from 'lucide-react';

const steps = [
  {
    num: 1,
    title: 'Client App',
    icon: <Smartphone size={16} />,
    color: 'text-sky-400',
    border: 'border-sky-500/30',
    bg: 'bg-sky-500/10',
    items: ['Mobile app, SPA, or external service sends an HTTP request'],
  },
  {
    num: 2,
    title: 'Azure API Management',
    icon: <Shield size={16} />,
    color: 'text-indigo-400',
    border: 'border-indigo-500/30',
    bg: 'bg-indigo-500/10',
    items: ['Single entry point for all API traffic'],
    accent: true,
  },
  {
    num: 3,
    title: 'Inbound Policies',
    icon: <ShieldCheck size={16} />,
    color: 'text-amber-400',
    border: 'border-amber-500/30',
    bg: 'bg-amber-500/10',
    items: ['Rate Limiting & Quotas', 'OAuth 2.0 / JWT Validation', 'Request Transformation'],
    indent: true,
  },
  {
    num: 4,
    title: 'Cache Check',
    icon: <HardDrive size={16} />,
    color: 'text-emerald-400',
    border: 'border-emerald-500/30',
    bg: 'bg-emerald-500/10',
    items: null,
    cacheStep: true,
    indent: true,
  },
  {
    num: 5,
    title: 'Route to Backend',
    icon: <ServerCog size={16} />,
    color: 'text-cyan-400',
    border: 'border-cyan-500/30',
    bg: 'bg-cyan-500/10',
    items: null,
    backendStep: true,
    indent: true,
  },
  {
    num: 6,
    title: 'Outbound Policies',
    icon: <RotateCcw size={16} />,
    color: 'text-violet-400',
    border: 'border-violet-500/30',
    bg: 'bg-violet-500/10',
    items: ['Response Transformation', 'Store Response in Cache'],
    indent: true,
  },
  {
    num: 7,
    title: 'Return Response to Client',
    icon: <Zap size={16} />,
    color: 'text-sky-400',
    border: 'border-sky-500/30',
    bg: 'bg-sky-500/10',
    items: ['Compressed, transformed response delivered back to caller'],
  },
];

// Total reveal phases: 0 = title only, 1-7 = steps, 8 = App Insights sidebar
const TOTAL_PHASES = steps.length + 1;

export default function AzureApim() {
  const [phase, setPhase] = useState(0);
  const allRevealed = phase >= TOTAL_PHASES;

  const advance = useCallback(() => {
    setPhase((p) => Math.min(p + 1, TOTAL_PHASES));
  }, []);

  const retreat = useCallback(() => {
    setPhase((p) => Math.max(p - 1, 0));
  }, []);

  // Intercept keyboard events in capture phase so they fire before the global nav handler
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

      if ((e.key === 'ArrowRight' || e.key === ' ') && !allRevealed) {
        e.preventDefault();
        e.stopPropagation();
        advance();
      } else if (e.key === 'ArrowLeft' && phase > 0) {
        e.preventDefault();
        e.stopPropagation();
        retreat();
      }
    };

    window.addEventListener('keydown', handleKeyDown, true); // capture phase
    return () => window.removeEventListener('keydown', handleKeyDown, true);
  }, [phase, allRevealed, advance, retreat]);

  const showSidebar = phase >= TOTAL_PHASES;

  return (
    <SlideLayout className="!py-10">
      <div className="flex w-full max-w-5xl flex-col items-center">
        {/* Header */}
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-3 inline-block rounded-full bg-indigo-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-indigo-400"
        >
          Real-World Example
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="mb-6 text-center text-3xl font-bold text-white md:text-4xl"
        >
          Azure API Management
        </motion.h2>

        {/* Main content: timeline + App Insights sidebar */}
        <div className="flex w-full gap-4">
          {/* Timeline */}
          <div className="flex flex-1 flex-col">
            {steps.map((step, i) => {
              const isLast = i === steps.length - 1;
              const visible = phase > i; // phase 1 shows step index 0, etc.

              return (
                <AnimatePresence key={step.num}>
                  {visible && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
                      className="flex gap-3 overflow-hidden"
                    >
                      {/* Left: step number + connecting line */}
                      <div className="flex flex-col items-center">
                        <motion.div
                          initial={{ opacity: 0, scale: 0.5 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3, delay: 0.05 }}
                          className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold ${step.bg} ${step.color} ${step.accent ? 'ring-2 ring-indigo-500/40' : ''}`}
                        >
                          {step.num}
                        </motion.div>
                        {!isLast && phase > i + 1 && (
                          <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: '100%' }}
                            transition={{ duration: 0.25 }}
                            className={`w-px flex-1 ${step.indent ? 'bg-slate-700/60' : 'bg-slate-700/40'}`}
                          />
                        )}
                      </div>

                      {/* Right: content card */}
                      <motion.div
                        initial={{ opacity: 0, x: 16 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.35, delay: 0.08 }}
                        className={`mb-2 flex-1 rounded-xl border ${step.border} bg-slate-900/40 px-4 py-2.5 ${step.indent ? 'ml-2' : ''}`}
                      >
                        {/* Title row */}
                        <div className="flex items-center gap-2 mb-1">
                          <span className={step.color}>{step.icon}</span>
                          <span className="text-sm font-semibold text-white">{step.title}</span>
                        </div>

                        {/* Regular items */}
                        {step.items && (
                          <div className="flex flex-col gap-0.5">
                            {step.items.map((item, j) => (
                              <motion.div
                                key={j}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.15 + j * 0.06 }}
                                className="flex items-center gap-2 text-xs text-slate-400"
                              >
                                <span className={`h-1 w-1 shrink-0 rounded-full ${step.bg.replace('/10', '/50')}`} />
                                {item}
                              </motion.div>
                            ))}
                          </div>
                        )}

                        {/* Cache check special */}
                        {step.cacheStep && (
                          <div className="flex flex-col gap-1">
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: 0.12 }}
                              className="flex items-center gap-2 text-xs"
                            >
                              <span className="rounded bg-emerald-500/20 px-1.5 py-0.5 font-semibold text-emerald-400">
                                HIT
                              </span>
                              <ArrowRight size={10} className="text-emerald-500" />
                              <span className="text-emerald-400">Skip to Step 7 (fast path)</span>
                            </motion.div>
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: 0.2 }}
                              className="flex items-center gap-2 text-xs"
                            >
                              <span className="rounded bg-amber-500/20 px-1.5 py-0.5 font-semibold text-amber-400">
                                MISS
                              </span>
                              <ArrowDown size={10} className="text-amber-500" />
                              <span className="text-amber-400">Continue to backend</span>
                            </motion.div>
                          </div>
                        )}

                        {/* Backend routing special */}
                        {step.backendStep && (
                          <div className="flex flex-col gap-1">
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: 0.12 }}
                              className="flex items-center gap-2 text-xs text-slate-400"
                            >
                              <span className="rounded bg-cyan-500/20 px-1.5 py-0.5 font-mono text-[10px] font-bold text-cyan-400">
                                App Service
                              </span>
                              <ArrowRight size={10} className="text-slate-600" />
                              <span className="rounded bg-blue-500/20 px-1.5 py-0.5 font-mono text-[10px] font-bold text-blue-400">
                                Azure SQL
                              </span>
                            </motion.div>
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: 0.2 }}
                              className="flex items-center gap-2 text-xs text-slate-400"
                            >
                              <span className="rounded bg-cyan-500/20 px-1.5 py-0.5 font-mono text-[10px] font-bold text-cyan-400">
                                Functions
                              </span>
                              <ArrowRight size={10} className="text-slate-600" />
                              <span className="rounded bg-violet-500/20 px-1.5 py-0.5 font-mono text-[10px] font-bold text-violet-400">
                                Cosmos DB
                              </span>
                            </motion.div>
                          </div>
                        )}
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              );
            })}
          </div>

          {/* App Insights sidebar */}
          <AnimatePresence>
            {showSidebar && (
              <motion.div
                initial={{ opacity: 0, x: 20, width: 0 }}
                animate={{ opacity: 1, x: 0, width: 160 }}
                exit={{ opacity: 0, x: 20, width: 0 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="hidden flex-col items-center rounded-xl border border-dashed border-pink-500/30 bg-pink-500/5 px-3 py-4 md:flex overflow-hidden"
              >
                <BarChart3 size={20} className="mb-2 text-pink-400" />
                <span className="mb-3 text-xs font-semibold text-pink-400 whitespace-nowrap">App Insights</span>
                <div className="flex flex-1 flex-col justify-center gap-2">
                  {['Request tracing', 'Latency metrics', 'Error rates', 'Usage analytics'].map(
                    (item, i) => (
                      <motion.div
                        key={item}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.15 + i * 0.08 }}
                        className="flex items-center gap-1.5 text-[10px] text-pink-300/70 whitespace-nowrap"
                      >
                        <span className="h-1 w-1 shrink-0 rounded-full bg-pink-400/50" />
                        {item}
                      </motion.div>
                    )
                  )}
                </div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="mt-2 text-center text-[9px] text-pink-400/40 whitespace-nowrap"
                >
                  Monitors all steps
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Hint when not all revealed */}
        <AnimatePresence>
          {!allRevealed && phase === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-4 flex items-center gap-2 text-xs text-slate-600"
            >
              Press
              <kbd className="rounded border border-slate-700 bg-slate-800 px-1.5 py-0.5 font-mono text-[10px] text-slate-400">
                →
              </kbd>
              to reveal each step
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </SlideLayout>
  );
}
