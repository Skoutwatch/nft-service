import { createNft, mplTokenMetadata } from "@metaplex-foundation/mpl-token-metadata"
import { createSignerFromKeypair, generateSigner, Keypair, percentAmount, publicKey, signerIdentity, Umi } from "@metaplex-foundation/umi";
import { bundlrUploader } from "@metaplex-foundation/umi-uploader-bundlr";
import { WalletContextState } from "@solana/wallet-adapter-react";
import { getKeypair } from "./data";

export const createNftCollection = async(umi: Umi, wallet:WalletContextState, name: string ) => {
    try{
        const privateKey = process.env.NEXT_PUBLIC_PRIVATE_KEY;

        if (!privateKey) {
            throw new Error("Private key not provided");
        }

        const secretKeyArray = JSON.parse(privateKey);
        const keypair: Keypair = {
            publicKey: publicKey(“walletpublickey”),
            secretKey: new Uint8Array(secretKeyArray),
        };

        // const keypair = await getKeypair()

        if (!wallet.publicKey) {
            throw new Error("An error has occur")
        }

        const signer = createSignerFromKeypair(umi, keypair)
        umi.use(signerIdentity(signer))
        umi.use(mplTokenMetadata())

        const collectionMint = generateSigner(umi)

        const collection = await createNft(umi, {
            mint: publicKey(wallet.publicKey.toBase58()),
            name: name,
            uri: 'https://example.com/my-collection.json',
            sellerFeeBasisPoints: percentAmount(5.5),
            isCollection: true,
        }).sendAndConfirm(umi);

        console.log(collection)
    } catch(error){
        console.log(error)
    }
}