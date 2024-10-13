import React from 'react';
import { useStaking } from '@/context/StakingContext';

const TransactionStatus: React.FC = () => {
  const { currentTransaction } = useStaking();

  if (!currentTransaction) {
    return null;
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg max-w-md">
      <h3 className="text-lg font-semibold mb-2">Transaction {currentTransaction.type}</h3>
      <p className="text-sm"><strong>Status:</strong> {currentTransaction.status}</p>
      {currentTransaction.hash && (
        <p className="text-sm">
          <strong>Hash:</strong> 
          <a 
            href={`https://etherscan.io/tx/${currentTransaction.hash}`} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            {currentTransaction.hash.slice(0, 6)}...{currentTransaction.hash.slice(-4)}
          </a>
        </p>
      )}
      {currentTransaction.message && (
        <p className="text-sm"><strong>Message:</strong> {currentTransaction.message}</p>
      )}
    </div>
  );
};

export default TransactionStatus;
