const { createSignerFromKeypair, signerIdentity } = require("@metaplex-foundation/umi");
const { createBundlrUploader } = require("@metaplex-foundation/umi-uploader-bundlr");
const getKeypair = require("./solansUtils").getKeypair;

// Assuming `umi` is provided elsewhere in your script and passed to this function
async function getMetadataUrl(name, symbol, description, image, umi, rule, ranking) {
    try {
        const keypair = getKeypair(); // Simplify to use directly without type
        
        const signer = await createSignerFromKeypair(umi, keypair);
        umi.use(signerIdentity(signer));

        const metadata = {
            name,
            description,
            image,
            rule: "", // Assuming you meant to overwrite with empty string
            ranking: 0 // Assuming you meant to set as 0
        };
        // Removed toMetaplexFileFromBrowser since it seems unused in the simplified version
        const bundlrUploader = createBundlrUploader(umi);
        const uri = await bundlrUploader.uploadJson(metadata);
        return uri;
    } catch (error) {
        console.error("Error getting metadata URL:", error);
        throw error;
    }
}

module.exports = { getMetadataUrl };