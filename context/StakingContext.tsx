// context/StakingContext.tsx
'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { toast } from '@/hooks/use-toast'

interface Stake {
  id: number
  amount: number
  period: number
  startDate: Date
  endDate: Date
  return: number
  vested: number
}

interface StakingContextType {
  isConnected: boolean
  connectWallet: () => Promise<void>
  disconnectWallet: () => void
  stakes: Stake[]
  addStake: (amount: number, period: number) => Promise<void>
  vestStake: (stakeId: number) => Promise<void>
  isLoading: boolean
  error: string | null
}

const StakingContext = createContext<StakingContextType | undefined>(undefined)

export const useStaking = () => {
  const context = useContext(StakingContext)
  if (!context) {
    throw new Error('useStaking must be used within a StakingProvider')
  }
  return context
}

export const StakingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false)
  const [stakes, setStakes] = useState<Stake[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Simulating fetching stakes from an API or blockchain
    const fetchStakes = async () => {
      setIsLoading(true)
      try {
        // Simulated API call
        await new Promise(resolve => setTimeout(resolve, 1000))
        setStakes([
          {
            id: 1,
            amount: 1000,
            period: 1,
            startDate: new Date('2023-01-01'),
            endDate: new Date('2024-01-01'),
            return: 100,
            vested: 0,
          },
          // Add more mock stakes here
        ])
      } catch (err) {
        setError('Failed to fetch stakes')
        toast({
          title: 'Error',
          description: 'Failed to fetch stakes',
          variant: 'destructive',
        })
      } finally {
        setIsLoading(false)
      }
    }

    if (isConnected) {
      fetchStakes()
    }
  }, [isConnected])

  const connectWallet = async () => {
    setIsLoading(true)
    try {
      // Simulating wallet connection
      await new Promise(resolve => setTimeout(resolve, 1000))
      setIsConnected(true)
      toast({
        title: 'Success',
        description: 'Wallet connected successfully',
      })
    } catch (err) {
      setError('Failed to connect wallet')
      toast({
        title: 'Error',
        description: 'Failed to connect wallet',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  const disconnectWallet = () => {
    setIsConnected(false)
    setStakes([])
    toast({
      title: 'Success',
      description: 'Wallet disconnected successfully',
    })
  }

  const addStake = async (amount: number, period: number) => {
    setIsLoading(true)
    try {
      // Simulating adding a stake
      await new Promise(resolve => setTimeout(resolve, 1000))
      const newStake: Stake = {
        id: stakes.length + 1,
        amount,
        period,
        startDate: new Date(),
        endDate: new Date(Date.now() + period * 365 * 24 * 60 * 60 * 1000),
        return: amount * 0.1 * period,
        vested: 0,
      }
      setStakes([...stakes, newStake])
      toast({
        title: 'Success',
        description: `Staked ${amount} tokens for ${period} year(s)`,
      })
    } catch (err) {
      setError('Failed to add stake')
      toast({
        title: 'Error',
        description: 'Failed to add stake',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  const vestStake = async (stakeId: number) => {
    setIsLoading(true)
    try {
      // Simulating vesting a stake
      await new Promise(resolve => setTimeout(resolve, 1000))
      setStakes(stakes.map(stake => {
        if (stake.id === stakeId) {
          const vestedAmount = stake.amount * 0.05
          return { ...stake, vested: stake.vested + vestedAmount }
        }
        return stake
      }))
      toast({
        title: 'Success',
        description: 'Vested 5% of the stake',
      })
    } catch (err) {
      setError('Failed to vest stake')
      toast({
        title: 'Error',
        description: 'Failed to vest stake',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

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
      }}
    >
      {children}
    </StakingContext.Provider>
  )
}