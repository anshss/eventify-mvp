import Link from "next/link";

export default function Home() {
    return(
      <div className="flex flex-col">
        Landing Page
        <br />
        <br />
        <Link href="/whitelist">Whitelist</Link>
        <Link href="/request/featured">Featured request</Link>
        <Link href="/anshss/events">Host-specific events</Link>
        <Link href="/smashkx/inventory">Host-specific inventory</Link>
        <p>(Host: anshss)</p>
      </div>
      
    )
  }