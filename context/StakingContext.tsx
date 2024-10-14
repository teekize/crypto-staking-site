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

// Update the WalletType to include "binancechain"
type WalletType = "metamask" | "trustwallet" ;

interface TransactionStatus {
  type: string;
  status: "pending" | "confirmed" | "failed";
  hash: string;
  message: string;
}

interface StakingContextType {
  isConnected: boolean;
  connectWallet: (walletType: WalletType) => Promise<void>;
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
  fetchBalances: (
    provider: ethers.BrowserProvider,
    signer: ethers.Signer
  ) => Promise<void>;
  sendTokens: (recipient: string, amount: string) => Promise<void>;
  currentTransaction: TransactionStatus | null;
  setCurrentTransaction: React.Dispatch<
    React.SetStateAction<TransactionStatus | null>
  >;
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
    inputs: [
      { internalType: "address", name: "initialOwner", type: "address" },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  { inputs: [], name: "CheckpointUnorderedInsertion", type: "error" },
  { inputs: [], name: "ECDSAInvalidSignature", type: "error" },
  {
    inputs: [{ internalType: "uint256", name: "length", type: "uint256" }],
    name: "ECDSAInvalidSignatureLength",
    type: "error",
  },
  {
    inputs: [{ internalType: "bytes32", name: "s", type: "bytes32" }],
    name: "ECDSAInvalidSignatureS",
    type: "error",
  },
  {
    inputs: [
      { internalType: "uint256", name: "increasedSupply", type: "uint256" },
      { internalType: "uint256", name: "cap", type: "uint256" },
    ],
    name: "ERC20ExceededSafeSupply",
    type: "error",
  },
  {
    inputs: [
      { internalType: "address", name: "spender", type: "address" },
      { internalType: "uint256", name: "allowance", type: "uint256" },
      { internalType: "uint256", name: "needed", type: "uint256" },
    ],
    name: "ERC20InsufficientAllowance",
    type: "error",
  },
  {
    inputs: [
      { internalType: "address", name: "sender", type: "address" },
      { internalType: "uint256", name: "balance", type: "uint256" },
      { internalType: "uint256", name: "needed", type: "uint256" },
    ],
    name: "ERC20InsufficientBalance",
    type: "error",
  },
  {
    inputs: [{ internalType: "address", name: "approver", type: "address" }],
    name: "ERC20InvalidApprover",
    type: "error",
  },
  {
    inputs: [{ internalType: "address", name: "receiver", type: "address" }],
    name: "ERC20InvalidReceiver",
    type: "error",
  },
  {
    inputs: [{ internalType: "address", name: "sender", type: "address" }],
    name: "ERC20InvalidSender",
    type: "error",
  },
  {
    inputs: [{ internalType: "address", name: "spender", type: "address" }],
    name: "ERC20InvalidSpender",
    type: "error",
  },
  {
    inputs: [
      { internalType: "uint256", name: "deadline", type: "uint256" },
    ],
    name: "ERC2612ExpiredSignature",
    type: "error",
  },
  {
    inputs: [
      { internalType: "address", name: "signer", type: "address" },
      { internalType: "address", name: "owner", type: "address" },
    ],
    name: "ERC2612InvalidSigner",
    type: "error",
  },
  {
    inputs: [
      { internalType: "uint256", name: "timepoint", type: "uint256" },
      { internalType: "uint48", name: "clock", type: "uint48" },
    ],
    name: "ERC5805FutureLookup",
    type: "error",
  },
  { inputs: [], name: "ERC6372InconsistentClock", type: "error" },
  { inputs: [], name: "EnforcedPause", type: "error" },
  { inputs: [], name: "ExpectedPause", type: "error" },
  {
    inputs: [
      { internalType: "address", name: "account", type: "address" },
      { internalType: "uint256", name: "currentNonce", type: "uint256" },
    ],
    name: "InvalidAccountNonce",
    type: "error",
  },
  { inputs: [], name: "InvalidShortString", type: "error" },
  {
    inputs: [{ internalType: "address", name: "owner", type: "address" }],
    name: "OwnableInvalidOwner",
    type: "error",
  },
  {
    inputs: [{ internalType: "address", name: "account", type: "address" }],
    name: "OwnableUnauthorizedAccount",
    type: "error",
  },
  {
    inputs: [
      { internalType: "uint8", name: "bits", type: "uint8" },
      { internalType: "uint256", name: "value", type: "uint256" },
    ],
    name: "SafeCastOverflowedUintDowncast",
    type: "error",
  },
  {
    inputs: [{ internalType: "string", name: "str", type: "string" }],
    name: "StringTooLong",
    type: "error",
  },
  {
    inputs: [{ internalType: "uint256", name: "expiry", type: "uint256" }],
    name: "VotesExpiredSignature",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "delegator",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "fromDelegate",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "toDelegate",
        type: "address",
      },
    ],
    name: "DelegateChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "delegate",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "previousVotes",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "newVotes",
        type: "uint256",
      },
    ],
    name: "DelegateVotesChanged",
    type: "event",
  },
  { anonymous: false, inputs: [], name: "EIP712DomainChanged", type: "event" },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "Paused",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "from", type: "address" },
      { indexed: true, internalType: "address", name: "to", type: "address" },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "Unpaused",
    type: "event",
  },
  {
    inputs: [],
    name: "CLOCK_MODE",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "DOMAIN_SEPARATOR",
    outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "owner", type: "address" },
      { internalType: "address", name: "spender", type: "address" },
    ],
    name: "allowance",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "spender", type: "address" },
      { internalType: "uint256", name: "value", type: "uint256" },
    ],
    name: "approve",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "account", type: "address" }],
    name: "balanceOf",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "value", type: "uint256" }],
    name: "burn",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "account", type: "address" },
      { internalType: "uint256", name: "value", type: "uint256" },
    ],
    name: "burnFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "account", type: "address" },
      { internalType: "uint32", name: "pos", type: "uint32" },
    ],
    name: "checkpoints",
    outputs: [
      {
        components: [
          { internalType: "uint48", name: "_key", type: "uint48" },
          { internalType: "uint208", name: "_value", type: "uint208" },
        ],
        internalType: "struct Checkpoints.Checkpoint208",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "clock",
    outputs: [{ internalType: "uint48", name: "", type: "uint48" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "delegatee", type: "address" }],
    name: "delegate",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "delegatee", type: "address" },
      { internalType: "uint256", name: "nonce", type: "uint256" },
      { internalType: "uint256", name: "expiry", type: "uint256" },
      { internalType: "uint8", name: "v", type: "uint8" },
      { internalType: "bytes32", name: "r", type: "bytes32" },
      { internalType: "bytes32", name: "s", type: "bytes32" },
    ],
    name: "delegateBySig",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "account", type: "address" }],
    name: "delegates",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "eip712Domain",
    outputs: [
      { internalType: "bytes1", name: "fields", type: "bytes1" },
      { internalType: "string", name: "name", type: "string" },
      { internalType: "string", name: "version", type: "string" },
      { internalType: "uint256", name: "chainId", type: "uint256" },
      { internalType: "address", name: "verifyingContract", type: "address" },
      { internalType: "bytes32", name: "salt", type: "bytes32" },
      { internalType: "uint256[]", name: "extensions", type: "uint256[]" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "timepoint", type: "uint256" }],
    name: "getPastTotalSupply",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "account", type: "address" },
      { internalType: "uint256", name: "timepoint", type: "uint256" },
    ],
    name: "getPastVotes",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "account", type: "address" }],
    name: "getVotes",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "mint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "owner", type: "address" }],
    name: "nonces",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "account", type: "address" }],
    name: "numCheckpoints",
    outputs: [{ internalType: "uint32", name: "", type: "uint32" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "pause",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "paused",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "owner", type: "address" },
      { internalType: "address", name: "spender", type: "address" },
      { internalType: "uint256", name: "value", type: "uint256" },
      { internalType: "uint256", name: "deadline", type: "uint256" },
      { internalType: "uint8", name: "v", type: "uint8" },
      { internalType: "bytes32", name: "r", type: "bytes32" },
      { internalType: "bytes32", name: "s", type: "bytes32" },
    ],
    name: "permit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "value", type: "uint256" },
    ],
    name: "transfer",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "from", type: "address" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "value", type: "uint256" },
    ],
    name: "transferFrom",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "unpause",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const STAKING_CONTRACT_ADDRESS = "0x5a30b5Bd8E97c9ED153F5D8c2a41B2a030aad9FB"; // Replace with your actual staking contract address
