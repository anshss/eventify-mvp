"use client";
import { useEffect, useState } from "react";
import { DeployContract } from "../../components-functional/Deploy";
import { DashboardComponent } from "../../components-functional/Dashboard";
import { fetchIfDeployed } from "../../utils";

export default function Dashboard() {
    const [isDeployed, setIsDeployed] = useState();
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        checkDeployment();
    }, []);

    async function checkDeployment() {
        const data = await fetchIfDeployed();
        setIsDeployed(data);
        setLoaded(true);
    }

    if (loaded == false) return <div></div>;

    if (!isDeployed)
        return (
            <div>
                <DeployContract />
            </div>
        );

    return (
        <div>
            <DashboardComponent />
        </div>
    );
}
