import { motion } from 'framer-motion';
import SlideLayout from '../components/SlideLayout';
import { HardDrive, Zap, Clock } from 'lucide-react';
import { useEffect, useState } from 'react';

// Animated cache hit/miss flow
function CacheFlow() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 600),   // request arrives
      setTimeout(() => setPhase(2), 1200),  // check cache
      setTimeout(() => setPhase(3), 1800),  // cache hit!
      setTimeout(() => setPhase(4), 3000),  // new request
      setTimeout(() => setPhase(5), 3600),  // cache miss
      setTimeout(() => setPhase(6), 4200),  // fetch from origin
      setTimeout(() => setPhase(7), 4800),  // store in cache
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const boxClass = (active, color = 'border-blue-500/50') =>
    `flex h-16 w-28 items-center justify-center rounded-xl border-2 transition-all duration-500 ${
      active ? `${color} glass-strong` : 'border-slate-700/30 glass opacity-50'
    }`;

  const arrowClass = (active) =>
    `h-0.5 w-12 transition-all duration-500 ${active ? 'bg-blue-400' : 'bg-slate-700'}`;

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Hit flow */}
      <div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-2 flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-emerald-400"
        >
          <Zap size={12} /> Cache Hit (fast)
        </motion.div>
        <div className="flex items-center gap-2">
          <div className={boxClass(phase >= 1, 'border-cyan-500/50')}>
            <span className="text-xs font-semibold text-slate-300">Client</span>
          </div>
          <div className={arrowClass(phase >= 1)} />
          <div className={boxClass(phase >= 2, 'border-emerald-500/50')}>
            <span className="text-xs font-semibold text-slate-300">Cache</span>
          </div>
          <div className={`${arrowClass(phase >= 3)} ${phase >= 3 ? '!bg-emerald-400' : ''}`} />
          <div className={boxClass(phase >= 3, 'border-emerald-500/50')}>
            <div className="text-center">
              <span className="text-xs font-bold text-emerald-400">HIT</span>
              <div className="text-[10px] text-slate-500">~5ms</div>
            </div>
          </div>
        </div>
      </div>

      {/* Miss flow */}
      <div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
          className="mb-2 flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-amber-400"
        >
          <Clock size={12} /> Cache Miss (slow)
        </motion.div>
        <div className="flex items-center gap-2">
          <div className={boxClass(phase >= 4, 'border-cyan-500/50')}>
            <span className="text-xs font-semibold text-slate-300">Client</span>
          </div>
          <div className={arrowClass(phase >= 4)} />
          <div className={boxClass(phase >= 5, 'border-amber-500/50')}>
            <div className="text-center">
              <span className="text-xs font-bold text-amber-400">MISS</span>
            </div>
          </div>
          <div className={`${arrowClass(phase >= 6)} ${phase >= 6 ? '!bg-amber-400' : ''}`} />
          <div className={boxClass(phase >= 6, 'border-violet-500/50')}>
            <span className="text-xs font-semibold text-slate-300">Origin</span>
          </div>
          <div className={`${arrowClass(phase >= 7)} ${phase >= 7 ? '!bg-violet-400' : ''}`} />
          <div className={boxClass(phase >= 7, 'border-amber-500/50')}>
            <div className="text-center">
              <span className="text-xs font-bold text-slate-300">Store</span>
              <div className="text-[10px] text-slate-500">~200ms</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Caching() {
  return (
    <SlideLayout>
      <div className="flex w-full max-w-5xl flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-2 text-center"
        >
          <div className="mb-3 flex justify-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10">
              <HardDrive size={24} className="text-emerald-400" />
            </div>
          </div>
          <h2 className="text-4xl font-bold text-white md:text-5xl">Caching</h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8 max-w-xl text-center text-slate-400"
        >
          Store frequently accessed data closer to the consumer.
        </motion.p>

        <CacheFlow />

        {/* Cache types */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 5.0 }}
          className="mt-8 flex flex-wrap justify-center gap-3"
        >
          {[
            { label: 'CDN Cache', sub: 'Edge locations' },
            { label: 'API Gateway', sub: 'Response cache' },
            { label: 'Redis / Memcached', sub: 'In-memory store' },
          ].map((c, i) => (
            <div key={c.label} className="glass rounded-lg px-4 py-2 text-center">
              <div className="text-sm font-semibold text-white">{c.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </SlideLayout>
  );
}
