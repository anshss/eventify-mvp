import { useEffect, useState } from "react";
import { ActiveEvents } from "./ActiveEvents";
import { CreateEvent } from "./CreateEvent";
import { Domain } from "./Domain";
import { MintedCollection } from "./MintedCollections";
import { address, abiFactory } from "../config";
import web3modal from "web3modal";
import { ethers } from "ethers";
import { PausedEvents } from "./PausedEvents";

export function DashboardComponent() {

    const [username, setUsername] = useState()

    useEffect(() => {
        fetchUsername()
    }, [])

    async function fetchUsername() {
        const modal = new web3modal();
        const connection = await modal.connect();
        const provider = new ethers.providers.Web3Provider(connection)
        const signer = provider.getSigner();
        const contract = new ethers.Contract(address, abiFactory, signer);
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
        const tx = await contract.addressToUsernames(accounts[0])
        setUsername(tx)
    }

    if (!username) return

    return (
        <div>
            DASHBOARD
            <p>Username: {username}</p>
            <CreateEvent />
            <MintedCollection username={username}/>
            <ActiveEvents username={username} />
            <PausedEvents username={username} />
            {/* <Domain /> */}
        </div>
    );
}
