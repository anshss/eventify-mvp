"use client"
import React from 'react'
import { FcApproval } from "react-icons/fc";
import {staggerContainer} from '../../utils/motion'
import { motion } from 'framer-motion'
import styles from '../../styles/style'
import Link from 'next/link';

export const FeaturedRequest = (prop) => {
  return (


<div className="overflow-hidden w-100vh">
<div className="absolute z-[0] w-[40%] h-[35%] top-[20] pink__gradient" />
<section className={` sm:p-16 xs:p-8 px-10 py-12 relative z-10 w-100vh`}>
<motion.div className="flex md:flex-row flex-col gap-4" >
    
    
   
    <div className="w-full flex justify-between items-center">
    <div className="flex-1 md:ml-[62px] flex flex-col max-w-[650px]">

      
      <div className='grid grid-rows-1 grid-flow-col gap-4'>
       
      <h2 className="tracking-widest text-indigo-xs title-font font-medium text-gray-400">
       Host: {prop.host} 
      </h2>
    
      <h2 className="tracking-widest text-indigo-xs title-font font-medium text-gray-400">Ticket ID: {prop.ticketId} </h2>


      
      </div>
     
    
     
      
      


     
      {/* <Link href="/"  className=" inline-flex items-center justify-center rounded-md border border-transparent bg-[#8A42D8] px-2 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700">

      <button >Connect Wallet</button> 
      </Link> */}

    </div>
  </div>

  </motion.div>

</section>
</div>
  )
}
