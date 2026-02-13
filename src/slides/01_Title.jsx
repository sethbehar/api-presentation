import { motion } from 'framer-motion';
import SlideLayout from '../components/SlideLayout';
import { Monitor, DoorOpen, ShieldCheck, Cog, Database, Reply, ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';

// Lifecycle nodes positioned in an oval loop around the center title area
const lifecycle = [
  { label: 'Client',   Icon: Monitor,     color: '#22d3ee', x: 8,  y: 14 },
  { label: 'Gateway',  Icon: DoorOpen,    color: '#3b82f6', x: 50, y: 5  },
  { label: 'Auth',     Icon: ShieldCheck, color: '#f59e0b', x: 92, y: 14 },
  { label: 'Service',  Icon: Cog,         color: '#8b5cf6', x: 92, y: 86 },
  { label: 'Database', Icon: Database,    color: '#10b981', x: 50, y: 86 },
  { label: 'Response', Icon: Reply,       color: '#ec4899', x: 8,  y: 86 },
];

// Pre-compute loop coordinate arrays (7 points: 6 nodes + wrap back to start)
const loopX = lifecycle.map((n) => `${n.x}%`).concat(`${lifecycle[0].x}%`);
const loopY = lifecycle.map((n) => `${n.y}%`).concat(`${lifecycle[0].y}%`);
const loopColors = lifecycle.map((n) => n.color).concat(lifecycle[0].color);
const loopGlows = lifecycle
  .map((n) => `0 0 10px 3px ${n.color}50`)
  .concat(`0 0 10px 3px ${lifecycle[0].color}50`);
const steadyOpacity = Array(7).fill(0.85);
const timeStops = Array.from({ length: 7 }, (_, i) => i / 6);

const LOOP_DURATION = 14;
const NUM_PULSES = 3;

function LifecycleFlow() {
  // Stagger pulse mounting so they don't all appear at position 0 simultaneously
  const [activePulses, setActivePulses] = useState(0);

  useEffect(() => {
    const timers = [];
    for (let i = 0; i < NUM_PULSES; i++) {
      timers.push(
        setTimeout(
          () => setActivePulses((p) => p + 1),
          2000 + i * (LOOP_DURATION / NUM_PULSES) * 1000
        )
      );
    }
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Dashed connecting lines between nodes */}
      <svg className="absolute inset-0 h-full w-full" fill="none">
        {lifecycle.map((node, i) => {
          const next = lifecycle[(i + 1) % lifecycle.length];
          return (
            <motion.line
              key={`edge-${i}`}
              x1={`${node.x}%`}
              y1={`${node.y}%`}
              x2={`${next.x}%`}
              y2={`${next.y}%`}
              stroke={node.color}
              strokeOpacity={0.07}
              strokeWidth={1.5}
              strokeDasharray="8 6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 + i * 0.15 }}
            />
          );
        })}
      </svg>

      {/* Traveling color-shifting pulses that orbit the loop */}
      {Array.from({ length: activePulses }, (_, idx) => (
        <motion.div
          key={`pulse-${idx}`}
          className="absolute h-2 w-2 rounded-full"
          style={{ transform: 'translate(-50%, -50%)' }}
          initial={{
            left: `${lifecycle[0].x}%`,
            top: `${lifecycle[0].y}%`,
            opacity: 0,
          }}
          animate={{
            left: loopX,
            top: loopY,
            backgroundColor: loopColors,
            boxShadow: loopGlows,
            opacity: steadyOpacity,
          }}
          transition={{
            duration: LOOP_DURATION,
            repeat: Infinity,
            ease: 'linear',
            times: timeStops,
          }}
        />
      ))}

      {/* Icon nodes around the perimeter */}
      {lifecycle.map((node, i) => {
        const NodeIcon = node.Icon;
        return (
          <motion.div
            key={node.label}
            className="absolute flex flex-col items-center"
            style={{
              left: `${node.x}%`,
              top: `${node.y}%`,
              transform: 'translate(-50%, -50%)',
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.8 + i * 0.12, ease: 'backOut' }}
          >
            {/* Icon circle with subtle breathing glow */}
            <motion.div
              className="flex h-10 w-10 items-center justify-center rounded-full"
              style={{
                backgroundColor: `${node.color}10`,
                border: `1px solid ${node.color}20`,
              }}
              animate={{
                boxShadow: [
                  `0 0 0 0 ${node.color}00`,
                  `0 0 14px 2px ${node.color}12`,
                  `0 0 0 0 ${node.color}00`,
                ],
              }}
              transition={{
                duration: 3.5,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 0.6,
              }}
            >
              <NodeIcon size={18} style={{ color: node.color }} className="opacity-50" />
            </motion.div>
            <span
              className="mt-1.5 text-[10px] font-medium tracking-wide opacity-40"
              style={{ color: node.color }}
            >
              {node.label}
            </span>
          </motion.div>
        );
      })}
    </div>
  );
}

export default function TitleSlide() {
  return (
    <SlideLayout>
      <LifecycleFlow />

      <div className="relative z-10 flex flex-col items-center text-center">
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-4 text-5xl font-bold tracking-tight text-white md:text-7xl"
        >
          The Life of an{' '}
          <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            API Request
          </span>
        </motion.h1>

        {/* Subtitle
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-4 max-w-xl text-lg text-slate-400 md:text-xl"
        >
          A journey through APIs, architecture, and performance
        </motion.p> */}

        {/* Inspired by */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mb-12 flex items-center gap-2 text-xs text-slate-500"
        >
          <span>Inspired by Sam Rivera&apos;s &ldquo;Git More From Modernization&rdquo; presentation</span>
        </motion.div>

        {/* Hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex items-center gap-2 text-sm text-slate-500"
        >
          <span>Press</span>
          <kbd className="rounded-md border border-slate-700 bg-slate-800 px-2 py-0.5 text-xs font-mono text-slate-400">
            →
          </kbd>
          <span>or</span>
          <kbd className="rounded-md border border-slate-700 bg-slate-800 px-2 py-0.5 text-xs font-mono text-slate-400">
            Space
          </kbd>
          <span>to continue</span>
          <ArrowRight size={14} className="ml-1 text-blue-400" />
        </motion.div>
      </div>
    </SlideLayout>
  );
}
