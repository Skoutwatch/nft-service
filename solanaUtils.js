require('dotenv').config();
const { Connection } = require('@solana/web3.js');
const { publicKey, createUmi } = require('@metaplex-foundation/umi');
const { createUmi: createUmiBundleDefaults } = require('@metaplex-foundation/umi-bundle-defaults');

const CONNECTION = new Connection('https://api.devnet.solana.com', 'confirmed');
const umi = createUmiBundleDefaults(`https://devnet.solana.com`);

function getKeypair() {
    const privateKey = process.env.NEXT_PUBLIC_PRIVATE_KEY;
    if (!privateKey) {
        throw new Error("Private key not provided");
    }
    const secretKeyArray = JSON.parse(privateKey);
    return {
        publicKey: publicKey("ofbuPxNVCoCNjVyeeQc9yWL8R7P2TSwPhe8aUsSqmUG"),
        secretKey: new Uint8Array(secretKeyArray),
    };
}

// Export the connection, umi instance, and getKeypair function
module.exports = { CONNECTION, umi, getKeypair };