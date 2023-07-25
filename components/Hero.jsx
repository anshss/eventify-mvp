"use-client";
import Spline from "@splinetool/react-spline";
import React from "react";
// import Spline from '@splinetool/react-spline';

const Hero = () => {
    return (
        //     <div className=' bg-hero-pattern'>
        //       <section className={`relative w-full h-screen mx-auto `}>
        //       <div
        //         className={`absolute inset-0 top-[120px]  max-w-7xl mx-auto sm:py-16 py-6 flex flex-row items-start gap-5`}
        //       >
        //         <div className='flex flex-col justify-center items-center mt-5'>
        //           <div className='w-5 h-5 rounded-full bg-[#8A42D8]' />
        //           <div className='w-1 sm:h-80 h-40 violet-gradient' />
        //         </div>

        //         <div>
        //           <h1 className={`font-black text-white lg:text-[80px] sm:text-[60px] xs:text-[50px] text-[40px] lg:leading-[98px] mt-2 `}>
        //             Introducing <span className='text-[#8A42D8]'>Eventify</span>
        //           </h1>
        //           <p className={`text-[#dfd9ff] font-medium lg:text-[30px] sm:text-[26px] xs:text-[20px] text-[16px] lg:leading-[40px] mt-2 text-white-100`}>
        //           An Uber model for building           NFT-based event tickets.
        //  <br className='sm:block hidden' />
        //           </p>
        //         </div>
        //       </div>

        //   <Spline scene='https://prod.spline.design/ERAf0a0BFZr6ZJoI/scene.splinecode'/>

        //     </section>
        //     </div>

        // ----- flex view-------------

        <section
            id="home"
            className={`flex md:flex-row flex-col sm:py-16 py-6 mb-[-100px]`}
        >
            <div
                className={`flex-1 flex justify-center items-start lex-col xl:px-0 sm:px-16 px-6`}
            >
                <div
                    className={`absolute inset-0 top-[120px]  max-w-7xl mx-auto sm:py-16 py-6 flex flex-row items-start gap-5`}
                >
                    <div className="flex flex-col justify-center items-center mt-5">
                        <div className="w-5 h-5 rounded-full bg-[#8A42D8]" />
                        <div className="w-1 sm:h-80 h-40 violet-gradient" />
                    </div>

                    <div>
                        <h1
                            className={`font-black text-white lg:text-[80px] sm:text-[60px] xs:text-[50px] text-[40px] lg:leading-[98px] mt-2 `}
                        >
                            Introducing{" "}
                            <span className="text-[#8A42D8]">Eventify</span>
                        </h1>
                        <p
                            className={`text-[#dfd9ff] font-medium lg:text-[30px] sm:text-[26px] xs:text-[20px] text-[16px] lg:leading-[40px] mt-2 text-white-100`}
                        >
                            Seamless granular events hosting with NFT tickets.
                            <br className="sm:block hidden" />
                        </p>
                        <p
                            className={` max-w-[700px] text-[#ebe8ff] font-medium lg:text-[17px] sm:text-[26px] xs:text-[20px] text-[16px] lg:leading-[40px] mt-2 text-white-100`}
                        >
                            Eventify utilizes NFTs to represent tickets,
                            ensuring their uniqueness, indivisibility, and
                            traceability. Each ticket is stored on a blockchain,
                            providing immutable records of ownership and
                            transaction history. With NFTs, ticket authenticity
                            can be easily verified, preventing counterfeiting
                            and ensuring that only valid tickets are bought and
                            sold.
                        </p>
                    </div>
                </div>
            </div>

            <div
                className={`flex-1 flex flex justify-center items-center md:my-10 my-10 relative`}
            >
                {/* <Spline scene='https://prod.spline.design/ERAf0a0BFZr6ZJoI/scene.splinecode'/> */}
                {/* app.load('https://prod.spline.design/ERAf0a0BFZr6ZJoI/scene.splinecode'); */}
                <Spline scene="https://prod.spline.design/ERAf0a0BFZr6ZJoI/scene.splinecode" />
            </div>

            <div className={`ss:hidden flex justify-center items-center`}>
                {/* <GetStarted /> */}
            </div>
        </section>
    );
};

export default Hero;
