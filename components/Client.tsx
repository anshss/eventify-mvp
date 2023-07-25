import Image from "next/image";
import { arata, blokden, chillinq, elvis, eventify, kaizen, lawbriefcase, nine, polygon, sukrit, techland, tlc, unicorn } from "./logos";
export const Clients = () => (
  <>
    <p className="mb-12 text-center text-lg text-white md:text-xl">
      <span className="text-primary-text">
        Powering the world’s best product teams.
      </span>
      <br className="hidden md:block" /> From next-gen startups to established
      enterprises.
    </p>

    <div className="flex flex-wrap justify-around gap-x-6 gap-y-8 [&_svg]:max-w-[16rem] [&_svg]:basis-[calc(50%-12px)] md:[&_svg]:basis-[calc(16.66%-20px)]">
      <Image src={tlc} alt="/polygon.png" height={100} width={180} className="ml-6 hidden md:block"/>
      <Image src={polygon} alt="/polygon.png" height={50} width={170} className="ml-6 hidden md:block"/>
      {/* <Image src={polygon} alt="/polygon.png" height={40} width={150} className="mr-6"/> */}
      <Image src={kaizen} alt="/polygon.png" height={50} width={110} className="ml-6 hidden md:block"/>
      <Image src={eventify} alt="/polygon.png" height={30} width={110} className="ml-6 hidden md:block"/>
      <Image src={lawbriefcase} alt="/polygon.png" height={90} width={120} className="ml-6 hidden md:block"/>
      {/* <Image src={chillinq} alt="/polygon.png" height={30} width={180} className="ml-6 hidden md:block"/> */}
      
      <Image src={techland} alt="/polygon.png" height={100} width={110} className="ml-6 hidden md:block"/>

      <Image src={arata} alt="/polygon.png" height={50} width={110} className="ml-6 hidden md:block"/>
      <Image src={unicorn} alt="/polygon.png" height={30} width={80} className="ml-6 hidden md:block"/>
      <Image src={sukrit} alt="/polygon.png" height={30} width={100} className="ml-6 hidden md:block"/>
      <Image src={nine} alt="/polygon.png" height={30} width={100} className="ml-6 hidden md:block"/>
      <Image src={chillinq} alt="/polygon.png" height={30} width={180} className="ml-6 hidden md:block"/>



    </div>
  </>
);
