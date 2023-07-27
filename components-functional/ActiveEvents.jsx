import { useEffect, useState } from "react";
import { fetchActiveEvents, pauseEvent, raiseFeaturedEvents } from "../utils";
import { NftDesign } from "../components/icons/NftDesign";
import { textContainer, textVariant2 } from "../utils/motion";
import { motion } from "framer-motion";
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
export function ActiveEvents() {
    const [activeEvents, setActiveEvents] = useState([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        fetchActiveEventsData();
    }, []);

    async function fetchActiveEventsData() {
        const data = await fetchActiveEvents();
        setActiveEvents(data);
        setLoaded(true);
    }

    function NFTCard(prop) {
        async function pauseEventCall(ticketId) {
            await pauseEvent(ticketId);
        }

        async function featureEventCall(ticketId) {
            await raiseFeaturedEvents(ticketId);
        }

        return (
            <div className="text-black mb-5 mt-5">
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
                    className="inline-flex items-center justify-center rounded-md border border-transparent bg-[#8A42D8] px-[100px] py-4 text-base font-medium text-white shadow-sm hover:bg-indigo-700 ml-[28px] "
                    onClick={() => pauseEventCall(prop.ticketId)}
                >
                    Pause
                </button>
                <button
                    className="inline-flex items-center justify-center rounded-md border border-transparent bg-[#8A42D8] px-[100px] py-4 text-base font-medium text-white shadow-sm hover:bg-indigo-700 ml-[28px] "
                    onClick={() => featureEventCall(prop.ticketId)}
                >
                    Feature
                </button>
            </div>
        );
    }

    if (loaded == false) return <div className="text-white">Fetching..</div>;

    if (loaded == true && activeEvents.length == 0)
        return (
            <div>
                <TitleText
                    title={<>Active Events </>}
                    textStyles="text-center"
                />
                {/* PURCHASED TICKETS */}
                <SubText title={<>No events </>} textStyles="text-center" />
            </div>
        );

    return (
        <div>
            ACTIVE EVENTS
            <div>
                {activeEvents.map((nft, i) => {
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
