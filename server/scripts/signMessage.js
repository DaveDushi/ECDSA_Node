const secp = require("ethereum-cryptography/secp256k1-compat");
const { hexToBytes, toHex } = require("ethereum-cryptography/utils");
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Prompt the user for their private key
rl.question('Enter your Private Key: ', (privateKey) => {
  // Prompt the user for the message hash they want to sign
  rl.question('Enter the Message Hash: ', (msgHash) => {
    // Sign the message using the provided private key and message hash
    const { signature, recid } = secp.ecdsaSign(hexToBytes(msgHash), hexToBytes(privateKey));
    
    // Convert the signature to a hexadecimal string
    const signatureHex = toHex(signature);

    // Display the signature and recovery id
    console.log("Signature:", signatureHex);
    console.log("Recovery Id:", recid);

    // Close the readline interface
    rl.close();
  });
});