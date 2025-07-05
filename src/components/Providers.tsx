'use client';

import { WagmiConfig } from 'wagmi';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { config, chains } from '@/lib/wagmi';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { Toaster } from 'react-hot-toast';
import '@rainbow-me/rainbowkit/styles.css';

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiConfig config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider chains={chains}>
          <div className="min-h-screen bg-background text-foreground">
            <div className="floating-gradient fixed inset-0 -z-10" />
            <Navbar />
            <main className="relative z-10">
              {children}
            </main>
            <Footer />
          </div>
          <Toaster 
            position="top-right"
            toastOptions={{
              style: {
                background: 'hsl(var(--card))',
                color: 'hsl(var(--card-foreground))',
                border: '1px solid hsl(var(--border))',
              },
            }}
          />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiConfig>
  );
} 