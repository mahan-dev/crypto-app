import { type PropsWithChildren } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <section className="w-full max-w-500 mx-auto px-4">
      <Header />
      <section className="min-h-screen py-6">{children}</section>
      <Footer />
    </section>
  );
};

export default Layout;
