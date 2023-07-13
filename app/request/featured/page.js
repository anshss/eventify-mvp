"use client";
import { fetchFeaturedRequest, approveFeaturedRequest } from "../../../utils";
import { useEffect, useState } from "react";

export default function Featured() {
    const [featuredRequest, setFeaturedRequest] = useState();
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        fetchDataFromContract();
    }, []);

    async function fetchDataFromContract() {
        const data = await fetchFeaturedRequest();
        setFeaturedRequest(data);
        setLoaded(true);
    }

    function NFTCard(prop) {
        async function approveCall(host, ticketId) {
            await approveFeaturedRequest(host, ticketId)
        }

        return (
            <div className="text-black mb-5 mt-5">
                <p>Nft card</p>
                <p>host: {prop.host}</p>
                <p>ticketId: {prop.ticketId}</p>
                <button
                    onClick={() => approveCall(prop.host, prop.ticketId)}
                >
                    Approve
                </button>
            </div>
        );
    }

    if (loaded == false) return <div>Fetching..</div>;

    if (loaded == true && featuredRequest.length == 0)
        return (
            <div>
                FEATURED REQUEST <br /> No events
            </div>
        );

    return (
        <div>
            FEATURED REQUEST
            <div>
                {featuredRequest.map((nft, i) => {
                    return (
                        <NFTCard
                            key={i}
                            ticketId={nft.ticketId}
                            host={nft.host}
                            isApproved={nft.isApproved}
                        />
                    );
                })}
            </div>
        </div>
    );
}
