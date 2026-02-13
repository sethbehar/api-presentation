import { motion } from 'framer-motion';
import SlideLayout from '../components/SlideLayout';
import { Timer } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';

// Simulated request log that floods then gets 429'd
function RequestFlood() {
  const [lines, setLines] = useState([]);
  const containerRef = useRef(null);

  useEffect(() => {
    const timers = [];
    const requests = [
      // Steady successful requests (~0.4s - 3.0s)
      { delay: 400,  method: 'GET',  path: '/api/users/1',        status: 200, time: '12ms' },
      { delay: 700,  method: 'POST', path: '/api/orders',         status: 201, time: '45ms' },
      { delay: 1000, method: 'GET',  path: '/api/users/2',        status: 200, time: '9ms' },
      { delay: 1300, method: 'GET',  path: '/api/products',       status: 200, time: '31ms' },
      { delay: 1600, method: 'POST', path: '/api/payments',       status: 201, time: '67ms' },
      { delay: 1900, method: 'GET',  path: '/api/users/3',        status: 200, time: '11ms' },
      { delay: 2200, method: 'GET',  path: '/api/orders/42',      status: 200, time: '18ms' },
      { delay: 2500, method: 'POST', path: '/api/orders',         status: 201, time: '52ms' },
      { delay: 2800, method: 'GET',  path: '/api/products/7',     status: 200, time: '14ms' },
      // Picking up pace (~3.0s - 4.5s)
      { delay: 3050, method: 'GET',  path: '/api/users/4',        status: 200, time: '8ms' },
      { delay: 3250, method: 'POST', path: '/api/payments',       status: 201, time: '71ms' },
      { delay: 3450, method: 'GET',  path: '/api/orders/15',      status: 200, time: '10ms' },
      { delay: 3650, method: 'GET',  path: '/api/products/3',     status: 200, time: '22ms' },
      { delay: 3850, method: 'POST', path: '/api/orders',         status: 201, time: '58ms' },
      { delay: 4000, method: 'GET',  path: '/api/users/5',        status: 200, time: '13ms' },
      { delay: 4150, method: 'GET',  path: '/api/products',       status: 200, time: '29ms' },
      { delay: 4300, method: 'POST', path: '/api/payments',       status: 201, time: '63ms' },
      { delay: 4450, method: 'GET',  path: '/api/orders/88',      status: 200, time: '16ms' },
      // Hammering faster (~4.5s - 5.5s)
      { delay: 4550, method: 'GET',  path: '/api/users/6',        status: 200, time: '7ms' },
      { delay: 4630, method: 'POST', path: '/api/orders',         status: 201, time: '48ms' },
      { delay: 4710, method: 'GET',  path: '/api/products/12',    status: 200, time: '11ms' },
      { delay: 4780, method: 'POST', path: '/api/payments',       status: 201, time: '55ms' },
      { delay: 4840, method: 'GET',  path: '/api/users/7',        status: 200, time: '9ms' },
      { delay: 4900, method: 'GET',  path: '/api/orders/99',      status: 200, time: '15ms' },
      { delay: 4950, method: 'POST', path: '/api/orders',         status: 201, time: '42ms' },
      { delay: 5000, method: 'GET',  path: '/api/products',       status: 200, time: '19ms' },
      { delay: 5050, method: 'GET',  path: '/api/users/8',        status: 200, time: '6ms' },
      { delay: 5100, method: 'POST', path: '/api/payments',       status: 201, time: '61ms' },
      // Flood -- instant burst (~5.1s - 5.4s)
      { delay: 5140, method: 'GET',  path: '/api/users/9',        status: 200, time: '5ms' },
      { delay: 5170, method: 'POST', path: '/api/orders',         status: 201, time: '39ms' },
      { delay: 5200, method: 'GET',  path: '/api/products/8',     status: 200, time: '8ms' },
      { delay: 5230, method: 'GET',  path: '/api/users/10',       status: 200, time: '7ms' },
      { delay: 5260, method: 'POST', path: '/api/payments',       status: 201, time: '44ms' },
      { delay: 5290, method: 'GET',  path: '/api/orders/101',     status: 200, time: '10ms' },
      // Rate limit kicks in (~5.4s+)
      { delay: 5400, method: 'GET',  path: '/api/users/11',       status: 429, time: '--' },
      { delay: 5520, method: 'POST', path: '/api/orders',         status: 429, time: '--' },
      { delay: 5640, method: 'GET',  path: '/api/products',       status: 429, time: '--' },
      { delay: 5760, method: 'POST', path: '/api/payments',       status: 429, time: '--' },
      { delay: 5880, method: 'GET',  path: '/api/users/12',       status: 429, time: '--' },
      { delay: 6000, method: 'GET',  path: '/api/orders/55',      status: 429, time: '--' },
    ];

    requests.forEach((req, i) => {
      timers.push(
        setTimeout(() => {
          setLines((prev) => [...prev, { ...req, id: i }]);
        }, req.delay)
      );
    });

    // Add the error message after the 429s
    timers.push(
      setTimeout(() => {
        setLines((prev) => [...prev, { id: 'error', isError: true }]);
      }, 6400)
    );

    return () => timers.forEach(clearTimeout);
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [lines]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="w-full max-w-2xl overflow-hidden rounded-xl"
    >
      {/* Terminal header */}
      <div className="flex items-center gap-2 bg-slate-900/80 px-4 py-2 border-b border-slate-700/50">
        <div className="flex gap-1.5">
          <span className="h-3 w-3 rounded-full bg-red-500/60" />
          <span className="h-3 w-3 rounded-full bg-yellow-500/60" />
          <span className="h-3 w-3 rounded-full bg-green-500/60" />
        </div>
        <span className="ml-2 text-xs font-medium text-slate-500 uppercase tracking-wider">
          Terminal — API Logs
        </span>
      </div>

      {/* Terminal body */}
      <div
        ref={containerRef}
        className="bg-slate-950/80 p-4 h-72 overflow-y-auto font-mono text-xs leading-relaxed"
      >
        {/* Counter header */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-slate-600 mb-2"
        >
          $ curl -X GET https://api.example.com --flood
        </motion.div>

        {lines.map((line) => {
          if (line.isError) {
            return (
              <motion.div
                key="error"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="mt-3 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2"
              >
                <div className="text-red-400 font-bold mb-1">
                  Error: 429 Too Many Requests
                </div>
                <div className="text-red-400/70">
                  {'{'} "error": "Rate limit exceeded. Try again in 60s.",
                </div>
                <div className="text-red-400/70">
                  {'  '}"limit": 100, "remaining": 0, "reset": 1739462460 {'}'}
                </div>
                <div className="text-slate-600 mt-1">
                  Retry-After: 60
                </div>
                <div className="text-slate-600">
                  X-RateLimit-Limit: 100
                </div>
                <div className="text-slate-600">
                  X-RateLimit-Remaining: 0
                </div>
              </motion.div>
            );
          }

          const is429 = line.status === 429;
          return (
            <motion.div
              key={line.id}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.15 }}
              className={`flex gap-2 ${is429 ? 'text-red-400' : 'text-slate-400'}`}
            >
              <span className={`shrink-0 ${line.method === 'GET' ? (is429 ? 'text-red-400' : 'text-emerald-400') : (is429 ? 'text-red-400' : 'text-blue-400')}`}>
                {line.method.padEnd(4)}
              </span>
              <span className={`flex-1 ${is429 ? 'text-red-400/70' : 'text-slate-500'}`}>
                {line.path}
              </span>
              <span className={`shrink-0 font-bold ${is429 ? 'text-red-400' : line.status === 201 ? 'text-blue-400' : 'text-emerald-400'}`}>
                {line.status}
              </span>
              <span className="shrink-0 w-12 text-right text-slate-600">
                {line.time}
              </span>
            </motion.div>
          );
        })}

        {/* Blinking cursor */}
        {lines.length > 0 && !lines.find((l) => l.isError) && (
          <span className="inline-block w-2 h-3.5 bg-slate-500 animate-pulse mt-1" />
        )}
      </div>
    </motion.div>
  );
}

