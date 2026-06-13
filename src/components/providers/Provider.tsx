import { type PropsWithChildren } from "react";
import { Toaster } from "sonner";
import Layout from "@/components/layout/Layout";

const Provider = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Layout>{children}</Layout>
      <Toaster />
    </>
  );
};

export default Provider;
