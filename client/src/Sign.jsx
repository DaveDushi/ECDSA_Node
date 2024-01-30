import { useState, useEffect } from "react";
import server from "./server";
import { keccak256 } from "ethereum-cryptography/keccak";
import { utf8ToBytes, hexToBytes, toHex } from "ethereum-cryptography/utils";

function Sign({signature, setSignature, recid, setRecid, msg, setBalance, sendAmount, recipient, address}) {
    const [msgHashBytes, setMsgHashBytes] = useState("");

    const setValue = (setter) => (evt) => setter(evt.target.value);

    useEffect(() => {
        // Calculate msg hash whenever the message changes
        const calculatedMsgHash = keccak256(utf8ToBytes(msg));
        setMsgHashBytes(toHex(calculatedMsgHash));
      }, [msg]);

    async function transfer(evt) {
        evt.preventDefault();
        console.log("signature: ", signature);
        console.log("recid: ", recid);
        console.log("msgHash: ", msgHashBytes);
    
        try {
          const {
            data: { balance },
          } = await server.post(`send`, {
            signature,
            recid: parseInt(recid),
            msgHash: msgHashBytes,
            amount: parseInt(sendAmount),
            recipient,
            address
          });
          setBalance(balance);
        } catch (ex) {
          alert(ex.response.data.message);
        }
    }

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