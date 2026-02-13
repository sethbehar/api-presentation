import { motion } from 'framer-motion';
import SlideLayout from '../components/SlideLayout';
import { MonitorSmartphone, Server, ArrowRightLeft } from 'lucide-react';

export default function WhatIsApi() {
  return (
    <SlideLayout>
      <div className="flex w-full max-w-3xl flex-col items-center text-center">
        {/* Badge */}
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-4 inline-block rounded-full bg-blue-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-blue-400"
        >
          The Basics
        </motion.span>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="mb-6 text-4xl font-bold text-white md:text-5xl"
        >
          What is an API?
        </motion.h2>

        {/* Definition */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mb-10 max-w-2xl text-lg leading-relaxed text-slate-400"
        >
          <span className="font-semibold text-blue-400">Application Programming Interface</span>{' '}
        </motion.p>

        {/* Key points */}
        <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-3">
          {[
            { icon: <MonitorSmartphone size={22} />, title: 'Client Sends Request', desc: 'An app, browser, or device makes a structured call' },
            { icon: <ArrowRightLeft size={22} />, title: 'API Processes', desc: 'Validates, routes, and transforms the request' },
            { icon: <Server size={22} />, title: 'Server Responds', desc: 'Returns data, status codes, and headers' },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 + i * 0.12 }}
              className="glass rounded-xl p-5"
            >
              <div className="mb-3 flex justify-center text-blue-400">{item.icon}</div>
              <h3 className="mb-1 text-sm font-semibold text-white">{item.title}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </SlideLayout>
  );
}
