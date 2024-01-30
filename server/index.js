const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

const secp = require("ethereum-cryptography/secp256k1-compat");
const { keccak256 } = require("ethereum-cryptography/keccak");
const { toHex, hexToBytes } = require("ethereum-cryptography/utils");
const { getAddress } = require("./scripts/utils")

app.use(cors());
app.use(express.json());

const balances = {
  "f419d81f12e4892d24b539d61303d58faead7c54": 100,
  "260419d69cb2dca66873c732efe10c5f199ebefb": 50,
  "8293531043fd2e20e3dd507a79b9700546a7a32e": 75,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  // TODO: get a signature from the client-side application
  // Recover the public address from the signature 
  // set the Sender to the one who signed the signature

  const { signature, recid, msgHash, amount, recipient } = req.body;
  console.log("signature: ", signature);
  console.log("recid: ", recid);
  console.log("msgHash: ", msgHash);
  const senderPublicKey = secp.ecdsaRecover(hexToBytes(signature), recid, hexToBytes(msgHash)); // retrieve the address from the signature (public key)
  const senderAddress = getAddress(senderPublicKey);

  setInitialBalance(senderAddress);
  setInitialBalance(recipient);

  if (balances[senderAddress] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[senderAddress] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[senderAddress] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
