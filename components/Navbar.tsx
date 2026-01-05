import React, { useState } from 'react';
import { Wallet, User, Menu, X } from 'lucide-react';

interface NavbarProps {
  onNavigate?: (view: 'home' | 'auctions' | 'studio' | 'dashboard' | 'auth') => void;
  currentView?: string;
  isLoggedIn?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate, currentView, isLoggedIn }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNav = (e: React.MouseEvent, view: 'home' | 'auctions' | 'studio' | 'dashboard') => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    if (onNavigate) {
      onNavigate(view);
    }
  };

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 bg-canvas/90 backdrop-blur-xl border-b border-white/5 transition-all duration-300"
        role="navigation"
        aria-label="Main Navigation"
      >
        <div className="max-w-[1400px] mx-auto px-6 h-16 md:h-20 flex items-center justify-between">
          <a
            href="/"
            className="flex items-center gap-4 cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent rounded-sm"
            onClick={(e) => handleNav(e, 'home')}
            aria-label="FALLYN Home"
          >
            {/* Minimal Text Logo */}
            <span className="font-semibold text-lg tracking-[0.2em] text-primary hover:text-white transition-colors">FALLYN</span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-12" role="menubar">
            <a
              href="/"
              onClick={(e) => handleNav(e, 'home')}
              className={`text-xs uppercase tracking-widest transition-colors focus:outline-none focus:text-white hover:text-white ${currentView === 'home' ? 'text-white border-b border-accent pb-1' : 'text-secondary'}`}
              role="menuitem"
              aria-current={currentView === 'home' ? 'page' : undefined}
            >
              Drops
            </a>
            <a
              href="/auctions"
              onClick={(e) => handleNav(e, 'auctions')}
              className={`text-xs uppercase tracking-widest transition-colors focus:outline-none focus:text-white hover:text-white ${currentView === 'auctions' ? 'text-white border-b border-accent pb-1' : 'text-secondary'}`}
              role="menuitem"
              aria-current={currentView === 'auctions' ? 'page' : undefined}
            >
              Auctions
            </a>
            <a
              href="/studio"
              onClick={(e) => handleNav(e, 'studio')}
              className={`text-xs uppercase tracking-widest transition-colors focus:outline-none focus:text-white hover:text-white ${currentView === 'studio' ? 'text-white border-b border-accent pb-1' : 'text-secondary'}`}
              role="menuitem"
              aria-current={currentView === 'studio' ? 'page' : undefined}
            >
              Studio
            </a>
          </div>

          <div className="flex items-center gap-3">
            {/* Hamburger Menu Button - Mobile Only */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden w-10 h-10 flex items-center justify-center text-secondary hover:text-white transition-colors"
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
            </button>

            {/* Wallet / Profile Chip */}
            <button
              onClick={() => onNavigate?.('dashboard')}
              className="flex items-center gap-3 bg-surface border border-white/10 rounded-full pl-3 pr-2 py-1.5 cursor-pointer hover:border-white/20 hover:bg-white/5 transition-all group focus:outline-none focus:ring-2 focus:ring-accent"
              aria-label="Dashboard and Wallet"
            >
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" aria-hidden="true"></div>
                <span className="text-xs font-mono text-secondary group-hover:text-white transition-colors hidden sm:inline">₹12.40L</span>
              </div>
              {isLoggedIn && (
                <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-white ml-1">
                  <User size={12} />
                </div>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-canvas/95 backdrop-blur-2xl"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Menu Content */}
          <div className="relative z-10 flex flex-col items-center justify-center h-full gap-8 animate-fade-in">
            <a
              href="/"
              onClick={(e) => handleNav(e, 'home')}
              className={`text-2xl uppercase tracking-[0.3em] font-light transition-colors ${currentView === 'home' ? 'text-white' : 'text-secondary hover:text-white'}`}
            >
              Drops
            </a>
            <a
              href="/auctions"
              onClick={(e) => handleNav(e, 'auctions')}
              className={`text-2xl uppercase tracking-[0.3em] font-light transition-colors ${currentView === 'auctions' ? 'text-white' : 'text-secondary hover:text-white'}`}
            >
              Auctions
            </a>
            <a
              href="/studio"
              onClick={(e) => handleNav(e, 'studio')}
              className={`text-2xl uppercase tracking-[0.3em] font-light transition-colors ${currentView === 'studio' ? 'text-white' : 'text-secondary hover:text-white'}`}
            >
              Studio
            </a>
            <a
              href="/dashboard"
              onClick={(e) => handleNav(e, 'dashboard')}
              className={`text-2xl uppercase tracking-[0.3em] font-light transition-colors ${currentView === 'dashboard' ? 'text-white' : 'text-secondary hover:text-white'}`}
            >
              Dashboard
            </a>
          </div>
        </div>
      )}
    </>
  );
};