"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useStaking, Stake } from "@/context/StakingContext";

interface YourStakesProps {
  stake: Stake;
}
const formatDuration = (seconds: number) => {
  const years = Math.floor(seconds / (365 * 24 * 60 * 60));
  return `${years} year${years !== 1 ? "s" : ""}`;
};

export default function YourStakes({ stake }: YourStakesProps) {
  const { vestStake, isLoading } = useStaking();
  // const isVestingPeriodElapsed = new Date() > (stake.startTime + stake.duration * 365 * 24 * 60 * 60);
  const isVestingPeriodElapsed =
    new Date() >
    new Date(stake.startTime + stake.duration * 365 * 24 * 60 * 60 * 1000);

  return (
    <motion.div
      className="bg-light-red bg-opacity-10 p-4 rounded-md"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <p className="text-sm sm:text-base">Amount: {stake.amount} tokens</p>
      <p className="text-sm sm:text-base">
        Period: {formatDuration(stake.duration)}
      </p>
      <p className="text-sm sm:text-base">
        Return: {stake.amount * 0.1} tokens
      </p>
      <p className="text-sm sm:text-base">
        Vested: {stake.vestedAmount} tokens
      </p>
      <div className="mt-2 space-x-2 flex flex-wrap gap-2">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              View Details
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Stake Details</DialogTitle>
              <DialogDescription>
                <p>Amount: {stake.amount} tokens</p>
                <p>Period: {formatDuration(stake.duration)} </p>
                <p>Start Date: {stake.startTime}</p>
                <p>
                  End Date:{" "}
                  {stake.startTime + stake.duration * 365 * 24 * 60 * 60}
                </p>
                <p>Return: {stake.amount * 0.1} tokens</p>
                <p>Vested: {stake.vestedAmount} tokens</p>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
        {isVestingPeriodElapsed && (
          <Button
            onClick={() => vestStake(parseInt(stake.id))}
            disabled={isLoading}
            size="sm"
          >
            {isLoading ? "Processing..." : "Vest 5%"}
          </Button>
        )}
      </div>
    </motion.div>
  );
}
