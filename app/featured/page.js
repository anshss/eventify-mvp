"use client";
import { Navbar } from "../../components/Navbar";
import { fetchFeaturedEventsWithInfura, buyTicket, fetchUsernameFromAddress } from "../../utils";
import { useEffect, useState } from "react";
import { textContainer, textVariant2 } from '../../utils/motion';
import { motion } from 'framer-motion';
import { NftDesign } from "../../components/icons/NftDesign";

// export const TitleText = ({ title, textStyles }) => (
//     <motion.h2
//       variants={textVariant2}
//       initial="hidden"
//       whileInView="show"
//       className={`mt-[8px] font-bold md:text-[64px] text-[40px] text-white ${textStyles}`}
//     >
//       {title}
//     </motion.h2>
//   );
export default function Featured() {
    const [featuredEvents, setFeaturedEvents] = useState();
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        featuredEventsData();
    }, []);

    async function featuredEventsData() {
        const data = await fetchFeaturedEventsWithInfura();
        setFeaturedEvents(data);
        setLoaded(true);
    }

    function NFTCard(prop) {
        async function buyTicketCall(ticketId, price) {
            const username = await fetchUsernameFromAddress(prop.host)
            await buyTicket(username, ticketId, price);
        }

        return (
            <div className="text-black mb-5 mt-5">
                {/* <p>Nft card</p>
                <p>Name: {prop.name}</p>
                <p>Venue: {prop.venue}</p>
                <p>Date: {prop.date}</p>
                <p>Supply: {prop.remaining} / {prop.supply}</p>
                <p>Price: {prop.price}</p> */}
                <NftDesign
                    name={prop.name}
                    venue={prop.venue}
                    date={prop.date}
                    supply={prop.supply}
                    price={prop.price}
                    remaining={prop.remaining}
                    
                />
                {/* <p>NftURI: {prop.NftUri}</p> */}
                <button className="inline-flex items-center justify-center rounded-md border border-transparent bg-[#8A42D8] px-[100px] py-4 text-base font-medium text-white shadow-sm hover:bg-indigo-700 ml-[28px] " 
                    onClick={() => buyTicketCall(prop.ticketId, prop.price)}
                >
                    Buy Ticket
                </button>
            </div>
        );
    }

    if (loaded == false) return <div>Fetching..</div>;

    if (loaded == true && featuredEvents.length == 0)
        return (
            <div>
                FEATURED EVENTS <br /> No events
            </div>
        );

    return (
        <div>
            <Navbar/>
            <br />
            <br />
            <br />
            <br />
            <TitleText title={<>Featured Events</>} textStyles="text-center" />       

            {/* FEATURED EVENTS */}
            <div>
                {featuredEvents.map((nft, i) => {
                    return (
                        <NFTCard
                            key={i}
                            host={nft.host}
                            ticketId={nft.ticketId}
                            name={nft.name}
                            venue={nft.venue}
                            date={nft.date}
                            supply={nft.supply}
                            remaining={nft.remaining}
                            price={nft.price}
                            // NftURI={nft.NftURI}
                        />
                    );
                })}
            </div>
        </div>
    );
}

function TitleText({ title, textStyles }) {
    return (
        <div>
            <motion.h2
                variants={textVariant2}
                initial="hidden"
                whileInView="show"
                className={`mt-[8px] font-bold md:text-[64px] text-[40px] text-white ${textStyles}`}
            >
                {title}
            </motion.h2>
        </div>
    );
}