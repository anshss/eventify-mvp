import { useEffect, useState } from "react";
import { fetchShortlistEvents, updateShortlist } from "../utils";
import { NftDesign } from "../components/icons/NftDesign";

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

        const [shortlistArray, setShortlistArray] = useState([]);

        return (
            <div className="text-black mb-5 mt-5">
                {/* <p>Nft card</p>
                <p>Name: {prop.name}</p>
                <p>Venue: {prop.venue}</p>
                <p>Date: {prop.date}</p>
                <p>Supply: {prop.remaining} / {prop.supply}</p>
                <p>Price: {prop.price}</p> */}

                {/* <p>NftURI: {prop.NftUri}</p> */}
                <NftDesign
                    // key={i}
                    ticketId={prop.ticketId}
                    name={prop.name}
                    venue={prop.venue}
                    date={prop.date}
                    supply={prop.supply}
                    remaining={prop.remaining}
                    price={prop.price}
                    image={prop.image}
                />
                <input
                    name="shortlistInput"
                    placeholder="address"
                    onChange={(e) =>
                        setShortlistArray(...shortlistArray, e.target.value)
                    }
                />
                <button onClick={() => updateShortlistCall(prop.ticketId)}>
                    Update
                </button>
            </div>
        );
    }

    if (loaded == false) return <div className="text-white">Fetching..</div>;

    if (loaded == true && activeEvents.length == 0)
        return (
            <div className="text-white">
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
