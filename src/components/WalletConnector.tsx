import React, { useEffect, useReducer, useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import Image from 'next/image'
import { CoinbaseWallet } from '../connectors/connectors'
import { WalletConnect } from '../connectors/connectors'
import { useWalletReducer } from '../hooks/useWalletReducer'
import { Injected } from '../connectors/connectors'
import { useAuthorizedConnection } from '../hooks/useAuthorizedConnection'
import { RetryDialog } from './RetryDialog'
import { ConnectionConfirmationDialog } from './ConnectionConfirmationDialog'
import { MetaMaskIcon } from './MetaMaskIcon'
import { Icon } from './Icon'
import {
    Flex,
    useDisclosure,
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    VStack,
    HStack,
    Box,
    ModalCloseButton,
    Text,
    Link,
} from '@chakra-ui/react'
import { WalletProviderModal } from './WalletProviderModal'
import { connectors } from '../connectors/connectors'

interface MaybeHasMetaMask {
    ethereum?: {
        isMetaMask?: boolean
    }
}

type WalletConnectorProps = {
    loader?: React.ReactNode
}

export const WalletConnector: React.FC<WalletConnectorProps> = ({
    children,
    loader,
}) => {
    const { active, activate, error, deactivate } = useWeb3React<unknown>()
    const triedAuthorizedConnection = useAuthorizedConnection()
    const [tried, setTried] = useState(false)
    const [isMetaMask, setIsMetaMask] = useState(false)
    const [connectionState, dispatch] = useReducer(useWalletReducer, {
        type: 'inactive',
    })
    const { isOpen, onOpen, onClose } = useDisclosure()

    // useEffect(() => {
    //     const provider = window.localStorage.getItem('provider')
    //     if (provider) activate(connectors[provider as keyof object])
    // }, [activate])

    const setProvider = (type: string) => {
        window.localStorage.setItem('provider', type)
    }

    useEffect(() => {
        const tryToActivateIfAuthorized = async () => {
            try {
                if (await Injected.isAuthorized()) {
                    await activate(Injected, undefined, true)
                } else {
                    throw new Error('Unauthorized')
                }
            } catch {
                setTried(true)
            }
        }
        tryToActivateIfAuthorized()
    }, [activate])

    useEffect(() => {
        const detectMetaMask = () =>
            (window as MaybeHasMetaMask).ethereum?.isMetaMask ?? false
        setIsMetaMask(detectMetaMask)
    }, [])

    useEffect(() => {
        if (error) {
            dispatch({ type: 'fail', error })
            deactivate()
        }
    }, [error, deactivate, dispatch])

    useEffect(() => {
        if (active) {
            dispatch({ type: 'finishActivating' })
        } else {
            dispatch({ type: 'deactivate' })
        }
    }, [active, dispatch])

    if (!triedAuthorizedConnection) {
        return <>{loader}</>
    }

    if (connectionState.type === 'active') {
        return <>{children}</>
    }

    return (
        <>
            <Flex
                sx={{
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Button variant='active' onClick={onOpen}>
                    <Box sx={{ ml: 2 }}>Connect wallet</Box>
                </Button>
                <Modal isOpen={isOpen} onClose={onClose} isCentered>
                    <ModalOverlay />
                    <ModalContent w='300px'>
                        <ModalHeader>Select Wallet</ModalHeader>
                        <ModalCloseButton
                            _focus={{
                                boxShadow: 'none',
                            }}
                        />
                        <ModalBody paddingBottom='1.5rem'>
                            <VStack>
                                <Button
                                    variant='outline'
                                    onClick={() => {
                                        dispatch({
                                            type: 'startActivating',
                                            connector: Injected,
                                        })
                                        activate(Injected)
                                        setProvider('injected')
                                        onClose()
                                    }}
                                    w='100%'
                                >
                                    <HStack
                                        w='100%'
                                        justifyContent='center'
                                        sx={{ borderRadius: '3px' }}
                                    >
                                        <Image
                                            src='/metamask-logo.png'
                                            alt='Metamask Logo'
                                            width={25}
                                            height={25}
                                        />
                                        <Text>Metamask</Text>
                                    </HStack>
                                </Button>
                                <Button
                                    variant='outline'
                                    onClick={() => {
                                        dispatch({
                                            type: 'startActivating',
                                            connector: WalletConnect,
                                        })
                                        activate(WalletConnect)
                                        setProvider('walletConnect')
                                    }}
                                    w='100%'
                                >
                                    <HStack
                                        w='100%'
                                        justifyContent='center'
                                        sx={{ borderRadius: '3px' }}
                                    >
                                        <Image
                                            src='/wallet-connect.png'
                                            alt='Wallet Connect Logo'
                                            width={26}
                                            height={26}
                                        />
                                        <Text>Wallet Connect</Text>
                                    </HStack>
                                </Button>
                                <Button
                                    variant='outline'
                                    onClick={() => {
                                        dispatch({
                                            type: 'startActivating',
                                            connector: CoinbaseWallet,
                                        })
                                        activate(CoinbaseWallet)
                                        setProvider('coinbaseWallet')
                                        onClose()
                                    }}
                                    w='100%'
                                >
                                    <HStack
                                        w='100%'
                                        justifyContent='center'
                                        sx={{ borderRadius: '3px' }}
                                    >
                                        <Image
                                            src='/cbw.png'
                                            alt='Coinbase Wallet Logo'
                                            width={25}
                                            height={25}
                                        />
                                        <Text>Coinbase Wallet</Text>
                                    </HStack>
                                </Button>
                            </VStack>
                        </ModalBody>
                    </ModalContent>
                </Modal>
            </Flex>
            {connectionState.type === 'failed' && (
                <Modal
                    isOpen={connectionState.type === 'failed'}
                    onClose={onClose}
                >
                    <ModalOverlay />
                    <ModalContent>
                        <ModalBody>
                            <RetryDialog
                                title={
                                    isMetaMask
                                        ? 'Failed to connect to MetaMask'
                                        : 'Failed to connect wallet'
                                }
                                onCancel={() => dispatch({ type: 'cancel' })}
                                onRetry={() => {
                                    dispatch({ type: 'retry' })
                                    activate(connectionState.connector)
                                }}
                            >
                                <Flex
                                    flexDirection='column'
                                    alignItems='center'
                                >
                                    <Box sx={{ textAlign: 'center' }}>
                                        You might need to install MetaMask or
                                        use a different browser.
                                    </Box>
                                    <Link
                                        sx={{ lineHeight: 3 }}
                                        href='https://metamask.io/download.html'
                                        target='_blank'
                                    >
                                        Learn more{' '}
                                        <Icon
                                            size='xs'
                                            name='external-link-alt'
                                        />
                                    </Link>
                                </Flex>
                            </RetryDialog>
                        </ModalBody>
                    </ModalContent>
                </Modal>
            )}
            {connectionState.type === 'activating' && (
                <Modal
                    isOpen={connectionState.type === 'activating'}
                    onClose={onClose}
                >
                    <ModalOverlay />
                    <ModalContent>
                        <ConnectionConfirmationDialog
                            title={
                                isMetaMask
                                    ? 'Confirm connection in MetaMask'
                                    : 'Confirm connection in your wallet'
                            }
                            icon={
                                isMetaMask ? (
                                    <MetaMaskIcon />
                                ) : (
                                    <Icon name='wallet' size='lg' />
                                )
                            }
                            onCancel={() => dispatch({ type: 'cancel' })}
                        >
                            <Text sx={{ textAlign: 'center' }}>
                                Confirm the request that&apos;s just appeared.
                                {isMetaMask ? (
                                    <>
                                        {' '}
                                        If you can&apos;t see a request, open
                                        your MetaMask extension via your
                                        browser.
                                    </>
                                ) : (
                                    <>
                                        {' '}
                                        If you can&apos;t see a request, you
                                        might have to open your wallet.
                                    </>
                                )}
                            </Text>
                        </ConnectionConfirmationDialog>
                    </ModalContent>
                </Modal>
            )}
            {connectionState.type === 'rejectedByUser' && (
                <Modal
                    isOpen={connectionState.type === 'rejectedByUser'}
                    onClose={onClose}
                >
                    <ModalOverlay />
                    <ModalContent>
                        <RetryDialog
                            title='Cancel connection?'
                            onCancel={() => dispatch({ type: 'cancel' })}
                            onRetry={() => {
                                dispatch({ type: 'retry' })
                                activate(connectionState.connector)
                            }}
                        >
                            <Text>
                                To use Liquity, you need to connect your
                                Ethereum account.
                            </Text>
                        </RetryDialog>
                    </ModalContent>
                </Modal>
            )}
            {connectionState.type === 'alreadyPending' && (
                <Modal
                    isOpen={connectionState.type === 'alreadyPending'}
                    onClose={onClose}
                >
                    <ModalOverlay />
                    <ModalContent>
                        <RetryDialog
                            title='Connection already requested'
                            onCancel={() => dispatch({ type: 'cancel' })}
                            onRetry={() => {
                                dispatch({ type: 'retry' })
                                activate(connectionState.connector)
                            }}
                        >
                            <Text>
                                Please check your wallet and accept the
                                connection request before retrying.
                            </Text>
                        </RetryDialog>
                    </ModalContent>
                </Modal>
            )}
        </>
    )
}
