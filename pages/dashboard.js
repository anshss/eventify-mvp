import { useEffect, useState } from "react";
import { address, abiFactory } from "@/config";
import web3modal from "web3modal";
import { ethers } from "ethers";
import { DeployContract } from "@/components-functional/Deploy";
import { DashboardComponent } from "@/components-functional/Dashboard";

export default function Dashboard() {
    const [deployed, setDeployed] = useState(true);

    useEffect(() => {
        // checkDeployment()
    }, []);

    const infuraKey = process.env.NEXT_PUBLIC_INFURA_KEY

    async function checkDeployment() {
        const modal = new web3modal();
        const connection = await modal.connect();
        const provider = new ethers.provider.Web3Provider(connection)
        const signer = provider.getSigner();
        const contract = new ethers.Contract(address, abiFactory, signer);
        const tx = contract.hasDeployed();
        console.log(tx);
        setDeployed(true);
    }

    if (!deployed)
        return (
            <div>
                Dashboard
                <DeployContract />
                <button onClick={checkDeployment}>debug</button>
            </div>
        );
    return (
        <div>
            Dashboard
            <DashboardComponent />
            <button onClick={checkDeployment}>debug</button>
        </div>
    );
}
