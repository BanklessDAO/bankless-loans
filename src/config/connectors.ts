import { WalletLinkConnector } from '@web3-react/walletlink-connector'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
import { InjectedConnector } from '@web3-react/injected-connector'

export const CoinbaseWallet = new WalletLinkConnector({
    url: `https://mainnet.infura.io/v3/${process.env.INFURA_ID}`,
    appName: 'BanklessLoans',
    supportedChainIds: [1, 3, 4, 5, 42],
})

export const WalletConnect = new WalletConnectConnector({
    rpc: `https://mainnet.infura.io/v3/${process.env.INFURA_ID}`,
    bridge: 'https://bridge.walletconnect.org',
    qrcode: true,
})

export const Injected = new InjectedConnector({
    supportedChainIds: [1, 3, 4, 5, 42],
})
