'use client'
import { fetchUsername, pauseEvent } from "../utils";
import { useEffect, useState } from "react";
import { ActiveEvents } from "./ActiveEvents";
import { CreateEvent } from "./CreateEvent";
import { Domain } from "./Domain";
import { MintedCollection } from "./MintedCollections";
import { PausedEvents } from "./PausedEvents";

export function DashboardComponent() {

    const [username, setUsername] = useState()

    useEffect(() => {
        fetchUsernameData()
    }, [])

    async function fetchUsernameData() {
        const data = await fetchUsername()
        setUsername(data)
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
