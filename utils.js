"use client";
import web3modal from "web3modal";
import { ethers } from "ethers";
import { addressFactory, abiFactory, abiEventify, abiFeatured } from "./config";
import axios from "axios";
import { Web3Storage } from "web3.storage";

const InfuraKey = process.env.NEXT_PUBLIC_INFURA_KEY;

// --contract-instance functions
// --contract-instance functions
// --contract-instance functions
// --contract-instance functions
// --contract-instance functions

export async function getFactoryContractWithInfura() {
    const provider = new ethers.providers.JsonRpcProvider(
        `https://polygon-mumbai.infura.io/v3/${InfuraKey}`
    );
    const factoryContract = new ethers.Contract(
        addressFactory,
        abiFactory,
        provider
    );
    return factoryContract;
}

export async function getEventifyContractWithInfura(username) {
    const provider = new ethers.providers.JsonRpcProvider(
        `https://polygon-mumbai.infura.io/v3/${InfuraKey}`
    );
    // const factoryContract = new ethers.Contract(
    //     addressFactory,
    //     abiFactory,
    //     provider
    // );
    const factoryContract = await getFactoryContractWithInfura()

    const id = await factoryContract.usernamesToContractId(username);
    const addressEventify = await factoryContract.contracts(id);

    const eventifyContract = new ethers.Contract(
        addressEventify,
        abiEventify,
        provider
    );
    return eventifyContract;
}

export async function getFactoryContract(providerOrSigner) {
    const modal = new web3modal();
    const connection = await modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const contract = new ethers.Contract(addressFactory, abiFactory, provider);
    if (providerOrSigner == true) {
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
            addressFactory,
            abiFactory,
            signer
        );
        return contract;
    }
    return contract;
}

export async function getEventifyContract(username, providerOrSigner) {
    const contractAddress = await getEventifyContractAddress(username);
    const modal = new web3modal();
    const connection = await modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const contract = new ethers.Contract(
        contractAddress,
        abiEventify,
        provider
    );
    if (providerOrSigner == true) {
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
            contractAddress,
            abiEventify,
            signer
        );
        return contract;
    }
    return contract;
}

export async function getFeaturedContract(providerOrSigner) {
    const modal = new web3modal();
    const connection = await modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const addressFeatured = await getFeaturedContractAddress();
    const contract = new ethers.Contract(
        addressFeatured,
        abiFeatured,
        provider
    );
    if (providerOrSigner == true) {
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
            addressFeatured,
            abiFeatured,
            signer
        );
        return contract;
    }
    return contract;
}

export async function getEventifyContractAddress(username) {
    const contract = await getFactoryContract();
    const id = await contract.usernamesToContractId(username);
    const address = await contract.contracts(id);
    return address;
}

export async function getFeaturedContractAddress() {
    const contract = await getFactoryContract();
    const address = await contract.featuredEventsInstanceAddress()
    return address
}

// --one-time-execute functions
// --one-time-execute functions
// --one-time-execute functions
// --one-time-execute functions
// --one-time-execute functions

export async function getUserAddress() {
    const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
    });
    return accounts[0];
}

export async function fetchIfDeployed() {
    const contract = await getFactoryContract();
    const address = await getUserAddress();
    const data = await contract.hasDeployed(address.toString());
    return data;
}

export async function fetchUsername() {
    const contract = await getFactoryContract();
    const address = await getUserAddress();
    const check = await fetchIfDeployed();
    if (check == true) {
        const data = await contract.addressToUsernames(address);
        return data;
    }
}

export async function fetchUsernameFromAddress(address) {
    const contract = await getFactoryContract();
    const data = await contract.addressToUsernames(address.toString());
    return data;
}

// --user-specific functions
// --user-specific functions
// --user-specific functions
// --user-specific functions
// --user-specific functions

export async function fetchFeaturedEventsWithInfura() {
    const contract = await getFactoryContractWithInfura();

    const data = await contract.fetchFeaturedEvents();
    const items = await Promise.all(
        data.map(async (i) => {
            console.log(i)
            const tokenUri = await contract.uriCall(i.owner, i.ticketId.toString());
            // console.log(tokenUri);
            const meta = await axios.get(tokenUri);
            let price = ethers.utils.formatEther(i.price);
            let item = {
                ticketId: i.ticketId.toString(),
                host: i.host,
                name: meta.data.name,
                venue: meta.data.venue,
                date: meta.data.name,
                supply: i.supply.toNumber(),
                price,
                NftURI: tokenUri,
                cover: meta.data.cover
            };
            return item;
        })
    );
    console.log("Featured Events", items);
    return items;
}

