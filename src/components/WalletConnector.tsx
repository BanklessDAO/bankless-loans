import React, { useEffect, useReducer, useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import { AbstractConnector } from '@web3-react/abstract-connector'
import {
    connectors,
    CoinbaseWallet,
    WalletConnect,
    Injected,
} from '../connectors/connectors'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
import { useWalletReducer } from '../hooks/useWalletReducer'
import { useAuthorizedConnection } from '../hooks/useAuthorizedConnection'
import { RetryDialog } from './RetryDialog'
import { Icon } from './Icon'
import { NavbarWallet } from './NavbarWallet'
import { useModal } from 'hooks/ModalContext'
import {
    Flex,
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
import { truncateAddress } from '../utils'

interface MaybeHasMetaMask {
    ethereum?: {
        isMetaMask?: boolean
    }
}

type WalletConnectorProps = {
    children?: React.ReactNode
    loader?: React.ReactNode
    isOpen: boolean
    onOpen: () => void
    onClose: () => void
}

export const WalletConnector = ({ loader }: WalletConnectorProps) => {
    const { account, active, activate, error, deactivate, connector } =
        useWeb3React<unknown>()
    const address = account ? account : ''
    const triedAuthorizedConnection = useAuthorizedConnection()
    const [tried, setTried] = useState(false)
    const [isMetaMask, setIsMetaMask] = useState(false)
    const [connectionState, dispatch] = useReducer(useWalletReducer, {
        type: 'inactive',
    })
    const modal = useModal()
    const walletProvider = Object.keys(connectors)
        .filter(k => connectors[k].connector === connector)
        .map(k => connectors[k])[0]

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

    if (connector instanceof WalletConnectConnector) {
        connector.walletConnectProvider = undefined
    }

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

    return (
        <>
            <Flex
                sx={{
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                {connectionState.type === 'active' || account ? (
                    <NavbarWallet onClick={modal.openModal} />
                ) : (
                    <Button variant='mainPurple' onClick={modal.openModal}>
                        <Box sx={{ ml: 2 }}>Connect wallet</Box>
                    </Button>
                )}
                <Modal
                    isOpen={modal.isModalOpen}
                    onClose={modal.closeModal}
                    isCentered
                >
                    <ModalOverlay />
                    <ModalContent w='300px'>
                        <ModalHeader></ModalHeader>
                        <ModalCloseButton
                            _focus={{
                                boxShadow: 'none',
                            }}
                        />
                        <ModalBody paddingBottom='1.5rem'>
                            <VStack>
                                {account && (
                                    <HStack>
                                        <Text color='#20113f'>Connected:</Text>
                                        <Text
                                            as='p'
                                            isTruncated
                                            noOfLines={0}
                                            maxWidth='126px'
                                            color='#20113f'
                                            pr={3}
                                        >
                                            {truncateAddress(address)}
                                        </Text>
                                        <img
                                            src={walletProvider.icon}
                                            alt={walletProvider.name}
                                            width={25}
                                            height={25}
                                        />
                                    </HStack>
                                )}
                                <Button
                                    variant='outline'
                                    onClick={() => {
                                        dispatch({
                                            type: 'startActivating',
                                            connector: Injected,
                                        })
                                        activate(Injected)
                                        modal.closeModal()
                                    }}
                                    w='100%'
                                >
                                    <HStack
                                        w='100%'
                                        justifyContent='center'
                                        sx={{ borderRadius: '3px' }}
                                    >
                                        <img
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
                                        modal.closeModal()
                                    }}
                                    w='100%'
                                >
                                    <HStack
                                        w='100%'
                                        justifyContent='center'
                                        sx={{ borderRadius: '3px' }}
                                    >
                                        <img
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
                                        modal.closeModal()
                                    }}
                                    w='100%'
                                >
                                    <HStack
                                        w='100%'
                                        justifyContent='center'
                                        sx={{ borderRadius: '3px' }}
                                    >
                                        <img
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
                <Modal isOpen={modal.isModalOpen} onClose={modal.closeModal}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalCloseButton
                            _focus={{
                                boxShadow: 'none',
                            }}
                        />
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
            {connectionState.type === 'rejectedByUser' && (
                <Modal isOpen={modal.isModalOpen} onClose={modal.closeModal}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalCloseButton
                            _focus={{
                                boxShadow: 'none',
                            }}
                        />
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
                <Modal isOpen={modal.isModalOpen} onClose={modal.closeModal}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalCloseButton
                            _focus={{
                                boxShadow: 'none',
                            }}
                        />
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
