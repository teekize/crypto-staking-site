"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { ethers } from "ethers";
import { toast } from "@/hooks/use-toast";
import { formatEther, parseEther } from "ethers";

export interface Stake {
  id: string;
  amount: number;
  startTime: number;
  duration: number;
  lastVestingTime: number;
  vestedAmount: number;
}

interface StakingContextType {
  isConnected: boolean;
  connectWallet: (walletType: "metamask" | "trustwallet") => Promise<void>;
  disconnectWallet: () => void;
  stakes: Stake[];
  addStake: (amount: number, period: number) => Promise<void>;
  vestStake: (stakeId: number) => Promise<void>;
  isLoading: boolean;
  error: string | null;
  walletAddress: string | null;
  networkName: string | null;
  ethBalance: string | null;
  causeBalance: string | null;
  fetchBalances: (provider: ethers.BrowserProvider, signer: ethers.Signer) => Promise<void>;
}

const StakingContext = createContext<StakingContextType | undefined>(undefined);

export const useStaking = () => {
  const context = useContext(StakingContext);
  if (!context) {
    throw new Error("useStaking must be used within a StakingProvider");
  }
  return context;
};

const CAUSE_TOKEN_ADDRESS = "0x32e72f81Afa6882d9B00b899a5c25b9161254Fab"; // Replace with your actual CAUSE token contract address
const CAUSE_TOKEN_ABI = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "balanceOf",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
];

export const StakingProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isConnected, setIsConnected] = useState(false);
  const [stakes, setStakes] = useState<Stake[]>([
    {
      id: "12",
      amount: 10,
      duration: 31536000, // 1 year in seconds
      startTime: Math.floor(Date.now() / 1000),
      lastVestingTime: Math.floor(Date.now() / 1000),
      vestedAmount: 0,
    },
  ]);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);
  const [signer, setSigner] = useState<ethers.Signer | null>(null);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [networkName, setNetworkName] = useState<string | null>(null);
  const [ethBalance, setEthBalance] = useState<string | null>(null);
  const [causeBalance, setCauseBalance] = useState<string | null>(null);

  const connectWallet = async (walletType: "metamask" | "trustwallet") => {
    setIsLoading(true);
    try {
      let ethereum: any;

      if (walletType === "metamask") {
        ethereum = (window as any).ethereum;
      } else if (walletType === "trustwallet") {
        ethereum =
          (window as any).ethereum
      }

      if (!ethereum) {
        throw new Error(`${walletType} is not installed`);
      }

      // Request account access
      await ethereum.request({ method: "eth_requestAccounts" });

      const provider = new ethers.BrowserProvider(ethereum);
      const signer = await provider.getSigner();

      // Get the connected network
      const network = await provider.getNetwork();
      console.log("Connected to network:", network.name);

      setProvider(provider);
      setSigner(signer);
      setIsConnected(true);
      setWalletAddress(await signer.getAddress());
      setNetworkName(network.name);
      
      // Fetch ETH and CAUSE balances
      await fetchBalances(provider, signer);

      toast({
        title: "Success",
        description: `${walletType} connected successfully`,
      });

      // Fetch stakes after connecting (implement this based on your contract)
      // await fetchStakes()
    } catch (err) {
      console.error("Failed to connect wallet:", err);
      setError(`Failed to connect ${walletType} wallet`);
      toast({
        title: `Failed to connect ${walletType} wallet`,
        description: `Failed to connect ${walletType} wallet`,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const disconnectWallet = () => {
    setIsConnected(false);
    setStakes([]);
    setProvider(null);
    setSigner(null);
    toast({
      title: "Success",
      description: "Wallet disconnected successfully",
    });
  };

  const fetchStakes = async () => {
    // This is a placeholder implementation
    // Replace with actual contract call when implemented
    setStakes([
      {
        id: "0",
        amount: 100,
        duration: 31536000, // 1 year in seconds
        startTime: Math.floor(Date.now() / 1000),
        lastVestingTime: Math.floor(Date.now() / 1000),
        vestedAmount: 0,
      },
    ]);
  };

  const addStake = async (amount: number, period: number) => {
    if (!signer) return;

    setIsLoading(true);
    try {
      // This is a placeholder implementation
      // Replace with actual contract call when implemented
      const newStake: Stake = {
        id: stakes.length.toString(),
        amount: amount,
        duration: period * 31536000, // Convert years to seconds
        startTime: Math.floor(Date.now() / 1000),
        lastVestingTime: Math.floor(Date.now() / 1000),
        vestedAmount: 0,
      };

      setStakes([...stakes, newStake]);

      toast({
        title: "Success",
        description: `Staked ${amount} tokens for ${period} year(s)`,
      });
    } catch (err) {
      console.error("Failed to add stake:", err);
      setError("Failed to add stake");
      toast({
        title: "Error",
        description: "Failed to add stake",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const vestStake = async (stakeId: number) => {
    if (!signer) return;

    setIsLoading(true);
    try {
      // This is a placeholder implementation
      // Replace with actual contract call when implemented
      setStakes(
        stakes.map((stake) => {
          if (stake.id === stakeId.toString()) {
            const amountToVest = stake.amount * 0.05; // 5% of the stake
            return {
              ...stake,
              vestedAmount: stake.vestedAmount + amountToVest,
              lastVestingTime: Math.floor(Date.now() / 1000),
            };
          }
          return stake;
        })
      );

      toast({
        title: "Success",
        description: "Vested 5% of the stake",
      });
    } catch (err) {
      console.error("Failed to vest stake:", err);
      setError("Failed to vest stake");
      toast({
        title: "Error",
        description: "Failed to vest stake",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fetchBalances = async (provider: ethers.BrowserProvider, signer: ethers.Signer) => {
    try {
      const address = await signer.getAddress();

      // Fetch ETH balance
      const ethBalance = await provider.getBalance(address);
      setEthBalance(formatEther(ethBalance));

      // Fetch CAUSE token balance
      const causeToken = new ethers.Contract(
        CAUSE_TOKEN_ADDRESS,
        CAUSE_TOKEN_ABI,
        provider
      );
      const causeBalance = await causeToken.balanceOf(address);
      setCauseBalance(formatEther(causeBalance));
    } catch (error) {
      console.error("Error fetching balances:", error);
      setError("Failed to fetch balances");
      toast({
        title: "Error",
        description: "Failed to fetch balances",
        variant: "destructive",
      });
    }
  };

  // Add an effect to update balances periodically
  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (isConnected && provider && signer) {
      // Fetch balances immediately
      fetchBalances(provider, signer);

      // Set up an interval to fetch balances every 30 seconds
      intervalId = setInterval(() => {
        fetchBalances(provider, signer);
      }, 30000);
    }

    // Clean up the interval when the component unmounts or when the wallet disconnects
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isConnected, provider, signer]);

  return (
    <StakingContext.Provider
      value={{
        isConnected,
        connectWallet,
        disconnectWallet,
        stakes,
        addStake,
        vestStake,
        isLoading,
        error,
        walletAddress,
        networkName,
        ethBalance,
        causeBalance,
        fetchBalances,
      }}
    >
      {children}
    </StakingContext.Provider>
  );
};
