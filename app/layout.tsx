import './globals.css';
import type { Metadata } from 'next';
import { CartProvider } from '@/components/cart/cart-provider';

export const metadata: Metadata = {
  title: 'Luxry Lighting',
  description: 'Luxury lighting catalog built with Next.js and MongoDB',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="bg-background text-zinc-100">
        <CartProvider>
          <header className="sticky top-0 z-20 backdrop-blur bg-background/70 border-b border-zinc-800">
            <div className="container flex items-center justify-between py-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gold-500" />
                <div className="text-xl font-semibold">Luxry</div>
              </div>
              <nav className="flex items-center gap-4 text-sm text-zinc-400">
                <a href="/catalog">Catalog</a>
                <a href="/cart">Cart</a>
                <a href="/account">Account</a>
              </nav>
            </div>
          </header>
          <main className="min-h-screen pb-24">{children}</main>
          <footer className="border-t border-zinc-800 py-8 text-center text-sm text-zinc-500">
            Crafted for modern interiors • Dark &amp; gold aesthetic
          </footer>
        </CartProvider>
      </body>
    </html>
  );
}
