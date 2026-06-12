import { useEffect, useState } from "react";

export type DataSource = "loading" | "live" | "fallback";

/**
 * Runs an async fetcher against the backend. On success the data is "live"; on
 * any failure it returns the provided fallback (bundled demo data) and reports
 * "fallback" so the UI can show an honest indicator. Keeps the prototype usable
 * whether or not the API is running.
 */
export function useApi<T>(fetcher: () => Promise<T>, fallback: T): { data: T; source: DataSource } {
  const [data, setData] = useState<T>(fallback);
  const [source, setSource] = useState<DataSource>("loading");

  useEffect(() => {
    let cancelled = false;
    setSource("loading");
    fetcher()
      .then((d) => {
        if (!cancelled) {
          setData(d);
          setSource("live");
        }
      })
      .catch(() => {
        if (!cancelled) {
          setData(fallback);
          setSource("fallback");
        }
      });
    return () => {
      cancelled = true;
    };
    // The fetcher is created fresh per render by callers; we intentionally run once on mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { data, source };
}
