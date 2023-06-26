import { useEffect, useState } from "react"
import { address, abiFactory } from "../config";
import web3modal from "web3modal";
import { ethers } from "ethers";
import axios from "axios"

export function MintedCollection(props) {
    const [mintedCollection, setMintedCollection] = useState([])
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        if(props.username) {
            fetchMintedCollection()
        }
    }, [props.username])

    async function fetchMintedCollection() {
        const modal = new web3modal();
        const connection = await modal.connect();
        const provider = new ethers.providers.Web3Provider(connection)
        const signer = provider.getSigner();
        const contract = new ethers.Contract(address, abiFactory, signer);
        const data = await contract.fetchMintedTicketsCall(props.username)
        const items = await Promise.all(
            data.map(async (i) => {
                const tokenUri = await contract.uriCall(props.username, i.ticketId.toString());
                console.log(tokenUri)
                const meta = await axios.get(tokenUri);
                let price = ethers.utils.formatEther(i.price);
                let item = {
                    tokenId: i.ticketId.toString(),
                    name: meta.data.name,
                    venue: meta.data.venue,
                    date: meta.data.name,
                    supply: i.supply.toNumber(),
                    price,
                    NftURI: tokenUri,
                    // cover: meta.data.cover
                };
                return item;
            })
        );
        console.log(items)
        setMintedCollection(items)
        setLoaded(true)
        console.log("fetched")
    }

    function NFTCard(prop) {

        async function publishTickets() {
            const modal = new web3modal();
            const connection = await modal.connect();
            const provider = new ethers.providers.Web3Provider(connection)
            const signer = provider.getSigner();
            const contract = new ethers.Contract(address, abiFactory, signer);
            const tx = await contract.publishTickets(prop.tokenId)
            await tx.wait()
        }

        return(
            <div className="text-black mb-5 mt-5">
                <p>Nft card</p>
                <p>Name: {prop.name}</p>
                <p>Venue: {prop.venue}</p>
                <p>Date: {prop.date}</p>
                <p>Supply: {prop.supply}</p>
                <p>Price: {prop.price}</p>
                {/* <p>NftURI: {prop.NftUri}</p> */}
                <button onClick={() => publishTickets(prop.tokenId)}>Publish Tickets</button>
            </div>
        )
    }

    function debug() {
        console.log(mintedCollection)
    }

    if (loaded == true && mintedCollection.length == 0) return (
        <div>MINTED COLLECTION <br /> No Tickets</div>
    ) 
    return(
        <div>
            MINTED COLLECTION
            <div>
            {mintedCollection.map((nft, i) => {
                return <NFTCard 
                key={i}
                tokenId={nft.tokenId}
                name={nft.name}
                venue={nft.venue}
                date={nft.date}
                supply={nft.supply}
                price={nft.price}
                NftURI={nft.NftURI}
                />
            } )}
            </div>
            {/* <button onClick={debug}>debug</button> */}
        </div>
    )
}