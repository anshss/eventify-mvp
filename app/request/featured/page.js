"use client";
import { fetchFeaturedRequest } from "../../../utils";
import { useEffect, useState } from "react";

export default function Featured() {
    const [featuredRequest, setFeaturedRequest] = useState();

    useEffect(() => {
        fetchDataFromContract();
    }, []);

    async function fetchDataFromContract() {
        const data = await fetchFeaturedRequest();
        setFeaturedRequest(data);
    }

    return <div>Featured Events Request</div>;
}
