"use client";
import { useEffect, useState } from "react";
import { DeployContract } from "../../components-functional/Deploy";
import { fetchIfDeployed } from "../../utils";
import { fetchUsername } from "../../utils";
import { CreateEvent } from "../../components-functional/CreateEvent";
import { MintedCollection } from "../../components-functional/MintedCollections";
import { ShortlistEvents } from "../../components-functional/ShortlistEvents";
import { ActiveEvents } from "../../components-functional/ActiveEvents";
import { PausedEvents } from "../../components-functional/PausedEvents";
import { Domain } from "../../components-functional/Domain";

export default function Dashboard() {
    const [isDeployed, setIsDeployed] = useState();
    const [loaded, setLoaded] = useState(false);
    const [username, setUsername] = useState();

    useEffect(() => {
        checkDeployment();
    }, []);

    useEffect(() => {
        if (isDeployed == true) {
            fetchUsernameData();
        }
    }, [isDeployed]);

    async function checkDeployment() {
        const data = await fetchIfDeployed();
        setIsDeployed(data);
        setLoaded(true);
    }

    async function fetchUsernameData() {
        const data = await fetchUsername();
        setUsername(data);
    }

    if (loaded == false) return <div>Fetching...</div>;

    if (!isDeployed)
        return (
            <div>
                <DeployContract />
            </div>
        );

    return (
        <div>
            DASHBOARD
            <p>Username: {username}</p>
            <CreateEvent />
            <MintedCollection />
            <ShortlistEvents />
            <ActiveEvents />
            <PausedEvents />
            {/* <Domain /> */}
        </div>
    );
}
