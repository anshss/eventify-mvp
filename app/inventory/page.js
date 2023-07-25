"use client";
import { Navbar } from "../../components/Navbar";
import { fetchCommonInventory } from "../../utils";
import { useEffect, useState } from "react";
import { textContainer, textVariant2 } from '../../utils/motion';
import { motion } from 'framer-motion';
import { NftDesign } from "../../components/icons/NftDesign";
export const TitleText = ({ title, textStyles }) => (
    <motion.h2
      variants={textVariant2}
      initial="hidden"
      whileInView="show"
      className={`mt-[8px] font-bold md:text-[64px] text-[40px] text-white ${textStyles}`}
    >
      {title}
    </motion.h2>
  );
export const SubText = ({ title, textStyles }) => (
    <motion.h5
      variants={textVariant2}
      initial="hidden"
      whileInView="show"
      className={`mt-[8px] font-bold md:text-[24px] text-[20px] text-white ${textStyles}`}
    >
      {title}
    </motion.h5>
  );
export default function Inventory() {
    const [inventoryData, setInventoryData] = useState();
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        fetchInventoryData();
    }, []);

    async function fetchInventoryData() {
        const data = await fetchCommonInventory();
        setInventoryData(data);
        setLoaded(true);
    }

    function NFTCard(prop) {
        return (
            <div className="text-black mb-5 mt-5">
                {/* <p>Nft card</p>
                <p>Name: {prop.name}</p>
                <p>Venue: {prop.venue}</p>
                <p>Date: {prop.date}</p>
                <p>Supply: {prop.supply}</p>
                <p>Price: {prop.price}</p> */}
                {/* <p>NftURI: {prop.NftUri}</p> */}
                <NftDesign
                    name={prop.name}
                    venue={prop.venue}
                    date={prop.date}
                    supply={prop.supply}
                    price={prop.price}
                    remaining={prop.remaining}
                    
                />
                
            </div>
        );
    }

    if (loaded == false) return <div className="text-white">Fetching..</div>;

    if (loaded == true && inventoryData.length == 0)
        return (
            
            <div className="text-white">
                <Navbar/>
                <br />
                <br />
                <br />
                <br />
                <TitleText title={<>Purchased Tickets </>} textStyles="text-center" />  
                {/* PURCHASED TICKETS */}
                 <SubText title={<>No events </>} textStyles="text-center" />  
            </div>
        );

    return (
        <div>
            <Navbar/>
            
            PURCHASED TICKETS
            <div>
                {inventoryData.map((nft, i) => {
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
