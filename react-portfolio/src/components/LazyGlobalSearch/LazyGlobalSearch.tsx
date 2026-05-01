import { useEffect, useState, type ComponentType } from 'react';

export interface LazyGlobalSearchProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * Loads the global search chunk only after the user opens search once,
 * avoiding duplicate JSON hydration work on initial load.
 */
export default function LazyGlobalSearch({ isOpen, onClose }: LazyGlobalSearchProps) {
  const [Modal, setModal] = useState<ComponentType<LazyGlobalSearchProps> | null>(null);

  useEffect(() => {
    if (!isOpen || Modal) return;

    let cancelled = false;
    void import('../GlobalSearch/GlobalSearch').then((m) => {
      if (!cancelled) setModal(() => m.default);
    });

    return () => {
      cancelled = true;
    };
  }, [isOpen, Modal]);

  if (!Modal) return null;

  return <Modal isOpen={isOpen} onClose={onClose} />;
}
