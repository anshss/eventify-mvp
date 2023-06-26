import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import { address, abiFactory } from "../../config";
import web3modal from "web3modal";
import { ethers } from "ethers";
import axios from "axios";

export default function Events() {
    const router = useRouter()
    const { id } = router.query;

    const [activeEvents, setActiveEvents] = useState([]);
    const [isUsernameValid, setIsUsernameValid] = useState(false)
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        if (id) {
            checkUsernameValidity();
        }
    }, [id]);

    useEffect(() => {
        if(isUsernameValid == true) {
            fetchActiveEvents()
        }
    }, [isUsernameValid])

    async function getContract() {
        const modal = new web3modal();
        const connection = await modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(address, abiFactory, signer);
        return contract
    }

    async function checkUsernameValidity() {
        const contract = await getContract()
        const data = await contract.usernameExist(id);
        console.log(data)
        setIsUsernameValid(data)
    }

    async function fetchActiveEvents() {
        const contract = await getContract()
        const data = await contract.fetchActiveEventsCall(id.toString());
        const items = await Promise.all(
            data.map(async (i) => {
                const tokenUri = await contract.uriCall(id, i.ticketId.toString());
                console.log(tokenUri)
                const meta = await axios.get(tokenUri);
                let price = ethers.utils.formatEther(i.price);
                let item = {
                    ticketId: i.ticketId.toString(),
                    name: meta.data.name,
                    venue: meta.data.venue,
                    date: meta.data.name,
                    supply: i.supply.toNumber(),
                    price,
                    NftURI: tokenUri,
                    // cover: meta.data.cover
                };
                return item;
            })
        );
        console.log(items);
        setActiveEvents(items);
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