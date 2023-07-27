import { useState } from "react";
import { deploy } from "../utils";
import { Navbar } from "../components/Navbar";
export function DeployContract() {
    const [step, setStep] = useState(1);

    const [username, setUsername] = useState("")

    async function deployCall() {
        const data = await deploy(username)
        setUsername(data)
    }

    return(
        <div className="flex flex-col text-white">
            <Navbar/>
            <br />
            <br />
            <br />
            <br />
            <div className="antialiased sans-serif">
            <div className="max-w-3xl mx-auto px-4 py-10">
                <div className={step === "complete" ? "hidden" : "block"}>
                    {/* ... */}
                    <div class="text-lg font-bold text-white leading-tight">
                        Create Event
                    </div>
                    <div class="py-10">
                        <div class="mb-5 text-center">
                          



                          

                           
                        </div>

                        <div class="mb-5">
                            <label
                                for="email"
                                class="font-bold mb-1 text-white block"
                            >
                                UserName
                            </label>
                            <input
                                type="email"
                                class="w-full px-4 py-3 rounded-lg shadow-sm focus:outline-none focus:shadow-outline text-gray-600 font-medium"
                                placeholder="Enter your username"
                                onChange={e => {setUsername(e.target.value)}}
                                
                                
                            />
                        </div>
                        <div className="w-1/2 text-right">
                                    <button
                                            className="w-42 focus:outline-none border border-transparent py-2 px-8 rounded-lg shadow-sm text-center text-white ml-5 bg-blue-500 hover:bg-blue-600 font-semibold"
                                            onClick={deployCall}
                                    >
                                        Deploy Contract
                                    </button>
                                    </div>
                        </div>
                        </div>
                        </div>
                        
                        </div>

        {/* <input className="text-black" name="username" placeholder="username" required onChange={e => {setUsername(e.target.value)}}/> */}
        {/* <button onClick={deployCall}>Deploy Contract</button> */}
        </div>
    )
}