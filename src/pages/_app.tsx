import type { AppProps } from 'next/app'
import Layout from '../components/Layout/Layout'
import { ChakraProvider } from '@chakra-ui/react'
import { Provider } from 'react-redux'
import { store } from '../state'
import { UseWalletProvider } from 'use-wallet'
import customTheme from '../theme'
import { BatchedWebSocketAugmentedWeb3Provider } from "@liquity/providers";

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {
  return (
    //This UseWalletProvider also helps in keeping a wallet's context at app level which can be accessed with useWallet hook anywhere in the app//
    <UseWalletProvider chainId={4}>
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

export default MyApp
