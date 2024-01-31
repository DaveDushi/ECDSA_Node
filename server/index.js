// Import necessary modules
const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

// Import Ethereum-related libraries and utility functions
const secp = require("ethereum-cryptography/secp256k1-compat");
const { hexToBytes } = require("ethereum-cryptography/utils");
const { getAddress } = require("./scripts/utils")

// Enable Cross-Origin Resource Sharing (CORS) middleware
app.use(cors());

// Parse JSON in request body
app.use(express.json());

// Initial account balances (sample data)
const balances = {
  "f419d81f12e4892d24b539d61303d58faead7c54": 100,
  "260419d69cb2dca66873c732efe10c5f199ebefb": 50,
  "8293531043fd2e20e3dd507a79b9700546a7a32e": 75,
};

// Endpoint to get account balance based on the provided address
app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

// Endpoint to process a transaction
app.post("/send", (req, res) => {
  // Extract relevant information from the request body
  const { signature, recid, msgHash, amount, recipient, address } = req.body;

  // Retrieve the address from the cryptographic signature
  const signaturePublicKey = secp.ecdsaRecover(hexToBytes(signature), recid, hexToBytes(msgHash)); 
  const signatureAddress = getAddress(signaturePublicKey);

  // Check if the recovered signature address matches the sender's address
  if (address === signatureAddress) {
    // Set initial balance for sender and recipient if not already present
    setInitialBalance(signatureAddress);
    setInitialBalance(recipient);

    // Check if the sender has enough funds for the transaction
    if (balances[signatureAddress] < amount) {
      res.status(400).send({ message: "Not enough funds!" });
    } else {
      // Update balances after a successful transaction
      balances[signatureAddress] -= amount;
      balances[recipient] += amount;
      res.send({ balance: balances[signatureAddress] });
    }
  } else {
    // Access denied if the recovered address doesn't match the sender's address
    res.status(400).send({ message: "Access Denied!" });
  }
});

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

// Function to set the initial balance for an address if not already present
function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
