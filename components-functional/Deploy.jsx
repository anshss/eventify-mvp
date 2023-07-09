import { useState } from "react";
import { deploy } from "../utils";

export function DeployContract() {

    const [username, setUsername] = useState("")

    async function deployCall() {
        const data = await deploy(username)
        setUsername(data)
    }

    return(
        <div className="flex flex-col">
        Deploy
        <input className="text-black" name="username" placeholder="username" required onChange={e => {setUsername(e.target.value)}}/>
        <button onClick={deployCall}>Deploy Contract</button>
        </div>
    )
}