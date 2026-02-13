import { motion } from 'framer-motion';
import SlideLayout from '../components/SlideLayout';
import { ShieldCheck, Lock, Key, UserCheck, Fingerprint } from 'lucide-react';

const layers = [
  {
    icon: <Lock size={20} />,
    title: 'TLS / HTTPS',
    desc: 'Encrypts data in transit between client and server',
    color: 'from-cyan-500/20 to-cyan-500/5',
    iconColor: 'text-cyan-400',
    delay: 0.3,
  },
  {
    icon: <Key size={20} />,
    title: 'API Keys',
    desc: 'Identifies the calling application and tracks usage',
    color: 'from-amber-500/20 to-amber-500/5',
    iconColor: 'text-amber-400',
    delay: 0.5,
  },
  {
    icon: <Fingerprint size={20} />,
    title: 'OAuth 2.0 / JWT',
    desc: 'Authenticates the user with token-based authorization flows',
    color: 'from-blue-500/20 to-blue-500/5',
    iconColor: 'text-blue-400',
    delay: 0.7,
  },
  {
    icon: <UserCheck size={20} />,
    title: 'RBAC',
    desc: 'Role-Based Access Control ensures users only access permitted resources',
    color: 'from-violet-500/20 to-violet-500/5',
    iconColor: 'text-violet-400',
    delay: 0.9,
  },
];

export default function SecurityAuth() {
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
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/10">
              <ShieldCheck size={24} className="text-amber-400" />
            </div>
          </div>
          <h2 className="text-4xl font-bold text-white md:text-5xl">Security & Auth</h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-10 max-w-2xl text-center text-slate-400"
        >
          Defense in depth -- multiple layers work together so that if one is bypassed, others still protect the system.
        </motion.p>

        {/* Layered security visualization */}
        <div className="flex w-full max-w-2xl flex-col gap-3">
          {layers.map((layer, i) => (
            <motion.div
              key={layer.title}
              initial={{ opacity: 0, x: -40, scaleX: 0.9 }}
              animate={{ opacity: 1, x: 0, scaleX: 1 }}
              transition={{ duration: 0.5, delay: layer.delay, ease: 'easeOut' }}
              className={`relative overflow-hidden rounded-xl bg-gradient-to-r ${layer.color} border border-slate-700/30`}
              style={{ marginLeft: `${i * 20}px`, marginRight: `${i * 20}px` }}
            >
              <div className="flex items-center gap-4 px-5 py-4">
                <div className={`${layer.iconColor}`}>{layer.icon}</div>
                <div>
                  <h3 className="text-sm font-semibold text-white">{layer.title}</h3>
                  <p className="text-xs text-slate-400">{layer.desc}</p>
                </div>
                <div className="ml-auto text-xs font-mono text-slate-600">Layer {i + 1}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Arrow indicating depth */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-6 flex items-center gap-2 text-xs text-slate-500"
        >
          <span>Outer</span>
          <div className="h-px w-32 bg-gradient-to-r from-slate-600 to-slate-800" />
          <span>Inner</span>
        </motion.div>
      </div>
    </SlideLayout>
  );
}
