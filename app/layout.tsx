"use client";
import "../styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { polygon, polygonMumbai, fantomTestnet } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { Navbar } from "../components/Navbar";
//

const { chains, publicClient, webSocketPublicClient } = configureChains(
    [
        polygon,
        polygonMumbai,
        fantomTestnet,
        ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === "true" ? [] : []),
    ],
    [publicProvider()]
);

const projectId = `61add3dab2037eb610bc9a82af42251c`;

const { connectors } = getDefaultWallets({
    appName: "RainbowKit App",
    projectId,
    chains,
});

const wagmiConfig = createConfig({
    autoConnect: true,
    connectors,
    publicClient,
    webSocketPublicClient,
});

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <WagmiConfig config={wagmiConfig}>
                {/* <RainbowKitProvider chains={chains}> */}
                    <body>
                        <Navbar />
                        {children}
                    </body>
                {/* </RainbowKitProvider> */}
            </WagmiConfig>
        </html>
    );
}
