import { useState, useEffect } from "react";
import server from "./server";
import { keccak256 } from "ethereum-cryptography/keccak";
import { utf8ToBytes, toHex } from "ethereum-cryptography/utils";

// Sign component for managing signatures and transfers
function Sign({ signature, setSignature, recid, setRecid, msg, setBalance, sendAmount, recipient, address, setRecipient, setSendAmount, setNonce, nonce }) {
  // State for storing the hexadecimal representation of the message hash
  const [msgHashBytes, setMsgHashBytes] = useState("");

  // Function to update state using event value
  const setValue = (setter) => (evt) => setter(evt.target.value);

  // Effect to calculate msg hash whenever the message changes
  useEffect(() => {
    const calculatedMsgHash = keccak256(utf8ToBytes(msg));
    setMsgHashBytes(toHex(calculatedMsgHash));
  }, [msg]);

  // Function to handle the transfer upon form submission
  async function transfer(evt) {
    evt.preventDefault();
    if(!sendAmount || !recipient || !address || !signature) {
      alert("Enter the all the values");
    } else {
      try {
        // Make a server request to initiate the transfer
        const {
          data: { balance },
        } = await server.post(`send`, {
          signature,
          recid: parseInt(recid),
          msgHash: msgHashBytes,
          amount: parseInt(sendAmount),
          recipient,
          address,
        });
        setBalance(balance);
        setNonce(++nonce);

        // reset the values
        setSignature("");
        setRecipient("");
        setSendAmount("");
        setRecid(0);

      } catch (ex) {
        // Handle errors and display an alert with the error message
        alert(ex.response.data.message);
      }
    }
  }

  // Render the Sign component structure
  return (
    <form className="container wallet" onSubmit={transfer}>
      <h1>Contract</h1>

      <div>
        <b>Message:</b> {msg}
        <br></br>
        <b>Message Hash:</b> {msgHashBytes}
      </div>

      <label>
        Signature
        <input placeholder="Type in your signature" value={signature} onChange={setValue(setSignature)}></input>
      </label>

      <label>
        Recovery ID
        <input id="recid" placeholder="Type in your recovery ID" value={recid} onChange={setValue(setRecid)} type="number"></input>
      </label>

      <input type="submit" className="button" value="Sign & Transfer" />
    </form>
  );
}

export default Sign;
