import Link from "next/link";
import {Navbar} from '../components/Navbar'
import Hero from "../components/Hero";

export default function Home() {
    return(
      
      <div className="flex flex-col text-white ">
        <Navbar/>
        <br />
        <br />
        <br />
        <br />
        <br />
        <Hero/>
        <Link href="/request/whitelist" className="text-white">Whitelist</Link>
        <Link href="/request/featured" className="text-white">Featured request</Link>
        <Link href="/smashkx/events" className="text-white">Host-specific events</Link>
        <Link href="/smashkx/inventory" className="text-white">Host-specific inventory</Link>
        <p>(Host: smashkx)</p>
      </div>
      
    )
  }