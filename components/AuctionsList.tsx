import React, { useState, useMemo } from 'react';
import { Product } from '../types';
import { AuctionCard } from './AuctionCard';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { Button } from './Button';

interface AuctionsListProps {
    products: Product[];
    onSelect: (id: string) => void;
}

type SortOption = 'ending-soon' | 'price-low' | 'price-high' | 'discount';

export const AuctionsList: React.FC<AuctionsListProps> = ({ products, onSelect }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [sortBy, setSortBy] = useState<SortOption>('ending-soon');
    const [isSearchVisible, setIsSearchVisible] = useState(false);

    const categories = ['All', 'Phones', 'Computing', 'Audio', 'Photography', 'Gaming'];

    const filteredProducts = useMemo(() => {
        let result = products.filter(p => {
            const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                p.description.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
            return matchesSearch && matchesCategory;
        });

        if (sortBy === 'ending-soon') {
            result.sort((a, b) => a.endsAt.getTime() - b.endsAt.getTime());
        } else if (sortBy === 'price-low') {
            result.sort((a, b) => a.currentPrice - b.currentPrice);
        } else if (sortBy === 'price-high') {
            result.sort((a, b) => b.currentPrice - a.currentPrice);
        }

        return result;
    }, [products, searchTerm, selectedCategory, sortBy]);

    return (
        <div className="h-full w-full overflow-y-auto bg-canvas pt-32 pb-20 px-4 md:px-8 relative no-scrollbar">

            {/* Floating Control Bar */}
            <div className="fixed top-16 md:top-20 left-0 right-0 z-40 flex justify-center px-4 pointer-events-none">
                <div className="w-full max-w-5xl flex items-center gap-2 md:gap-3 pointer-events-auto">
                    {/* Category Filter */}
                    <div className="bg-surface/80 backdrop-blur-xl px-2 py-1.5 rounded-full border border-white/10 flex gap-1 overflow-x-auto no-scrollbar shadow-2xl max-w-[70vw] md:max-w-none">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`text-[10px] uppercase tracking-widest px-3 py-2 rounded-full transition-all whitespace-nowrap ${selectedCategory === cat
                                    ? 'bg-accent text-white shadow-lg shadow-blue-500/20'
                                    : 'text-secondary opacity-70 hover:opacity-100 hover:bg-white/5'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* Search Toggle */}
                    <button
                        onClick={() => setIsSearchVisible(!isSearchVisible)}
                        className={`w-10 h-10 md:w-11 md:h-11 shrink-0 rounded-full flex items-center justify-center transition-all border shadow-2xl backdrop-blur-xl ${isSearchVisible || searchTerm
                            ? 'bg-accent border-accent text-white'
                            : 'bg-surface/80 border-white/10 text-secondary hover:text-white'
                            }`}
                    >
                        {isSearchVisible ? <X size={18} /> : <Search size={18} />}
                    </button>

                    {/* Sort Dropdown */}
                    <div className="flex items-center gap-2 bg-surface/80 backdrop-blur-xl p-2.5 md:px-4 md:py-2.5 rounded-full border border-white/10 text-secondary shadow-2xl relative group hover:border-white/20 transition-colors">
                        <SlidersHorizontal size={18} className="md:w-3.5 md:h-3.5" />
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value as SortOption)}
                            className="absolute inset-0 opacity-0 cursor-pointer md:static md:opacity-100 md:bg-transparent md:text-[10px] md:uppercase md:tracking-widest md:text-white md:w-auto [&>option]:bg-surface [&>option]:text-white focus:outline-none"
                            aria-label="Sort auctions"
                        >
                            <option value="ending-soon">Ending Soon</option>
                            <option value="price-low">Lowest Price</option>
                            <option value="price-high">Highest Price</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Search Overlay Input */}
            {isSearchVisible && (
                <div className="fixed top-36 left-0 right-0 z-30 flex justify-center px-6 animate-slide-up pointer-events-none">
                    <div className="w-full max-w-lg bg-surface/90 backdrop-blur-2xl border border-white/10 rounded-2xl p-2 shadow-2xl flex items-center pointer-events-auto">
                        <Search size={20} className="ml-4 text-secondary" />
                        <input
                            type="text"
                            placeholder="Search for an asset..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-transparent px-4 py-3 text-primary focus:outline-none placeholder-white/20"
                            autoFocus
                        />
                        {searchTerm && (
                            <button onClick={() => setSearchTerm('')} className="p-2 mr-2 text-secondary hover:text-white">
                                <X size={18} />
                            </button>
                        )}
                    </div>
                </div>
            )}

            {/* Product Grid */}
            <div className="max-w-[1600px] mx-auto">
                {filteredProducts.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
                        {filteredProducts.map((product, index) => (
                            <div
                                key={product.id}
                                className="animate-fade-in-up"
                                style={{ animationDelay: `${index * 50}ms` }}
                            >
                                <AuctionCard
                                    product={product}
                                    onBuy={(id) => onSelect(id)}
                                />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center text-center py-32">
                        <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-6 text-secondary/30">
                            <Search size={40} />
                        </div>
                        <h2 className="text-2xl font-heading font-medium text-white mb-2">No drops found</h2>
                        <p className="text-secondary max-w-xs mb-8">We couldn't find any assets matching your search criteria.</p>
                        <Button variant="secondary" onClick={() => { setSearchTerm(''); setSelectedCategory('All'); setIsSearchVisible(false); }}>
                            Clear Filters
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};