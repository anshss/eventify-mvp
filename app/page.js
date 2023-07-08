import Link from "next/link";

export default function Home() {
    return(
      <div className="flex flex-col">
        Landing Page
        <Link href="/whitelist">Whitelist</Link>
        <Link href="/request/featured">Featured events request</Link>
      </div>
      
    )
  }