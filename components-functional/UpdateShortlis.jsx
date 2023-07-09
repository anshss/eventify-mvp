import { useEffect, useState } from "react";
import { fetchActiveEventsWithWalletProvider, pauseEvent } from "../utils";

export function ActiveEvents(props) {
    const [activeEvents, setActiveEvents] = useState([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        if (props.username) {
            fetchActiveEventsData();
        }
    }, [props.username]);

    async function fetchActiveEventsData() {
        const data = await fetchActiveEventsWithWalletProvider(props.username);
        setActiveEvents(data);
        setLoaded(true);
    }

    function NFTCard(prop) {
        async function pauseEventCall(ticketId) {
            await pauseEvent(ticketId);
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
                <button onClick={() => pauseEventCall(prop.ticketId)}>
                    Pause
                </button>
                {/* <button onClick={() => runEvent(prop.tokenId)}>Run</button> */}
            </div>
        );
    }

    if (loaded == false) return <div>Fetching..</div>;

    if (loaded == true && activeEvents.length == 0)
        return (
            <div>
                ACTIVE EVENTS <br /> No Events
            </div>
        );

    return (
        <div>
            ACTIVE EVENTS
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
