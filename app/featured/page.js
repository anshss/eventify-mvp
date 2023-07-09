"use client";
import { fetchFeaturedEvents } from "../../utils";
import { useEffect, useState } from "react";

export default function Featured() {

    const [featuredEvents, setFeaturedEvents] = useState()

    useEffect(() => {
        featuredEventsData()
    }, [])

    async function featuredEventsData() {
        const data = await fetchFeaturedEvents()
        setFeaturedEvents(data)
    }

    return <div></div>;
}
