import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useStaking } from "@/context/StakingContext";
import { RiCoinLine, RiTimeLine, RiPercentLine } from "react-icons/ri";
import Image from "next/image";
import { Loader2 } from "lucide-react";

type WalletType = "metamask" | "trustwallet";

const LandingPage: React.FC = () => {
  const { connectWallet, isLoading } = useStaking();
  const [isOpen, setIsOpen] = useState(false);
  const [connectingWallet, setConnectingWallet] = useState<WalletType | null>(null);

  const handleConnect = async (walletType: WalletType) => {
    setConnectingWallet(walletType);
    setIsOpen(false);
    try {
      await connectWallet(walletType);
    } finally {
      setConnectingWallet(null);
    }
  };

  return (
    <div className="space-y-10 py-6">
      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center space-y-6"
      >
        <p className="text-lg text-[#8B4513]/80">
          Earn rewards by staking your CAUSE tokens
        </p>
        <Button
          onClick={() => setIsOpen(true)}
          size="lg"
          className="bg-gradient-to-r from-[#B8860B] to-[#DAA520] hover:from-[#DAA520] hover:to-[#B8860B] text-white px-8 py-4 text-base rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
        >
          Connect Wallet
        </Button>
      </motion.div>

      {/* Features Section - Simplified */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="space-y-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              icon: RiCoinLine,
              title: "Lock Tokens",
              desc: "Commit CAUSE tokens to earn",
              color: "text-[#B8860B]",
            },
            {
              icon: RiTimeLine,
              title: "Choose Duration",
              desc: "1-3 years staking period",
              color: "text-[#DAA520]",
            },
            {
              icon: RiPercentLine,
              title: "Earn Rewards",
              desc: "10% APY on staked tokens",
              color: "text-[#CD853F]",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              className="bg-white/50 backdrop-blur-sm rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-300"
              whileHover={{ scale: 1.02 }}
            >
              <item.icon className={`text-3xl mb-2 ${item.color}`} />
              <h3 className="font-semibold text-[#8B4513] text-base mb-1">
                {item.title}
              </h3>
              <p className="text-[#8B4513]/70 text-sm">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Potential Returns Section - More Compact */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="space-y-4"
      >
        <h2 className="text-xl font-bold text-center text-[#8B4513]">
          Potential Returns
        </h2>
        <div className="grid grid-cols-3 gap-4">
          {[
            { year: 1, return: 10, amount: "1000 → 1100" },
            { year: 2, return: 20, amount: "1000 → 1200" },
            { year: 3, return: 30, amount: "1000 → 1300" },
          ].map((item) => (
            <motion.div
              key={item.year}
              className="bg-gradient-to-br from-[#FFD700]/10 to-[#DAA520]/20 p-3 rounded-xl text-center"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <h3 className="font-bold text-base mb-1 text-[#8B4513]">
                {item.year}Y
              </h3>
              <p className="text-lg font-semibold text-[#B8860B]">
                {item.return}%
              </p>
              <p className="text-xs text-[#8B4513]/70">
                {item.amount}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Wallet selection modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              className="bg-gradient-to-br from-white to-[#FDF5E6]/50 rounded-2xl p-8 max-w-sm w-full mx-auto shadow-2xl border border-[#FFD700]/20 backdrop-blur-md"
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold mb-3 text-[#8B4513]">
                  Connect Your Wallet
                </h2>
                <p className="text-[#8B4513]/70">
                  Choose your preferred wallet to start staking
                </p>
              </div>

              <div className="flex flex-col space-y-4">
                <motion.button
                  onClick={() => handleConnect("metamask")}
                  disabled={isLoading || !!connectingWallet}
                  className="flex items-center justify-center space-x-3 bg-gradient-to-r from-[#B8860B] to-[#DAA520] p-4 rounded-xl text-white hover:from-[#DAA520] hover:to-[#B8860B] transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-50 group"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="relative w-8 h-8">
                    <Image
                      src="/metamask.png"
                      alt="MetaMask"
                      fill
                      className="object-contain group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <span className="text-lg font-medium">MetaMask</span>
                </motion.button>

                <motion.button
                  onClick={() => handleConnect("trustwallet")}
                  disabled={isLoading || !!connectingWallet}
                  className="flex items-center justify-center space-x-3 bg-white border-2 border-[#B8860B] p-4 rounded-xl text-[#B8860B] hover:bg-[#B8860B] hover:text-white transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-50 group"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="relative w-8 h-8">
                    <Image
                      src="/trustwallet.png"
                      alt="Trust Wallet"
                      fill
                      className="object-contain group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <span className="text-lg font-medium">Trust Wallet</span>
                </motion.button>
              </div>

              <motion.button
                onClick={() => setIsOpen(false)}
                className="mt-6 w-full py-3 text-[#8B4513]/70 hover:text-[#8B4513] transition-colors duration-300 text-sm"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Cancel
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Connection progress modal */}
      <AnimatePresence>
        {connectingWallet && (
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-gradient-to-br from-white to-[#FDF5E6]/50 rounded-2xl p-8 max-w-sm w-full mx-auto shadow-2xl border border-[#FFD700]/20 backdrop-blur-md"
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              <div className="text-center">
                <div className="relative w-20 h-20 mx-auto mb-6">
                  <Loader2 className="w-full h-full animate-spin text-[#B8860B]" />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#FFD700]/20 to-transparent animate-pulse rounded-full" />
                </div>
                
                <h2 className="text-2xl font-bold mb-3 text-[#8B4513]">
                  Connecting to {connectingWallet === "metamask" ? "MetaMask" : "Trust Wallet"}
                </h2>
                
                <p className="text-[#8B4513]/70 mb-6">
                  Please confirm the connection in your wallet...
                </p>
                
                <div className="w-full bg-[#FDF5E6] rounded-full h-2 mb-4 overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-[#B8860B] to-[#DAA520]"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  />
                </div>
                
                <p className="text-sm text-[#8B4513]/50">
                  This may take a few moments
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LandingPage;
