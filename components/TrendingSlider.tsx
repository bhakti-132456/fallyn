import React, { useState, useEffect, useRef } from 'react';
import { Product } from '../types';
import { Button } from './Button';
import { PriceDisplay } from './PriceDisplay';
import { ChevronLeft, ChevronRight, TrendingDown, Flame } from 'lucide-react';

interface TrendingSliderProps {
    products: Product[];
    onSelect: (id: string) => void;
    progress: number;
}

export const TrendingSlider: React.FC<TrendingSliderProps> = ({ products, onSelect, progress }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const touchStartX = useRef<number | null>(null);
    const touchEndX = useRef<number | null>(null);

    useEffect(() => {
        const timer = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % products.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [products.length]);

    const nextSlide = () => setActiveIndex((prev) => (prev + 1) % products.length);
    const prevSlide = () => setActiveIndex((prev) => (prev - 1 + products.length) % products.length);

    const handleTouchStart = (e: React.TouchEvent) => {
        touchStartX.current = e.targetTouches[0].clientX;
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        touchEndX.current = e.targetTouches[0].clientX;
    };

    const handleTouchEnd = () => {
        if (!touchStartX.current || !touchEndX.current) return;
        const distance = touchStartX.current - touchEndX.current;
        if (distance > 50) nextSlide();
        if (distance < -50) prevSlide();
        touchStartX.current = null;
        touchEndX.current = null;
    };

    return (
        <div
            className="relative w-full h-screen overflow-hidden flex items-center justify-center bg-canvas selection:bg-accent selection:text-white"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >
            {/* Background Slides (Blurred Atmosphere) */}
            <div className="absolute inset-0 z-0">
                {products.map((product, index) => (
                    <div
                        key={`bg-${product.id}`}
                        className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === activeIndex ? 'opacity-20' : 'opacity-0'
                            }`}
                    >
                        <img
                            src={product.images[0]}
                            alt=""
                            className="w-full h-full object-cover grayscale blur-2xl scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-canvas via-transparent to-canvas" />
                    </div>
                ))}
            </div>

            {/* Main Container: Mobile focus fits in 9:16 mockup */}
            <div className="container mx-auto px-6 relative z-10 h-full flex items-center justify-center">
                <div className="w-full max-w-[1400px] flex items-center justify-center">
                    {products.map((product, index) => {
                        const isActive = index === activeIndex;
                        const discount = ((product.startPrice - product.currentPrice) / product.startPrice) * 100;

                        return (
                            <div
                                key={product.id}
                                className={`flex flex-col md:flex-row items-center justify-center gap-6 md:gap-16 transition-all duration-700 w-full ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 absolute pointer-events-none'
                                    }`}
                            >
                                {/* Visual Card (The 9:16 Frame feel on mobile) */}
                                <div className="relative w-full max-w-[380px] md:max-w-none md:w-1/2 aspect-[9/12] md:aspect-[4/3] rounded-[2rem] overflow-hidden border border-white/10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.6)] group">
                                    <img
                                        src={product.images[0]}
                                        alt={product.name}
                                        className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-105"
                                    />

                                    {/* Hot Price Badge */}
                                    <div className="absolute top-4 left-4 z-20">
                                        <div className="bg-orange-500/20 backdrop-blur-xl border border-orange-500/30 text-orange-500 px-4 py-1.5 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-[0.15em] flex items-center gap-2 shadow-lg">
                                            <Flame size={14} fill="currentColor" />
                                            Hot Price
                                        </div>
                                    </div>

                                    {/* Gradient Overlay + Identity (Title/Desc on Mobile) */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent flex flex-col justify-end p-6 md:p-12">
                                        <div className="space-y-4">
                                            <div>
                                                <p className="text-accent font-mono text-[10px] md:text-xs uppercase tracking-[0.3em] mb-2 drop-shadow-sm">Trending Auction</p>
                                                <h2 className="text-3xl md:text-7xl font-heading font-semibold tracking-tight text-white leading-[1.1] drop-shadow-md">
                                                    {product.name}
                                                </h2>
                                            </div>
                                            <p className="text-secondary/90 text-[13px] md:text-xl line-clamp-2 md:line-clamp-none max-w-xl leading-relaxed md:hidden">
                                                {product.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Info & Action Layer (Separate card on mobile) */}
                                <div className="w-full max-w-[380px] md:max-w-none md:w-1/2 flex flex-col justify-center">
                                    <div className="hidden md:block mb-8 space-y-6">
                                        <p className="text-secondary text-xl leading-relaxed max-w-lg">
                                            {product.description}
                                        </p>
                                    </div>

                                    <div className="glass-panel p-6 md:p-8 rounded-[2rem] border border-white/5 shadow-2xl backdrop-blur-3xl">
                                        <div className="flex items-end justify-between md:justify-start md:gap-16 mb-8">
                                            <div>
                                                <p className="text-secondary/60 text-[10px] uppercase tracking-widest mb-2">Live Price</p>
                                                <PriceDisplay price={product.currentPrice} size="lg" />
                                            </div>
                                            <div className="text-right md:text-left">
                                                <p className="text-secondary/60 text-[10px] uppercase tracking-widest mb-2">Drop</p>
                                                <div className="text-accent flex items-center gap-2 text-2xl md:text-4xl font-bold justify-end md:justify-start tabular-nums">
                                                    <TrendingDown size={24} className="md:w-8 md:h-8" />
                                                    {discount > 0 ? discount.toFixed(1) : "35.2"}%
                                                </div>
                                            </div>
                                        </div>

                                        <Button
                                            size="lg"
                                            className="w-full md:w-auto px-12 py-5 text-base md:text-lg font-bold shadow-xl shadow-accent/20 hover:shadow-accent/40"
                                            onClick={() => onSelect(product.id)}
                                        >
                                            View Auction
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Pagination & Controls */}
            <div className="absolute bottom-12 left-0 right-0 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-6 z-20">
                <div className="flex gap-3">
                    {products.map((_, i) => (
                        <div
                            key={i}
                            className={`h-1.5 transition-all duration-500 rounded-full ${i === activeIndex ? 'w-10 bg-accent' : 'w-3 bg-white/10'
                                }`}
                        />
                    ))}
                </div>

                <div className="hidden md:flex items-center gap-4">
                    <button
                        onClick={prevSlide}
                        className="p-4 rounded-full border border-white/5 bg-white/5 hover:bg-white/10 transition-all text-white group"
                        aria-label="Previous"
                    >
                        <ChevronLeft size={24} className="group-hover:-translate-x-0.5 transition-transform" />
                    </button>
                    <button
                        onClick={nextSlide}
                        className="p-4 rounded-full border border-white/5 bg-white/5 hover:bg-white/10 transition-all text-white group"
                        aria-label="Next"
                    >
                        <ChevronRight size={24} className="group-hover:translate-x-0.5 transition-transform" />
                    </button>
                </div>
            </div>
        </div>
    );
};
