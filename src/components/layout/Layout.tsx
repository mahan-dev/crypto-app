import { type PropsWithChildren } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <section className="max-w-300 mx-auto px-2">
      <Header />
      <section className="min-h-screen">{children}</section>
      <Footer />
    </section>
  );
};

export default Layout;
