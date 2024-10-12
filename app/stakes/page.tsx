"use client";

import { motion } from "framer-motion";
import { useStaking} from "@/context/StakingContext";
import YourStakes from "@/components/your-stakes";
import { Stake } from "@/context/StakingContext";

export default function AllStakesPage() {
  const { stakes, isLoading, isConnected } = useStaking();

  if (!isConnected) {
    return null;
  }

  return (
    <motion.div
      className="container mx-auto p-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-2xl sm:text-3xl font-bold mb-6">All Stakes</h1>
      {isLoading ? (
        <p>Loading stakes...</p>
      ) : stakes.length === 0 ? (
        <p>You have no active stakes.</p>
      ) : (
        <div className="space-y-4">
          {stakes.map((stake) => (
            <YourStakes key={stake.id} stake={stake as Stake} />
          ))}
        </div>
      )}
    </motion.div>
  );
}
