"use client";

import { motion } from "framer-motion";
import { useStaking } from "@/context/StakingContext";
import { formatDistanceToNow, addSeconds, format } from 'date-fns';
import { BigNumber, ethers } from 'ethers';

export default function AllStakesPage() {
  const { stakes, isLoading, isConnected } = useStaking();

  if (!isConnected) {
    return null;
  }

  const formatDuration = (seconds: number) => {
    const years = Math.floor(seconds / (365 * 24 * 60 * 60));
    return `${years} year${years !== 1 ? 's' : ''}`;
  };

  const calculateVestingStart = (startTime: number, duration: number) => {
    const vestingStartDate = addSeconds(new Date(startTime * 1000), duration);
    const now = new Date();
    if (vestingStartDate <= now) {
      return "Vesting available";
    }
    return formatDistanceToNow(vestingStartDate, { addSuffix: true });
  };

  const calculateReturn = (amount: BigNumber, duration: number) => {
    const years = duration / (365 * 24 * 60 * 60);
    const returnPercentage = Math.floor(years * 10);
    return amount.mul(returnPercentage).div(100);
  };

  const formatTokenAmount = (amount: BigNumber) => {
    return parseFloat(ethers.utils.formatUnits(amount, 18)).toLocaleString(undefined, {
      maximumFractionDigits: 0,
    });
  };

  return (
    <motion.div
      className="container mx-auto p-4 max-w-7xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-3xl font-bold mb-6">Your Stakes</h1>
      {isLoading ? (
        <p>Loading stakes...</p>
      ) : stakes.length === 0 ? (
        <p>You have no active stakes.</p>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expected Return</th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Start Time</th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vesting Begins</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {stakes.map((stake) => (
                  <motion.tr 
                    key={stake.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{stake.id}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                      {stake.amount} CAUSE
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDuration(stake.duration)}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                      {stake.amount*0.1*(stake.duration/(365 * 24 * 60 * 60))} CAUSE
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                      {format(new Date(stake.startTime * 1000), 'MMM d, yyyy HH:mm')}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                      {calculateVestingStart(stake.startTime, stake.duration)}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </motion.div>
  );
}
