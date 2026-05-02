import { useEffect, useRef } from 'react';

type ScrollListener = (scrollY: number, scrollPercent: number) => void;

class ScrollManager {
  private listeners: Set<ScrollListener> = new Set();
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

  subscribe(listener: ScrollListener) {
    this.listeners.add(listener);

    if (!this.isListening) {
      window.addEventListener('scroll', this.handleScroll, { passive: true });
      this.isListening = true;
      this.calculateScroll();
    }
    listener(this.scrollY, this.scrollPercent);

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

/**
 * Subscribes to global scroll events. The callback is stored in a ref so
 * callers can pass inline arrow functions without causing the listener to
 * tear down and resubscribe on every render.
 */
export const useScrollManager = (callback: ScrollListener) => {
  const callbackRef = useRef<ScrollListener>(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    const stableListener: ScrollListener = (scrollY, scrollPercent) => {
      callbackRef.current(scrollY, scrollPercent);
    };
    return scrollManager.subscribe(stableListener);
  }, []);
};

export default scrollManager;
