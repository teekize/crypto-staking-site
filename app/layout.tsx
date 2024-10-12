// app/layout.tsx
// "use client";
import { StakingProvider, useStaking } from "@/context/StakingContext";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import Header from "@/components/header";
import WalletInfoWrapper from "@/components/WalletInfoWrapper";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Crypto Staking Platform",
  description: "Stake your crypto and earn rewards",
};

function MainContent({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex-grow overflow-hidden">
      <div className="container h-full mx-auto px-4">
        <StakingContent>{children}</StakingContent>
      </div>
    </main>
  );
}

function StakingContent({ children }: { children: React.ReactNode }) {
  const isConnected = true;

  return isConnected ? (
    <div className="flex flex-col md:grid md:grid-cols-4 gap-4 h-full">
      <div className="md:col-span-3 overflow-auto">{children}</div>
      <div className="md:col-span-1">
        <WalletInfoWrapper />
      </div>
    </div>
  ) : (
    <div className="h-full overflow-auto">{children}</div>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${poppins.className} bg-light-red bg-opacity-50 overflow-hidden`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <StakingProvider>
            <div className="flex flex-col h-screen">
              <Header />
              <MainContent>{children}</MainContent>
            </div>
            <Toaster />
          </StakingProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
