import server from "./server";

function Wallet({ address, setAddress, balance, setBalance }) { 
  // Function triggered when the user enters an address
  async function onChange(evt) {
    // Extract the entered address from the input event
    const address = evt.target.value;
    setAddress(address);

    // Check if the address is provided
    if (address) {
      try {
        // Fetch and set the balance from the server for the provided address
        const { data: { balance } } = await server.get(`balance/${address}`);
        setBalance(balance);

      } catch (error) {
        // Handle any errors that occur during the server request
        console.error("Error fetching balance:", error.message);
        setBalance(0);
      }
    } else {
      setBalance(0);
    }
  }

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>

      <label>
        Address
        <input placeholder="Type in your address" value={address} onChange={onChange}></input>
      </label>

      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;
