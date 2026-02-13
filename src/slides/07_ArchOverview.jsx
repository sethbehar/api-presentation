import { motion } from 'framer-motion';
import SlideLayout from '../components/SlideLayout';
import { Monitor, DoorOpen, ShieldCheck, Cog, Database, Reply, ChevronRight, ChevronDown } from 'lucide-react';

const steps = [
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
    title: 'Service Logic',
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
      {/* Step number badge */}
      <span
        className={`absolute -top-3 left-1/2 -translate-x-1/2 flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-bold ${step.bg} ${step.color} ring-1 ${step.ring}`}
      >
        {step.num}
      </span>

      {/* Icon */}
      <div
        className={`mb-2.5 flex h-11 w-11 items-center justify-center rounded-xl ${step.bg} ${step.color}`}
      >
        <Icon size={22} />
      </div>

      {/* Title */}
      <h3 className="mb-1 text-sm font-semibold text-white leading-tight">
        {step.title}
      </h3>

      {/* Description */}
      <p className="text-xs text-slate-400 leading-relaxed">{step.desc}</p>
    </motion.div>
  );
}

function Arrow({ delay, direction = 'right' }) {
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

export default function ArchOverview() {
  const baseDelay = 0.2;
  const stagger = 0.15;

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

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8 max-w-2xl text-center text-slate-400"
        >
          A request travels through six layers in sequence — each responsible for
          a critical piece of the puzzle.
        </motion.p>

        {/* Pipeline — horizontal on lg, 2-col grid on md, stacked on sm */}

        {/* Large screens: single horizontal row */}
        <div className="hidden w-full items-center justify-center lg:flex">
          {steps.map((step, i) => {
            const cardDelay = baseDelay + i * stagger * 2;
            const arrowDelay = cardDelay + stagger;
            return (
              <div key={step.num} className="flex items-center" style={{ flex: i < steps.length - 1 ? '1 1 0' : '1 1 0' }}>
                <div className="flex-1">
                  <StepCard step={step} delay={cardDelay} />
                </div>
                {i < steps.length - 1 && (
                  <div className="flex-shrink-0 px-1">
                    <Arrow delay={arrowDelay} direction="right" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Medium screens: 2-column paired rows */}
        <div className="hidden w-full max-w-lg flex-col items-center gap-2 md:flex lg:hidden">
          {[0, 2, 4].map((pairStart) => {
            const left = steps[pairStart];
            const right = steps[pairStart + 1];
            const pairDelay = baseDelay + pairStart * stagger;
            const isLastPair = pairStart === 4;

            return (
              <div key={pairStart} className="w-full">
                {/* Pair row: left card - arrow - right card */}
                <div className="grid w-full items-center gap-3" style={{ gridTemplateColumns: '1fr auto 1fr' }}>
                  <StepCard step={left} delay={pairDelay} />
                  <Arrow delay={pairDelay + stagger * 0.5} direction="right" />
                  <StepCard step={right} delay={pairDelay + stagger} />
                </div>
                {/* Down arrow between pairs */}
                {!isLastPair && (
                  <div className="flex justify-center py-1">
                    <Arrow delay={pairDelay + stagger * 1.5} direction="down" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Small screens: stacked single column */}
        <div className="flex w-full max-w-xs flex-col items-center gap-2 md:hidden">
          {steps.map((step, i) => {
            const cardDelay = baseDelay + i * stagger;
            return (
              <div key={step.num} className="flex w-full flex-col items-center">
                <StepCard step={step} delay={cardDelay} />
                {i < steps.length - 1 && (
                  <Arrow delay={cardDelay + stagger * 0.5} direction="down" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </SlideLayout>
  );
}
