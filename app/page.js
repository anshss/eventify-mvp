"use client"
import Link from "next/link";
import {Navbar} from '../components/Navbar'
import Hero from "../components/Hero";
import { Clients } from "../components/Client";
import { Container } from "../components/Container";
import World from '../components/World'
import Footer from '../components/Footer'
import Services from '../components/Services'

export default function Home() {
    return(
      
      <div className="flex flex-col min-h-screen text-white scrollbar-w-2 scrollbar-track-gray-200 scrollbar-thumb-gray-500 hover:scrollbar-thumb-gray-700">
        <Navbar/>
        <br />
        <br />
        <br />
        <br />
        <br />
        <div className="sm:px-16 px-6 sm:py-16 py-6">

        <Hero/> 
        </div>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      <Container>
        <Clients/>
        </Container>
        {/* <Services/> */}
        <br />
        <br />
        <br />
        <br />
        <World/>

        <div className=" sm:px-16 px-6 sm:py-16 py-6">

        <Footer/>
        </div>
      </div>
      
    )
  }