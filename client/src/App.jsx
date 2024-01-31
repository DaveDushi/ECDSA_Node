import Wallet from "./Wallet";
import Transfer from "./Transfer";
import "./App.scss";
import { useState } from "react";
import Sign from "./Sign";

function App() {
  const [balance, setBalance] = useState(0);
  const [address, setAddress] = useState("");
  const [signature, setSignature] = useState("");
  const [recid, setRecid] = useState(0);
  const [msg, setMsg] = useState("");
  const [sendAmount, setSendAmount] = useState("");
  const [recipient, setRecipient] = useState(""); 

  return (
    <div className="app">
      <Wallet
        balance={balance}
        setBalance={setBalance}
        address={address}
        setAddress={setAddress}
      />

      <Transfer 
      address={address} 
      msg = {msg}
      setMsg = {setMsg}
      sendAmount = {sendAmount}
      setSendAmount = {setSendAmount}
      recipient = {recipient}
      setRecipient = {setRecipient}
       />

      {sendAmount && recipient && address ? <Sign 
        signature = {signature}
        setSignature = {setSignature}
        recid = {recid}
        setRecid = {setRecid}
        msg = {msg}
        setBalance={setBalance} 
        setMsg = {setMsg}
        sendAmount = {sendAmount}
        setSendAmount = {setSendAmount}
        recipient = {recipient}
        setRecipient = {setRecipient}
        address = {address}
        /> : null}
      
    </div>
  );
}

export default App;
