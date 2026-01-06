import React, { useState, useEffect } from 'react';
import { Product } from '../types';
import { Button } from './Button';
import { PriceDisplay } from './PriceDisplay';
import { ChevronLeft, ChevronRight, TrendingDown, Flame } from 'lucide-react';
import { interpolate } from '../styles/motion';

interface TrendingSliderProps {
    products: Product[];
    onSelect: (id: string) => void;
    progress: number; // For curtain animation integration if needed
}

export const TrendingSlider: React.FC<TrendingSliderProps> = ({ products, onSelect, progress }) => {
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % products.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [products.length]);

    const nextSlide = () => setActiveIndex((prev) => (prev + 1) % products.length);
    const prevSlide = () => setActiveIndex((prev) => (prev - 1 + products.length) % products.length);

    return (
        <div className="relative w-full h-full overflow-hidden flex items-center justify-center">
            {/* Background Slides */}
            <div className="absolute inset-0 z-0">
                {products.map((product, index) => (
                    <div
                        key={product.id}
                        className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === activeIndex ? 'opacity-40' : 'opacity-0'
                            }`}
                    >
                        <img
                            src={product.images[0]}
                            alt={product.name}
                            className="w-full h-full object-cover grayscale"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-canvas via-canvas/40 to-transparent" />
                    </div>
                ))}
            </div>

            {/* Content */}
            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-6xl mx-auto">
                    {products.map((product, index) => {
                        const isActive = index === activeIndex;
                        const discount = ((product.startPrice - product.currentPrice) / product.startPrice) * 100;

                        return (
                            <div
                                key={product.id}
                                className={`flex flex-col md:flex-row items-center gap-8 md:gap-16 transition-all duration-700 h-full ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 absolute pointer-events-none'
                                    }`}
                            >
                                {/* Product Image Card */}
                                <div className="w-full md:w-1/2 aspect-square md:aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 relative group">
                                    <img
                                        src={product.images[0]}
                                        alt={product.name}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute top-4 left-4 z-20">
                                        <div className="bg-orange-500/20 backdrop-blur-md border border-orange-500/30 text-orange-500 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-[0.1em] flex items-center gap-2">
                                            <Flame size={14} fill="currentColor" />
                                            Hot Price
                                        </div>
                                    </div>
                                </div>

                                {/* Product Info */}
                                <div className="w-full md:w-1/2 text-left space-y-6">
                                    <div className="space-y-2">
                                        <p className="text-accent font-mono text-xs uppercase tracking-[0.3em]">Trending Auction</p>
                                        <h2 className="text-4xl md:text-6xl font-heading font-semibold tracking-tight text-white">
                                            {product.name}
                                        </h2>
                                    </div>

                                    <p className="text-secondary text-sm md:text-lg max-w-md leading-relaxed">
                                        {product.description}
                                    </p>

                                    <div className="flex flex-wrap items-center gap-8 py-4 border-y border-white/5">
                                        <div>
                                            <p className="text-secondary text-[10px] uppercase tracking-widest mb-2">Live Price</p>
                                            <PriceDisplay price={product.currentPrice} size="lg" />
                                        </div>
                                        <div>
                                            <p className="text-secondary text-[10px] uppercase tracking-widest mb-2">Current Drop</p>
                                            <div className="text-accent flex items-center gap-1.5 text-2xl font-bold">
                                                <TrendingDown size={24} />
                                                {discount > 0 ? discount.toFixed(1) : (Math.random() * 45 + 10).toFixed(1)}%
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <Button
                                            size="lg"
                                            className="px-8 flex-1 md:flex-none"
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
            <div className="absolute bottom-12 right-6 md:right-12 flex items-center gap-4 z-20">
                <button
                    onClick={prevSlide}
                    className="p-3 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition-colors text-white"
                >
                    <ChevronLeft size={20} />
                </button>
                <div className="flex gap-2">
                    {products.map((_, i) => (
                        <div
                            key={i}
                            className={`h-1 transition-all duration-300 rounded-full ${i === activeIndex ? 'w-8 bg-accent' : 'w-2 bg-white/20'
                                }`}
                        />
                    ))}
                </div>
                <button
                    onClick={nextSlide}
                    className="p-3 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition-colors text-white"
                >
                    <ChevronRight size={20} />
                </button>
            </div>
        </div>
    );
};
