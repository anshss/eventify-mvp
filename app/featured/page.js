"use client";
import { fetchFeaturedRequest } from "../../utils";
import { useEffect, useState } from "react";

export default function Featured() {

    const [featuredEvents, setFeaturedEvents] = useState()

    useEffect(() => {
        fetchDataFromContract()
    }, [])

    async function fetchDataFromContract() {
        const data = await fetchFeaturedRequest()
        setFeaturedEvents(data)
    }

    return <div></div>;
}
