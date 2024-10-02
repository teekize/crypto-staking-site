'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { useStaking } from '@/context/StakingContext'

export default function ConnectWalletCard() {
  const { isConnected, connectWallet, isLoading } = useStaking()

  if (isConnected) {
    return null
  }

  return (
    <motion.div 
      className="bg-white p-6 rounded-lg shadow-md mb-8 text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      >

      <h2 className="text-xl sm:text-2xl font-bold mb-4">Connect your wallet to start staking</h2>
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button onClick={connectWallet} disabled={isLoading} className="w-full">
          {isLoading ? 'Connecting...' : 'Connect Wallet'}
        </Button>
      </motion.div>
      </motion.div>
  )
}