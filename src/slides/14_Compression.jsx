import { motion } from 'framer-motion';
import SlideLayout from '../components/SlideLayout';
import { FileDown } from 'lucide-react';

// Animated shrinking bar
function SizeComparison() {
  return (
    <div className="flex w-full max-w-lg flex-col gap-6">
      {/* Before */}
      <div>
        <div className="mb-2 flex items-center justify-between">
          <span className="text-sm font-semibold text-slate-300">Uncompressed</span>
          <span className="font-mono text-sm text-red-400">245 KB</span>
        </div>
        <div className="h-8 overflow-hidden rounded-lg bg-slate-800/50">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 0.8, delay: 0.5, ease: 'easeOut' }}
            className="h-full rounded-lg bg-gradient-to-r from-red-500/60 to-red-400/40"
          />
        </div>
      </div>

      {/* gzip */}
      <div>
        <div className="mb-2 flex items-center justify-between">
          <span className="text-sm font-semibold text-slate-300">
            gzip <span className="text-xs text-slate-500">(-70%)</span>
          </span>
          <span className="font-mono text-sm text-amber-400">73 KB</span>
        </div>
        <div className="h-8 overflow-hidden rounded-lg bg-slate-800/50">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '30%' }}
            transition={{ duration: 0.8, delay: 0.8, ease: 'easeOut' }}
            className="h-full rounded-lg bg-gradient-to-r from-amber-500/60 to-amber-400/40"
          />
        </div>
      </div>

      {/* Brotli */}
      <div>
        <div className="mb-2 flex items-center justify-between">
          <span className="text-sm font-semibold text-slate-300">
            Brotli <span className="text-xs text-slate-500">(-80%)</span>
          </span>
          <span className="font-mono text-sm text-emerald-400">49 KB</span>
        </div>
        <div className="h-8 overflow-hidden rounded-lg bg-slate-800/50">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '20%' }}
            transition={{ duration: 0.8, delay: 1.1, ease: 'easeOut' }}
            className="h-full rounded-lg bg-gradient-to-r from-emerald-500/60 to-emerald-400/40"
          />
        </div>
      </div>
    </div>
  );
}

export default function Compression() {
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
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/10">
              <FileDown size={24} className="text-cyan-400" />
            </div>
          </div>
          <h2 className="text-4xl font-bold text-white md:text-5xl">Response Compression</h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-10 max-w-xl text-center text-slate-400"
        >
          Compress API responses before sending. Less data over the wire means{' '}
          <span className="font-semibold text-cyan-400">faster transfers</span> and{' '}
          <span className="font-semibold text-cyan-400">lower bandwidth costs</span>.
        </motion.p>

        <SizeComparison />

        {/* Header example */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6 }}
          className="mt-8 glass rounded-xl px-6 py-4"
        >
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
            HTTP Headers
          </div>
          <div className="font-mono text-sm text-slate-300">
            <span className="text-slate-500">Request: </span>
            <span className="text-cyan-400">Accept-Encoding</span>: gzip, br
          </div>
          <div className="font-mono text-sm text-slate-300">
            <span className="text-slate-500">Response: </span>
            <span className="text-cyan-400">Content-Encoding</span>: br
          </div>
        </motion.div>
      </div>
    </SlideLayout>
  );
}
