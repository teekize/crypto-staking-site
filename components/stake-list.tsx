// components/stake-list.tsx
'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { useStaking } from '@/context/StakingContext'
import Link from 'next/link'

export default function StakeList() {
  const { stakes, isLoading, isConnected } = useStaking()

  if (!isConnected) {
    return null
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-[#8B4513]">Your Stakes</h2>
      
      {isLoading ? (
        <div className="animate-pulse space-y-4">
          <div className="h-24 bg-[#FDF5E6] rounded-lg"></div>
        </div>
      ) : stakes.length === 0 ? (
        <div className="bg-[#FDF5E6] rounded-lg p-6 text-center">
          <p className="text-[#8B4513]/70">You have no active stakes.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Most recent stake */}
          <div className="bg-[#FDF5E6] rounded-lg p-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-[#8B4513]/70">Amount:</p>
                <p className="text-lg font-medium text-[#8B4513]">
                  {stakes[0].amount} tokens
                </p>
              </div>
              <div>
                <p className="text-sm text-[#8B4513]/70">Period:</p>
                <p className="text-lg font-medium text-[#8B4513]">
                  {stakes[0].period} year
                </p>
              </div>
              <div>
                <p className="text-sm text-[#8B4513]/70">Return:</p>
                <p className="text-lg font-medium text-[#8B4513]">
                  {stakes[0].return} tokens
                </p>
              </div>
              <div>
                <p className="text-sm text-[#8B4513]/70">Vested:</p>
                <p className="text-lg font-medium text-[#8B4513]">
                  {stakes[0].vested} tokens
                </p>
              </div>
            </div>
            
            <div className="mt-4 flex justify-center">
              <Button
                variant="outline"
                className="text-[#B8860B] border-[#B8860B] hover:bg-[#B8860B] hover:text-white transition-all duration-300"
              >
                View Details
              </Button>
            </div>
          </div>

          {/* View All Stakes Button */}
          <Button
            className="w-full bg-[#1a1a1a] hover:bg-black text-white transition-all duration-300"
            asChild
          >
            <Link href="/stakes">View All Stakes</Link>
          </Button>
        </div>
      )}
    </div>
  )
}
