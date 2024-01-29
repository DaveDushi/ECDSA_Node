import { useState, useEffect } from "react";
import server from "./server";
import * as secp from "ethereum-cryptography/secp256k1-compat";
import { keccak256 } from "ethereum-cryptography/keccak";
import { utf8ToBytes, hexToBytes, toHex } from "ethereum-cryptography/utils";

function Transfer({ address, setBalance, privateKey }) {
  const [sendAmount, setSendAmount] = useState("");
  const [recipient, setRecipient] = useState("");
  const [msg, setMsg] = useState(null);

  const setValue = (setter) => (evt) => setter(evt.target.value);

  useEffect(() => {
    // Calculate msg whenever sendAmount or recipient changes
    const calculatedMsg = `${address} sent ${sendAmount} coins to ${recipient}`;
    setMsg(calculatedMsg);
  }, [sendAmount, recipient, address]);

  async function transfer(evt) {
    evt.preventDefault();

    const msg = `${address} sent ${sendAmount} coins to ${recipient}`;
    const msgHash = keccak256(utf8ToBytes(msg));
    const { signature, recid } = secp.ecdsaSign(msgHash, hexToBytes(privateKey));

    try {
      const {
        data: { balance },
      } = await server.post(`send`, {
        signature: toHex(signature),
        recid,
        msgHash: toHex(msgHash),
        amount: parseInt(sendAmount),
        recipient,
      });
      setBalance(balance);
    } catch (ex) {
      alert(ex.response.data.message);
    }
  }

  return (
    <form className="container transfer" onSubmit={transfer}>
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

      {sendAmount !== "" && recipient !== "" ? (
        <div>
          <p>Message:</p>
          <code>{msg}</code>
        </div>
      ) : null}

      <input type="submit" className="button" value="Sign & Transfer" />
    </form>
  );
}

export default Transfer;
