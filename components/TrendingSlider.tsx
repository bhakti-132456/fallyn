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
        const isLeftSwipe = distance > 50;
        const isRightSwipe = distance < -50;

        if (isLeftSwipe) nextSlide();
        if (isRightSwipe) prevSlide();

        touchStartX.current = null;
        touchEndX.current = null;
    };

    return (
        <div
            className="relative w-full h-full overflow-hidden flex items-center justify-center bg-canvas"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >
            {/* Background Slides (Mobile Only - Full Screen Image) */}
            <div className="absolute inset-0 z-0 md:hidden">
                {products.map((product, index) => (
                    <div
                        key={`bg-${product.id}`}
                        className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === activeIndex ? 'opacity-30' : 'opacity-0'
                            }`}
                    >
                        <img
                            src={product.images[0]}
                            alt={product.name}
                            className="w-full h-full object-cover grayscale"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-canvas via-canvas/60 to-transparent" />
                    </div>
                ))}
            </div>

            {/* Content Container */}
            <div className="container mx-auto px-4 relative z-10 h-full flex items-center justify-center">
                <div className="max-w-6xl w-full mx-auto h-full md:h-auto flex flex-col justify-center py-4 md:py-0">
                    {products.map((product, index) => {
                        const isActive = index === activeIndex;
                        const discount = ((product.startPrice - product.currentPrice) / product.startPrice) * 100;

                        return (
                            <div
                                key={product.id}
                                className={`flex flex-col md:flex-row items-center gap-4 md:gap-16 transition-all duration-700 h-full md:h-auto w-full ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 absolute pointer-events-none'
                                    }`}
                            >
                                {/* Image Card */}
                                <div className="w-full md:w-1/2 aspect-[16/10] md:aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 relative group shadow-2xl shrink-0">
                                    <img
                                        src={product.images[0]}
                                        alt={product.name}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />

                                    {/* Status Overlay */}
                                    <div className="absolute top-3 left-3 z-20">
                                        <div className="bg-orange-500/20 backdrop-blur-md border border-orange-500/30 text-orange-500 px-3 py-1 rounded-full text-[9px] md:text-sm font-bold uppercase tracking-[0.1em] flex items-center gap-1.5">
                                            <Flame size={12} fill="currentColor" />
                                            Hot Price
                                        </div>
                                    </div>

                                    {/* Mobile-only Gradient Content Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent md:hidden flex flex-col justify-end p-4">
                                        <div className="space-y-1.5">
                                            <p className="text-accent font-mono text-[8px] uppercase tracking-[0.3em]">Trending</p>
                                            <h2 className="text-xl font-heading font-semibold tracking-tight text-white leading-tight">
                                                {product.name}
                                            </h2>
                                            <p className="text-secondary/80 text-[10px] line-clamp-1 max-w-[90%] font-medium">
                                                {product.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Info Layer */}
                                <div className="w-full md:w-1/2 text-left flex flex-col justify-center space-y-4 md:space-y-6">
                                    {/* Desktop Only Typography */}
                                    <div className="hidden md:block space-y-2">
                                        <p className="text-accent font-mono text-xs uppercase tracking-[0.3em]">Trending Auction</p>
                                        <h2 className="text-6xl font-heading font-semibold tracking-tight text-white">
                                            {product.name}
                                        </h2>
                                        <p className="text-secondary text-lg max-w-md leading-relaxed mt-4">
                                            {product.description}
                                        </p>
                                    </div>

                                    {/* Pricing and Action */}
                                    <div className="bg-white/[0.03] md:bg-transparent p-4 md:p-0 rounded-2xl border border-white/5 md:border-0 w-full backdrop-blur-sm">
                                        <div className="flex items-end justify-between md:justify-start md:gap-12 mb-4 md:py-4 md:border-y md:border-white/5">
                                            <div>
                                                <p className="text-secondary/60 text-[8px] md:text-[10px] uppercase tracking-widest mb-0.5 md:mb-1">Live Price</p>
                                                <PriceDisplay price={product.currentPrice} size="sm" className="md:size-lg" />
                                            </div>
                                            <div className="text-right md:text-left">
                                                <p className="text-secondary/60 text-[8px] md:text-[10px] uppercase tracking-widest mb-0.5 md:mb-1">Drop</p>
                                                <div className="text-accent flex items-center gap-1 text-base md:text-2xl font-bold justify-end md:justify-start">
                                                    <TrendingDown size={14} className="md:w-6 md:h-6" />
                                                    {discount > 0 ? discount.toFixed(1) : "35.2"}%
                                                </div>
                                            </div>
                                        </div>

                                        <Button
                                            size="md"
                                            className="w-full md:w-auto px-8 md:py-4 text-sm md:text-base font-semibold"
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

            {/* Manual Controls */}
            <div className="absolute bottom-6 right-0 left-0 md:left-auto md:right-12 flex flex-col md:flex-row items-center justify-center gap-4 md:gap-4 z-20">
                <div className="flex gap-1.5 md:gap-2">
                    {products.map((_, i) => (
                        <div
                            key={i}
                            className={`h-0.5 md:h-1 transition-all duration-300 rounded-full ${i === activeIndex ? 'w-6 md:w-8 bg-accent' : 'w-1.5 md:w-2 bg-white/20'
                                }`}
                        />
                    ))}
                </div>

                <div className="hidden md:flex items-center gap-3">
                    <button
                        onClick={prevSlide}
                        className="p-3 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition-colors text-white"
                        aria-label="Previous slide"
                    >
                        <ChevronLeft size={20} />
                    </button>
                    <button
                        onClick={nextSlide}
                        className="p-3 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition-colors text-white"
                        aria-label="Next slide"
                    >
                        <ChevronRight size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
};
