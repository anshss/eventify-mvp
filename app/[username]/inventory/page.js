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
        console.log(id)
        const data = await fetchInventory(id)
        setInventoryData(data)
        setLoaded(true)
    }

    if (loaded == false) return <div>Fetching..</div>
    return <div></div>;
}
