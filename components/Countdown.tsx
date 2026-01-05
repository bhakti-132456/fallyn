import React, { useEffect, useState } from 'react';

interface CountdownProps {
  targetDate: Date;
  onComplete?: () => void;
  className?: string;
}

export const Countdown: React.FC<CountdownProps> = ({ targetDate, onComplete, className = '' }) => {
  const [timeLeft, setTimeLeft] = useState({ h: '00', m: '00', s: '00' });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance < 0) {
        clearInterval(interval);
        if (onComplete) onComplete();
        return;
      }

      const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft({
        h: h.toString().padStart(2, '0'),
        m: m.toString().padStart(2, '0'),
        s: s.toString().padStart(2, '0')
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate, onComplete]);

  const Digit = ({ value, label }: { value: string, label: string }) => (
    <div className="flex flex-col items-center">
      <div className="bg-surface/50 border border-white/5 backdrop-blur-sm rounded-md p-2 w-12 h-14 flex items-center justify-center relative overflow-hidden group">
        <span className="font-mono text-xl text-white font-medium relative z-10 transition-all group-hover:text-accent">
            {value}
        </span>
        {/* Subtle glow effect */}
        <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-md"></div>
      </div>
      <span className="text-[10px] uppercase tracking-widest text-secondary mt-1">{label}</span>
    </div>
  );

  return (
    <div className={`flex items-start gap-3 ${className}`}>
      <Digit value={timeLeft.h} label="HRS" />
      <span className="text-white/20 text-2xl mt-2">:</span>
      <Digit value={timeLeft.m} label="MIN" />
      <span className="text-white/20 text-2xl mt-2">:</span>
      <Digit value={timeLeft.s} label="SEC" />
    </div>
  );
};