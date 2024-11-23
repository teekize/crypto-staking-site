// components/staking-dashboard.tsx
"use client";

import { useStaking } from "@/context/StakingContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const StakingDashboard = () => {
  const { addStake, causeBalance } = useStaking();
  const [amount, setAmount] = useState("");
  const [selectedPeriod, setSelectedPeriod] = useState(1); // 1, 2, or 3 years

  const handleStake = async () => {
    if (!amount) return;
    await addStake(parseFloat(amount), selectedPeriod);
    setAmount("");
  };

  const handleMaxAmount = () => {
    setAmount(causeBalance?.toString() || "");
  };

  const calculateReturn = () => {
    if (!amount) return "NaN";
    return parseFloat(amount) * (selectedPeriod * 0.1);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-[#8B4513]">Stake Your Cause</h2>

      {/* Amount Input Section */}
      <div className="space-y-2">
        <label className="text-sm text-[#8B4513]/70">Amount to Stake</label>
        <div className="relative">
          <Input
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full pr-16 border border-[#DAA520]/30 rounded-lg h-12 focus:ring-[#B8860B]/20 focus:border-[#B8860B]"
          />
          <button
            onClick={handleMaxAmount}
            className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1 text-sm font-medium text-[#B8860B] hover:text-[#DAA520] transition-colors"
          >
            Max
          </button>
        </div>
      </div>

      {/* Stake Period Selection */}
      <div className="space-y-2">
        <label className="text-sm text-[#8B4513]/70">Stake Period</label>
        <div className="grid grid-cols-3 gap-4">
          {[
            { years: 1, return: 10 },
            { years: 2, return: 20 },
            { years: 3, return: 30 },
          ].map((period) => (
            <button
              key={period.years}
              onClick={() => setSelectedPeriod(period.years)}
              className={`p-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                selectedPeriod === period.years
                  ? "bg-gradient-to-r from-[#B8860B] to-[#DAA520] text-white shadow-md"
                  : "bg-[#FDF5E6] text-[#8B4513] hover:bg-[#FFD700]/20"
              }`}
            >
              {period.years} Year{period.years > 1 ? "s" : ""} @ {period.return}
              % Return
            </button>
          ))}
        </div>
      </div>

      {/* Estimated Return */}
      <div className="bg-[#FDF5E6] rounded-lg p-4">
        <div className="flex justify-between items-center">
          <span className="text-sm text-[#8B4513]/70">Estimated Return:</span>
          <span className="text-lg font-medium text-[#8B4513]">
            {calculateReturn()} tokens
          </span>
        </div>
      </div>

      {/* Stake Button */}
      <Button
        onClick={handleStake}
        className="w-full h-12 text-lg bg-gradient-to-r from-[#B8860B] to-[#DAA520] text-white hover:from-[#DAA520] hover:to-[#B8860B] transition-all duration-300 shadow-md hover:shadow-lg"
      >
        Place Stake
      </Button>

      {/* Stats Grid */}
    </div>
  );
};

export default StakingDashboard;