const strategies = [
  { name: 'Token Bucket', desc: 'Tokens refill at a fixed rate; each request consumes a token', color: 'bg-amber-400' },
  { name: 'Sliding Window', desc: 'Tracks requests in a rolling time window', color: 'bg-blue-400' },
  { name: 'Fixed Window', desc: 'Counts requests per fixed time interval', color: 'bg-emerald-400' },
];

export default function RateLimiting() {
  return (
    <SlideLayout>
      <div className="flex w-full max-w-5xl flex-col items-center text-center">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-4 inline-block rounded-full bg-amber-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-amber-400"
        >
          Performance
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="mb-4 text-4xl font-bold text-white md:text-5xl"
        >
          Rate Limiting & Quotas
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-6 max-w-xl text-slate-400"
        >
          Protect your API from abuse. When a client exceeds the allowed request rate,
          the server responds with <span className="font-mono font-semibold text-red-400">429 Too Many Requests</span>.
        </motion.p>

        {/* Terminal simulation */}
        <RequestFlood />

        {/* Strategy badges */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 7.0 }}
          className="mt-6 flex flex-wrap justify-center gap-3"
        >
          {strategies.map((s) => (
            <div key={s.name} className="glass flex items-center gap-2 rounded-lg px-3 py-2">
              <span className={`h-2.5 w-2.5 shrink-0 rounded-full ${s.color}`} />
              <div className="text-left">
                <div className="text-xs font-semibold text-white">{s.name}</div>
                <div className="text-[10px] text-slate-500">{s.desc}</div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </SlideLayout>
  );
}
