import { ReactNode, useEffect, useReducer } from 'react'
import type { AppProps } from 'next/app'
import {
    Flex,
    Heading,
    Spinner,
    Box,
    LightMode,
    DarkMode,
    GlobalStyle,
} from '@chakra-ui/react'
import { Icon } from '../components/Icon'
import { Layout } from '../components/Layout/Layout'
import { ChakraProvider } from '@chakra-ui/react'
import { LiquityProvider } from '../hooks/LiquityContext'
import { PreviewConnector } from '../components/PreviewConnector'
import { TransactionProvider } from '../components/Transaction'
import customTheme from '../theme'
import { BatchedWebSocketAugmentedWeb3Provider } from '@liquity/providers'
import { Web3ReactProvider } from '@web3-react/core'
import { DisposableWalletProvider } from '../testUtils/DisposableWalletProvider'
import WalletContext from 'hooks/WalletContext'
import { useWalletReducer } from 'hooks/useWalletReducer'
import { ModalProvider, useModal } from 'hooks/ModalContext'
import { useRouter } from 'next/router'

declare global {
    interface Window {
        ethereum: any
    }
}

const UnsupportedMainnetFallback: React.FC = () => (
    <DarkMode>
        <GlobalStyle />
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
    </DarkMode>
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

export const ColorModeWrapper = ({ children }: appProps) => {
    const { pathname: page } = useRouter()
    const allowedRoutes = ['/']
    return allowedRoutes.includes(page) ? (
        <LightMode>
            <GlobalStyle />
            {children}
        </LightMode>
    ) : (
        <DarkMode>
            <GlobalStyle />
            {children}
        </DarkMode>
    )
}

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {
    const [connectionState, dispatch] = useReducer(useWalletReducer, {
        type: 'inactive',
    })
    const providerState = {
        connectionState,
        dispatch,
    }
    const modal = useModal()

    const loader = (
        <ColorModeWrapper>
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
        </ColorModeWrapper>
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
                <ModalProvider
                    isModalOpen={modal.isModalOpen}
                    openModal={modal.openModal}
                    closeModal={modal.closeModal}
                >
                    <WalletContext.Provider value={providerState}>
                        <Layout>
                            <PreviewConnector>
                                <LiquityProvider
                                    loader={loader}
                                    unsupportedNetworkFallback={
                                        unsupportedNetworkFallback
                                    }
                                    unsupportedMainnetFallback={
                                        <UnsupportedMainnetFallback />
                                    }
                                >
                                    <TransactionProvider>
                                        <Component {...pageProps} />
                                    </TransactionProvider>
                                </LiquityProvider>
                            </PreviewConnector>
                        </Layout>
                    </WalletContext.Provider>
                </ModalProvider>
            </ChakraProvider>
        </EthersWeb3ReactProvider>
    )
}

export default MyApp
