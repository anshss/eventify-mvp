import { useEffect, useState } from "react";
import { fetchActiveEvents, pauseEvent, raiseFeaturedEvents } from "../utils";
import { NftDesign } from "../components/icons/NftDesign";

export function ActiveEvents() {
    const [activeEvents, setActiveEvents] = useState([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        fetchActiveEventsData();
    }, []);

    async function fetchActiveEventsData() {
        const data = await fetchActiveEvents();
        setActiveEvents(data);
        setLoaded(true);
    }

    function NFTCard(prop) {
        async function pauseEventCall(ticketId) {
            await pauseEvent(ticketId);
        }

        async function featureEventCall(ticketId) {
            await raiseFeaturedEvents(ticketId)
        }

        return (
            <div className="text-black mb-5 mt-5">
               <NftDesign
                            // key={i}
                            ticketId={prop.ticketId}
                            name={prop.name}
                            venue={prop.venue}
                            date={prop.date}
                            supply={prop.supply}
                            remaining={prop.remaining}
                            price={prop.price}
                            // NftURI={nft.NftURI}
                        />
                {/* <p>NftURI: {prop.NftUri}</p> */}
                <button onClick={() => pauseEventCall(prop.ticketId)}>
                    Pause
                </button>
                <button onClick={() => featureEventCall(prop.ticketId)}>
                    Feature
                </button>
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
                            remaining={nft.remaining}
                            price={nft.price}
                            // NftURI={nft.NftURI}
                        />
                    );
                })}
            </div>
        </div>
    );
}
