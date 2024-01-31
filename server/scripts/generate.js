const secp = require("ethereum-cryptography/secp256k1-compat");
const { toHex } = require("ethereum-cryptography/utils");
const { getAddress } = require("./utils");

// Generate a random private key for an Ethereum account
const privateKey = secp.createPrivateKeySync();
// Derive the corresponding public key from the generated private key
const publicKey = secp.publicKeyCreate(privateKey);
// Derive the Ethereum address from the public key
const address = getAddress(publicKey);

console.log('Private Key:', toHex(privateKey));
console.log('Public Key:', toHex(publicKey));
console.log('Address:', address);
