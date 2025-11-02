import { useCallback, useEffect, useRef, useState } from "react";

export interface FetchWithCancelResult<T> {
  data: T | null;
  loading: boolean;
  error: any;
  execute: (fn: (signal: AbortSignal) => Promise<T>) => Promise<T | null>;
  setData: (data: T | null) => void;
}

export const useFetchWithCancel = <T>(): FetchWithCancelResult<T> => {
  const controllerRef = useRef<AbortController | null>(null);
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    return () => controllerRef.current?.abort();
  }, []);

  const execute = useCallback(
    async (fn: (signal: AbortSignal) => Promise<T>) => {
      controllerRef.current?.abort();
      const c = new AbortController();
      controllerRef.current = c;
      setLoading(true);
      setError(null);
      try {
        const res = await fn(c.signal);
        setData(res);
        return res;
      } catch (e: any) {
        if (e?.name === "AbortError") {
          return null;
        }
        setError(e);
        return null;
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  return { data, loading, error, execute, setData };
};
