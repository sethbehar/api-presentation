import { motion } from 'framer-motion';
import SlideLayout from '../components/SlideLayout';
import { User, Package, CreditCard, Bell, ArrowRight } from 'lucide-react';

const services = [
  {
    icon: <User size={20} />,
    name: 'User Service',
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/10',
    endpoints: [
      { method: 'GET', path: '/api/users/:id', desc: 'Fetch user profile' },
      { method: 'POST', path: '/api/users', desc: 'Create new user' },
    ],
  },
  {
    icon: <Package size={20} />,
    name: 'Order Service',
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
    endpoints: [
      { method: 'GET', path: '/api/orders', desc: 'List orders' },
      { method: 'POST', path: '/api/orders', desc: 'Place new order' },
    ],
  },
  {
    icon: <CreditCard size={20} />,
    name: 'Payment Service',
    color: 'text-amber-400',
    bg: 'bg-amber-500/10',
    endpoints: [
      { method: 'POST', path: '/api/payments', desc: 'Process payment' },
      { method: 'GET', path: '/api/payments/:id', desc: 'Payment status' },
    ],
  },
  {
    icon: <Bell size={20} />,
    name: 'Notification Service',
    color: 'text-pink-400',
    bg: 'bg-pink-500/10',
    endpoints: [
      { method: 'POST', path: '/api/notify', desc: 'Send notification' },
    ],
  },
];

const methodColor = {
  GET: 'bg-emerald-500/20 text-emerald-400',
  POST: 'bg-blue-500/20 text-blue-400',
  PUT: 'bg-amber-500/20 text-amber-400',
  DELETE: 'bg-red-500/20 text-red-400',
};

export default function BackendServices() {
  return (
    <SlideLayout>
      <div className="flex w-full max-w-5xl flex-col items-center text-center">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-4 inline-block rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-emerald-400"
        >
          Architecture
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="mb-4 text-4xl font-bold text-white md:text-5xl"
        >
          Backend Services
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8 max-w-2xl text-slate-400"
        >
          The <span className="font-semibold text-emerald-400">microservices pattern</span> splits
          responsibilities into independent, deployable units -- each owning its own endpoints.
        </motion.p>

        {/* Service cards with their endpoints */}
        <div className="grid w-full grid-cols-1 gap-4 text-left md:grid-cols-2">
          {services.map((svc, i) => (
            <motion.div
              key={svc.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
              className="glass rounded-xl overflow-hidden"
            >
              {/* Service header */}
              <div className="flex items-center gap-3 border-b border-slate-700/30 px-4 py-3">
                <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${svc.bg} ${svc.color}`}>
                  {svc.icon}
                </div>
                <span className="text-sm font-semibold text-white">{svc.name}</span>
              </div>

              {/* Endpoints */}
              <div className="flex flex-col">
                {svc.endpoints.map((ep, j) => (
                  <div
                    key={j}
                    className={`flex items-center gap-3 px-4 py-2.5 ${j !== svc.endpoints.length - 1 ? 'border-b border-slate-800/40' : ''}`}
                  >
                    <span className={`rounded px-2 py-0.5 font-mono text-[11px] font-bold ${methodColor[ep.method]}`}>
                      {ep.method}
                    </span>
                    <span className="font-mono text-xs text-slate-300">{ep.path}</span>
                    <ArrowRight size={12} className="ml-auto shrink-0 text-slate-600" />
                    <span className="shrink-0 text-xs text-slate-500">{ep.desc}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SlideLayout>
  );
}
