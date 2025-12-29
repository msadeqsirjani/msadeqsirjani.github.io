import { useEffect, useCallback } from 'react';

class ScrollManager {
  private listeners: Set<(scrollY: number, scrollPercent: number) => void> = new Set();
  private scrollY = 0;
  private scrollPercent = 0;
  private rafId: number | null = null;
  private isListening = false;

  private calculateScroll = () => {
    this.scrollY = window.pageYOffset || document.documentElement.scrollTop;
    const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
    this.scrollPercent = documentHeight > 0 ? (this.scrollY / documentHeight) * 100 : 0;
  };

  private handleScroll = () => {
    if (this.rafId) return;

    this.rafId = requestAnimationFrame(() => {
      this.calculateScroll();
      this.listeners.forEach(listener => listener(this.scrollY, this.scrollPercent));
      this.rafId = null;
    });
  };

  subscribe(listener: (scrollY: number, scrollPercent: number) => void) {
    this.listeners.add(listener);

    if (!this.isListening) {
      window.addEventListener('scroll', this.handleScroll, { passive: true });
      this.isListening = true;
      this.calculateScroll();
      listener(this.scrollY, this.scrollPercent);
    }

    return () => {
      this.listeners.delete(listener);
      if (this.listeners.size === 0 && this.isListening) {
        window.removeEventListener('scroll', this.handleScroll);
        this.isListening = false;
        if (this.rafId) {
          cancelAnimationFrame(this.rafId);
          this.rafId = null;
        }
      }
    };
  }

  getScrollData() {
    return { scrollY: this.scrollY, scrollPercent: this.scrollPercent };
  }
}

const scrollManager = new ScrollManager();

export const useScrollManager = (
  callback: (scrollY: number, scrollPercent: number) => void
) => {
  const memoizedCallback = useCallback(callback, [callback]);

  useEffect(() => {
    const unsubscribe = scrollManager.subscribe(memoizedCallback);
    return unsubscribe;
  }, [memoizedCallback]);
};

export default scrollManager;
