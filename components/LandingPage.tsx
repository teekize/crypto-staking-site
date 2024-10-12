import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useStaking } from "@/context/StakingContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RiCoinLine, RiTimeLine, RiPercentLine } from "react-icons/ri";

const LandingPage: React.FC = () => {
  const { connectWallet } = useStaking();

  return (
    <div className="min-h-screen flex flex-col items-center justify-between p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mt-8"
      >
        <h1 className="text-3xl md:text-5xl font-bold mb-2 text-gray-800">Welcome to CAUSE Staking</h1>
        <p className="text-lg md:text-xl text-gray-600 mb-4">Earn rewards by staking your CAUSE tokens</p>
        <Button onClick={() => connectWallet("metamask")} size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
          Connect Wallet
        </Button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="w-full max-w-5xl"
      >
        <Card className="bg-white bg-opacity-80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center text-gray-800">
              What is Staking?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center mb-4 text-gray-700">
              Staking is a way to earn rewards by holding and locking up your
              cryptocurrency. It's like earning interest on your savings, but with
              potentially higher returns!
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div className="flex flex-col items-center">
                <RiCoinLine className="text-3xl mb-2 text-blue-500" />
                <h3 className="font-semibold text-gray-800">Lock Your Tokens</h3>
                <p className="text-sm text-gray-600 text-center">
                  Commit your CAUSE tokens to the staking pool
                </p>
              </div>
              <div className="flex flex-col items-center">
                <RiTimeLine className="text-3xl mb-2 text-green-500" />
                <h3 className="font-semibold text-gray-800">Choose Your Duration</h3>
                <p className="text-sm text-gray-600 text-center">Stake for 1, 2, or 3 years</p>
              </div>
              <div className="flex flex-col items-center">
                <RiPercentLine className="text-3xl mb-2 text-purple-500" />
                <h3 className="font-semibold text-gray-800">Earn Rewards</h3>
                <p className="text-sm text-gray-600 text-center">
                  Get 10% return per year on your staked tokens
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="w-full max-w-5xl mb-8"
      >
        <Card className="bg-white bg-opacity-80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-center text-gray-800">
              Potential Returns
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[1, 2, 3].map((year) => (
                <motion.div
                  key={year}
                  className="text-center p-3 bg-gray-100 rounded-lg shadow-md"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <h3 className="font-bold text-lg mb-1 text-gray-800">
                    {year} Year{year > 1 ? "s" : ""}
                  </h3>
                  <p className="text-xl font-semibold text-green-600">
                    {year * 10}% Return
                  </p>
                  <p className="text-sm mt-1 text-gray-600">
                    1000 CAUSE → {1000 + 1000 * 0.1 * year} CAUSE
                  </p>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default LandingPage;