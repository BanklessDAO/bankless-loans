import { ReactNode, useEffect } from 'react'
import type { AppProps } from 'next/app'
import { Flex, Heading, Spinner, Box } from '@chakra-ui/react'
import { Icon } from '../components/Icon'
import Layout from '../components/Layout/Layout'
import { ChakraProvider } from '@chakra-ui/react'
import { LiquityProvider } from '../hooks/LiquityContext'
import { WalletConnector } from '../components/WalletConnector'
import { TransactionProvider } from '../components/Transaction'
import customTheme from '../theme'
import { BatchedWebSocketAugmentedWeb3Provider } from '@liquity/providers'
import { Web3ReactProvider } from '@web3-react/core'
import { DisposableWalletProvider } from '../testUtils/DisposableWalletProvider'

declare global {
    interface Window {
        ethereum: Record<string, unknown>
    }
}

const UnsupportedMainnetFallback: React.FC = () => (
    <Flex
        sx={{
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            textAlign: 'center',
        }}
    >
        <Heading sx={{ mb: 3 }}>
            <Icon name='exclamation-triangle' /> This app is for testing
            purposes only.
        </Heading>

        <Box>
            Please change your network to Ropsten, Rinkeby, Kovan or Görli.
        </Box>
    </Flex>
)

type appProps = {
    children?: ReactNode
}

const EthersWeb3ReactProvider = ({ children }: appProps): JSX.Element => {
    useEffect(() => {
        // window is accessible here.
        window.ethereum = window.ethereum || {}
        if (Object.keys(window.ethereum).length) {
            // Silence MetaMask warning in console
            Object.assign(window.ethereum, {
                autoRefreshOnNetworkChange: false,
            })
        }
    }, [])

    if (process.env.REACT_APP_DEMO_MODE === 'true') {
        const ethereum = new DisposableWalletProvider(
            `http://${window.location.hostname}:8545`,
            '0x4d5db4107d237df6a3d58ee5f70ae63d73d7658d4026f2eefd2f204c81682cb7'
        )

        Object.assign(window, { ethereum })
    }

    return (
        <Web3ReactProvider
            getLibrary={provider =>
                new BatchedWebSocketAugmentedWeb3Provider(provider)
            }
        >
            {children}
        </Web3ReactProvider>
    )
}

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {
    const loader = (
        <Flex
            sx={{
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
            }}
        >
            <Spinner color='text' size='lg' />
            <Heading>Loading...</Heading>
        </Flex>
    )

    const unsupportedNetworkFallback = (chainId: number) => (
        <Flex
            sx={{
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
                textAlign: 'center',
            }}
        >
            <Heading as='h2' size='md'>
                <Icon name='exclamation-triangle' />
                Liquity is not yet deployed to{' '}
                {chainId === 1 ? 'mainnet' : 'this network'}.
            </Heading>
            Please switch to Ropsten, Rinkeby, Kovan or Görli.
        </Flex>
    )

    return (
        <EthersWeb3ReactProvider>
            <ChakraProvider theme={customTheme}>
                <WalletConnector loader={loader}>
                    <LiquityProvider
                        loader={loader}
                        unsupportedNetworkFallback={unsupportedNetworkFallback}
                        unsupportedMainnetFallback={
                            <UnsupportedMainnetFallback />
                        }
                    >
                        <TransactionProvider>
                            <Layout>
                                <Component {...pageProps} />
                            </Layout>
                        </TransactionProvider>
                    </LiquityProvider>
                </WalletConnector>
            </ChakraProvider>
        </EthersWeb3ReactProvider>
    )
}

export default MyApp
