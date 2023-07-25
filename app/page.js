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
      
      <div className="flex flex-col min-h-screen text-white ">
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
        <Services/>
        <br />
        <br />
        <br />
        <br />
        <World/>
        <Link href="/request/whitelist" className="text-white">Whitelist</Link>
        <Link href="/request/featured" className="text-white">Featured request</Link>
        <Link href="/smashkx/events" className="text-white">Host-specific events</Link>
        <Link href="/smashkx/inventory" className="text-white">Host-specific inventory</Link>
        <p>(Host: smashkx)</p>
        <div className=" sm:px-16 px-6 sm:py-16 py-6">

        <Footer/>
        </div>
      </div>
      
    )
  }