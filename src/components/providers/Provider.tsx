import { type PropsWithChildren } from "react";
import { Toaster } from "sonner";
import Layout from "@/components/layout/Layout";
import { QueryClient } from "@tanstack/react-query";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import { defaultOptions, persistMaxAge } from "@/utils/queryClientOptions";

const queryClient = new QueryClient({
  defaultOptions,
});

const persister = createSyncStoragePersister({
  storage: window.localStorage,
  key: "websocket-crypto-query-cache",
});

const Provider = ({ children }: PropsWithChildren) => {
  return (
    <>
      {/* <QueryClientProvider client={queryClient}> */}
      <PersistQueryClientProvider
        client={queryClient}
        persistOptions={{ persister, maxAge: persistMaxAge }}
      >
        <Layout>{children}</Layout>
        <Toaster />
        {/* </QueryClientProvider> */}
      </PersistQueryClientProvider>
    </>
  );
};

export default Provider;
