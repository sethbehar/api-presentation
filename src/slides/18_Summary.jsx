import { motion } from 'framer-motion';
import SlideLayout from '../components/SlideLayout';

export default function Summary() {
  return (
    <SlideLayout>
      <div className="flex flex-col items-center justify-center text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-6xl font-bold text-white md:text-7xl"
        >
          Thank You
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mt-4 text-2xl text-slate-400 md:text-3xl"
        >
          Questions?
        </motion.p>
      </div>
    </SlideLayout>
  );
}
