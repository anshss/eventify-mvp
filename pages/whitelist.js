import { address, abiFactory } from ".config./config";
import web3modal from "web3modal";
import { ethers } from "ethers";
import { useState } from "react";

export default function Whitelist() {

    const [formInput, setFormInput] = useState()

    async function getContract() {
        const modal = new web3modal();
        const connection = await modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(address, abiFactory, signer);
        return contract
    }

    async function getAddress() {
        return address
    }

    async function checkWhitelist() {
        const contract = await getContract()
        const address = await getAddress()
        const data = await contract.isWhitelisted(address)
        return data
    }

    async function whitelistUser() {
        const contract = await getContract()
        const check = await checkWhitelist()
        if (check == true) return
        const tx = await contract.whitelistUser()
        await tx.wait()
        console.log("whitelisted")
    }

    return(
      <div>
        Landing Page
        <input name="address" placeholder="wallet address" onChange={e => {setFormInput(e.target.value)}}/>
        <button onClick={whitelistUser}>Whitelist User</button>
      </div>
    )
  }