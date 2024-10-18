"use client";

import { motion } from "framer-motion";
import { useStaking } from "@/context/StakingContext";
import { Button } from "@/components/ui/button";

export default function Header() {
  const { isConnected, disconnectWallet } = useStaking();

  return (
    <header className="bg-gradient-to-r from-yellow-300 to-yellow-400 text-black py-6 px-4 sm:px-6 lg:px-8 shadow-md">
      <div className="container mx-auto max-w-4xl flex justify-between items-center">
        <motion.h1
          className="text-2xl sm:text-3xl font-bold"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Cause Staking Platform
        </motion.h1>
        {isConnected && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Button
              variant="outline"
              size="sm"
              onClick={disconnectWallet}
              className="bg-white text-yellow-600 border-yellow-400 hover:bg-yellow-50 hover:text-yellow-700 transition-colors"
            >
              Disconnect Wallet
            </Button>
          </motion.div>
        )}
      </div>
    </header>
  );
}
