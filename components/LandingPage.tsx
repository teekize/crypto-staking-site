import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useStaking } from "@/context/StakingContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RiCoinLine, RiTimeLine, RiPercentLine } from "react-icons/ri";

const LandingPage: React.FC = () => {
  const { connectWallet } = useStaking();

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
            onClick={() => connectWallet("metamask")}
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
    </div>
  );
};

export default LandingPage;
