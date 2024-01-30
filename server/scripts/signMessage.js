const secp = require("ethereum-cryptography/secp256k1-compat");
const { hexToBytes, toHex } = require("ethereum-cryptography/utils");
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Enter your Private Key: ', (privateKey) => {
    rl.question('Enter the Message Hash: ', (msgHash) => {
      // Process the private key and message
        const { signature, recid } = secp.ecdsaSign(hexToBytes(msgHash), hexToBytes(privateKey));
        const signatureHex = toHex(signature);

        console.log("Signature:", signatureHex);
        console.log("Recovery Id:", recid)

      
      // Close the readline interface
      rl.close();
    });
  });



