"use client";
import React from "react";
import { useStaking } from "@/context/StakingContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RiWallet3Line, RiGlobalLine, RiCoinLine } from "react-icons/ri";
import { SiEthereum } from "react-icons/si";

const WalletInfo: React.FC = () => {
  const { walletAddress, networkName, ethBalance, causeBalance } = useStaking();

  return (
    <Card className="w-full md:h-full">
      <CardHeader className="md:sticky md:top-0 bg-white z-10">
        <CardTitle className="flex items-center text-lg md:text-xl">
          <RiWallet3Line className="mr-2" />
          Wallet Information
        </CardTitle>
      </CardHeader>
      <CardContent className="text-sm md:text-base">
        <div className="space-y-2">
          <p className="flex items-center">
            <RiWallet3Line className="mr-2 text-gray-500" />
            <span className="font-semibold mr-1">Wallet:</span>
            {walletAddress
              ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`
              : "Not connected"}
          </p>
          <p className="flex items-center">
            <RiGlobalLine className="mr-2 text-gray-500" />
            <span className="font-semibold mr-1">Network:</span>
            {networkName || "Unknown"}
          </p>
          <p className="flex items-center">
            <SiEthereum className="mr-2 text-gray-500" />
            <span className="font-semibold mr-1">ETH Balance:</span>
            {ethBalance
              ? `${parseFloat(ethBalance).toFixed(4)} ETH`
              : "Unknown"}
          </p>
          <p className="flex items-center">
            <RiCoinLine className="mr-2 text-gray-500" />
            <span className="font-semibold mr-1">CAUSE Balance:</span>
            {causeBalance
              ? `${parseFloat(causeBalance).toFixed(2)} CAUSE`
              : "Unknown"}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default WalletInfo;
