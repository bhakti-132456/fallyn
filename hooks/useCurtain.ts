import { useEffect, useState, RefObject } from 'react';

export interface CurtainState {
  progress: number; // 0 to 1 (0 = bottom of view, 1 = top of view)
  exitProgress: number; // 0 to 1 (0 = snapped top, 1 = fully exited top)
  isVisible: boolean;
  isActive: boolean; // True when roughly centered/snapped
}

export const useCurtain = (ref: RefObject<HTMLElement | null>): CurtainState => {
  const [state, setState] = useState<CurtainState>({
    progress: 0,
    exitProgress: 0,
    isVisible: false,
    isActive: false,
  });

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Use a container reference if the scroll is on a specific div, 
    // but for "h-screen w-full overflow-y-scroll" on main, we listen to that.
    // However, in our App.tsx, we will set the main container as the scroller.
    // We'll search for the closest scrollable parent or fallback to window.
    
    // For this specific implementation where we control the app structure, 
    // we'll assume the scrolling happens on the parent element of the curtain.
    const scroller = element.parentElement; 

    if (!scroller) return;

    let rafId: number;

    const onScroll = () => {
      const rect = element.getBoundingClientRect();
      const viewHeight = window.innerHeight;
      
      // Calculate basic visibility
      const isVisible = rect.top < viewHeight && rect.bottom > 0;
      
      // Calculate Progress (Entering phase)
      // 0 when rect.top == viewHeight (just entering from bottom)
      // 1 when rect.top == 0 (snapped at top)
      let progress = 0;
      if (rect.top <= viewHeight) {
        progress = 1 - (rect.top / viewHeight);
      }
      
      // Calculate Exit Progress (Leaving phase)
      // 0 when rect.top == 0
      // 1 when rect.bottom == 0 (or some exit threshold)
      let exitProgress = 0;
      if (rect.top < 0) {
        exitProgress = Math.abs(rect.top / viewHeight);
      }

      // Active state (roughly centered or snapped)
      const isActive = Math.abs(rect.top) < 5; // Tolerance for snap

      setState({
        progress: Math.max(0, Math.min(1, progress)),
        exitProgress: Math.max(0, Math.min(1, exitProgress)),
        isVisible,
        isActive
      });

      rafId = requestAnimationFrame(() => {}); // Loop if needed, but Event listener is better
    };

    scroller.addEventListener('scroll', onScroll, { passive: true });
    // Initial check
    onScroll();

    return () => {
      scroller.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(rafId);
    };
  }, [ref]);

  return state;
};
