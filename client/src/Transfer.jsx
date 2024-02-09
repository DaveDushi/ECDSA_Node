import { useEffect, useMemo } from "react";

// Transfer component for handling transaction details
function Transfer({ address, setMsg, sendAmount, setSendAmount, recipient, setRecipient, nonce }) {
  
  // Calculate msg using useMemo to optimize performance
  const calculatedMsg = useMemo(() => `${address.slice(0,10)}... sent ${sendAmount} coins to ${recipient.slice(0,10)}...`, [sendAmount, recipient, address]);

  // Effect to update msg whenever sendAmount or recipient changes
  useEffect(() => {
    setMsg(calculatedMsg + nonce);
  }, [calculatedMsg, setMsg]);

  return (
    <div className="container transfer">
      <h1>Send Transaction</h1>

      <label>
        Send Amount
        <input
          placeholder="1, 2, 3..."
          value={sendAmount}
          onChange={(evt) => setSendAmount(evt.target.value)}
        ></input>
      </label>

      <label>
        Recipient
        <input
          placeholder="Type an address, for example: 0x2"
          value={recipient}
          onChange={(evt) => setRecipient(evt.target.value)}
        ></input>
      </label>
    </div>
  );
}

export default Transfer;
