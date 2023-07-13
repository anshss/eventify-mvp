'use client'
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { fetchUsernameValidity, fetchInventory, buyTicket } from "../../../utils";

export default function Events() {

    const pathName = usePathname();

    const id = pathName?.split("/")[1];

    const [purchasedTickets, setPurchasedTickets] = useState([]);
    const [isUsernameValid, setIsUsernameValid] = useState(false)
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        if (id) {
            checkUsernameValidityData();
        }
    }, [id]);

    useEffect(() => {
        if(isUsernameValid == true) {
            fetchInventoryData()
        }
    }, [isUsernameValid])


    async function checkUsernameValidityData() {
        const data = await fetchUsernameValidity(id)
        setIsUsernameValid(data)
    }

    async function fetchInventoryData() {
        const data = await fetchInventory(id)
        setPurchasedTickets(data);
        setLoaded(true)
        console.log("user host: ", id)
    }

    function NFTCard(prop) {
        async function buyTicketCall(ticketId, price) {
            await buyTicket(id, ticketId, price)
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
                <button onClick={() => buyTicketCall(prop.ticketId, prop.price)}>Buy Ticket</button>
            </div>
        );
    }

    if (loaded == false) return <div>Fetching..</div>

    if (loaded == true && isUsernameValid == false) return (
        <div>User do not exist</div>
    )

    if (loaded == true && isUsernameValid == true && purchasedTickets.length == 0) return (
        <div>Purchased Tickets <br /> No events</div>
    )

    return(
        <div>
            Tickets of {id}
            <div>
            {purchasedTickets.map((nft, i) => {
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