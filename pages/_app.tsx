import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../components/Layout'
import {ChakraProvider} from '@chakra-ui/react'
import Web3Provider from 'web3-react'
import {connectors} from '../utils/connectors'


function MyApp({ Component, pageProps }: AppProps) {
  return (
    // <Web3Provider connectors={connectors} libraryName='ethers.js'>
      <ChakraProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    // </Web3Provider>
  )
}
export default MyApp
