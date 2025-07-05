import { configureChains, createConfig } from 'wagmi'
import { mainnet, polygon, optimism, arbitrum, sepolia } from 'wagmi/chains'
import { publicProvider } from 'wagmi/providers/public'
import { InjectedConnector } from 'wagmi/connectors/injected'
// import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mainnet, polygon, optimism, arbitrum, sepolia],
  [publicProvider()]
)

export const config = createConfig({
  autoConnect: true,
  connectors: [
    new InjectedConnector({ chains }),
    // new WalletConnectConnector({
    //   chains,
    //   options: {
    //     projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || 'YOUR_PROJECT_ID',
    //   },
    // }),
  ],
  publicClient,
  webSocketPublicClient,
})

export { chains } 