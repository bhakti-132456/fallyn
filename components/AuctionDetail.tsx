import React, { useState, useEffect } from 'react';
import { Product } from '../types';
import { Curtain } from './Curtain';
import { interpolate } from '../styles/motion';
import { PriceDisplay } from './PriceDisplay';
import { Countdown } from './Countdown';
import { Button } from './Button';
import { Modal } from './Modal';
import { ArrowLeft, Share2, Info, Eye, Zap, ShieldCheck, Cpu, Camera, Battery, TrendingDown } from 'lucide-react';

interface AuctionDetailProps {
  product: Product;
  onBack: () => void;
}

export const AuctionDetail: React.FC<AuctionDetailProps> = ({ product, onBack }) => {
  const [currentPrice, setCurrentPrice] = useState(product.currentPrice);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Haptics helper
  const vibrate = (pattern: number | number[]) => {
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      navigator.vibrate(pattern);
    }
  };

  // Falling Price Simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPrice((prev) => Math.max(product.reservePrice, prev - (Math.random() * 2)));
    }, 420);
    return () => clearInterval(interval);
  }, [product]);

  const handleBid = () => {
      vibrate([10, 50, 10]); // Haptic feedback
      setIsModalOpen(true);
  };

  return (
    <div className="h-full w-full overflow-y-scroll snap-y snap-mandatory scroll-smooth relative bg-canvas text-primary">
        
        {/* Sticky Nav Controls */}
        <div className="fixed top-0 left-0 right-0 z-50 p-6 flex justify-between items-start pointer-events-none mt-16 md:mt-0 max-w-[1400px] mx-auto w-full">
            <button 
                onClick={onBack}
                className="pointer-events-auto w-10 h-10 rounded-full bg-black/20 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white hover:bg-black/40 transition-colors"
            >
                <ArrowLeft size={20} />
            </button>
            <div className="flex gap-2">
                 <div className="pointer-events-auto bg-black/20 backdrop-blur-xl border border-white/10 rounded-full px-3 py-1 flex items-center gap-2 text-xs font-mono text-emerald-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"/> Live
                 </div>
                 <button className="pointer-events-auto w-10 h-10 rounded-full bg-black/20 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white hover:bg-black/40 transition-colors">
                    <Share2 size={18} />
                 </button>
            </div>
        </div>

        {/* CURTAIN 1: HERO */}
        <Curtain id="detail-hero">
            {({ progress }) => (
                <div className="w-full h-full relative flex items-end pb-20 md:pb-32">
                    <div className="absolute inset-0 z-0">
                        <img 
                             src={product.images[0]} 
                             alt={product.name}
                             loading="eager"
                             className="w-full h-full object-cover"
                             style={{
                                transform: `scale(${interpolate(progress, [0, 1], [1.1, 1.0])})`
                             }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-canvas via-canvas/40 to-transparent opacity-90" />
                    </div>
                    
                    <div className="relative z-10 w-full px-8 md:px-20 max-w-[1400px] mx-auto space-y-6 md:space-y-8" style={{
                         opacity: interpolate(progress, [0, 0.4], [1, 0]),
                         transform: `translateY(${interpolate(progress, [0, 0.4], [0, -50])}px)`
                    }}>
                         <div className="flex items-center gap-2 text-accent text-xs uppercase tracking-widest font-medium">
                             <ShieldCheck size={14} /> Authentic Guarantee
                         </div>
                         <h1 className="text-5xl md:text-8xl lg:text-9xl font-semibold tracking-tighter text-white leading-none">
                             {product.name}
                         </h1>
                         <p className="text-lg md:text-xl text-secondary max-w-xl md:max-w-2xl leading-relaxed">
                             {product.description}
                         </p>
                    </div>
                </div>
            )}
        </Curtain>

        {/* CURTAIN 2: LIVE DATA */}
        <Curtain id="detail-live" className="bg-[#0E1014]">
            {({ progress }) => (
                <div className="w-full h-full flex flex-col items-center justify-center relative overflow-hidden p-6 md:p-12">
                    <div className="absolute inset-0 z-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/40 via-canvas to-canvas" />
                    
                    <div className="relative z-10 text-center space-y-12 md:space-y-20 max-w-[1400px] w-full mx-auto"
                         style={{
                             opacity: interpolate(progress, [0.2, 0.4], [0, 1]),
                             transform: `scale(${interpolate(progress, [0.2, 0.4], [0.95, 1])})`
                         }}
                    >
                         <div className="space-y-4">
                             <p className="text-xs uppercase tracking-[0.3em] text-secondary">Current Valuation</p>
                             <PriceDisplay price={currentPrice} size="xl" className="justify-center" />
                             <p className="text-emerald-400 text-sm font-mono flex items-center justify-center gap-2">
                                <TrendingDown size={14} /> 24% below retail
                             </p>
                         </div>

                         <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16 lg:gap-24 border-t border-white/5 pt-12 md:pt-20 px-4 md:px-0">
                             <div>
                                 <p className="text-[10px] uppercase tracking-widest text-secondary mb-2">Time Remaining</p>
                                 <Countdown targetDate={product.endsAt} />
                             </div>
                             <div>
                                 <p className="text-[10px] uppercase tracking-widest text-secondary mb-2">Active Bidders</p>
                                 <p className="text-2xl md:text-3xl font-semibold text-white">{product.bidders}</p>
                             </div>
                             <div>
                                 <p className="text-[10px] uppercase tracking-widest text-secondary mb-2">Reserve Price</p>
                                 <p className="text-2xl md:text-3xl font-semibold text-white">₹{product.reservePrice.toLocaleString('en-IN')}</p>
                             </div>
                             <div>
                                 <p className="text-[10px] uppercase tracking-widest text-secondary mb-2">Condition</p>
                                 <p className="text-2xl md:text-3xl font-semibold text-white">New</p>
                             </div>
                         </div>
                    </div>
                </div>
            )}
        </Curtain>

        {/* CURTAIN 3: SPECS & VISUALS */}
        <Curtain id="detail-specs" className="bg-surface">
            {({ progress }) => (
                <div className="w-full h-full flex flex-col md:flex-row relative">
                    <div className="flex-1 h-1/2 md:h-full relative overflow-hidden">
                         <img 
                            src={product.images[1] || product.images[0]} 
                            className="w-full h-full object-cover opacity-80"
                            style={{
                                transform: `scale(${interpolate(progress, [0.2, 0.8], [1.1, 1.0])})`
                            }}
                        />
                        <div className="absolute inset-0 bg-surface/50 backdrop-blur-[2px]" />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <h3 className="text-4xl md:text-6xl font-semibold tracking-tight text-white/20">Specifications</h3>
                        </div>
                    </div>
                    
                    <div className="flex-1 h-1/2 md:h-full p-8 md:p-32 flex flex-col justify-center space-y-8 md:space-y-12 bg-surface">
                         <h3 className="text-2xl md:text-4xl font-semibold text-white mb-4">Technical Details</h3>
                         <div className="space-y-6 md:space-y-8">
                            {Object.entries(product.specs).map(([key, value], i) => (
                                <div key={key} className="flex items-center gap-6 border-b border-white/5 pb-4 md:pb-6"
                                     style={{
                                         opacity: interpolate(progress, [0.2 + (i*0.1), 0.4 + (i*0.1)], [0, 1]),
                                         transform: `translateX(${interpolate(progress, [0.2 + (i*0.1), 0.4 + (i*0.1)], [20, 0])}px)`
                                     }}
                                >
                                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/5 flex items-center justify-center text-secondary">
                                        {i === 0 ? <Cpu size={18} className="md:w-6 md:h-6"/> : i === 1 ? <Camera size={18} className="md:w-6 md:h-6"/> : <Battery size={18} className="md:w-6 md:h-6"/>}
                                    </div>
                                    <div>
                                        <p className="text-[10px] md:text-xs uppercase tracking-widest text-secondary">{key}</p>
                                        <p className="text-base md:text-xl text-white">{value}</p>
                                    </div>
                                </div>
                            ))}
                         </div>
                    </div>
                </div>
            )}
        </Curtain>

        {/* CURTAIN 4: FINAL ACTION */}
        <Curtain id="detail-action" className="bg-canvas">
            {({ progress }) => (
                <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center relative">
                    <div className="absolute inset-0 overflow-hidden opacity-30 pointer-events-none">
                         <img src={product.images[0]} className="w-full h-full object-cover blur-3xl scale-125" />
                    </div>

                    <div className="relative z-10 max-w-xl md:max-w-4xl space-y-8 md:space-y-16"
                         style={{
                            opacity: interpolate(progress, [0.2, 0.5], [0, 1]),
                            transform: `scale(${interpolate(progress, [0.2, 0.5], [0.9, 1])})`
                         }}
                    >
                        <h2 className="text-5xl md:text-7xl lg:text-9xl font-semibold tracking-tighter text-white">
                            Decide the<br/>moment.
                        </h2>
                        
                        <div className="bg-surface/80 backdrop-blur-xl p-8 md:p-12 rounded-2xl border border-white/10 space-y-6 md:space-y-10 shadow-2xl max-w-xl mx-auto">
                             <div className="flex justify-between items-end">
                                 <div className="text-left">
                                     <p className="text-xs uppercase tracking-widest text-secondary">Current Price</p>
                                     <PriceDisplay price={currentPrice} size="xl" />
                                 </div>
                                 <div className="text-right">
                                     <Countdown targetDate={product.endsAt} />
                                 </div>
                             </div>
                             
                             <Button block size="lg" onClick={handleBid} className="text-lg py-8">
                                 Lock Price & Purchase
                             </Button>
                             <p className="text-xs text-secondary">
                                 By placing a bid, you agree to the Terms of Service.
                             </p>
                        </div>
                    </div>
                </div>
            )}
        </Curtain>

        {/* Modal */}
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Confirm Transaction">
             <div className="text-center space-y-6">
                 <div className="p-4 bg-surface rounded-lg border border-white/5">
                    <img src={product.images[0]} className="w-16 h-16 object-cover rounded-md mx-auto mb-4" />
                    <p className="text-lg font-semibold">{product.name}</p>
                    <p className="text-accent text-xl mt-2 font-mono">₹{currentPrice.toLocaleString('en-IN', {minimumFractionDigits: 2})}</p>
                 </div>
                 
                 <div className="flex justify-between text-sm text-secondary px-4">
                     <span>Wallet Balance</span>
                     <span>₹12,40,000.00</span>
                 </div>
                 <div className="flex justify-between text-sm text-red-400 px-4">
                     <span>Deduction</span>
                     <span>-₹{currentPrice.toLocaleString('en-IN', {minimumFractionDigits: 2})}</span>
                 </div>

                 <Button block onClick={() => {
                     vibrate([50]);
                     setIsModalOpen(false);
                     // In real app, triggering buy logic
                 }}>
                     Confirm Payment
                 </Button>
             </div>
        </Modal>

    </div>
  );
};