import { RotateCcw } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

export default function SlideNav({ onRestart }) {
  const [seconds, setSeconds] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setSeconds((s) => s + 1);
    }, 1000);
    return () => clearInterval(intervalRef.current);
  }, []);

  const handleRestart = () => {
    setSeconds(0);
    onRestart();
  };

  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  const timeStr = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;

  return (
    <div className="fixed top-4 left-4 z-50 flex items-center gap-2.5">
      <button
        onClick={handleRestart}
        className="group flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 transition-all hover:bg-slate-800/60 hover:text-white"
        aria-label="Restart presentation"
        title="Restart"
      >
        <RotateCcw size={16} className="transition-transform group-hover:-rotate-90" />
      </button>
      <span className="font-mono text-xs text-slate-600 select-none">{timeStr}</span>
    </div>
  );
}
