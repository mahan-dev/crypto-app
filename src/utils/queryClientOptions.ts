const TEN_MINUTES = 10 * 60 * 1000;

export const defaultOptions = {
  queries: {
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: false,
    staleTime: TEN_MINUTES,

    gcTime: TEN_MINUTES,
  },
};

export const persistMaxAge = TEN_MINUTES;
