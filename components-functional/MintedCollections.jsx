import { useEffect, useState } from "react"
import { fetchMintedCollection, publishTickets } from "../utils";

export function MintedCollection(props) {
    const [mintedCollection, setMintedCollection] = useState([])
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        if(props.username) {
            fetchMintedCollectionData()
        }
    }, [props.username])

    async function fetchMintedCollectionData() {
        const data = await fetchMintedCollection(props.username)
        setMintedCollection(data)
        setLoaded(true)
    }

    function NFTCard(prop) {

        async function publishTicketsCall(ticketId) {
            await publishTickets(ticketId)
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
                <button onClick={() => publishTicketsCall(prop.tokenId)}>Publish Tickets</button>
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