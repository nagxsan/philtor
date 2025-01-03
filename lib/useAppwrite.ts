import {useCallback, useEffect, useState} from "react";
import {Alert} from "react-native";

interface UseAppwriteOptions<T, P extends Record<string, string | number>> {
  fn: (params: P) => Promise<T>;
  params?: P;
  skip?: boolean;
}

interface UseAppwriteReturn<T, P extends Record<string, string | number>> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: (newParams: P) => Promise<void>;
}

export const useAppwrite = <T, P extends Record<string, string | number>> ({
  fn,
  params = {} as P,
  skip = false
} : UseAppwriteOptions<T, P>) : UseAppwriteReturn<T, P> => {
  
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(!skip);
  const [error, setError] = useState<string | null>(null);
  
  const fetchData = useCallback(
    async (params: P) => {
      try {
        setLoading(true);
        setError(null);
        const result = await fn(params);
        setData(result);
      } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
        setError(errorMessage);
        Alert.alert(errorMessage);
      } finally {
        setLoading(false);
      }
    },
    [fn]
  );
  
  useEffect(() => {
    if (!skip) {
      fetchData(params);
    }
  }, []);
  
  const refetch = async (newParams: P) => await fetchData(newParams);
  
  return {
    data,
    loading,
    error,
    refetch
  };
}
