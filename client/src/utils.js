// validationUtils.js

export const isValidEthereumAddress = (address) => {
    // Allow empty address or check if the address is 40 characters long and contains only valid hexadecimal characters
    const regex = /^$|^[a-fA-F0-9]{40}$/;
    return regex.test(address);
  };
  
  export const isValidAmount = (amount) => {
    // Allow empty amount or check if it's a positive number
    return !amount || (!isNaN(amount) && parseFloat(amount) > 0);
  };
  