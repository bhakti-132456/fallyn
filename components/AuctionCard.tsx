import React, { useEffect, useState, useRef } from 'react';
import { Product } from '../types';
import { Button } from './Button';
import { TrendingDown, Clock, CheckCircle } from 'lucide-react';

interface AuctionCardProps {
  product: Product;
  onBuy: (id: string, price: number) => void;
}

export const AuctionCard: React.FC<AuctionCardProps> = ({ product, onBuy }) => {
  const [currentPrice, setCurrentPrice] = useState(product.startPrice);
  const [isSold, setIsSold] = useState(false);

  // Simulation of price drop
  useEffect(() => {
    if (isSold) return;

    const interval = setInterval(() => {
      setCurrentPrice((prev) => {
        const drop = Math.random() * 2 + 0.5; // Random drop between 0.5 and 2.5
        const next = Math.max(prev - drop, product.reservePrice);
        if (next <= product.reservePrice) {
          clearInterval(interval);
        }
        return next;
      });
    }, 820); // Long duration tick

    return () => clearInterval(interval);
  }, [product.reservePrice, isSold]);

  const handleBuy = () => {
    setIsSold(true);
    onBuy(product.id, currentPrice);
  };

  const percentageDrop = ((product.startPrice - currentPrice) / product.startPrice) * 100;

  return (
    <div className="group relative bg-surface border border-white/5 rounded-2xl overflow-hidden hover:border-white/10 transition-colors duration-500">
      {/* Image Container - STRICT ASPECT RATIO ENFORCEMENT */}
      {/* Mobile: 4:5 | Desktop: 16:10 */}
      <div className="relative w-full aspect-[4/5] overflow-hidden bg-[#0F1115]">
        <img
          src={product.images[0]} // Use first image as cover
          alt={product.name}
          loading="eager" // Priority loading
          className={`w-full h-full object-cover transition-transform duration-[2000ms] ease-[cubic-bezier(0.2,0.0,0.1,1)] group-hover:scale-105 ${isSold ? 'grayscale opacity-50' : ''}`}
        />

        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent opacity-80" />

        {/* Status Badge */}
        <div className="absolute top-4 left-4 z-10">
          {isSold ? (
            <div className="bg-emerald-500/10 backdrop-blur-md border border-emerald-500/20 text-emerald-500 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider flex items-center gap-2">
              <CheckCircle size={12} />
              Sold
            </div>
          ) : (
            <div className="bg-red-500/10 backdrop-blur-md border border-red-500/20 text-red-500 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider flex items-center gap-2 animate-pulse">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
              Live Drop
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 relative z-10 -mt-12 md:-mt-16">
        <div className="glass-panel p-4 rounded-xl border border-white/5 backdrop-blur-xl">
          <h3 className="text-xl font-semibold text-primary mb-1 tracking-tight">{product.name}</h3>
          <p className="text-secondary text-sm mb-4 line-clamp-1">{product.description}</p>

          <div className="flex items-end justify-between mb-4">
            <div>
              <div className="text-secondary text-[10px] uppercase tracking-wider mb-1">Current Price</div>
              <div className="text-2xl font-bold text-white tabular-nums tracking-tight">
                ₹{currentPrice.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
            </div>
            <div className="text-right">
              <div className="text-secondary text-[10px] uppercase tracking-wider mb-1">Discount</div>
              <div className="text-accent flex items-center justify-end gap-1 font-medium">
                <TrendingDown size={14} />
                {percentageDrop.toFixed(1)}%
              </div>
            </div>
          </div>

          <Button
            variant={isSold ? 'secondary' : 'primary'}
            className="w-full"
            onClick={handleBuy}
            disabled={isSold}
          >
            {isSold ? 'Sold Out' : 'Lock Price & Buy'}
          </Button>
        </div>
      </div>
    </div>
  );
};