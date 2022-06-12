import { InjectedConnector } from '@web3-react/injected-connector'
import { WalletLinkConnector } from '@web3-react/walletlink-connector'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
import { AbstractConnector } from '@web3-react/abstract-connector'

interface WalletInfo {
    connector?: AbstractConnector
    name: string
    icon: string
}

export const CoinbaseWallet = new WalletLinkConnector({
    url: `https://mainnet.infura.io/v3/${process.env.INFURA_ID}`,
    appName: 'BanklessLoans',
    supportedChainIds: [1, 3, 4, 5, 42],
})

export const WalletConnect = new WalletConnectConnector({
    infuraId: `${process.env.INFURA_ID}`,
    bridge: 'https://bridge.walletconnect.org',
    qrcode: true,
})

export const Injected = new InjectedConnector({
    supportedChainIds: [1, 3, 4, 5, 42],
})

export const connectors: { [key: string]: WalletInfo } = {
    INJECTED: {
        connector: Injected,
        name: 'Metamask',
        icon: '/metamask-logo.png',
    },
    WALLET_CONNECT: {
        connector: WalletConnect,
        name: 'Wallet Connect',
        icon: '/wallet-connect.png',
    },
    COINBASE_WALLET: {
        connector: CoinbaseWallet,
        name: 'Coinbase Wallet',
        icon: '/cbw.png',
    },
}
