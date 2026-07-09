import { type PropsWithChildren } from "react";
import { Toaster } from "sonner";
import Layout from "@/components/layout/Layout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { defaultOptions } from "@/utils/queryClientOptions";

const queryClient = new QueryClient({
  defaultOptions,
});

const Provider = ({ children }: PropsWithChildren) => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Layout>{children}</Layout>
        <Toaster />
      </QueryClientProvider>
    </>
  );
};

export default Provider;
