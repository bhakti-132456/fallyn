import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Curtain } from './components/Curtain';
import { PriceDisplay } from './components/PriceDisplay';
import { Button } from './components/Button';
import { Modal } from './components/Modal';
import { AuctionsList } from './components/AuctionsList';
import { AuctionDetail } from './components/AuctionDetail';
import { Dashboard } from './components/Dashboard';
import { Auth } from './components/Auth';
import { Admin } from './components/Admin';
import { StudioPage } from './app/studio/page';
import { MOCK_PRODUCTS } from './services/mockData';
import { interpolate } from './styles/motion';
import { ArrowDown, Search, Lock, ShieldCheck, CreditCard, ChevronDown } from 'lucide-react';

type ViewState = 'home' | 'auctions' | 'studio' | 'auction-detail' | 'dashboard' | 'admin' | 'auth';

const App: React.FC = () => {
  // Routing Initialization
  const getInitialView = (): ViewState => {
    const path = window.location.pathname;
    if (path.startsWith('/studio')) return 'studio';
    if (path.startsWith('/auctions')) return 'auctions';
    if (path.startsWith('/dashboard')) return 'dashboard';
    if (path.startsWith('/admin')) return 'admin';
    if (path.startsWith('/auth')) return 'auth';
    return 'home';
  };

  const [currentView, setCurrentView] = useState<ViewState>(getInitialView);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Home Curtain Logic State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [demoPrice, setDemoPrice] = useState(159900.00);

  // Handle Browser Back/Forward
  useEffect(() => {
    const onPopState = () => {
      setCurrentView(getInitialView());
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  // Simulate price drop for Home Curtain
  useEffect(() => {
    const interval = setInterval(() => {
      setDemoPrice(prev => Math.max(89000, prev - (Math.random() * 150)));
    }, 120);
    return () => clearInterval(interval);
  }, []);

  const handleNavigate = (view: ViewState) => {
    if (view === 'dashboard' && !isLoggedIn) {
      handleNavigate('auth');
      return;
    }

    // Update URL
    const path = view === 'home' ? '/' : `/${view}`;
    window.history.pushState({}, '', path);

    setCurrentView(view);

    if (view !== 'auction-detail') {
      setSelectedProductId(null);
    }

    // Reset scroll on navigation
    window.scrollTo(0, 0);
  };

  const handleSelectProduct = (id: string) => {
    setSelectedProductId(id);
    handleNavigate('auction-detail');
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    handleNavigate('dashboard');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    handleNavigate('home');
  };

  // --------------------------------------------------------------------------
  // RENDER: AUTH
  // --------------------------------------------------------------------------
  if (currentView === 'auth') {
    return (
      <>
        <Navbar onNavigate={(v) => handleNavigate(v as ViewState)} currentView="auth" isLoggedIn={isLoggedIn} />
        <Auth onLogin={handleLogin} />
      </>
    );
  }

  // --------------------------------------------------------------------------
  // RENDER: DASHBOARD
  // --------------------------------------------------------------------------
  if (currentView === 'dashboard') {
    return (
      <div className="bg-canvas min-h-screen text-primary font-sans">
        <Navbar onNavigate={(v) => handleNavigate(v as ViewState)} currentView="dashboard" isLoggedIn={isLoggedIn} />
        <Dashboard onLogout={handleLogout} />
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // RENDER: ADMIN
  // --------------------------------------------------------------------------
  if (currentView === 'admin') {
    return (
      <div className="bg-canvas min-h-screen text-primary font-sans">
        <Navbar onNavigate={(v) => handleNavigate(v as ViewState)} currentView="admin" isLoggedIn={isLoggedIn} />
        <Admin />
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // RENDER: STUDIO
  // --------------------------------------------------------------------------
  if (currentView === 'studio') {
    return (
      <StudioPage
        onNavigate={(v) => handleNavigate(v as ViewState)}
        isLoggedIn={isLoggedIn}
      />
    );
  }

  // --------------------------------------------------------------------------
  // RENDER: AUCTIONS LIST (CURTAIN STACK)
  // --------------------------------------------------------------------------
  if (currentView === 'auctions') {
    return (
      <div className="bg-canvas h-screen w-full overflow-hidden text-primary font-sans">
        <Navbar onNavigate={(v) => handleNavigate(v as ViewState)} currentView="auctions" isLoggedIn={isLoggedIn} />
        <AuctionsList products={MOCK_PRODUCTS} onSelect={handleSelectProduct} />
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // RENDER: AUCTION DETAIL (CURTAIN STACK)
  // --------------------------------------------------------------------------
  if (currentView === 'auction-detail') {
    const product = MOCK_PRODUCTS.find(p => p.id === selectedProductId) || MOCK_PRODUCTS[0];
    return (
      <div className="bg-canvas h-screen w-full overflow-hidden text-primary font-sans">
        <AuctionDetail product={product} onBack={() => handleNavigate('auctions')} />
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // RENDER: HOME (CURTAINS)
  // --------------------------------------------------------------------------
  return (
    <div className="bg-canvas text-primary font-sans selection:bg-accent selection:text-white h-screen w-full overflow-hidden">
      <Navbar onNavigate={(v) => handleNavigate(v as ViewState)} currentView="home" isLoggedIn={isLoggedIn} />

      {/* Main Scroller */}
      <main className="h-screen w-full overflow-y-scroll snap-y snap-mandatory scroll-smooth relative">

        {/* CURTAIN 1: HERO STATEMENT 
            Updated to use video, specific typography, and "linger" behavior via height.
            Height set to 140vh to require extra scrolling (lingering).
        */}
        <Curtain id="statement" className="h-[140vh]">
          {({ progress, exitProgress }) => (
            <div
              className="h-full w-full flex flex-col justify-center overflow-hidden relative"
              style={{
                // Simulate sticky behavior by counter-translating the scroll
                // When scrolling down, exitProgress increases. We move content down to keep it in view.
                transform: `translateY(${exitProgress * 100}vh)`
              }}
            >

              {/* Video Background */}
              <div className="absolute inset-0 z-0 select-none pointer-events-none bg-canvas h-screen">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover"
                >
                  {/* Locked Hero Video Asset */}
                  <source src="https://raw.githubusercontent.com/abhisheksatuluri/fallyn-assets/main/fallyn-hero.mp4" type="video/mp4" />
                </video>

                {/* Cinematic Overlays */}
                {/* 1. Base dim for text legibility without killing highlights */}
                <div className="absolute inset-0 bg-black/20" />
                {/* 2. Gradient for bottom text/nav contrast */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-canvas" />
                {/* 3. Vignette */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(11,13,16,0.8)_100%)]" />
                {/* 4. Texture */}
                <div className="grain-overlay opacity-30" />
              </div>

              {/* Typography */}
              <div
                className="relative z-10 px-8 md:px-24 max-w-[1400px] mx-auto w-full opacity-0 animate-fade-in-delayed mt-[-20vh] md:mt-0"
                style={{
                  // Fade out as we finally scroll past
                  opacity: interpolate(exitProgress, [0.4, 0.9], [1, 0])
                }}
              >
                <div className="space-y-4 md:space-y-6">
                  <h1 className="font-heading font-medium text-5xl md:text-8xl lg:text-9xl leading-snug md:leading-[1.1] tracking-normal text-white drop-shadow-lg mix-blend-screen">
                    Watch the <br /> price fall.
                  </h1>
                  <h2 className="font-heading font-medium text-5xl md:text-8xl lg:text-9xl leading-snug md:leading-[1.1] tracking-normal text-accent drop-shadow-lg mix-blend-screen">
                    Decide the <br /> moment.
                  </h2>
                </div>
              </div>

              {/* Scroll Indicator */}
              <div
                className="absolute bottom-12 left-0 right-0 flex justify-center opacity-50 z-10 pointer-events-none h-screen items-end pb-12"
                style={{ opacity: interpolate(exitProgress, [0, 0.1], [1, 0]) }}
              >
                <div className="animate-bounce">
                  <ChevronDown size={24} className="text-white/50" />
                </div>
              </div>
            </div>
          )}
        </Curtain>

        {/* CURTAIN 2: FALLING PRICE */}
        <Curtain id="falling-price" className="h-screen bg-[#0F1115]">
          {({ progress }) => (
            <div className="h-full w-full relative flex items-center justify-center">
              <div className="absolute inset-0 z-0 opacity-40">
                <img
                  src="https://images.unsplash.com/photo-1621330396167-b3d451b9b83b?q=80&w=1000&auto=format&fit=crop&grayscale"
                  className="w-full h-full object-cover"
                  alt="Background"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-canvas via-canvas/50 to-transparent" />
              </div>
              <div className="relative z-10 text-center space-y-2 px-6">
                <p
                  className="text-[10px] md:text-xs uppercase tracking-[0.2em] md:tracking-[0.3em] text-accent mb-4"
                  style={{ opacity: interpolate(progress, [0.2, 0.4], [0, 1]) }}
                >
                  Live Market Data
                </p>
                <div style={{ transform: `scale(${interpolate(progress, [0.2, 0.8], [0.9, 1.1])})` }}>
                  <PriceDisplay price={demoPrice} size="xl" className="justify-center" />
                </div>
                <p
                  className="text-secondary text-xs md:text-sm mt-4 font-mono opacity-70"
                  style={{ opacity: interpolate(progress, [0.4, 0.6], [0, 1]) }}
                >
                  iPhone 15 Pro Max • 1TB • Titanium
                </p>
              </div>
            </div>
          )}
        </Curtain>

        {/* CURTAIN 3: HOW IT WORKS */}
        <Curtain id="how-it-works" className="h-screen bg-surface">
          {({ progress }) => (
            <div className="h-full flex flex-col items-center justify-center p-8 w-full max-w-[1400px] mx-auto">
              <h3 className="text-xs uppercase tracking-widest text-secondary mb-16 md:mb-24 absolute top-24 md:static md:w-full md:text-left md:pl-4">How It Works</h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-24 w-full px-4">
                <div className="flex items-center md:flex-col md:items-start gap-6" style={{ opacity: interpolate(progress, [0.1, 0.3], [0, 1]), transform: `translateY(${interpolate(progress, [0.1, 0.3], [20, 0])}px)` }}>
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-white border border-white/10 shrink-0"><Search size={20} /></div>
                  <div><h4 className="font-heading font-semibold text-lg md:text-xl md:mb-2">Watch</h4><p className="text-secondary text-sm">Monitor premium drops in real-time.</p></div>
                </div>
                <div className="flex items-center md:flex-col md:items-start gap-6" style={{ opacity: interpolate(progress, [0.3, 0.5], [0, 1]), transform: `translateY(${interpolate(progress, [0.3, 0.5], [20, 0])}px)` }}>
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-white border border-white/10 shrink-0"><ArrowDown size={20} /></div>
                  <div><h4 className="font-heading font-semibold text-lg md:text-xl md:mb-2">Wait</h4><p className="text-secondary text-sm">Prices fall every second. Patience pays.</p></div>
                </div>
                <div className="flex items-center md:flex-col md:items-start gap-6" style={{ opacity: interpolate(progress, [0.5, 0.7], [0, 1]), transform: `translateY(${interpolate(progress, [0.5, 0.7], [20, 0])}px)` }}>
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center text-accent border border-accent/20 shrink-0 shadow-[0_0_15px_rgba(59,130,246,0.2)]"><Lock size={20} /></div>
                  <div><h4 className="font-heading font-semibold text-lg text-white md:text-xl md:mb-2">Strike</h4><p className="text-secondary text-sm">Lock the price. Secure the asset.</p></div>
                </div>
              </div>
            </div>
          )}
        </Curtain>

        {/* CURTAIN 4: CTA TO APP */}
        <Curtain id="trust" className="h-screen">
          {({ progress }) => (
            <div className="h-full flex flex-col items-center justify-center p-8 bg-[#050608]">
              <div className="text-center space-y-12 max-w-lg md:max-w-2xl">
                <div className="flex justify-center gap-12 text-secondary">
                  <div className="flex flex-col items-center gap-3"><ShieldCheck size={32} strokeWidth={1} /><span className="text-xs uppercase tracking-widest">Authentic</span></div>
                  <div className="flex flex-col items-center gap-3"><CreditCard size={32} strokeWidth={1} /><span className="text-xs uppercase tracking-widest">Secure</span></div>
                </div>
                <div className="space-y-8" style={{ opacity: interpolate(progress, [0.2, 0.6], [0, 1]), transform: `scale(${interpolate(progress, [0.2, 0.6], [0.95, 1])})` }}>
                  <h2 className="font-heading text-4xl md:text-6xl font-semibold tracking-tight">Ready to decide?</h2>
                  <Button size="lg" className="px-12 py-6 text-lg" onClick={() => handleNavigate('auctions')}>
                    Enter FALLYN
                  </Button>
                </div>

                {/* Hidden Admin Link */}
                <div className="absolute bottom-8 left-0 right-0 text-center">
                  <p
                    className="text-[10px] text-secondary/40 tracking-widest uppercase cursor-pointer hover:text-secondary transition-colors"
                    onClick={() => handleNavigate('admin')}
                  >
                    © 2024 FALLYN. Silence over noise.
                  </p>
                </div>
              </div>
            </div>
          )}
        </Curtain>
      </main>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Join the Drop">
        <div className="space-y-6 text-center">
          <div className="p-4 bg-surface rounded-lg border border-white/5">
            <p className="text-sm text-secondary mb-2">You are securing</p>
            <p className="font-semibold text-lg text-white">Sony WH-1000XM5</p>
          </div>
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-widest text-secondary">Lock Price At</p>
            <PriceDisplay price={28942.00} size="xl" className="justify-center" />
          </div>
          <div className="pt-4 space-y-3">
            <Button block>Confirm & Pay</Button>
            <Button variant="ghost" block onClick={() => setIsModalOpen(false)}>Cancel</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default App;