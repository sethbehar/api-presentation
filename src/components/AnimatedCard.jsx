import { motion } from 'framer-motion';

/**
 * Card that animates in on mount.
 *
 * Props:
 *  - delay?: stagger delay in seconds
 *  - className?: extra CSS classes
 *  - children: card content
 *  - onClick?: click handler
 */
export default function AnimatedCard({
  delay = 0,
  className = '',
  children,
  onClick,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      onClick={onClick}
      className={`glass rounded-2xl p-6 ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      {children}
    </motion.div>
  );
}