const STAKING_CONTRACT_ABI = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_causeToken",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "target",
        type: "address",
      },
    ],
    name: "AddressEmptyCode",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "AddressInsufficientBalance",
    type: "error",
  },
  {
    inputs: [],
    name: "ETHNotAccepted",
    type: "error",
  },
  {
    inputs: [],
    name: "FailedInnerCall",
    type: "error",
  },
  {
    inputs: [],
    name: "InsufficientContractBalance",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "rate",
        type: "uint256",
      },
    ],
    name: "InvalidAnnualReturnRate",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidCauseTokenAddress",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "InvalidNewOwner",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "InvalidStakeAmountOfZero",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "duration",
        type: "uint256",
      },
    ],
    name: "InvalidStakeDuration",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "totalStakes",
        type: "uint256",
      },
    ],
    name: "InvalidStakeIndex",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "staker",
        type: "address",
      },
    ],
    name: "MaxStakesReached",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "lastVestingTime",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "currentTime",
        type: "uint256",
      },
    ],
    name: "NoNewVestingAvailable",
    type: "error",
  },
  {
    inputs: [],
    name: "NoVestingAmountAvailable",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "OwnableInvalidOwner",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "OwnableUnauthorizedAccount",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
    ],
    name: "SafeERC20FailedOperation",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "providedAmount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "minimumAmount",
        type: "uint256",
      },
    ],
    name: "StakeAmountTooLow",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "startTime",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "currentTime",
        type: "uint256",
      },
    ],
    name: "VestingNotYetAvailable",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "newRate",
        type: "uint256",
      },
    ],
    name: "AnnualReturnRateUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "Paused",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "staker",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "duration",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "stakeIndex",
        type: "uint256",
      },
    ],
    name: "Staked",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "Unpaused",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "staker",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "remainingAmount",
        type: "uint256",
      },
    ],
    name: "Vested",
    type: "event",
  },
  {
    inputs: [],
    name: "MAX_STAKES_PER_ADDRESS",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "startTime",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "duration",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "lastVestingTime",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "vestedAmount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "reward",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "vestingCount",
            type: "uint256",
          },
        ],
        internalType: "struct CauseStaking.Stake",
        name: "_stake",
        type: "tuple",
      },
    ],
    name: "calculateReward",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "causeToken",
    outputs: [
      {
        internalType: "contract IERC20",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_newOwner",
        type: "address",
      },
    ],
    name: "changeOwner",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_staker",
        type: "address",
      },
    ],
    name: "getStakes",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "startTime",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "duration",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "lastVestingTime",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "vestedAmount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "reward",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "vestingCount",
            type: "uint256",
          },
        ],
        internalType: "struct CauseStaking.Stake[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "pause",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "paused",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_duration",
        type: "uint256",
      },
    ],
    name: "stake",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "unpause",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_newRate",
        type: "uint256",
      },
    ],
    name: "updateAnnualReturnRate",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_stakeIndex",
        type: "uint256",
      },
    ],
    name: "vest",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    stateMutability: "payable",
    type: "receive",
  },
];

