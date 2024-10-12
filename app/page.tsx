"use client";
import { Suspense } from "react";
import StakingDashboard from "@/components/staking-dashboard";
import StakeList from "@/components/stake-list";
import ErrorBoundary from "@/components/error-boundary";
import LandingPage from "@/components/LandingPage";
import { useStaking } from "@/context/StakingContext";

export default function Home() {
  const { isConnected } = useStaking();

  return (
    <ErrorBoundary>
      {!isConnected ? (
        <LandingPage />
      ) : (
        <div className="flex flex-col items-center h-full space-y-6 overflow-auto">
          <div className="w-full max-w-2xl">
            <Suspense fallback={<div>Loading...</div>}>
              <StakingDashboard />
            </Suspense>
          </div>
          <div className="w-full max-w-2xl">
            <Suspense fallback={<div>Loading stakes...</div>}>
              <StakeList />
            </Suspense>
          </div>
        </div>
      )}
    </ErrorBoundary>
  );
}