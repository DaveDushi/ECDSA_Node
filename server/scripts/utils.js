const { toHex } = require("ethereum-cryptography/utils");
const { keccak256 } = require("ethereum-cryptography/keccak");

function getAddress(publicKey) {
    return toHex(keccak256(publicKey.slice(1)).slice(-20))
}


module.exports = {
    getAddress
};