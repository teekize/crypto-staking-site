'use client'

import { motion } from 'framer-motion'
import { useStaking } from '@/context/StakingContext'

export default function Header() {
  const { isConnected } = useStaking()

  return (
    <header className="bg-light-red text-white py-4 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-md flex justify-between items-center">
        <motion.h1 
          className="text-xl sm:text-2xl font-bold"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Crypto Staking Platform
        </motion.h1>
        {isConnected && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-sm"
          >
            Connected
          </motion.div>
        )}
      </div>
    </header>
  )
}