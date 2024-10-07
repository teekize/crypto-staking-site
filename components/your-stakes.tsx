'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { useStaking } from '@/context/StakingContext'

interface Stake {
  id: string;
  amount: number;
  period: number;
  return: number;
  vested: number;
  startDate: Date;
  endDate: Date;
}

export default function YourStakes({ stake }: { stake: Stake }) {
  const { vestStake, isLoading } = useStaking()
  const isVestingPeriodElapsed = new Date() > stake.endDate

  return (
    <motion.div 
      className="bg-light-red bg-opacity-10 p-4 rounded-md"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <p className="text-sm sm:text-base">Amount: {stake.amount} tokens</p>
      <p className="text-sm sm:text-base">Period: {stake.period} year(s)</p>
      <p className="text-sm sm:text-base">Return: {stake.return} tokens</p>
      <p className="text-sm sm:text-base">Vested: {stake.vested} tokens</p>
      <div className="mt-2 space-x-2 flex flex-wrap gap-2">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">View Details</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Stake Details</DialogTitle>
              <DialogDescription>
                <p>Amount: {stake.amount} tokens</p>
                <p>Period: {stake.period} year(s)</p>
                <p>Start Date: {stake.startDate.toLocaleDateString()}</p>
                <p>End Date: {stake.endDate.toLocaleDateString()}</p>
                <p>Return: {stake.return} tokens</p>
                <p>Vested: {stake.vested} tokens</p>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
        {isVestingPeriodElapsed && (
          <Button onClick={() => vestStake(stake.id)} disabled={isLoading} size="sm">
            {isLoading ? 'Processing...' : 'Vest 5%'}
          </Button>
        )}
      </div>
    </motion.div>
  )
}