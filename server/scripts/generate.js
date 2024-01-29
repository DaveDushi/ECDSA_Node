const secp = require("ethereum-cryptography/secp256k1-compat");
const { toHex } = require("ethereum-cryptography/utils");
const { keccak256 } = require("ethereum-cryptography/keccak");


const privateKey = secp.createPrivateKeySync();

console.log('Private Key:', toHex(privateKey));

const publicKey = secp.publicKeyCreate(privateKey);

console.log('Public Key:', toHex(publicKey));

const address = keccak256(publicKey.slice(1)).slice(-20)

console.log('Address:', toHex(address));

