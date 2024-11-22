'use client'

import { useStaking } from '@/context/StakingContext'
import { motion } from 'framer-motion'
import { formatEther } from 'ethers/lib/utils'

const WalletInfoWrapper: React.FC = () => {
  const { isConnected, walletAddress, network, ethBalance, causeBalance } = useStaking()

  if (!isConnected) {
    return null
  }

  // Format ETH balance to show only 4 decimal places
  const formattedEthBalance = parseFloat(ethBalance).toFixed(4)
  
  // Format CAUSE balance to show with commas for thousands
  const formattedCauseBalance = new Intl.NumberFormat().format(causeBalance)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-4"
    >
      <h2 className="text-xl font-semibold text-[#8B4513] flex items-center gap-2">
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M21 18v1c0 1.1-.9 2-2 2H5c-1.11 0-2-.9-2-2V5c0-1.1.89-2 2-2h14c1.1 0 2 .9 2 2v1h-9c-1.11 0-2 .9-2 2v8c0 1.1.89 2 2 2h9zm-9-2h10V8H12v8zm4-2.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
        </svg>
        Wallet Information
      </h2>

      <div className="bg-[#FDF5E6] rounded-lg p-6">
        <div className="space-y-4">
          {/* Wallet Address with copy button */}
          <div className="flex justify-between items-center group">
            <span className="text-sm text-[#8B4513]/70">Wallet:</span>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-[#8B4513] font-mono">
                {walletAddress?.slice(0, 6)}...{walletAddress?.slice(-4)}
              </span>
              <button 
                onClick={() => {
                  navigator.clipboard.writeText(walletAddress || '')
                }}
                className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:text-[#B8860B]"
                title="Copy address"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Network with indicator */}
          <div className="flex justify-between items-center">
            <span className="text-sm text-[#8B4513]/70">Network:</span>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <span className="text-sm font-medium text-[#8B4513] capitalize">
                {network === 'mainnet' ? 'Ethereum Mainnet' : network}
              </span>
            </div>
          </div>

          {/* ETH Balance */}
          <div className="flex justify-between items-center">
            <span className="text-sm text-[#8B4513]/70">ETH Balance:</span>
            <div className="flex items-center gap-1">
              <span className="text-sm font-medium text-[#8B4513]">
                {formattedEthBalance}
              </span>
              <span className="text-xs text-[#8B4513]/70">ETH</span>
            </div>
          </div>

          {/* CAUSE Balance */}
          <div className="flex justify-between items-center">
            <span className="text-sm text-[#8B4513]/70">CAUSE Balance:</span>
            <div className="flex items-center gap-1">
              <span className="text-sm font-medium text-[#8B4513]">
                {formattedCauseBalance}
              </span>
              <span className="text-xs text-[#8B4513]/70">CAUSE</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default WalletInfoWrapper