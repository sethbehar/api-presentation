import { motion } from 'framer-motion';
import SlideLayout from '../components/SlideLayout';
import AnimatedCard from '../components/AnimatedCard';
import { Repeat, GitBranch, Radio } from 'lucide-react';

const types = [
  {
    icon: <Repeat size={28} />,
    title: 'REST',
    color: 'text-blue-400',
    bg: 'bg-blue-500/10',
    desc: 'Resource-based, stateless, HTTP methods. The most widely used API paradigm.',
  },
  {
    icon: <GitBranch size={28} />,
    title: 'GraphQL',
    color: 'text-pink-400',
    bg: 'bg-pink-500/10',
    desc: 'Query language that lets clients request exactly the data they need in a single call.',
  },
  {
    icon: <Radio size={28} />,
    title: 'WebSocket',
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
    desc: 'Persistent bidirectional connection for real-time data streaming.',
  },
];

export default function TypesOverview() {
  return (
    <SlideLayout>
      <div className="flex w-full max-w-5xl flex-col items-center text-center">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-4 inline-block rounded-full bg-indigo-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-indigo-400"
        >
          API Paradigms
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="mb-6 text-4xl font-bold text-white md:text-5xl"
        >
          Types of APIs
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-10 max-w-xl text-slate-400"
        >
          Different patterns for different needs. This presentation focuses on REST, but here are the major paradigms.
        </motion.p>

        <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-3">
          {types.map((t, i) => (
            <AnimatedCard key={t.title} delay={0.2 + i * 0.15} className="relative overflow-hidden">
              <div className="flex items-center justify-center gap-4">
                <div className={`mb-4 flex h-14 w-14 items-center justify-center rounded-xl ${t.bg} ${t.color}`}>
                  {t.icon}
                </div>
                <h3 className="mb-2 text-xl font-bold text-white">{t.title}</h3>
              </div>
              <p className="text-sm leading-relaxed text-slate-400">{t.desc}</p>
            </AnimatedCard>
          ))}
        </div>
      </div>
    </SlideLayout>
  );
}
