import { useEffect, useState } from "react";
import { fetchPausedEvents, runEvent } from "../utils";

export function PausedEvents() {
    const [pausedEvents, setPausedEvents] = useState([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        fetchPausedEventsData();
    }, []);

    async function fetchPausedEventsData() {
        const data = await fetchPausedEvents();
        setPausedEvents(data);
        setLoaded(true);
    }

    function NFTCard(prop) {
        async function runEventCall(ticketId) {
            await runEvent(ticketId);
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
                <button onClick={() => runEventCall(prop.tokenId)}>Run</button>
            </div>
        );
    }

    if (loaded == false) return <div>Fetching..</div>;

    if (loaded == true && pausedEvents.length == 0)
        return (
            <div>
                PAUSED EVENTS <br /> No Events
            </div>
        );

    return (
        <div>
            PAUSED EVENTS
            <div>
                {pausedEvents.map((nft, i) => {
                    return (
                        <NFTCard
                            key={i}
                            tokenId={nft.tokenId}
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