export const StakingProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isConnected, setIsConnected] = useState(false);
  const [stakes, setStakes] = useState<Stake[]>([]);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);
  const [signer, setSigner] = useState<ethers.Signer | null>(null);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [networkName, setNetworkName] = useState<string | null>(null);
  const [ethBalance, setEthBalance] = useState<string | null>(null);
  const [causeBalance, setCauseBalance] = useState<string | null>(null);

  const [
    stakingContract,
    setStakingContract,
  ] = useState<ethers.Contract | null>(null);

  const [
    currentTransaction,
    setCurrentTransaction,
  ] = useState<TransactionStatus | null>(null);

  const connectWallet = async (walletType: WalletType) => {
    setIsLoading(true);
    try {
      let ethereum: any;

      if (walletType === "metamask") {
        ethereum = (window as any).ethereum;
      } else if (walletType === "trustwallet") {
        ethereum = (window as any).ethereum;
      } else if (walletType === "binancechain") {
        ethereum = (window as any).BinanceChain;
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

      await initializeStakingContract(signer);
      await fetchStakes();
      console.log(stakes);
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

  // Initialize staking contract
  const initializeStakingContract = async (signer: ethers.Signer) => {
    const contract = new ethers.Contract(
      STAKING_CONTRACT_ADDRESS,
      STAKING_CONTRACT_ABI,
      signer
    );
    setStakingContract(contract);
  };

  // Fetch stakes from the contract
  const fetchStakes = async () => {
    console.log("Starting fetchStakes function");

    if (!stakingContract) {
      console.error("Staking contract is not available");
      return;
    }

    if (!signer) {
      console.error("Signer is not available");
      return;
    }

    setIsLoading(true);
    try {
      const address = await signer.getAddress();
      console.log("Fetching stakes for address:", address);

      // Use the getStakes function
      const stakesData = await stakingContract.getStakes(address);
      console.log("Raw stakes data:", stakesData);

      const fetchedStakes: Stake[] = stakesData.map(
        (stakeData: any, index: number) => {
          console.log(`Processing stake ${index}:`, stakeData);
          return {
            id: index.toString(),
            amount: parseFloat(ethers.formatEther(stakeData.amount.toString())),
            startTime: Number(stakeData.startTime),
            duration: Number(stakeData.duration),
            lastVestingTime: Number(stakeData.lastVestingTime),
            vestedAmount: parseFloat(
              ethers.formatEther(stakeData.vestedAmount.toString())
            ),
          };
        }
      );

      console.log("Processed stakes:", fetchedStakes);
      setStakes(fetchedStakes);

      toast({
        title: "Success",
        description: `Fetched ${fetchedStakes.length} stakes`,
      });
    } catch (err) {
      console.error("Failed to fetch stakes:", err);
      setError(err instanceof Error ? err.message : "Failed to fetch stakes");
      toast({
        title: "Error",
        description:
          err instanceof Error ? err.message : "Failed to fetch stakes",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Stake tokens
  const addStake = async (amount: number, period: number) => {
    if (!stakingContract || !signer) {
      console.error("Staking contract or signer not available");
      return;
    }

    setIsLoading(true);
    setCurrentTransaction({
      type: 'Add Stake',
      status: 'pending',
      hash: '',
      message: 'Initiating stake transaction'
    });

    try {
      console.log("Starting addStake function");
      const amountInWei = ethers.parseEther(amount.toString());
      const durationInSeconds = period * 31536000; // Convert years to seconds
      console.log("Amount in Wei:", amountInWei.toString());
      console.log("Duration in seconds:", durationInSeconds);

      // Check if the contract is paused
      const isPaused = await stakingContract.paused();
      console.log("Is contract paused:", isPaused);
      if (isPaused) {
        throw new Error("Staking is currently paused");
      }

      // Check user's CAUSE token balance
      const causeToken = new ethers.Contract(
        CAUSE_TOKEN_ADDRESS,
        CAUSE_TOKEN_ABI,
        signer
      );
      const address = await signer.getAddress();
      console.log("User address:", address);
      const balance = await causeToken.balanceOf(address);
      console.log("User balance:", balance.toString());

      if (balance < amountInWei) {
        throw new Error("Insufficient CAUSE token balance");
      }

      // Check allowance
      const allowance = await causeToken.allowance(
        address,
        STAKING_CONTRACT_ADDRESS
      );
      console.log("Current allowance:", allowance.toString());

      if (allowance < amountInWei) {
        console.log("Insufficient allowance, requesting approval");
        // If allowance is insufficient, request approval
        const approveTx = await causeToken.approve(
          STAKING_CONTRACT_ADDRESS,
          amountInWei
        );
        console.log("Approval transaction sent:", approveTx.hash);
        await approveTx.wait();
        console.log("Approval transaction confirmed");
      }

      // Attempt to stake
      console.log("Attempting to stake");
      const tx = await stakingContract.stake(amountInWei, durationInSeconds);
      console.log("Stake transaction sent:", tx.hash);
      setCurrentTransaction(prev => ({
        type: prev?.type || 'Add Stake',
        status: 'pending',
        hash: tx.hash,
        message: prev?.message || 'Transaction sent'
      }));

      await tx.wait();
      console.log("Stake transaction confirmed");
      setCurrentTransaction(prev => ({
        type: prev?.type || 'Add Stake',
        status: 'confirmed',
        hash: prev?.hash || '',
        message: 'Transaction confirmed'
      }));

      toast({
        title: "Success",
        description: `Staked ${amount} tokens for ${period} year(s)`,
      });

      // Refresh stakes after successful staking
      await fetchStakes();
    } catch (err) {
      console.error("Failed to add stake:", err);
      setError(err instanceof Error ? err.message : "Failed to add stake");
      setCurrentTransaction(prev => ({
        type: prev?.type || 'Add Stake',
        status: 'failed',
        hash: prev?.hash || '',
        message: err instanceof Error ? err.message : "Failed to add stake"
      }));
      toast({
        title: "Error",
        description: err instanceof Error ? err.message : "Failed to add stake",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Vest stake
  const vestStake = async (stakeId: number) => {
    if (!stakingContract || !signer) return;

    setIsLoading(true);
    try {
      const tx = await stakingContract.vest(stakeId);
      await tx.wait();

      toast({
        title: "Success",
        description: "Stake vested successfully",
      });

      // Refresh stakes after successful vesting
      await fetchStakes();
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

  const fetchBalances = async (
    provider: ethers.BrowserProvider,
    signer: ethers.Signer
  ) => {
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

  const sendTokens = async (recipient: string, amount: string) => {
    if (!signer || !ethers.isAddress(recipient) || !amount) {
      throw new Error("Invalid input or signer not available");
    }

    try {
      const causeToken = new ethers.Contract(
        CAUSE_TOKEN_ADDRESS,
        CAUSE_TOKEN_ABI,
        signer
      );
      const amountWei = ethers.parseEther(amount);

      const tx = await causeToken.transfer(recipient, amountWei);
      await tx.wait();

      toast({
        title: "Success",
        description: `Sent ${amount} CAUSE tokens to ${recipient}`,
      });

      // Refresh balances
      if (provider) {
        await fetchBalances(provider, signer);
      }

      return tx;
    } catch (err) {
      console.error("Failed to send tokens:", err);
      toast({
        title: "Error",
        description: "Failed to send tokens",
        variant: "destructive",
      });
      throw err;
    }
  };

  useEffect(() => {
    if (isConnected && stakingContract && signer) {
      fetchStakes();
    }
  }, [isConnected, stakingContract, signer]);

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
        sendTokens,
        currentTransaction,
        setCurrentTransaction,
      }}
    >
      {children}
    </StakingContext.Provider>
  );
};