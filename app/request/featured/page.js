"use client";
import { fetchFeaturedRequest, approveFeaturedRequest } from "../../../utils";
import { useEffect, useState } from "react";
import { FeaturedRequest} from "../../../components/icons/FeaturedRequest";
import { Navbar } from "../../../components/Navbar";
import { textContainer, textVariant2 } from '../../../utils/motion';
import { motion } from 'framer-motion';
import styles from "../../../styles/style";

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
    const [featuredRequest, setFeaturedRequest] = useState();
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        fetchDataFromContract();
    }, []);

    async function fetchDataFromContract() {
        const data = await fetchFeaturedRequest();
        setFeaturedRequest(data);
        setLoaded(true);
    }

    function NFTCard(prop) {
        async function approveCall(host, ticketId) {
            await approveFeaturedRequest(host, ticketId)
        }

        return (

            <div className="text-black mb-5 mt-5">

                {/* <p>Nft card</p>
                <p>host: {prop.host}</p>
                <p>ticketId: {prop.ticketId}</p> */}
                  <FeaturedRequest
                            // key={i}
                            host={prop.host}
                            ticketId={prop.ticketId}
                            
                            // NftURI={nft.NftURI}
                        />
                <button className="inline-flex items-center justify-center rounded-md border border-transparent bg-[#8A42D8] px-[100px] py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 ml-[108px] " 
                    onClick={() => approveCall(prop.host, prop.ticketId)}
                >
                    Approve
                </button>
            </div>
        );
    }

    if (loaded == false) return <div className="text-white">Fetching..</div>;

    if (loaded == true && featuredRequest.length == 0)
        return (
            <div className="text-white">
                FEATURED REQUEST <br /> No events
            </div>
        );

    return (
        <div className="text-white">
            <Navbar/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
      <TitleText title={<>Featured Requests</>} textStyles="text-center" />       
           <div>
                {featuredRequest.map((nft, i) => {
                    return (
                        <NFTCard
                            key={i}
                            ticketId={nft.ticketId}
                            host={nft.host}
                            isApproved={nft.isApproved}
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