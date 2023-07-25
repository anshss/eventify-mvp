"use client";
import React from "react";
import { FcApproval } from "react-icons/fc";
import { staggerContainer } from "../../utils/motion";
import { motion } from "framer-motion";
import styles from "../../styles/style";
import Link from "next/link";
import { buyTicket } from "../../utils";
import Image from "next/image";

export const NftDesign = (props) => {
    async function buyTicketCall(ticketId, price) {
        await buyTicket(props.id, ticketId, price);
    }

    const handleButton = async (text) => {
        console.log(text);
        switch (text) {
            case "buynow":
                await buyTicketCall(props.ticketId, props.price);
                break;

            default:
                break;
        }
    };
    return (
        <div className="overflow-hidden w-100vh">
            <div className="absolute z-[0] w-[40%] h-[35%] top-[20] pink__gradient" />
            <section
                className={` sm:p-16 xs:p-8 px-10 py-8 relative z-10 w-80vh`}
            >
                <motion.div className="flex md:flex-row flex-col gap-2">
                    <img
                        // src="/madlads.jpg"
                        // width="20"
                        // height="20"
                        src={props.image || "/madlads.jpg"}
                        className="md:w-[270px] w-full h-[250px] rounded-md object-cover"
                        alt=""
                    />
                    <div className="w-full flex justify-between items-center">
                        <div className="flex-1 md:ml-[62px] flex flex-col max-w-[650px]">
                            <h4 className="font-normal lg:text-[42px] text-[26px] text-white inline-block">
                                {props.name}
                                <h4 className="inline-block ml-2 mb-2 text-md">
                                    {/* <FcApproval /> */}
                                </h4>
                            </h4>

                            <h2 className="tracking-widest text-indigo-xs title-font font-medium text-gray-400">
                                Host: {props.host}{" "}
                            </h2>

                            <div>
                                    <span
                                        class="tw-text-sm tw-whitespace-nowrap tw-text-white-2 text-white mb-[2] lg:mb-0"
                                        title="FLOOR"
                                    >
                                        Date: {props.date}
                                    </span>
                                </div>

                            <div className="grid grid-rows-2 grid-flow-col gap-4">
                                <div>
                                    <span
                                        class="tw-text-sm tw-whitespace-nowrap tw-text-white-2 text-white"
                                        title="FLOOR"
                                    >
                                        SUPPLY: {props.supply}
                                    </span>
                                </div>
                                <div>
                                    <span
                                        class="tw-text-sm tw-whitespace-nowrap tw-text-white-2 text-white"
                                        title="FLOOR"
                                    >
                                        REMAINING: {props.remaining}
                                    </span>
                                </div>
                                <div>
                                    <span
                                        class="tw-text-sm tw-whitespace-nowrap tw-text-white-2 text-white"
                                        title="FLOOR"
                                    >
                                        VENUE : {props.venue}
                                    </span>
                                </div>
                                <div>
                                    <a className="text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0">
                                        {props.price} MATIC
                                    </a>
                                </div>
                            </div>

                            <div>
                                    <span
                                        class="tw-text-sm tw-whitespace-nowrap tw-text-white-2 text-white mb-[2] lg:mb-0"
                                        title="FLOOR"
                                    >
                                        Event type: {props.eventType ? <span>Shortlist based event</span> : <span>Open Event</span>}
                                    </span>
                                </div>

                            <p className="mt-[10px] font-normal lg:text-[20px] text-[14px] text-[#C6C6C6]"></p>

                            {/* <Link href="/"  className=" inline-flex items-center justify-center rounded-md border border-transparent bg-[#8A42D8] px-2 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700">

      <button onClick={() => handleButton(props.button)}>{props.button}</button> 
      </Link> */}
                        </div>
                    </div>
                </motion.div>
            </section>
        </div>
    );
};
