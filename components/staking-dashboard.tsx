// components/staking-dashboard.tsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import ConnectWalletCard from "@/components/connect-wallet-card";

export default function StakingDashboard() {
  const [amount, setAmount] = useState("");
  const [period, setPeriod] = useState("1");
  const [isOpen, setIsOpen] = useState(false);
  const { addStake, isLoading, isConnected } = useStaking();

  const calculateReturn = () => {
    return parseFloat(amount) * 0.1 * parseInt(period);
  };

  const handleStake = async () => {
    await addStake(parseFloat(amount), parseInt(period));
    setIsOpen(false);
    setAmount("");
    setPeriod("1");
  };

  if (!isConnected) {
    return "";
  }

  return (
    <motion.div
      className="bg-white p-6 rounded-lg shadow-md mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-xl sm:text-2xl font-bold mb-4">Stake Your Crypto</h2>
      <div className="space-y-4">
        <div>
          <Label htmlFor="amount">Amount to Stake</Label>
          <Input
            id="amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="period">Stake Period (Years)</Label>
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1 Year</SelectItem>
              <SelectItem value="2">2 Years</SelectItem>
              <SelectItem value="3">3 Years</SelectItem>
              <SelectItem value="4">4 Years</SelectItem>
              <SelectItem value="5">5 Years</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <p className="text-sm text-gray-600">
            Estimated Return: {calculateReturn()} tokens
          </p>
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="w-full">Place Stake</Button>
          </DialogTrigger>
          <DialogContent>
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
                {isLoading ? "Processing..." : "Confirm Stake"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </motion.div>
  );
}
