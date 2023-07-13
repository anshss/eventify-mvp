import { useEffect, useState } from "react";
import { fetchShortlistEvents, updateShortlist } from "../utils";

export function ShortlistEvents() {
    const [activeEvents, setActiveEvents] = useState([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        fetchShortlistEventsData();
    }, []);

    async function fetchShortlistEventsData() {
        const data = await fetchShortlistEvents();
        setActiveEvents(data);
        setLoaded(true);
    }

    function NFTCard(prop) {
        async function updateShortlistCall(ticketId) {
            await updateShortlist(ticketId, shortlistArray);
        }

        const [shortlistArray, setShortlistArray] = useState([])

        return (
            <div className="text-black mb-5 mt-5">
                <p>Nft card</p>
                <p>Name: {prop.name}</p>
                <p>Venue: {prop.venue}</p>
                <p>Date: {prop.date}</p>
                <p>Supply: {prop.supply}</p>
                <p>Price: {prop.price}</p>
                {/* <p>NftURI: {prop.NftUri}</p> */}
                <input name="shortlistInput" placeholder="address" onChange={e => setShortlistArray(...shortlistArray, e.target.value)} />
                <button onClick={() => updateShortlistCall(prop.ticketId)}>
                    Update
                </button>
            </div>
        );
    }

    if (loaded == false) return <div>Fetching..</div>;

    if (loaded == true && activeEvents.length == 0)
        return (
            <div>
                SHORTLIST EVENTS <br /> No Events
            </div>
        );

    return (
        <div>
            SHORTLIST EVENTS
            <div>
                {activeEvents.map((nft, i) => {
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
