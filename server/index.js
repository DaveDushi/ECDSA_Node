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

  const { signature, recid, msgHash, amount, recipient, address } = req.body;

  // retrieve the address from the signature
  const signaturePublicKey = secp.ecdsaRecover(hexToBytes(signature), recid, hexToBytes(msgHash)); 
  const signatureAddress = getAddress(signaturePublicKey);

  // check if the signature address matches the senders address 
  if (address === signatureAddress) {
    setInitialBalance(signatureAddress);
    setInitialBalance(recipient);

    if (balances[signatureAddress] < amount) {
      res.status(400).send({ message: "Not enough funds!" });
    } else {
      balances[signatureAddress] -= amount;
      balances[recipient] += amount;
      res.send({ balance: balances[signatureAddress] });
    }
  } else {
    res.status(400).send({ message: "Access Denied!" });
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
