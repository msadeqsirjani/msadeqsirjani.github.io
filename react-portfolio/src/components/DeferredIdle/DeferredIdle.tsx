import { useEffect, useState, type ReactNode } from 'react';

type Props = {
  children: ReactNode;
  /** Max wait before running even if the main thread stays busy (ms). */
  timeoutMs?: number;
};

/**
 * Defers mounting children until the browser is idle (or timeout).
 * Keeps initial JS + main-thread work smaller for mobile FCP/LCP.
 */
export default function DeferredIdle({ children, timeoutMs = 2800 }: Props) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const go = () => {
      if (!cancelled) setReady(true);
    };

    if (typeof requestIdleCallback !== 'undefined') {
      const id = requestIdleCallback(go, { timeout: timeoutMs });
      return () => {
        cancelled = true;
        cancelIdleCallback(id);
      };
    }

    const tid = window.setTimeout(go, 200);
    return () => {
      cancelled = true;
      window.clearTimeout(tid);
    };
  }, [timeoutMs]);

  return ready ? children : null;
}
