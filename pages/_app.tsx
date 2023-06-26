import '../styles/globals.css';
import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import type { AppProps } from 'next/app';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { polygon, polygonMumbai, fantomTestnet } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import {Navbar} from "../components/Navbar"

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [
    polygon,
    polygonMumbai,
    fantomTestnet,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true' ? [] : []),
  ],
  [publicProvider()]
);

const projectId = `61add3dab2037eb610bc9a82af42251c`

const { connectors } = getDefaultWallets({
  appName: 'RainbowKit App',
  projectId,
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>
        <Navbar />
        <Component {...pageProps} />
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;
