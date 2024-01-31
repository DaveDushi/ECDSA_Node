## ECDSA Node

This project is an example of using a client and server to facilitate transfers between different addresses. Since there is just a single server on the back-end handling transfers, this is clearly very centralized. We won't worry about distributed consensus for this project.

However, something that we would like to incorporate is Public Key Cryptography. By using Elliptic Curve Digital Signatures, we can make it so the server only allows transfers that have been signed by the person who owns the associated address.

### Client

The client folder contains a [React app](https://reactjs.org/) using [Vite](https://vitejs.dev/). To get started, follow these steps:

1. Open up a terminal in the `/client` folder.
2. Run `npm install` to install all the dependencies.
3. Run `npm run dev` to start the application.
4. Now you should be able to visit the app at http://127.0.0.1:5173/

### Server

The server folder contains a Node.js server using [Express](https://expressjs.com/). To run the server, follow these steps:

1. Open a terminal within the `/server` folder.
2. Run `npm install` to install all the dependencies.
3. Run `node index` to start the server.

The application should connect to the default server port (3042) automatically!

### Signing a Message

To sign a message using the `signMessage.js` script, follow these steps:

1. Open a terminal within the `/server/scripts` folder.
2. Run `node signMessage.js`.
3. The script will prompt you to enter your private key and the message hash you want to sign.
4. Copy the signature and recovery bit and enter it in the required fields

### Sample Data

#### ME

- Private Key: 29abd046eb1dfd7a986301c131bebacd6fecf428784e0700ad4687bfc749b158
- Public Key: 02d15a81cfa26acd6e3b07000b51c414d7637f1988159a02630843dfc15273308b
- Address: f419d81f12e4892d24b539d61303d58faead7c54

#### BOB

- Private Key: d9a28fc47475d41e41417d5f5ad45c9159e6b2473ec212c9b16ee1c661f1a758
- Public Key: 02d5a45b50ab030adf6e7c4b5dd1b3a56e69297d8308f0248b50e9aca29e61341e
- Address: 260419d69cb2dca66873c732efe10c5f199ebefb

#### ALICE

- Private Key: 1488259274a5ca493ca489755b199339f09726698e509e6771549f41b0c29a3a
- Public Key: 02940b4e844435537a7074115865603dd6e78964be98c6d7899cd842944722198b
- Address: 8293531043fd2e20e3dd507a79b9700546a7a32e
