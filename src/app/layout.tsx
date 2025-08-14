import '@/styles/globals.scss';
import { CartProvider } from '@/context/CartContext';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer';
import { Vazirmatn } from 'next/font/google';
import React, { ReactNode } from 'react';

const vazir = Vazirmatn({
  subsets: ['latin', 'arabic'], 
  weight: ['400', '700'],
  variable: '--font-vazir',
});

type LayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="fa">
      <body className={`${vazir.variable} root-layout`}>
        <CartProvider>
          <Header />
          <div className="content-wrapper">{children}</div>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
