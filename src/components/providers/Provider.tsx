import { type PropsWithChildren } from "react";
import { Toaster } from "sonner";
import Layout from "@/components/layout/Layout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { defaultOptions } from "@/utils/queryClientOptions";
import { SkeletonTheme } from "react-loading-skeleton";

const queryClient = new QueryClient({
  defaultOptions,
});

const Provider = ({ children }: PropsWithChildren) => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Layout>
          <SkeletonTheme baseColor="#1E1F24" width={250} height={135}>
            {children}
          </SkeletonTheme>
        </Layout>
        <Toaster />
      </QueryClientProvider>
    </>
  );
};

export default Provider;
