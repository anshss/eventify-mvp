import { Navbar } from '@/components/Navbar'
import '@/styles/globals.css'

// import { WagmiConfig, createConfig } from "wagmi";
// import { mainnet, polygon, optimism, polygonMumbai } from "wagmi/chains";
// import { ConnectKitProvider, getDefaultConfig } from "connectkit";

export default function App({ Component, pageProps }) {
  return (
    <div>
      <Navbar />
      <Component {...pageProps} />
    </div>
  )
}
