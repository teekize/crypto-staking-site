// components/staking-dashboard.tsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useStaking } from "@/context/StakingContext";

export default function StakingDashboard() {
  const [amount, setAmount] = useState("");
  const [period, setPeriod] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const {
    addStake,
    isLoading,
    isConnected,
    causeBalance,
  } = useStaking();

  const calculateReturn = () => {
    return parseFloat(amount) * 0.1 * period;
  };

  const handleStake = async () => {
    setIsOpen(false); // Close the modal immediately
    await addStake(parseFloat(amount), period);
    setAmount("");
    setPeriod(1);
  };

  const setMaxBalance = () => {
    setAmount(causeBalance || "0");
  };

  if (!isConnected) {
    return null;
  }

  return (
    <motion.div
      className="bg-white p-4 sm:p-6 rounded-lg shadow-md mb-8 relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-xl sm:text-2xl font-bold mb-4">Stake Your Crypto</h2>
      <div className="space-y-4">
        <div>
          <Label htmlFor="amount">Amount to Stake</Label>
          <div className="relative mt-1">
            <Input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              className="pr-20"
            />
            <Button
              className="absolute right-0 top-0 h-full rounded-l-none w-32"
              onClick={setMaxBalance}
              variant="secondary"
            >
              Max
            </Button>
          </div>
        </div>
        <div>
          <Label>Stake Period</Label>
          <div className="flex flex-col sm:grid sm:grid-cols-3 gap-2 mt-1">
            {[1, 2, 3].map((year) => (
              <Button
                key={year}
                onClick={() => setPeriod(year)}
                variant={period === year ? "default" : "outline"}
                className="w-full py-4 sm:py-2 text-base sm:text-sm"
              >
                {year} Year{year > 1 ? "s" : ""}
                <br />
                <span className="text-sm"> @ {year * 10}% Return</span>
              </Button>
            ))}
          </div>
        </div>
        <div>
          <p className="text-sm text-gray-600">
            Estimated Return: {calculateReturn()} tokens
          </p>
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="w-full py-4 sm:py-2 text-base sm:text-sm">
              Place Stake
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Confirm Stake</DialogTitle>
              <DialogDescription>
                Are you sure you want to stake {amount} tokens for {period}{" "}
                year(s)?
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleStake} disabled={isLoading}>
                Confirm Stake
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </motion.div>
  );
}
