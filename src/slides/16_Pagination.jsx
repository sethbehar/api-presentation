import { motion } from 'framer-motion';
import SlideLayout from '../components/SlideLayout';
import CodeSnippet from '../components/CodeSnippet';
import { Gauge, ChevronRight } from 'lucide-react';

// Animated pagination visual
function PaginationVisual() {
  const totalItems = 24;
  const pageSize = 6;
  const pages = Math.ceil(totalItems / pageSize);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex flex-wrap gap-2 max-w-md justify-center">
        {Array.from({ length: totalItems }, (_, i) => {
          const page = Math.floor(i / pageSize);
          const colors = [
            'bg-blue-500/40 border-blue-500/30',
            'bg-emerald-500/40 border-emerald-500/30',
            'bg-amber-500/40 border-amber-500/30',
            'bg-pink-500/40 border-pink-500/30',
          ];
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2, delay: 0.5 + i * 0.04 }}
              className={`h-8 w-8 rounded-lg border ${colors[page]} flex items-center justify-center`}
            >
              <span className="text-xs font-mono text-slate-300">{i + 1}</span>
            </motion.div>
          );
        })}
      </div>

      {/* Page indicators */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="flex items-center gap-1"
      >
        {Array.from({ length: pages }, (_, i) => {
          const colors = ['bg-blue-400', 'bg-emerald-400', 'bg-amber-400', 'bg-pink-400'];
          return (
            <motion.div
              key={i}
              initial={{ width: 0 }}
              animate={{ width: i === 0 ? 24 : 10 }}
              transition={{ delay: 1.7 + i * 0.1 }}
              className={`h-2 rounded-full ${i === 0 ? colors[i] : 'bg-slate-600'}`}
            />
          );
        })}
        <span className="ml-2 text-xs text-slate-500">Page 1 of {pages}</span>
      </motion.div>
    </div>
  );
}

const offsetExample = `GET /api/users?page=2&limit=10
-- Skips first 10, returns next 10
-- Simple but slow for deep pages`;

const cursorExample = `GET /api/users?after=abc123&limit=10
-- Uses last item as cursor
-- Consistent performance at any depth`;

export default function Pagination() {
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
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-pink-500/10">
              <Gauge size={24} className="text-pink-400" />
            </div>
          </div>
          <h2 className="text-4xl font-bold text-white md:text-5xl">Pagination</h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8 max-w-xl text-center text-slate-400"
        >
          Never return unbounded result sets. Break responses into manageable{' '}
          <span className="font-semibold text-pink-400">pages</span> to keep response times predictable.
        </motion.p>

        <PaginationVisual />

        {/* Comparison */}
        <div className="mt-8 grid w-full grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <motion.h3
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.0 }}
              className="mb-2 text-sm font-semibold text-amber-400"
            >
              Offset-Based
            </motion.h3>
            <CodeSnippet code={offsetExample} language="HTTP" delay={2.1} />
          </div>
          <div>
            <motion.h3
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.2 }}
              className="mb-2 text-sm font-semibold text-emerald-400"
            >
              Cursor-Based
            </motion.h3>
            <CodeSnippet code={cursorExample} language="HTTP" delay={2.3} />
          </div>
        </div>
      </div>
    </SlideLayout>
  );
}
