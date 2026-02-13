import { motion } from 'framer-motion';
import SlideLayout from '../components/SlideLayout';
import CodeSnippet from '../components/CodeSnippet';
import { Database, AlertTriangle, CheckCircle } from 'lucide-react';

const unoptimized = `SELECT *
FROM orders
WHERE created_at > '2026-01-01'
  AND status = 'pending'
ORDER BY created_at DESC;

-- No index on created_at or status
-- Full table scan on 2.4M rows
-- Returns all columns including BLOBs`;

const optimized = `SELECT id, user_id, total, created_at
FROM orders
WHERE created_at > '2026-01-01'
  AND status = 'pending'
ORDER BY created_at DESC
LIMIT 50;

-- Composite index on (status, created_at)
-- Index seek, returns only needed columns
-- Result set bounded by LIMIT`;

export default function DatabaseQueries() {
  return (
    <SlideLayout>
      <div className="flex w-full max-w-5xl flex-col items-center text-center">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-4 inline-block rounded-full bg-violet-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-violet-400"
        >
          Performance
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="mb-4 text-4xl font-bold text-white md:text-5xl"
        >
          Database Queries
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8 max-w-xl text-slate-400"
        >
          The same data, the same result -- but the way you ask for it
          makes all the difference.
        </motion.p>

        <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2">
          {/* Unoptimized */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.25 }}
          >
            <div className="mb-2 flex items-center gap-2">
              <AlertTriangle size={16} className="text-red-400" />
              <span className="text-sm font-semibold text-red-400">Unoptimized</span>
            </div>
            <CodeSnippet code={unoptimized} language="SQL" delay={0.3} />
            {/* Metrics */}
            <div className="mt-3 flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500 w-16">Time</span>
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-800/50">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '92%' }}
                    transition={{ duration: 1, delay: 0.8 }}
                    className="h-full rounded-full bg-gradient-to-r from-red-500 to-red-400"
                  />
                </div>
                <span className="font-mono text-xs text-red-400 w-16 text-right">~3,200ms</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500 w-16">Rows</span>
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-800/50">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 1, delay: 0.9 }}
                    className="h-full rounded-full bg-gradient-to-r from-red-500/60 to-red-400/40"
                  />
                </div>
                <span className="font-mono text-xs text-red-400/80 w-16 text-right">2.4M</span>
              </div>
            </div>
          </motion.div>

          {/* Optimized */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.35 }}
          >
            <div className="mb-2 flex items-center gap-2">
              <CheckCircle size={16} className="text-emerald-400" />
              <span className="text-sm font-semibold text-emerald-400">Optimized</span>
            </div>
            <CodeSnippet code={optimized} language="SQL" delay={0.4} />
            {/* Metrics */}
            <div className="mt-3 flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500 w-16">Time</span>
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-800/50">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '4%' }}
                    transition={{ duration: 0.6, delay: 1.0 }}
                    className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-400"
                  />
                </div>
                <span className="font-mono text-xs text-emerald-400 w-16 text-right">~4ms</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500 w-16">Rows</span>
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-800/50">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '2%' }}
                    transition={{ duration: 0.6, delay: 1.1 }}
                    className="h-full rounded-full bg-gradient-to-r from-emerald-500/60 to-emerald-400/40"
                  />
                </div>
                <span className="font-mono text-xs text-emerald-400/80 w-16 text-right">50</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Tips */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="mt-6 flex flex-wrap justify-center gap-3"
        >
          {['Use Indexes', 'Avoid SELECT *', 'Add LIMIT', 'Use EXPLAIN'].map((tip) => (
            <span key={tip} className="glass rounded-lg px-3 py-1.5 text-xs font-medium text-slate-300">
              {tip}
            </span>
          ))}
        </motion.div>
      </div>
    </SlideLayout>
  );
}
