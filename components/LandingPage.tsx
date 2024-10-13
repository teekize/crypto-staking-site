import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useStaking } from "@/context/StakingContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RiCoinLine, RiTimeLine, RiPercentLine, RiBitCoinLine } from "react-icons/ri";
import Image from "next/image";
import { Loader2 } from "lucide-react";
type WalletType = "metamask" | "trustwallet" | "binancechain";

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
    <div className="h-full flex flex-col items-center justify-center p-4 space-y-8 overflow-hidden">
      <div className="w-full max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <p className="text-base md:text-lg text-gray-600 mb-4">
            Earn rewards by staking your CAUSE tokens
          </p>
          <Button
            onClick={() => setIsOpen(true)}
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Connect Wallet
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mb-8"
        >
          <Card className="bg-white shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl font-bold text-center text-gray-800">
                What is Staking?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-center mb-4 text-gray-700 text-sm">
                Staking is a way to earn rewards by holding and locking up your
                cryptocurrency. Staking is like earning interest on your
                savings, but with potentially higher returns!
              </p>
              <div className="grid grid-cols-3 gap-4 text-center">
                {[
                  {
                    icon: RiCoinLine,
                    title: "Lock Your Tokens",
                    desc: "Commit your CAUSE tokens to the staking pool",
                    color: "text-blue-500",
                  },
                  {
                    icon: RiTimeLine,
                    title: "Choose Your Duration",
                    desc: "Stake for 1, 2, or 3 years",
                    color: "text-green-500",
                  },
                  {
                    icon: RiPercentLine,
                    title: "Earn Rewards",
                    desc: "Get 10% return per year on your staked tokens",
                    color: "text-purple-500",
                  },
                ].map((item, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <item.icon className={`text-3xl mb-2 ${item.color}`} />
                    <h3 className="font-semibold text-gray-800 text-sm">
                      {item.title}
                    </h3>
                    <p className="text-xs text-gray-600">{item.desc}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <Card className="bg-white shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl font-bold text-center text-gray-800">
                Potential Returns
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                {[1, 2, 3].map((year) => (
                  <div
                    key={year}
                    className="text-center p-3 bg-gray-50 rounded-lg"
                  >
                    <h3 className="font-bold text-sm mb-1 text-gray-800">
                      {year} Year{year > 1 ? "s" : ""}
                    </h3>
                    <p className="text-lg font-semibold text-green-600">
                      {year * 10}% Return
                    </p>
                    <p className="text-xs mt-1 text-gray-600">
                      1000 → {1000 + 1000 * 0.1 * year}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Wallet selection modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-lg p-8 max-w-sm w-full mx-4"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
            >
              <h2 className="text-2xl font-bold mb-4 text-center">
                Choose a Wallet
              </h2>
              <p className="text-gray-600 mb-6 text-center">
                Select the wallet you want to connect with.
              </p>
              <div className="flex flex-col space-y-4">
                <Button
                  onClick={() => handleConnect("metamask")}
                  disabled={isLoading || !!connectingWallet}
                  className="py-3 text-lg flex items-center justify-center bg-black text-white hover:bg-black/90"
                >
                  <Image
                    src="/metamask.png"
                    alt="MetaMask"
                    width={24}
                    height={24}
                    className="mr-2"
                  />
                  MetaMask
                </Button>
                <Button
                  onClick={() => handleConnect("trustwallet")}
                  disabled={isLoading || !!connectingWallet}
                  className="py-3 text-lg flex items-center justify-center bg-[#3375BB] text-white hover:bg-[#3375BB]/90"
                >
                  <Image
                    src="/trustwallet.png"
                    alt="Trust Wallet"
                    width={24}
                    height={24}
                    className="mr-2"
                  />
                  Trust Wallet
                </Button>
                <Button
                  onClick={() => handleConnect("binancechain")}
                  disabled={isLoading || !!connectingWallet}
                  className="py-3 text-lg flex items-center justify-center bg-[#F0B90B] text-white hover:bg-[#F0B90B]/90"
                >
                  <RiBitCoinLine className="mr-2 text-2xl" />
                  Binance Chain Wallet
                </Button>
              </div>
              <Button
                onClick={() => setIsOpen(false)}
                variant="outline"
                className="mt-6 w-full"
              >
                Cancel
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Connection progress modal */}
      <AnimatePresence>
        {connectingWallet && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-lg p-8 max-w-sm w-full mx-4"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
            >
              <div className="text-center">
                <Loader2 className="h-16 w-16 animate-spin text-light-red mx-auto mb-4" />
                <h2 className="text-2xl font-bold mb-2">
                  Connecting to{" "}
                  {connectingWallet === "metamask"
                    ? "MetaMask"
                    : "Trust Wallet"}
                </h2>
                <p className="text-gray-600 mb-4">
                  Please wait while we establish a secure connection to your
                  wallet...
                </p>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                  <motion.div
                    className="bg-light-red h-2.5 rounded-full"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 2, repeat: Infinity }}
                  ></motion.div>
                </div>
                <p className="text-sm text-gray-500">
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
