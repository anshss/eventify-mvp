import { useState } from "react";
import { address, abiFactory } from "../config";
import web3modal from "web3modal";
import { ethers } from "ethers";

export function DeployContract() {

    const [username, setUsername] = useState("")


    async function getContract() {
        const modal = new web3modal();
        const connection = await modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(address, abiFactory, signer);
        return contract
    }

    async function deploy() {
        const usernameValidity = await checkUsernameValidity()
        if (usernameValidity == true) {
            console.log("username already exist")
            return
        }
        const contract = await getContract()
        console.log(username.toString())
        const tx = await contract.deployEventify(username.toString())
        await tx.wait()
        location.reload()
        console.log("deployed")
    }

    async function checkUsernameValidity() {
        const contract = await getContract()
        const data = await contract.usernameExist(username.toString());
        return data
    }

    return(
        <div className="flex flex-col">
        Deploy
        <input className="text-black" name="username" placeholder="username" required onChange={e => {setUsername(e.target.value)}}/>
        <button onClick={deploy}>Deploy Contract</button>
        </div>
    )
}