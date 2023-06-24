import { useState } from "react";
import { address, abiFactory } from "../config";
import web3modal from "web3modal";
import { ethers } from "ethers";
import { Web3Storage } from 'web3.storage'

export function CreateEvent() {
    const [formInput, setFormInput] = useState({
        name: "test",
        venue: "test",
        date: "test",
        cover: "",
        price: "10",
        supply: "10"
    });

    function getAccessToken() {
        return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDkyMjkyQjQ5YzFjN2ExMzhERWQxQzQ3NGNlNmEyNmM1NURFNWQ0REQiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NjUyMzg2MDc1NDEsIm5hbWUiOiJNZXRhRmkifQ.cwyjEIx8vXtTnn8Y3vctroo_rooHV4ww_2xKY-MT0rs'
      }
    
      function makeStorageClient() {
        return new Web3Storage({ token: getAccessToken() })
      }
    
      const uploadToIPFS = async (files) => {
        const client = makeStorageClient()
        const cid = await client.put(files)
        return cid
      }

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
        const modal = new web3modal();
        const connection = await modal.connect();
        const provider = new ethers.providers.Web3Provider(connection)
        const signer = provider.getSigner();
        const contract = new ethers.Contract(address, abiFactory, signer);
        const price = ethers.utils.parseEther(formInput.price);
        const tx = await contract.mintTicketsCall(price, formInput.supply, NftURI)
        await tx.wait()
        location.reload()
        console.log("minted")
    }

    return (
        <div className="flex flex-col">
            CreateEvent
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
            <button onClick={mint}>MINT COLLECTION</button>
        </div>
    );
}
