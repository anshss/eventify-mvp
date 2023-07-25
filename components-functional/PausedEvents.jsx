import { useEffect, useState } from "react";
import { fetchPausedEvents, runEvent } from "../utils";
import { NftDesign } from "../components/icons/NftDesign";

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
            <div className="text-white mb-5 mt-5">
                {/* <p>Nft card</p>
                <p>Name: {prop.name}</p>
                <p>Venue: {prop.venue}</p>
                <p>Date: {prop.date}</p>
                <p>Supply: {prop.remaining} / {prop.supply}</p>
                <p>Price: {prop.price}</p> */}
                {/* <p>NftURI: {prop.NftUri}</p> */}
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
                <button
                    className="inline-flex items-center justify-center rounded-md border border-transparent bg-[#8A42D8] px-[100px] py-4 text-base font-medium text-white shadow-sm hover:bg-indigo-700 ml-[250px] "
                    onClick={() => runEventCall(prop.tokenId)}
                >
                    Run
                </button>
            </div>
        );
    }

    if (loaded == false) return <div className="text-white">Fetching..</div>;

    if (loaded == true && pausedEvents.length == 0)
        return (
            <div className="text-white">
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
