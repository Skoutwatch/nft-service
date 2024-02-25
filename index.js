
const express = require('express');
const app = express();
const port = 3100;
const fs = require('fs');
const bodyParser = require('body-parser');

const { getKeypair, umi, CONNECTION } = require('./solanaUtils');
const { createMerkleTree } = require('./createMerkleTree');

const getMetadataUrl = require('./metadata');
const createNftCollection = require('./nftUtils.js');
const mintCnft = require('./mintCnft.js');

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello, Metaplex and Solana!');
});

app.get('/api/keypair', (req, res) => {
    try {
        const keypair = getKeypair();
        res.json({ keypair: keypair.publicKey }); // Respond with just the public key for simplicity
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

app.post('/createMerkleTree', (req, res) => {
    const umi = req.body.umi; // Assuming umi is sent in the request body
    createMerkleTree(umi)
        .then((result) => {
            res.json({ result });
        })
        .catch((error) => {
            res.status(500).json({ error: error.message });
        });
});

app.post('/metadata-url', async (req, res) => {
    try {
      const { name, symbol, description, image, umi, rule, ranking } = req.body;
      const uri = await getMetadataUrl(name, symbol, description, image, umi, rule, ranking);
      res.json({ uri });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
});

app.post('/createNftCollection', async (req, res) => {
    const { umi, wallet, name } = req.body;
    try {
        const collection = await createNftCollection(umi, wallet, name);
        res.json({ collection });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/mintCnft', async (req, res) => {
    const { umi, merkleTreePubKey, name, wallet } = req.body;
    try {
        const result = await mintCnft(umi, merkleTreePubKey, name, wallet);
        res.json({ result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(3000, () => {
    console.log('API server running on port 3000');
});
