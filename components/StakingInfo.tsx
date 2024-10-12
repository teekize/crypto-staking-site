import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RiCoinLine, RiTimeLine, RiPercentLine } from "react-icons/ri";

const StakingInfo: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-4xl mx-auto"
    >
      <Card className="mb-6 bg-white bg-opacity-80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-gray-800">
            What is Staking?
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="mb-4 text-gray-700">
            Staking is a way to earn rewards by holding and locking up your
            cryptocurrency. It's like earning interest on your savings, but with
            potentially higher returns!
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="flex flex-col items-center">
              <RiCoinLine className="text-4xl mb-2 text-blue-500" />
              <h3 className="font-semibold text-gray-800">Lock Your Tokens</h3>
              <p className="text-sm text-gray-600">
                Commit your CAUSE tokens to the staking pool
              </p>
            </div>
            <div className="flex flex-col items-center">
              <RiTimeLine className="text-4xl mb-2 text-green-500" />
              <h3 className="font-semibold text-gray-800">Choose Your Duration</h3>
              <p className="text-sm text-gray-600">Stake for 1, 2, or 3 years</p>
            </div>
            <div className="flex flex-col items-center">
              <RiPercentLine className="text-4xl mb-2 text-purple-500" />
              <h3 className="font-semibold text-gray-800">Earn Rewards</h3>
              <p className="text-sm text-gray-600">
                Get 10% return per year on your staked tokens
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
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
                className="text-center p-4 bg-gray-100 rounded-lg shadow-md"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <h3 className="font-bold text-lg mb-2 text-gray-800">
                  {year} Year{year > 1 ? "s" : ""}
                </h3>
                <p className="text-2xl font-semibold text-green-600">
                  {year * 10}% Return
                </p>
                <p className="text-sm mt-2 text-gray-600">
                  1000 CAUSE → {1000 + 1000 * 0.1 * year} CAUSE
                </p>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default StakingInfo;