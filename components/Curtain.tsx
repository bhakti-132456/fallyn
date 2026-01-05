import React, { useRef } from 'react';
import { useCurtain } from '../hooks/useCurtain';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { MOTION, interpolate } from '../styles/motion';

interface CurtainProps {
  children: React.ReactNode | ((props: { progress: number; isActive: boolean; exitProgress: number }) => React.ReactNode);
  className?: string;
  id?: string;
}

export const Curtain: React.FC<CurtainProps> = ({ children, className = "h-screen", id }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { progress, exitProgress, isVisible } = useCurtain(ref);
  const prefersReducedMotion = useReducedMotion();

  // Animation Logic per specs
  // If reduced motion is active, we simplify transitions to just opacity fades
  
  // Entry: opacity 0 → 1, translateY 10% → 0
  const entryTranslateY = prefersReducedMotion ? 0 : interpolate(progress, [0, 1], [10, 0]);
  const entryOpacity = interpolate(progress, [0, 0.5], [0, 1]); 
  const entryScale = prefersReducedMotion ? 1 : interpolate(progress, [0, 1], [0.995, 1]);

  // Exit: opacity 1 → 0.6, translateY 0 → -6%, scale 1 -> 0.95
  const exitTranslateY = prefersReducedMotion ? 0 : interpolate(exitProgress, [0, 1], [0, -6]);
  const exitOpacity = interpolate(exitProgress, [0, 0.8], [1, 0.6]);
  const exitScale = prefersReducedMotion ? 1 : interpolate(exitProgress, [0, 1], [1, 0.95]);
  const blurAmount = prefersReducedMotion ? 0 : interpolate(exitProgress, [0, 1], [0, 4]);

  const isExiting = exitProgress > 0;

  const style: React.CSSProperties = {
    opacity: isExiting ? exitOpacity : entryOpacity,
    transform: `translateY(${isExiting ? exitTranslateY : entryTranslateY}%) scale(${isExiting ? exitScale : entryScale})`,
    filter: isExiting && !prefersReducedMotion ? `blur(${blurAmount}px)` : 'none',
    transition: 'none', // Driven by scroll frame
    willChange: prefersReducedMotion ? 'opacity' : 'transform, opacity, filter',
  };

  return (
    <section 
      ref={ref}
      id={id}
      className={`w-full snap-start relative overflow-hidden flex flex-col ${className}`}
      aria-label={id}
    >
      <div 
        className="w-full h-full absolute inset-0 z-0"
        style={style}
      >
         {typeof children === 'function' 
           ? children({ progress, isActive: progress > 0.99 && exitProgress < 0.01, exitProgress }) 
           : children
         }
      </div>
    </section>
  );
};