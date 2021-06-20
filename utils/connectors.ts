import {Connectors} from 'web3-react'

const {InjectedConnector, NetworkOnlyConnector, PortisConnector, WalletConnectConnector} = Connectors

const MetaMask = new InjectedConnector({supportedNetworks: [1,4]})

const Infura = new NetworkOnlyConnector({
  providerURL: 'https://mainnet.infura.io/v3/a5d75a1abab84f9d8d37e7a67d3363fd'
})

// const WalletConnect = new WalletConnectConnector({

// })


export const connectors = {MetaMask, Infura, }
