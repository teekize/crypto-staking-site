"use client";

import { Suspense } from "react";
import StakingDashboard from "@/components/staking-dashboard";
import StakeList from "@/components/stake-list";
import ErrorBoundary from "@/components/error-boundary";
import LandingPage from "@/components/LandingPage";
import { useStaking } from "@/context/StakingContext";
import WalletInfoWrapper from "@/components/WalletInfoWrapper";
import TransactionStatus from "@/components/TransactionStatus";
// import { Header } from "@/components/header";

export default function StakingPage() {
  const { isConnected, currentTransaction } = useStaking();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFD700]/5 via-[#DAA520]/10 to-[#B8860B]/15">

      <ErrorBoundary>
        <div className="pt-10 pb-0 px-2">
          {!isConnected ? (
            <div className="flex justify-center">
              <div className="w-full max-w-5xl">
                <div className="text-center mb-8">
                  <h1 className="text-3xl md:text-4xl font-bold text-[#8B4513] mb-4">
                    Stake Your Cause
                  </h1>
                  <p className="text-lg text-[#8B4513]/70">
                    Connect your wallet to start staking and earning rewards
                  </p>
                </div>
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-[#FFD700]/20 shadow-xl p-8 md:p-12">
                  <LandingPage />
                </div>
              </div>
            </div>
          ) : (
            <div className="flex justify-center">
              <div className="w-full max-w-4xl">
                <div className="text-center mb-8">
                  <h1 className="text-3xl md:text-4xl font-bold text-[#8B4513] mb-4">
                    Staking Dashboard
                  </h1>
                  <p className="text-lg text-[#8B4513]/70">
                    Manage your stakes and track your rewards
                  </p>
                </div>
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-3/5 space-y-6">
                    <Suspense 
                      fallback={
                        <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-[#FFD700]/20 p-6 h-48 animate-pulse">
                          <div className="h-6 w-2/3 bg-[#FFD700]/20 rounded mb-4"></div>
                          <div className="h-4 w-1/2 bg-[#FFD700]/20 rounded"></div>
                        </div>
                      }
                    >
                      <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-[#FFD700]/20 shadow-lg p-6">
                        <StakingDashboard />
                      </div>
                    </Suspense>
                    <Suspense 
                      fallback={
                        <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-[#FFD700]/20 p-6 h-48 animate-pulse">
                          <div className="h-6 w-3/4 bg-[#FFD700]/20 rounded mb-4"></div>
                          <div className="h-4 w-1/2 bg-[#FFD700]/20 rounded"></div>
                        </div>
                      }
                    >
                      <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-[#FFD700]/20 shadow-lg p-6">
                        <StakeList />
                      </div>
                    </Suspense>
                  </div>
                  <div className="md:w-2/5">
                    <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-[#FFD700]/20 shadow-lg p-6">
                      <WalletInfoWrapper />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {currentTransaction && (
            <div className="fixed bottom-4 right-4 z-50">
              <div className="bg-white/95 backdrop-blur-md rounded-xl border border-[#FFD700]/20 shadow-lg p-4">
                <TransactionStatus />
              </div>
            </div>
          )}
        </div>
      </ErrorBoundary>
    </div>
  );
} 