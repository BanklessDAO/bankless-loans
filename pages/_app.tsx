import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../components/Layout'
import {ChakraProvider} from '@chakra-ui/react'
import Web3Provider from 'web3-react'
import {connectors} from '../utils/connectors'
import { useWallet, UseWalletProvider} from 'use-wallet'

function MyApp({ Component, pageProps }: AppProps) {  
  return (
    <UseWalletProvider chainId={1} connectors={connectors}>
      <ChakraProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </UseWalletProvider>
  )
}

export default MyApp
