'use client'
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { checkUsernameValidity, fetchActiveEvents } from "../../../utils";

export default function Events() {

    const pathName = usePathname();

    const id = pathName?.split("/")[2];

    const [activeEvents, setActiveEvents] = useState([]);
    const [isUsernameValid, setIsUsernameValid] = useState(false)
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        if (id) {
            checkUsernameValidityData();
        }
    }, [id]);

    useEffect(() => {
        if(isUsernameValid == true) {
            fetchActiveEventsData()
        }
    }, [isUsernameValid])


    async function checkUsernameValidityData() {
        const data = await checkUsernameValidity()
        setIsUsernameValid(data)
    }

    async function fetchActiveEventsData() {
        const data = await fetchActiveEvents()
        setActiveEvents(data);
        setLoaded(true)
    }

    function NFTCard(prop) {
        async function buyTicket(ticketId) {
            const contract = await getContract()
            const tx = await contract.buyTicketCall(id, ticketId)
            await tx.wait()
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
                <button onClick={() => buyTicket(prop.ticketId)}>Buy Ticket</button>
            </div>
        );
    }

    if (isUsernameValid == false) return (
        <div>User do not exist</div>
    )

    if (isUsernameValid == true && loaded == true && activeEvents.length == 0) return (
        <div>ACTIVE EVENTS <br /> No Tickets</div>
    )

    return(
        <div>
            Events of {id}
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
    )
}