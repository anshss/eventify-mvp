"use client";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
    fetchUsernameValidity,
    fetchActiveEventsWithInfura,
    buyTicket,
} from "../../../utils";
import { NftDesign } from "../../../components/icons/NftDesign";
import { motion } from "framer-motion";
import { textContainer, textVariant2 } from "../../../utils/motion";
import { Navbar } from "../../../components/Navbar";
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
export default function Events() {
    const pathName = usePathname();

    const id = pathName?.split("/")[1];

    const [buttonText, setbuttonText] = useState("");
    const [activeEvents, setActiveEvents] = useState([]);
    const [isUsernameValid, setIsUsernameValid] = useState(false);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        setbuttonText("buynow");
    }, []);

    useEffect(() => {
        if (id) {
            checkUsernameValidityData();
        }
    }, [id]);

    useEffect(() => {
        if (isUsernameValid == true) {
            fetchActiveEventsData();
        }
    }, [isUsernameValid]);

    async function checkUsernameValidityData() {
        const data = await fetchUsernameValidity(id);
        setIsUsernameValid(data);
    }

    async function fetchActiveEventsData() {
        const data = await fetchActiveEventsWithInfura(id);
        setActiveEvents(data);
        setLoaded(true);
        console.log("user host: ", id);
    }

    function NFTCard(prop) {
        async function buyTicketCall(ticketId, price) {
            await buyTicket(id, ticketId, price);
        }

        return (
            <div className="text-white  mb-5 mt-5">
                {/* <p>Nft card</p>
                <p>Name: {prop.name}</p>
                <p>Venue: {prop.venue}</p>
                <p>Date: {prop.date}</p>
                <p>Supply: {prop.remaining} / {prop.supply}</p>
                <p>Price: {prop.price}</p> */}
                {/* <p>NftURI: {prop.NftUri}</p> */}
                <NftDesign
                    name={prop.name}
                    venue={prop.venue}
                    date={prop.date}
                    supply={prop.supply}
                    price={prop.price}
                    remaining={prop.remaining}
                    button={buttonText}
                    id={id}
                />
                <button
                    className="inline-flex items-center justify-center rounded-md border border-transparent bg-[#8A42D8] px-[100px] py-4 text-base font-medium text-white shadow-sm hover:bg-indigo-700 ml-[28px] "
                    onClick={() => buyTicketCall(prop.ticketId, prop.price)}
                >
                    Buy Ticket
                </button>
            </div>
        );
    }

    if (loaded == false) return <div className="text-white">Fetching..</div>;

    if (loaded == true && isUsernameValid == false)
        return <div className="text-white">User do not exist</div>;

    if (loaded == true && isUsernameValid == true && activeEvents.length == 0)
        return (
            <div className="text-white">
                ACTIVE EVENTS <br /> No events
            </div>
        );

    return (
        <div>
            <Navbar />
            <br />
            <br />
            <br />
            <br />
            <TitleText title={<>Events of {id}</>} textStyles="text-center" />

            {/* Events of {id} */}
            <div>
                {activeEvents.map((nft, i) => {
                    return (
                        <NFTCard
                            key={i}
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
