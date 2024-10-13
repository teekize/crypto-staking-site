import React, { useState } from "react";
import { useStaking } from "@/context/StakingContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const SendTokens: React.FC = () => {
  const { sendTokens, causeBalance } = useStaking();
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await sendTokens(recipient, amount);
      // Reset form
      setRecipient("");
      setAmount("");
    } catch (err) {
      console.error("Error in handleSend:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Send CAUSE Tokens</h2>
      <form onSubmit={handleSend}>
        <div className="mb-4">
          <label
            htmlFor="recipient"
            className="block text-sm font-medium text-gray-700"
          >
            Recipient Address
          </label>
          <Input
            id="recipient"
            type="text"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            placeholder="0x..."
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="amount"
            className="block text-sm font-medium text-gray-700"
          >
            Amount
          </label>
          <Input
            id="amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.0"
            step="0.000000000000000001"
            required
          />
        </div>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Sending..." : "Send Tokens"}
        </Button>
      </form>
      <p className="mt-2 text-sm text-gray-600">
        Available balance: {causeBalance} CAUSE
      </p>
    </div>
  );
};

export default SendTokens;