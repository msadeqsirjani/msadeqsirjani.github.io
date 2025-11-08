import { useEffect, useState } from 'react';

interface UseContentOptions {
  logLabel?: string;
  errorMessage?: string;
}

const shouldSkipFetch = <T,>(initialValue: T) => {
  if (Array.isArray(initialValue)) {
    return initialValue.length > 0;
  }

  return initialValue !== null && initialValue !== undefined;
};

export function useContentData<T>(
  fetcher: () => Promise<T>,
  initialValue: T,
  options: UseContentOptions = {},
) {
  const [data, setData] = useState<T>(initialValue);
  const [loading, setLoading] = useState(!shouldSkipFetch(initialValue));
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (shouldSkipFetch(initialValue)) {
      setLoading(false);
      return;
    }

    let active = true;

    const load = async () => {
      try {
        const result = await fetcher();
        if (!active) return;
        setData(result);
        setError(null);
      } catch (err) {
        if (!active) return;
        if (import.meta.env.DEV) {
          console.error(`Failed to load ${options.logLabel ?? 'content'}`, err);
        }
        setError(options.errorMessage ?? 'Unable to load content right now.');
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    load();

    return () => {
      active = false;
    };
  }, [fetcher, initialValue, options.errorMessage, options.logLabel]);

  return { data, loading, error };
}

export default useContentData;
