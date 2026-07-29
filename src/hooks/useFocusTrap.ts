import {useEffect, type RefObject} from 'react';

export const useFocusTrap = (
  ref: RefObject<HTMLElement | null>,
  isActive: boolean,
) => {
  useEffect(() => {
    if (!isActive || !ref.current) return;

    const element = ref.current;

    const getFocusableElements = () =>
      element.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );

    getFocusableElements()[0]?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      const focusableElements = getFocusableElements();
      const firstFocusable = focusableElements[0];
      const lastFocusable = focusableElements[focusableElements.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === firstFocusable) {
          e.preventDefault();
          lastFocusable?.focus();
        }
      } else {
        if (document.activeElement === lastFocusable) {
          e.preventDefault();
          firstFocusable?.focus();
        }
      }
    };

    element.addEventListener('keydown', handleKeyDown);

    return () => {
      element.removeEventListener('keydown', handleKeyDown);
    };
  }, [isActive, ref]);
};
