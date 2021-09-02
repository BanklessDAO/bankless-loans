import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../components/Layout'
import {ChakraProvider} from '@chakra-ui/react'
import { Provider } from 'react-redux'
import { store } from '../state'
import connectors from '../utils/connectors'
import { UseWalletProvider} from 'use-wallet'
import customTheme from '../theme'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    //This UseWalletProvider also helps in keeping a wallet's context at app level which can be accessed with useWallet hook anywhere in the app//
    <UseWalletProvider chainId={4} connectors={connectors}>
      <ChakraProvider theme={customTheme}>
        <Provider store={store}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Provider>
      </ChakraProvider>
    </UseWalletProvider>
  )
}
