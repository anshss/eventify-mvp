"use client";
import { fetchInventory } from "../../../utils";
import { useEffect, useState } from "react";

export default function Inventory() {

    const [inventoryData, setInventoryData] = useState()

    useEffect(() => {
        fetchDataFromContract()
    }, [])

    async function fetchDataFromContract() {
        const data = await fetchInventory()
        setInventoryData(data)
    }

    return <div></div>;
}
