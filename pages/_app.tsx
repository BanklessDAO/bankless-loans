import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../components/Layout'
import {ChakraProvider} from '@chakra-ui/react'
import {connectors} from '../utils/connectors'
import { UseWalletProvider} from 'use-wallet'

function MyApp({ Component, pageProps }: AppProps) {  
  return (
    //This UseWalletProvider also helps in keeping a wallet's context at app level which can be accessed with useWallet hook anywhere in the app//
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
