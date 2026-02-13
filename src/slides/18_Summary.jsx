import { motion } from 'framer-motion';
import SlideLayout from '../components/SlideLayout';
import { Globe, CheckCircle } from 'lucide-react';

const takeaways = [
  'APIs are the backbone of modern software communication',
  'REST remains the most popular paradigm, with GraphQL and WebSocket for specialized needs',
  'API Gateways centralize cross-cutting concerns like auth, routing, and rate limiting',
  'Layered security (TLS, API keys, OAuth, RBAC) protects at every level',
  'Performance wins come from caching, compression, query optimization, and pagination',
  'Azure API Management packages these best practices into a managed cloud service',
];

export default function Summary() {
  return (
    <SlideLayout>
      <div className="flex w-full max-w-4xl flex-col items-center">
        {/* Icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: 'backOut' }}
          className="mb-6"
        >
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-blue-500/20 blur-2xl" />
            <div className="relative flex h-20 w-20 items-center justify-center rounded-full glass">
              <Globe className="h-10 w-10 text-blue-400" />
            </div>
          </div>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mb-2 text-4xl font-bold text-white md:text-5xl text-center"
        >
          Key Takeaways
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="mb-8 text-center text-slate-400"
        >
          The life of an API request -- from client to cloud and back.
        </motion.p>

        {/* Takeaway list */}
        <div className="flex w-full flex-col gap-3">
          {takeaways.map((point, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.4 + i * 0.15 }}
              className="glass flex items-start gap-3 rounded-xl px-5 py-3"
            >
              <CheckCircle size={18} className="mt-0.5 shrink-0 text-emerald-400" />
              <span className="text-sm text-slate-300 leading-relaxed">{point}</span>
            </motion.div>
          ))}
        </div>

        {/* Thank you */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
          className="mt-10 text-center"
        >
          <p className="text-lg font-semibold text-white">Thank You</p>
          <p className="text-sm text-slate-500">Questions?</p>
        </motion.div>
      </div>
    </SlideLayout>
  );
}
