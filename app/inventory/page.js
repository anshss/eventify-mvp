"use client";
import { fetchCommonInventory } from "../../utils";
import { useEffect, useState } from "react";

export default function Inventory() {
    const [inventoryData, setInventoryData] = useState();
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        fetchInventoryData();
    }, []);

    async function fetchInventoryData() {
        const data = await fetchCommonInventory();
        setInventoryData(data);
        setLoaded(true);
    }

    function NFTCard(prop) {
        return (
            <div className="text-black mb-5 mt-5">
                <p>Nft card</p>
                <p>Name: {prop.name}</p>
                <p>Venue: {prop.venue}</p>
                <p>Date: {prop.date}</p>
                <p>Supply: {prop.supply}</p>
                <p>Price: {prop.price}</p>
                {/* <p>NftURI: {prop.NftUri}</p> */}
            </div>
        );
    }

    if (loaded == false) return <div>Fetching..</div>;

    if (loaded == true && inventoryData.length == 0)
        return (
            <div>
                PURCHASED TICKETS <br /> No events
            </div>
        );

    return (
        <div>
            PURCHASED TICKETS
            <div>
                {inventoryData.map((nft, i) => {
                    return (
                        <NFTCard
                            key={i}
                            ticketId={nft.ticketId}
                            name={nft.name}
                            venue={nft.venue}
                            date={nft.date}
                            supply={nft.supply}
                            price={nft.price}
                            // NftURI={nft.NftURI}
                        />
                    );
                })}
            </div>
        </div>
    );
}
