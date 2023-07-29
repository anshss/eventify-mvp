import { useEffect, useState } from "react";
import { fetchMintedCollection, publishTickets } from "../utils";
import { NftDesign } from "../components/icons/NftDesign";
import { textContainer, textVariant2 } from "../utils/motion";
import { motion } from "framer-motion";
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
function SubText({ title, textStyles }) {
    return (
        <div>
            <motion.h5
                variants={textVariant2}
                initial="hidden"
                whileInView="show"
                className={`mt-[8px] font-bold md:text-[24px] text-[20px] text-white ${textStyles}`}
            >
                {title}
            </motion.h5>
        </div>
    );
}

export function MintedCollection() {
    const [mintedCollection, setMintedCollection] = useState([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        fetchMintedCollectionData();
    }, []);

    async function fetchMintedCollectionData() {
        const data = await fetchMintedCollection();
        setMintedCollection(data);
        setLoaded(true);
    }

    function NFTCard(prop) {
        async function publishTicketsCall(ticketId) {
            // console.log(ticketId);
            await publishTickets(ticketId);
        }

        return (
            <div className="text-black mb-5 mt-5">
                {/* <p>Nft card</p>
                <p>Name: {prop.name}</p>
                <p>Venue: {prop.venue}</p>
                <p>Date: {prop.date}</p>
                <p>Supply: {prop.supply}</p>
                <p>Price: {prop.price}</p> */}
                <NftDesign
                    name={prop.name}
                    venue={prop.venue}
                    date={prop.date}
                    supply={prop.supply}
                    remaining={prop.remaining}
                    price={prop.price}
                    host={prop.host}
                    image={prop.image}
                    eventType={prop.eventType}
                />
                <button
                    className="inline-flex items-center justify-center rounded-md border border-transparent bg-[#8A42D8] px-[100px] py-4 text-base font-medium text-white shadow-sm hover:bg-indigo-700 ml-[250px] "
                    onClick={() => publishTicketsCall(prop.ticketId)}
                >
                    Publish
                </button>
            </div>
        );
    }

    if (loaded == false) return <div className="text-white">Fetching..</div>;

    if (loaded == true && mintedCollection.length == 0)
        return (
            <div className="text-white">
                <TitleText
                    title={<>Minited Collections </>}
                    textStyles="text-center"
                />
                <SubText title={<>No events </>} textStyles="text-center" />
                {/* <h1>Minited Collections</h1>
                <br />
                <h3>No events</h3> */}
            </div>
        );
    return (
        <div>
            MINTED COLLECTION
            <div>
                {mintedCollection.map((nft, i) => {
                {console.log(nft.ticketId)}
                    return (
                        <NFTCard
                            key={i}
                            ticketId={nft.ticketId}
                            host={nft.host}
                            name={nft.name}
                            venue={nft.venue}
                            date={nft.date}
                            supply={nft.supply}
                            remaining={nft.remaining}
                            price={nft.price}
                            image={nft.image || ""}
                            eventType={nft.eventType}
                        />
                    );
                })}
            </div>
        </div>
    );
}
