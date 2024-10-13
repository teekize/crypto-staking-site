"use client";
import { Suspense } from "react";
import StakingDashboard from "@/components/staking-dashboard";
import StakeList from "@/components/stake-list";
import ErrorBoundary from "@/components/error-boundary";
import LandingPage from "@/components/LandingPage";
import { useStaking } from "@/context/StakingContext";
import WalletInfoWrapper from "@/components/WalletInfoWrapper";
import TransactionStatus from "@/components/TransactionStatus";

export default function Home() {
  const { isConnected, currentTransaction } = useStaking();

  return (
    <ErrorBoundary>
      {!isConnected ? (
        <div className="flex justify-center">
          <div className="w-full max-w-3xl">
            <LandingPage />
          </div>
        </div>
      ) : (
        <div className="flex justify-center">
          <div className="w-full max-w-4xl">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="md:w-3/5">
                <Suspense fallback={<div>Loading...</div>}>
                  <StakingDashboard />
                </Suspense>
                <Suspense fallback={<div>Loading stakes...</div>}>
                  <StakeList />
                </Suspense>
              </div>
              <div className="md:w-2/5">
                <WalletInfoWrapper />
              </div>
            </div>
          </div>
        </div>
      )}
      {currentTransaction && (
        <div className="fixed bottom-4 right-4 z-50">
          <TransactionStatus />
        </div>
      )}
    </ErrorBoundary>
  );
}
