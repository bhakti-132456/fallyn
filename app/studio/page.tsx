import React from 'react';
import { Navbar } from '../../components/Navbar';
import { Curtain } from '../../components/Curtain';
import { Button } from '../../components/Button';
import { interpolate } from '../../styles/motion';
import { ChevronDown, ArrowRight } from 'lucide-react';

interface StudioPageProps {
  onNavigate: (view: 'home' | 'auctions' | 'studio' | 'dashboard') => void;
  isLoggedIn: boolean;
}

export const StudioPage: React.FC<StudioPageProps> = ({ onNavigate, isLoggedIn }) => {
  return (
    <div className="bg-canvas h-screen w-full overflow-hidden text-primary font-sans selection:bg-accent selection:text-white">
      <Navbar onNavigate={onNavigate} currentView="studio" isLoggedIn={isLoggedIn} />
      
      {/* Scroll Container - Critical for Curtain Logic */}
      <main className="h-screen w-full overflow-y-scroll snap-y snap-mandatory scroll-smooth relative">
        
        {/* CURTAIN 1: ATMOSPHERE */}
        <Curtain id="studio-atmosphere">
          {({ progress, exitProgress }) => (
            <div className="h-full w-full relative flex items-center justify-center overflow-hidden">
               {/* Video Background */}
               <div className="absolute inset-0 z-0 select-none pointer-events-none bg-canvas">
                 <video
                   autoPlay
                   loop
                   muted
                   playsInline
                   className="absolute inset-0 w-full h-full object-cover opacity-60"
                   poster="https://images.pexels.com/photos/3629511/pexels-photo-3629511.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                 >
                    {/* Abstract Dark Liquid/Metal - High viscosity, fits "Inside" theme */}
                    <source src="https://videos.pexels.com/video-files/3629511/3629511-uhd_3840_2160_25fps.mp4" type="video/mp4" />
                 </video>
                 <div className="absolute inset-0 bg-gradient-to-t from-canvas via-transparent to-canvas/50" />
                 <div className="grain-overlay opacity-50" />
              </div>

              <div 
                className="relative z-10 text-center space-y-6 mix-blend-screen"
                style={{
                  opacity: interpolate(exitProgress, [0, 0.5], [1, 0]),
                  transform: `translateY(${interpolate(exitProgress, [0, 0.5], [0, -100])}px)`
                }}
              >
                  <p 
                    className="text-xs uppercase tracking-[0.4em] text-secondary/80 animate-fade-in-delayed" 
                    style={{ animationDelay: '200ms' }}
                  >
                    The Architecture
                  </p>
                  <h1 
                    className="text-6xl md:text-9xl font-heading font-medium tracking-tighter text-white animate-fade-in-delayed"
                    style={{ animationDelay: '400ms' }}
                  >
                    Inside FALLYN
                  </h1>
              </div>

              {/* Scroll Hint */}
              <div 
                className="absolute bottom-12 left-0 right-0 flex justify-center opacity-40"
                style={{ opacity: interpolate(exitProgress, [0, 0.1], [0.4, 0]) }}
              >
                 <ChevronDown size={24} className="animate-bounce" />
              </div>
            </div>
          )}
        </Curtain>

        {/* CURTAIN 2: PHILOSOPHY */}
        <Curtain id="studio-philosophy" className="bg-surface">
            {({ progress }) => (
                <div className="h-full w-full flex items-center justify-center p-8 relative">
                    {/* Background Text */}
                    <div 
                        className="absolute select-none pointer-events-none text-[20vw] font-heading font-bold text-white/5 whitespace-nowrap"
                        style={{ transform: `translateX(${interpolate(progress, [0, 1], [200, -200])}px)` }}
                    >
                        RESTRICTION
                    </div>

                    <div className="max-w-4xl relative z-10 text-center md:text-left">
                        <h2 
                          className="text-4xl md:text-7xl font-heading font-medium leading-tight text-white mb-8"
                          style={{
                              opacity: interpolate(progress, [0.2, 0.4], [0, 1]),
                              transform: `translateY(${interpolate(progress, [0.2, 0.4], [30, 0])}px)`
                          }}
                        >
                            Control replaces <br/>
                            <span className="text-secondary">chaos.</span>
                        </h2>
                        <div 
                           className="h-px w-24 bg-accent mb-8 md:hidden mx-auto"
                           style={{ transform: `scaleX(${interpolate(progress, [0.3, 0.5], [0, 1])})` }}
                        />
                        <p 
                          className="text-lg md:text-xl text-secondary max-w-xl font-light leading-relaxed"
                          style={{
                              opacity: interpolate(progress, [0.4, 0.6], [0, 1]),
                              transform: `translateY(${interpolate(progress, [0.4, 0.6], [20, 0])}px)`
                          }}
                        >
                            In a world of noise, we designed silence. FALLYN is not just a marketplace; it is a meticulously calibrated instrument for value discovery. We slowed down time so you could decide the moment.
                        </p>
                    </div>
                </div>
            )}
        </Curtain>

        {/* CURTAIN 3: PROCESS */}
        <Curtain id="studio-process" className="bg-canvas">
             {({ progress }) => (
                 <div className="h-full w-full flex flex-col justify-center px-6 md:px-24 relative overflow-hidden">
                     <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-24 max-w-[1600px] mx-auto w-full">
                         {/* Step 1 */}
                         <div 
                            className="space-y-4 border-t border-white/10 pt-8"
                            style={{
                                opacity: interpolate(progress, [0.1, 0.3], [0, 1]),
                                transform: `translateY(${interpolate(progress, [0.1, 0.3], [40, 0])}px)`
                            }}
                         >
                             <span className="font-mono text-accent text-lg">01</span>
                             <h3 className="text-2xl font-heading font-medium text-white">Curate</h3>
                             <p className="text-secondary text-sm leading-relaxed">
                                 We verify provenance. Only high-value, authentic assets enter the ecosystem. No clutter.
                             </p>
                         </div>

                         {/* Step 2 */}
                         <div 
                            className="space-y-4 border-t border-white/10 pt-8"
                            style={{
                                opacity: interpolate(progress, [0.3, 0.5], [0, 1]),
                                transform: `translateY(${interpolate(progress, [0.3, 0.5], [40, 0])}px)`,
                                transitionDelay: '150ms' // Increased stagger
                            }}
                         >
                             <span className="font-mono text-accent text-lg">02</span>
                             <h3 className="text-2xl font-heading font-medium text-white">Verify</h3>
                             <p className="text-secondary text-sm leading-relaxed">
                                 Every price drop is algorithmically smoothed. No jarring jumps. Just inevitable gravity.
                             </p>
                         </div>

                         {/* Step 3 */}
                         <div 
                            className="space-y-4 border-t border-white/10 pt-8"
                            style={{
                                opacity: interpolate(progress, [0.5, 0.7], [0, 1]),
                                transform: `translateY(${interpolate(progress, [0.5, 0.7], [40, 0])}px)`,
                                transitionDelay: '300ms' // Increased stagger
                            }}
                         >
                             <span className="font-mono text-accent text-lg">03</span>
                             <h3 className="text-2xl font-heading font-medium text-white">Release</h3>
                             <p className="text-secondary text-sm leading-relaxed">
                                 Ownership transfers instantly. Secure, encrypted, final. The asset is yours.
                             </p>
                         </div>
                     </div>
                 </div>
             )}
        </Curtain>

        {/* CURTAIN 4: CRAFT */}
        <Curtain id="studio-craft">
             {({ progress }) => (
                 <div className="h-full w-full relative flex items-end">
                     <div className="absolute inset-0 z-0">
                         <img 
                            src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2670&auto=format&fit=crop"
                            alt="Macro electronics"
                            className="w-full h-full object-cover grayscale brightness-50"
                            style={{
                                transform: `scale(${interpolate(progress, [0, 1], [1.1, 1.0])})`
                            }}
                         />
                         <div className="absolute inset-0 bg-gradient-to-t from-canvas via-transparent to-transparent opacity-90" />
                     </div>

                     <div className="relative z-10 p-8 md:p-24 w-full max-w-[1600px] mx-auto">
                         <div 
                            className="max-w-2xl"
                            style={{
                                opacity: interpolate(progress, [0.3, 0.6], [0, 1]),
                                transform: `translateY(${interpolate(progress, [0.3, 0.6], [20, 0])}px)`
                            }}
                         >
                             <h2 className="text-4xl md:text-6xl font-heading font-medium text-white mb-6">Craft</h2>
                             <p className="text-xl md:text-2xl text-white/80 font-light leading-relaxed italic">
                                 "Every pixel weighed. Every interaction timed. We didn't build a website; we built a vault."
                             </p>
                         </div>
                     </div>
                 </div>
             )}
        </Curtain>

        {/* CURTAIN 5: EXIT */}
        <Curtain id="studio-exit" className="bg-canvas">
             {({ progress }) => (
                 <div className="h-full w-full flex flex-col items-center justify-center p-8">
                     <div 
                        className="text-center space-y-12"
                        style={{
                            opacity: interpolate(progress, [0.2, 0.5], [0, 1]),
                            transform: `scale(${interpolate(progress, [0.2, 0.5], [0.95, 1])})`
                        }}
                     >
                         <h2 className="text-3xl md:text-5xl font-heading font-medium text-white tracking-tight">
                             The drop is waiting.
                         </h2>
                         
                         <Button 
                             size="lg" 
                             className="px-12 py-6 text-lg"
                             onClick={() => onNavigate('auctions')}
                         >
                             <span>Return to Auctions</span>
                             <ArrowRight size={20} className="ml-2" />
                         </Button>
                     </div>
                     
                     <div className="absolute bottom-8 text-center w-full">
                         <p className="text-[10px] text-secondary/30 uppercase tracking-[0.2em]">FALLYN Studio © 2024</p>
                     </div>
                 </div>
             )}
        </Curtain>

      </main>
    </div>
  );
};