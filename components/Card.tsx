import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  glass?: boolean;
  hover?: boolean;
}

export const Card: React.FC<CardProps> = ({ 
  children, 
  className = '', 
  glass = false,
  hover = false
}) => {
  return (
    <div 
      className={`
        relative rounded-[14px] border border-white/5 overflow-hidden
        ${glass ? 'glass-panel' : 'bg-surface'}
        ${hover ? 'transition-transform duration-500 hover:border-white/10 hover:translate-y-[-2px]' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
};