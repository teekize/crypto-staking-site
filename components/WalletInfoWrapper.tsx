'use client'

import { useStaking } from '@/context/StakingContext'
import WalletInfo from './WalletInfo'

const WalletInfoWrapper: React.FC = () => {
  const { isConnected } = useStaking()

  if (!isConnected) {
    return null
  }

  return (
    <div className="sticky top-0 p-4">
      <WalletInfo />
    </div>
  )
}

export default WalletInfoWrapper