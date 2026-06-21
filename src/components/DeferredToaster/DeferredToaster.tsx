import {
  useEffect,
  useState,
  type ComponentType,
  type ComponentProps,
} from 'react';
import type {Toaster} from 'react-hot-toast';

type ToasterProps = ComponentProps<typeof Toaster>;

export default function DeferredToaster(props: ToasterProps) {
  const [Toaster, setToaster] = useState<ComponentType<ToasterProps> | null>(
    null,
  );

  useEffect(() => {
    let cancelled = false;

    const load = () => {
      void import('react-hot-toast').then(({Toaster: T}) => {
        if (!cancelled) setToaster(() => T);
      });
    };

    if (typeof requestIdleCallback !== 'undefined') {
      const id = requestIdleCallback(load, {timeout: 3200});
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
