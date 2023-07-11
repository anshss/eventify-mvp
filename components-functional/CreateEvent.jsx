'use client'
import { useState } from "react";
import { getContract, uploadToIPFS } from "../utils";
import { ethers } from "ethers";

export function CreateEvent() {
    const [formInput, setFormInput] = useState({
        name: "test",
        venue: "test",
        date: "test",
        cover: "",
        price: "10",
        supply: "10"
    });

    async function formURI() {
        const { name, venue, date, price, supply } = formInput
        if (!name || !venue || !date || !price || !supply) return
        const data = JSON.stringify({ name, venue, date })
        const files = [new File([data], 'data.json')]
        const metaCID = await uploadToIPFS(files)
        const url = `https://ipfs.io/ipfs/${metaCID}/data.json`
        console.log(url)
        return url
    }

    async function mint() {
        const NftURI = await formURI()
        const contract = await getContract(true)
        const price = ethers.utils.parseEther(formInput.price);
        const tx = await contract.mintTicketsCall(price, formInput.supply, NftURI)
        await tx.wait()
        console.log("minted")
    }

    return (
        <div className="flex flex-col">
            CREATE EVENT
            <input
                name="Name"
                placeholder="Name"
                required
                onChange={(e) =>
                    setFormInput({
                        ...formInput,
                        name: e.target.value,
                    })
                }
                value={formInput.name}
            />
            <input
                name="Venue"
                placeholder="Venue"
                required
                onChange={(e) =>
                    setFormInput({
                        ...formInput,
                        venue: e.target.value,
                    })
                }
                value={formInput.venue}
            />
            <input
                name="Date"
                placeholder="Date"
                required
                onChange={(e) =>
                    setFormInput({
                        ...formInput,
                        date: e.target.value,
                    })
                }
                value={formInput.date}
            />
            <input
                name="Price"
                placeholder="Price"
                required
                onChange={(e) =>
                    setFormInput({
                        ...formInput,
                        price: e.target.value,
                    })
                }
                value={formInput.price}
            />
            <input
                name="Supply"
                placeholder="Supply"
                required
                onChange={(e) =>
                    setFormInput({
                        ...formInput,
                        supply: e.target.value,
                    })
                }
                value={formInput.supply}
            />
            <button onClick={mint}>Mint Collection</button>
        </div>
    );
}
