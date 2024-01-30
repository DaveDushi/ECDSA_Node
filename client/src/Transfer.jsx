import { useState, useEffect } from "react";
import server from "./server";
import * as secp from "ethereum-cryptography/secp256k1-compat";
import { keccak256 } from "ethereum-cryptography/keccak";
import { utf8ToBytes, hexToBytes, toHex } from "ethereum-cryptography/utils";

function Transfer({ address, msg, setMsg, sendAmount, setSendAmount, recipient, setRecipient }) {
  
  const setValue = (setter) => (evt) => setter(evt.target.value);

  useEffect(() => {
    // Calculate msg whenever sendAmount or recipient changes
    const calculatedMsg = `${address} sent ${sendAmount} coins to ${recipient}`;
    setMsg(calculatedMsg);
  }, [sendAmount, recipient, address]);


  return (
      <div className="container transfer">
        <h1>Send Transaction</h1>
        <label>
        Send Amount
        <input
          placeholder="1, 2, 3..."
          value={sendAmount}
          onChange={setValue(setSendAmount)}
        ></input>
      </label>
      <label>
          Recipient
          <input
            placeholder="Type an address, for example: 0x2"
            value={recipient}
            onChange={setValue(setRecipient)}
          ></input>
        </label>
      </div>
  );
}

export default Transfer;
