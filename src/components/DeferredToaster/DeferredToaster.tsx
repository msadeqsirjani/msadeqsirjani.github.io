import { useEffect, useState, type ComponentType, type ComponentProps } from 'react';
import type { Toaster } from 'sonner';

type SonnerProps = ComponentProps<typeof Toaster>;

/**
 * Sonner is only needed after idle or interaction; keeps it out of the critical JS payload.
 */
export default function DeferredToaster(props: SonnerProps) {
  const [Toaster, setToaster] = useState<ComponentType<SonnerProps> | null>(null);

  useEffect(() => {
    let cancelled = false;

    const load = () => {
      void import('sonner').then(({ Toaster: T }) => {
        if (!cancelled) setToaster(() => T);
      });
    };

    if (typeof requestIdleCallback !== 'undefined') {
      const id = requestIdleCallback(load, { timeout: 3200 });
      return () => {
        cancelled = true;
        cancelIdleCallback(id);
      };
    }

    const tid = window.setTimeout(load, 250);
    return () => {
      cancelled = true;
      window.clearTimeout(tid);
    };
  }, []);

  return Toaster ? <Toaster {...props} /> : null;
}
