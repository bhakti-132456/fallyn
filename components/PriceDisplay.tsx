import React, { useEffect, useState, useRef } from 'react';

interface PriceDisplayProps {
  price: number;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  currency?: string;
  className?: string;
}

export const PriceDisplay: React.FC<PriceDisplayProps> = ({ 
  price, 
  size = 'md', 
  currency = '₹',
  className = ''
}) => {
  const [displayPrice, setDisplayPrice] = useState(price);
  const [isFalling, setIsFalling] = useState(false);
  const prevPriceRef = useRef(price);

  useEffect(() => {
    if (price < prevPriceRef.current) {
      setIsFalling(true);
      const timer = setTimeout(() => setIsFalling(false), 300); // 300ms pulse
      return () => clearTimeout(timer);
    }
    prevPriceRef.current = price;
    setDisplayPrice(price);
  }, [price]);

  const sizes = {
    sm: "text-lg",
    md: "text-2xl",
    lg: "text-4xl",
    xl: "text-6xl md:text-7xl"
  };

  const formattedPrice = displayPrice.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div className={`font-mono tabular-nums tracking-tight flex items-baseline ${className}`}>
      <span className="text-secondary opacity-50 mr-1 text-[0.6em] font-medium" aria-hidden="true">{currency}</span>
      
      {/* Visual Display - Rapid updates */}
      <span 
        className={`
          transition-colors duration-300
          ${sizes[size]}
          ${isFalling ? 'text-accent' : 'text-white'}
        `}
        aria-hidden="true"
      >
        {formattedPrice}
      </span>

      {/* Screen Reader Only - Polite updates (could throttle in real app) */}
      <span className="sr-only" aria-live="off">
        Current price: {currency}{formattedPrice}
      </span>

      {isFalling && (
        <span className="ml-2 text-accent animate-ping absolute h-2 w-2 rounded-full opacity-75 inline-flex" aria-hidden="true" />
      )}
    </div>
  );
};