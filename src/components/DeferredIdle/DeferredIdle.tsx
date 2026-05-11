import { useEffect, useState, type ReactNode } from 'react';

type Props = {
  children: ReactNode;
  timeoutMs?: number;
};

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
