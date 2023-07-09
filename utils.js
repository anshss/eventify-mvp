"use client";
import web3modal from "web3modal";
import { ethers } from "ethers";
import { address, abiFactory } from "./config";
import axios from "axios";

const InfuraKey = process.env.NEXT_PUBLIC_INFURA_KEY;

export async function getContract(providerOrSigner) {
    const modal = new web3modal();
    const connection = await modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(address, abiFactory, provider);
    if (providerOrSigner == true) {
        const contract = new ethers.Contract(address, abiFactory, signer);
        return contract;
    }
    return contract;
}

export async function getContractWithInfura() {
    const provider = new ethers.providers.JsonRpcProvider(
        `https://polygon-mumbai.infura.io/v3/${InfuraKey}`
    );
    const contract = new ethers.Contract(address, abiFactory, provider);
    return contract;
}

export async function fetchFeaturedEvents() {
    const contract = await getContractWithInfura();
    const data = await contract.fetchFeaturedEvents();
    const items = await Promise.all(
        data.map(async (i) => {
            // const tokenUri = await contract.uriCall(id, i.ticketId.toString());
            // console.log(tokenUri);
            // const meta = await axios.get(tokenUri);
            let price = ethers.utils.formatEther(i.price);
            let item = {
                ticketId: i.ticketId.toString(),
                // name: meta.data.name,
                // venue: meta.data.venue,
                // date: meta.data.name,
                supply: i.supply.toNumber(),
                price,
                NftURI: tokenUri,
                // cover: meta.data.cover
            };
            return item;
        })
    );
    console.log("Featured Events", items);
    return items;
}

export async function fetchCommonInventory() {
    const contract = await getContract();
    const data = await contract.fetchAllPurchasedTickets();
    const items = await Promise.all(
        data.map(async (i) => {
            // const tokenUri = await contract.uriCall(id, i.ticketId.toString());
            // console.log(tokenUri);
            // const meta = await axios.get(tokenUri);
            let price = ethers.utils.formatEther(i.price);
            let item = {
                ticketId: i.ticketId.toString(),
                // name: meta.data.name,
                // venue: meta.data.venue,
                // date: meta.data.name,
                supply: i.supply.toNumber(),
                price,
                NftURI: tokenUri,
                // cover: meta.data.cover
            };
            return item;
        })
    );
    console.log("Common Inventory", items);
    return items;
}

export async function fetchInventory(username) {
    const contract = await getContract();
    const data = await contract.fetchPurchasedTickets(username);
    const items = await Promise.all(
        data.map(async (i) => {
            const tokenUri = await contract.uriCall(
                address,
                i.ticketId.toString()
            );
            console.log(tokenUri);
            const meta = await axios.get(tokenUri);
            let price = ethers.utils.formatEther(i.price);
            let item = {
                ticketId: i.ticketId.toString(),
                name: meta.data.name,
                venue: meta.data.venue,
                date: meta.data.name,
                supply: i.supply.toNumber(),
                price,
                NftURI: tokenUri,
                // cover: meta.data.cover
            };
            return item;
        })
    );
    console.log("Inventory", items);
    return items;
}

export async function fetchActiveEvents(username) {
    const contract = await getContractWithInfura();
    const data = await contract.fetchActiveEventsCall(username.toString());
    const items = await Promise.all(
        data.map(async (i) => {
            const tokenUri = await contract.uriCall(
                username,
                i.ticketId.toString()
            );
            console.log(tokenUri);
            const meta = await axios.get(tokenUri);
            let price = ethers.utils.formatEther(i.price);
            let item = {
                ticketId: i.ticketId.toString(),
                name: meta.data.name,
                venue: meta.data.venue,
                date: meta.data.name,
                supply: i.supply.toNumber(),
                price,
                NftURI: tokenUri,
                // cover: meta.data.cover
            };
            return item;
        })
    );
    console.log("Active Events", items);
    return items;
}

export async function buyTicket(username, ticketId, price) {
    const contract = await getContract(true);
    const weiPrice = ethers.utils.parseUnits(price.toString(), "ether");
    const tx = await contract.buyTicketCall(username, ticketId, {
        value: weiPrice,
        gasLimit: 1000000,
    });
    await tx.wait();
    console.log("Purchased successfully");
}

// --dashboard-specific functions

export async function getUserAddress() {
    const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
    });
    return accounts[0];
}

export async function fetchIfDeployed() {
    const contract = await getContract();
    const address = await getUserAddress();
    const tx = await contract.hasDeployed(address.toString());
    return tx;
}

export async function fetchUsernameValidity(username) {
    const contract = await getContract();
    const data = await contract.usernameExist(username);
    return data;
}

