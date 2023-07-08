'use client'
import { useEffect, useState } from "react";
import { DeployContract } from "../../components-functional/Deploy";
import { DashboardComponent } from "../../components-functional/Dashboard";
import { checkIfDeployed } from "../../utils";

export default function Dashboard() {
    const [isDeployed, setIsDeployed] = useState(true);

    useEffect(() => {
        fetchDataFromContract()
    }, []);

    async function fetchDataFromContract() {
        const data = await checkIfDeployed()
        setIsDeployed(data)
    }


    if (!isDeployed)
        return (
            <div>
                <DeployContract />
                {/* <button onClick={checkDeployment}>debug</button> */}
            </div>
        );
    return (
        <div>
            <DashboardComponent />
            {/* <button onClick={checkDeployment}>debug</button> */}
        </div>
    );
}