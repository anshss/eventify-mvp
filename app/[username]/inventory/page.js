"use client";
import { fetchInventory } from "../../../utils";
import { useEffect, useState } from "react";
import { usePathname } from 'next/navigation';

export default function Inventory() {

    const [inventoryData, setInventoryData] = useState()
    const [loaded, setLoaded] = useState(false)

    const pathName = usePathname();

    const id = pathName?.split("/")[1];

    useEffect(() => {
        fetchInventoryData()
    }, [id])

    async function fetchInventoryData() {
        const data = await fetchInventory(id)
        setInventoryData(data)
        setLoaded(true)
        console.log("user inventory: ", id)
    }

    if (loaded == false) return <div>Fetching..</div>
    return <div></div>;
}
