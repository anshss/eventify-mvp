import { useEffect, useState } from "react";
import { fetchMintedCollection, publishTickets } from "../utils";
import { NftDesign } from "../components/icons/NftDesign";


export function MintedCollection() {
    const [mintedCollection, setMintedCollection] = useState([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        fetchMintedCollectionData();
    }, []);

    async function fetchMintedCollectionData() {
        const data = await fetchMintedCollection();
        setMintedCollection(data);
        setLoaded(true);
    }

    function NFTCard(prop) {
        async function publishTicketsCall(ticketId) {
            await publishTickets(ticketId);
        }

        return (
            <div className="text-black mb-5 mt-5">
                {/* <p>Nft card</p>
                <p>Name: {prop.name}</p>
                <p>Venue: {prop.venue}</p>
                <p>Date: {prop.date}</p>
                <p>Supply: {prop.supply}</p>
                <p>Price: {prop.price}</p> */}
                <NftDesign
                    name={prop.name}
                    venue={prop.venue}
                    date={prop.date}
                    supply={prop.supply}
                    remaining={prop.remaining}
                    price={prop.price}
                    host={prop.host}
                    image={prop.image}
                    eventType={prop.eventType}
                />
                <button className="inline-flex items-center justify-center rounded-md border border-transparent bg-[#8A42D8] px-[100px] py-4 text-base font-medium text-white shadow-sm hover:bg-indigo-700 ml-[250px] " onClick={() => publishTicketsCall(prop.tokenId)}>
                    Publish
                </button>
            </div>
        );
    }

    if (loaded == false) return <div className="text-white">Fetching..</div>;

    if (loaded == true && mintedCollection.length == 0)
        return (
            <div>
                MINTED COLLECTION <br /> No Events
            </div>
        );
    return (
        <div>
            MINTED COLLECTION
            <div>
                {mintedCollection.map((nft, i) => {
                    return (
                        <NFTCard
                            key={i}
                            ticketId={nft.ticketId}
                            host={nft.host}
                            name={nft.name}
                            venue={nft.venue}
                            date={nft.date}
                            supply={nft.supply}
                            remaining={nft.remaining}
                            price={nft.price}
                            image={nft.image || ""}
                            eventType={nft.eventType}
                        />
                    );
                })}
            </div>
        </div>
    );
}
