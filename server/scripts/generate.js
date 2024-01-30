const secp = require("ethereum-cryptography/secp256k1-compat");
const { toHex } = require("ethereum-cryptography/utils");
const { keccak256 } = require("ethereum-cryptography/keccak");
const { getAddress } = require("./utils")


const privateKey = secp.createPrivateKeySync();

console.log('Private Key:', toHex(privateKey));

const publicKey = secp.publicKeyCreate(privateKey);

console.log('Public Key:', toHex(publicKey));

const address = getAddress(publicKey);

console.log('Address:', address);