export async function fetchUsername() {
    const contract = await getContract();
    const address = await getUserAddress();
    const check = await fetchIfDeployed();
    if (check == true) {
        const data = await contract.addressToUsernames(address);
        return data;
    }
}

export async function deploy(username) {
    const usernameValidity = await fetchUsernameValidity(username);
    if (usernameValidity == true) {
        console.log("username already exist");
        return;
    }
    const contract = await getContract(true);
    console.log(username.toString());
    const tx = await contract.deployEventify(username.toString());
    await tx.wait();
    console.log("Deployed");
}

export async function fetchMintedCollection(username) {
    const contract = await getContract();
    const data = await contract.fetchMintedTicketsCall(username);
    const items = await Promise.all(
        data.map(async (i) => {
            const tokenUri = await contract.uriCall(
                username,
                i.ticketId.toString()
            );
            console.log(tokenUri);
            const meta = await axios.get(tokenUri);
            let price = ethers.utils.formatEther(i.price);
            let item = {
                tokenId: i.ticketId.toString(),
                name: meta.data.name,
                venue: meta.data.venue,
                date: meta.data.name,
                supply: i.supply.toNumber(),
                price,
                NftURI: tokenUri,
                // cover: meta.data.cover
            };
            return item;
        })
    );
    console.log("Minted Collections", items);
    return items;
}

export async function publishTickets(ticketId) {
    const contract = await getContract(true);
    const tx = await contract.publishTickets(ticketId);
    await tx.wait();
    console.log("Published");
}

export async function fetchActiveEventsWithWalletProvider(username) {
    const contract = await getContract();
    const data = await contract.fetchActiveEventsCall(username.toString());
    const items = await Promise.all(
        data.map(async (i) => {
            const tokenUri = await contract.uriCall(
                username,
                i.ticketId.toString()
            );
            console.log(tokenUri);
            const meta = await axios.get(tokenUri);
            let price = ethers.utils.formatEther(i.price);
            let item = {
                ticketId: i.ticketId.toString(),
                name: meta.data.name,
                venue: meta.data.venue,
                date: meta.data.name,
                supply: i.supply.toNumber(),
                price,
                NftURI: tokenUri,
                // cover: meta.data.cover
            };
            return item;
        })
    );
    console.log("Active Events", items);
    return items;
}

export async function pauseEvent(ticketId) {
    const contract = await getContract(true);
    const tx = await contract.pauseActiveEventCall(ticketId);
    await tx.wait();
    console.log("Paused");
}

export async function fetchPausedEvents(username) {
    const contract = await getContract();
    const data = await contract.fetchPausedEventsCall(username);
    const items = await Promise.all(
        data.map(async (i) => {
            const tokenUri = await contract.uriCall(
                username,
                i.ticketId.toString()
            );
            console.log(tokenUri);
            const meta = await axios.get(tokenUri);
            let price = ethers.utils.formatEther(i.price);
            let item = {
                tokenId: i.ticketId.toString(),
                name: meta.data.name,
                venue: meta.data.venue,
                date: meta.data.name,
                supply: i.supply.toNumber(),
                price,
                NftURI: tokenUri,
                // cover: meta.data.cover
            };
            return item;
        })
    );
    console.log("Paused Events", items);
    return items;
}

export async function runEvent(ticketId) {
    const contract = await getContract(true);
    const tx = await contract.runPausedEventCall(ticketId);
    await tx.wait();
    console.log("Event Running");
}

export async function updateShortlist(ticketId, shortlistArray) {
    const contract = await getContract(true);
    const tx = await contract.updateShortlist(ticketId, shortlistArray);
    await tx.wait();
    console.log("Shortlist uploaded");
}

// --owner-specific functions

export async function fetchIfWhitelist(address) {
    const contract = await getContract();
    const data = await contract.isWhitelisted(address);
    return data;
}

export async function whitelistUser(address) {
    const contract = await getContract(true);
    const check = await fetchIfWhitelist(address);
    if (check == true) return;
    const tx = await contract.whitelistUser(address);
    await tx.wait();
    console.log("Whitelisted");
}

export async function fetchFeaturedRequest() {
    const contract = await getContractWithInfura();
    const data = await contract.fetchFeaturedEvents(id.toString());
    const items = await Promise.all(
        data.map(async (i) => {
            let item = {
                host: i.host.toString(),
                ticketId: i.ticketId.toString(),
                isApproved: i.isApproved.toString(),
            };
            return item;
        })
    );
    console.log("Featured Request", items);
    return items;
}

export async function approveFeaturedRequest(username, ticketId) {
    const contract = await getContract(true);
    const data = await contract.approveFeaturedEvents(username, ticketId);
    await data.wait();
    console.log("Approved");
}
