"use client";
import { fetchCommonInventory } from "../../utils";
import { useEffect, useState } from "react";

export default function Inventory() {

    const [inventoryData, setInventoryData] = useState()

    useEffect(() => {
        fetchInventoryData()
    }, [])

    async function fetchInventoryData() {
        const data = await fetchCommonInventory()
        setInventoryData(data)
    }

    return <div></div>;
}
