import { fetchMerkleTree, fetchTreeConfigFromSeeds, mintToCollectionV1, mintV1 } from "@metaplex-foundation/mpl-bubblegum"
import { publicKey, PublicKey, Umi } from "@metaplex-foundation/umi"
import { WalletContextState } from "@solana/wallet-adapter-react";

export const mintCnft = async (
    umi,
    merkleTreePubKey, 
    name, 
    wallet,
    // uri: string
    ) => {

    const merkleTree = await fetchMerkleTree(umi, publicKey(merkleTreePubKey))

    // const treeConfig = await fetchTreeConfigFromSeeds(umi, { merkleTree: publicKey })

    if(!wallet.publicKey){
        return
    }

    const nft = await mintToCollectionV1(umi, {
        leafOwner: publicKey(wallet.publicKey.toBase58()),
        merkleTree: merkleTree.publicKey,
        collectionMint: publicKey(wallet.publicKey.toBase58()),
        metadata: {
            name: 'My Compressed NFT',
            uri: 'https://example.com/my-cnft.json',
            sellerFeeBasisPoints: 500,
            collection: { key: publicKey(wallet.publicKey), verified: false },
            creators: [
                { address: umi.identity.publicKey, verified: false, share: 100 },
            ],
        },
    }).sendAndConfirm(umi)

    console.log(nft)
    
}