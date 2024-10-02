"use client";
import { Suspense } from "react";
import Header from "@/components/header";
import StakingDashboard from "@/components/staking-dashboard";
import StakeList from "@/components/stake-list";
import ErrorBoundary from "@/components/error-boundary";
import ConnectWalletCard from "@/components/connect-wallet-card";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <ErrorBoundary>
      <main className="flex flex-col min-h-screen">
        <Header />
        <div className="flex-grow flex items-center justify-center px-4 py-8">
          <div className="w-full max-w-md">
            <Suspense fallback={<div>Loading...</div>}>
              <ConnectWalletCard />
              <StakingDashboard />
            </Suspense>
            <Suspense fallback={<div>Loading stakes...</div>}>
              <StakeList />
            </Suspense>
          </div>
        </div>
      </main>
    </ErrorBoundary>
  );
}
