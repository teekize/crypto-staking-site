"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useStaking } from "@/context/StakingContext";
import { Loader2 } from "lucide-react";
import Image from "next/image";

export default function ConnectWalletCard() {
  const { isConnected, connectWallet, isLoading } = useStaking();
  const [isOpen, setIsOpen] = useState(false);
  const [connectingWallet, setConnectingWallet] = useState<
    "metamask" | "trustwallet" | null
  >(null);

  if (isConnected) {
    return null;
  }

  const handleConnect = async (walletType: "metamask" | "trustwallet") => {
    setConnectingWallet(walletType);
    setIsOpen(false);
    try {
      await connectWallet(walletType);
    } finally {
      setConnectingWallet(null);
    }
  };

  return (
    <>
      {/* <motion.div
        className="bg-white p-6 rounded-lg shadow-md mb-8 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      > */}
      <h2 className="text-xl sm:text-2xl font-bold mb-4 mx-auto">
        Connect your wallet to start staking
      </h2>
      <Button className="w-full" onClick={() => setIsOpen(true)}>
        Connect Wallet
      </Button>
      {/* </motion.div> */}

      {/* Full-screen wallet selection modal */}
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

      {/* Full-screen connection progress modal */}
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
    </>
  );
}
