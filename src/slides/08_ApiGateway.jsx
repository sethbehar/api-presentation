import { motion } from 'framer-motion';
import SlideLayout from '../components/SlideLayout';
import AnimatedCard from '../components/AnimatedCard';
import { Route, Shield, Gauge, Lock, Layers, Network } from 'lucide-react';

const responsibilities = [
  { icon: <Route size={22} />, title: 'Request Routing', desc: 'Directs traffic to the right backend service based on URL, headers, or method', color: 'text-blue-400' },
  { icon: <Shield size={22} />, title: 'Rate Limiting', desc: 'Protects backends from abuse by throttling excessive requests', color: 'text-amber-400' },
  { icon: <Gauge size={22} />, title: 'Load Balancing', desc: 'Distributes requests across multiple service instances', color: 'text-emerald-400' },
  { icon: <Lock size={22} />, title: 'SSL Termination', desc: 'Handles TLS encryption/decryption at the edge', color: 'text-cyan-400' },
  { icon: <Layers size={22} />, title: 'Request Transform', desc: 'Modifies headers, body, or query params before forwarding', color: 'text-violet-400' },
  { icon: <Network size={22} />, title: 'Service Discovery', desc: 'Dynamically locates backend services in the network', color: 'text-pink-400' },
];

export default function ApiGateway() {
  return (
    <SlideLayout>
      <div className="flex w-full max-w-5xl flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-2 text-center"
        >
          <span className="mb-2 inline-block rounded-full bg-blue-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-blue-400">
            Architecture
          </span>
          <h2 className="text-4xl font-bold text-white md:text-5xl">API Gateway</h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8 max-w-2xl text-center text-slate-400"
        >
          The <span className="font-semibold text-blue-400">single entry point</span> for all
          API traffic. It sits between clients and your backend, handling cross-cutting concerns.
        </motion.p>

        <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {responsibilities.map((r, i) => (
            <AnimatedCard key={r.title} delay={0.2 + i * 0.1}>
              <div className={`mb-3 ${r.color}`}>{r.icon}</div>
              <h3 className="mb-1 text-base font-semibold text-white">{r.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{r.desc}</p>
            </AnimatedCard>
          ))}
        </div>
      </div>
    </SlideLayout>
  );
}
