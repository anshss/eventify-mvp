import Link from "next/link";

export default function Home() {
    return(
      <div className="flex flex-col">
        Landing Page
        <br />
        <br />
        <Link href="/whitelist">Whitelist</Link>
        <Link href="/request/featured">Featured request</Link>
        <Link href="/smashkx/events">Host-specific events</Link>
        <Link href="/anshss/inventory">Host-specific inventory</Link>
      </div>
      
    )
  }