export async function fetchActiveEventsWithInfura(username) {
    const contract = await getEventifyContractWithInfura(username);

    const data = await contract.fetchActiveEvents();
    const items = await Promise.all(
        data.map(async (i) => {
            const tokenUri = await contract.uri(i.ticketId.toString());
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

export async function fetchInventory(username) {
    const contract = await getEventifyContract(username, false);

    const data = await contract.fetchPurchasedTickets();
    const items = await Promise.all(
        data.map(async (i) => {
            const tokenUri = await contract.uri(i.ticketId.toString());
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

export async function fetchCommonInventory() {
    const contract = await getFactoryContract();

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

// --dashboard-specific functions
// --dashboard-specific functions
// --dashboard-specific functions
// --dashboard-specific functions
// --dashboard-specific functions

export async function fetchUsernameValidity(username) {
    const contract = await getFactoryContract();
    const data = await contract.usernameExist(username);
    return data;
}

export async function deploy(username) {
    const usernameValidity = await fetchUsernameValidity(username);
    if (usernameValidity == true) {
        console.log("username already exist");
        return;
    }
    const contract = await getFactoryContract(true);
    console.log(username.toString());
    const tx = await contract.deployEventify(username.toString());
    await tx.wait();
    console.log("Deployed");
}

export async function fetchMintedCollection() {
    const username = await fetchUsername()
    const contract = await getEventifyContract(username, false);

    const data = await contract.fetchMintedTickets();
    const items = await Promise.all(
        data.map(async (i) => {
            const tokenUri = await contract.uri(i.ticketId.toString());
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

export async function fetchShortlistEvents() {
    const username = await fetchUsername()
    const contract = await getEventifyContract(username);

    const data = await contract.fetchShortlistEvents();
    const items = await Promise.all(
        data.map(async (i) => {
            const tokenUri = await contract.uri(i.ticketId.toString());
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

export async function fetchActiveEvents() {
    const username = await fetchUsername()
    const contract = await getEventifyContract(username);

    const data = await contract.fetchActiveEvents();
    const items = await Promise.all(
        data.map(async (i) => {
            const tokenUri = await contract.uri(i.ticketId.toString());
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

export async function fetchPausedEvents() {
    const username = await fetchUsername()
    const contract = await getEventifyContract(username);

    const data = await contract.fetchPausedEvents();
    const items = await Promise.all(
        data.map(async (i) => {
            const tokenUri = await contract.uri(i.ticketId.toString());
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

export async function mint(_price, _supply, _privateEvent, NftURI) {
    const username = await fetchUsername()
    const contract = await getEventifyContract(username, true);

    const price = ethers.utils.parseEther(_price);
    const tx = await contract.mintTickets(price, _supply, _privateEvent, NftURI)
    await tx.wait()
    console.log("minted")
}

export async function updateShortlist(ticketId, shortlistArray) {
    const username = await fetchUsername()
    const contract = await getEventifyContract(username, true);

    const tx = await contract.updateShortlist(ticketId, shortlistArray);
    await tx.wait();
    console.log("Shortlist uploaded");
}

export async function publishTickets(ticketId) {
    const username = await fetchUsername()
    const contract = await getEventifyContract(username, true);

    const tx = await contract.publishTickets(ticketId);
    await tx.wait();
    console.log("Published");
}

export async function pauseEvent(ticketId) {
    const username = await fetchUsername()
    const contract = await getEventifyContract(username, true);

    const tx = await contract.pauseActiveEvent(ticketId);
    await tx.wait();
    console.log("Paused");
}

export async function runEvent(ticketId) {
    const username = await fetchUsername()
    const contract = await getEventifyContract(username, true);

    const tx = await contract.runPausedEvent(ticketId);
    await tx.wait();
    console.log("Event Running");
}

export async function raiseFeaturedEvents(ticketId) {
    const contract = await getFactoryContract(true);

    const tx = await contract.raiseFeaturedEvents(ticketId);
    await tx.wait();
    console.log("Featured Request Sent");
}

export async function buyTicket(username, ticketId, price) {
    const contract = await getEventifyContract(username, true);

    const weiPrice = ethers.utils.parseUnits(price.toString(), "ether");
    const tx = await contract.buyTicket(ticketId, {
        value: weiPrice,
        gasLimit: 1000000,
    });
    await tx.wait();
    console.log("Purchased successfully");
}

// --owner-specific functions
// --owner-specific functions
// --owner-specific functions
// --owner-specific functions
// --owner-specific functions

export async function fetchIfWhitelist(address) {
    const contract = await getFactoryContract();

    const data = await contract.isWhitelisted(address);
    return data;
}

export async function whitelistUser(address) {
    const contract = await getFactoryContract(true);

    const check = await fetchIfWhitelist(address);
    if (check == true) return;
    const tx = await contract.whitelistUser(address);
    await tx.wait();
    console.log("Whitelisted");
}

export async function fetchFeaturedRequest() {
    const contract = await getFactoryContract();

    const data = await contract.fetchAllFeaturedRequest();
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

export async function approveFeaturedRequest(host, ticketId) {
    // const username = await fetchUsernameFromAddress(host)
    // console.log(username)
    const contract = await getFactoryContract(true);

    const data = await contract.approveFeaturedEvents(host, ticketId);
    await data.wait();
    console.log("Approved");
}

// --web3-storage-token functions

function getAccessToken() {
    // return process.env.NEXT_PUBLIC_Web3StorageID
    return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDkyMjkyQjQ5YzFjN2ExMzhERWQxQzQ3NGNlNmEyNmM1NURFNWQ0REQiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NjUyMzg2MDc1NDEsIm5hbWUiOiJNZXRhRmkifQ.cwyjEIx8vXtTnn8Y3vctroo_rooHV4ww_2xKY-MT0rs";
}

function makeStorageClient() {
    return new Web3Storage({ token: getAccessToken() });
}

export const uploadToIPFS = async (files) => {
    const client = makeStorageClient();
    const cid = await client.put(files);
    return cid;
};

// ----
