const TEN_MINUTES = 10 * 60 * 1000;

export const defaultOptions = {
  queries: {
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: false,
    staleTime: TEN_MINUTES,
    // Must be >= persist maxAge so restored cache is not garbage-collected immediately.
    gcTime: TEN_MINUTES,
  },
};

export const persistMaxAge = TEN_MINUTES;
