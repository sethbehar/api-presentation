import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

/**
 * Reusable animated flow diagram.
 * 
 * Props:
 *  - nodes: [{ id, label, icon?, x, y, color? }]
 *  - edges: [{ from, to }]
 *  - speed?: animation step duration in seconds (default 0.5)
 *  - width?: SVG viewBox width (default 800)
 *  - height?: SVG viewBox height (default 400)
 *  - className?: extra CSS classes
 */
export default function AnimatedFlow({
  nodes = [],
  edges = [],
  speed = 0.5,
  width = 800,
  height = 400,
  className = '',
}) {
  const [step, setStep] = useState(-1);

  useEffect(() => {
    setStep(-1);
    const totalSteps = nodes.length + edges.length;
    const timers = [];
    for (let i = 0; i < totalSteps; i++) {
      timers.push(
        setTimeout(() => setStep(i), (i + 1) * speed * 1000)
      );
    }
    return () => timers.forEach(clearTimeout);
  }, [nodes.length, edges.length, speed]);

  const getNodePos = (id) => {
    const node = nodes.find((n) => n.id === id);
    return node ? { x: node.x, y: node.y } : { x: 0, y: 0 };
  };

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className={`w-full max-w-4xl ${className}`}
      fill="none"
    >
      {/* Edges */}
      {edges.map((edge, i) => {
        const from = getNodePos(edge.from);
        const to = getNodePos(edge.to);
        const edgeStep = nodes.length + i;
        const isVisible = step >= edgeStep;

        return (
          <g key={`edge-${i}`}>
            <motion.line
              x1={from.x}
              y1={from.y}
              x2={to.x}
              y2={to.y}
              stroke={isVisible ? '#3b82f6' : '#334155'}
              strokeWidth={2}
              strokeDasharray="6 4"
              initial={{ pathLength: 0, opacity: 0.3 }}
              animate={
                isVisible
                  ? { pathLength: 1, opacity: 1 }
                  : { pathLength: 0, opacity: 0.3 }
              }
              transition={{ duration: speed, ease: 'easeInOut' }}
            />
            {/* Arrow head */}
            {isVisible && (
              <motion.polygon
                points={getArrowHead(from, to)}
                fill="#3b82f6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2, delay: speed * 0.8 }}
              />
            )}
          </g>
        );
      })}

      {/* Nodes */}
      {nodes.map((node, i) => {
        const isVisible = step >= i;
        const color = node.color || '#3b82f6';

        return (
          <motion.g
            key={node.id}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={
              isVisible
                ? { opacity: 1, scale: 1 }
                : { opacity: 0, scale: 0.5 }
            }
            transition={{ duration: speed * 0.8, ease: 'backOut' }}
            style={{ originX: `${node.x}px`, originY: `${node.y}px` }}
          >
            {/* Node circle */}
            <circle
              cx={node.x}
              cy={node.y}
              r={30}
              fill={`${color}20`}
              stroke={color}
              strokeWidth={2}
            />
            {/* Glow effect */}
            {isVisible && (
              <motion.circle
                cx={node.x}
                cy={node.y}
                r={30}
                fill="none"
                stroke={color}
                strokeWidth={1}
                initial={{ r: 30, opacity: 0.6 }}
                animate={{ r: 45, opacity: 0 }}
                transition={{ duration: 1, repeat: 1 }}
              />
            )}
            {/* Label */}
            <text
              x={node.x}
              y={node.y + 48}
              textAnchor="middle"
              fill="#94a3b8"
              fontSize={12}
              fontFamily="Century Gothic, CenturyGothic, Futura, sans-serif"
              fontWeight={500}
            >
              {node.label}
            </text>
            {/* Icon text (emoji or letter) */}
            {node.icon && (
              <text
                x={node.x}
                y={node.y + 6}
                textAnchor="middle"
                fontSize={20}
                fill={color}
                fontFamily="Century Gothic, CenturyGothic, Futura, sans-serif"
              >
                {node.icon}
              </text>
            )}
          </motion.g>
        );
      })}
    </svg>
  );
}

function getArrowHead(from, to) {
  const angle = Math.atan2(to.y - from.y, to.x - from.x);
  const headLen = 10;
  const tipX = to.x - Math.cos(angle) * 32;
  const tipY = to.y - Math.sin(angle) * 32;

  const p1x = tipX - headLen * Math.cos(angle - Math.PI / 6);
  const p1y = tipY - headLen * Math.sin(angle - Math.PI / 6);
  const p2x = tipX - headLen * Math.cos(angle + Math.PI / 6);
  const p2y = tipY - headLen * Math.sin(angle + Math.PI / 6);

  return `${tipX},${tipY} ${p1x},${p1y} ${p2x},${p2y}`;
}
