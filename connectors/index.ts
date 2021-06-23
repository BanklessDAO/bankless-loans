import { InjectedConnector } from "web3-react/dist/connectors";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";

const POLLING_INTERVAL = 12000;

const RPC_URLS = {
    1: 'https://mainnet.infura.io/v3/a5d75a1abab84f9d8d37e7a67d3363fd',
    4: 'https://rinkeby.infura.io/v3/a5d75a1abab84f9d8d37e7a67d3363fd'
}

export const injected = new InjectedConnector({
    supportedNetworks: [1, 4]
})

export const walletconnect = new WalletConnectConnector({
    rpc: { 1: RPC_URLS[1] },
    bridge: "https://bridge.walletconnect.org",
    qrcode: true,
    pollingInterval: POLLING_INTERVAL
})