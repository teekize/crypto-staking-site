// components/stake-list.tsx
'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { useStaking } from '@/context/StakingContext'
import YourStakes from './your-stakes'
import Link from 'next/link'

export default function StakeList() {
  const { stakes, isLoading, isConnected } = useStaking()

  if (!isConnected) {
    return null
  }

  return (
    <motion.div 
      className="bg-white p-6 rounded-lg shadow-md"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <h2 className="text-xl sm:text-2xl font-bold mb-4">Your Stakes</h2>
      {isLoading ? (
        <p>Loading stakes...</p>
      ) : stakes.length === 0 ? (
        <p>You have no active stakes.</p>
      ) : (
        <div className="space-y-4">
          <YourStakes stake={stakes[0]} /> {/* Display only the most recent stake */}
          <Link href="/stakes">
            <Button className="w-full">View All Stakes</Button>
          </Link>
        </div>
      )}
    </motion.div>
  )
}
