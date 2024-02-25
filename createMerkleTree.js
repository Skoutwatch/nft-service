const dotenv = require('dotenv');
dotenv.config();
const fs = require('fs');
const { getKeypair } = require('./solanaUtils');
const { generateSigner, signerIdentity, createSignerFromKeypair } = require('@metaplex-foundation/umi');
const { createTree } = require('@metaplex-foundation/mpl-bubblegum');

async function createMerkleTree(umi) {
    try {
        const keypair = await getKeypair();

        const signer = await createSignerFromKeypair(umi, keypair);
        umi.use(signerIdentity(signer));

        const merkleTree = generateSigner(umi);

        const builder = await createTree(umi, {
            merkleTree,
            maxDepth: 14,
            maxBufferSize: 64,
        });
        const tx = await builder.sendAndConfirm(umi);
        console.log(tx);

        // Optional: return values if needed
        // return { signer, tx };
    } catch (error) {
        console.error(error);
        // Optional: return or handle the error as needed
        // return error;
    }
}

module.exports = { createMerkleTree };
