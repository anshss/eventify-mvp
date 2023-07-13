"use client";
import { fetchFeaturedEventsWithInfura } from "../../utils";
import { useEffect, useState } from "react";

export default function Featured() {
    const [featuredEvents, setFeaturedEvents] = useState();
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        featuredEventsData();
    }, []);

    async function featuredEventsData() {
        const data = await fetchFeaturedEventsWithInfura();
        setFeaturedEvents(data);
        setLoaded(true);
    }

    function NFTCard(prop) {
        async function buyTicketCall(ticketId, price) {
            await buyTicket(id, ticketId, price);
        }

        return (
            <div className="text-black mb-5 mt-5">
                <p>Nft card</p>
                <p>Name: {prop.name}</p>
                <p>Venue: {prop.venue}</p>
                <p>Date: {prop.date}</p>
                <p>Supply: {prop.supply}</p>
                <p>Price: {prop.price}</p>
                {/* <p>NftURI: {prop.NftUri}</p> */}
                <button
                    onClick={() => buyTicketCall(prop.ticketId, prop.price)}
                >
                    Buy Ticket
                </button>
            </div>
        );
    }

    if (loaded == false) return <div>Fetching..</div>;

    if (loaded == true && featuredEvents.length == 0)
        return (
            <div>
                FEATURED EVENTS <br /> No events
            </div>
        );

    return (
        <div>
            FEATURED EVENTS
            <div>
                {featuredEvents.map((nft, i) => {
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
