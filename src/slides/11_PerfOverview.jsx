import { motion } from 'framer-motion';
import SlideLayout from '../components/SlideLayout';
import AnimatedCard from '../components/AnimatedCard';
import { Gauge, Timer, HardDrive, FileDown, Database } from 'lucide-react';

const optimizations = [
  { icon: <Timer size={24} />, title: 'Rate Limiting & Quotas', desc: 'Control traffic volume to protect backends', color: 'text-amber-400', bg: 'bg-amber-500/10' },
  { icon: <HardDrive size={24} />, title: 'Caching', desc: 'Store and reuse responses to reduce latency', color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
  { icon: <FileDown size={24} />, title: 'Response Compression', desc: 'Shrink payload size for faster transfers', color: 'text-cyan-400', bg: 'bg-cyan-500/10' },
  { icon: <Database size={24} />, title: 'Database Queries', desc: 'Optimize queries to avoid bottlenecks', color: 'text-violet-400', bg: 'bg-violet-500/10' },
  { icon: <Gauge size={24} />, title: 'Pagination', desc: 'Limit result sets to keep responses fast', color: 'text-pink-400', bg: 'bg-pink-500/10' },
];

export default function PerfOverview() {
  return (
    <SlideLayout>
      <div className="flex w-full max-w-5xl flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-2 text-center"
        >
          <span className="mb-2 inline-block rounded-full bg-amber-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-amber-400">
            Optimization
          </span>
          <h2 className="text-4xl font-bold text-white md:text-5xl">Performance</h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-10 max-w-xl text-center text-slate-400"
        >
          Speed matters. Here are 5 key performance optimizations.
        </motion.p>

        <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {optimizations.map((opt, i) => (
            <AnimatedCard
              key={opt.title}
              delay={0.2 + i * 0.12}
              className={`${i === 4 ? 'sm:col-span-2 lg:col-span-1' : ''}`}
            >
              <div className={`mb-3 flex h-12 w-12 items-center justify-center rounded-xl ${opt.bg} ${opt.color}`}>
                {opt.icon}
              </div>
              <h3 className="mb-1 text-lg font-semibold text-white">{opt.title}</h3>
              <p className="text-sm text-slate-400">{opt.desc}</p>
            </AnimatedCard>
          ))}
        </div>
      </div>
    </SlideLayout>
  );
}
