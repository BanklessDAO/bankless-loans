import React, { useEffect, useReducer, useState } from 'react'
import { useRouter } from 'next/router'
import { useWeb3React } from '@web3-react/core'
import { AbstractConnector } from '@web3-react/abstract-connector'
import { walletReducer } from '../hooks/walletReducer'
import { Button, Text, Flex, Link, Box } from '@chakra-ui/react'
import { injectedConnector } from '../connectors/injectedConnector'
import { useAuthorizedConnection } from '../hooks/useAuthorizedConnection'
import { RetryDialog } from './RetryDialog'
import { ConnectionConfirmationDialog } from './ConnectionConfirmationDialog'
import { MetaMaskIcon } from './MetaMaskIcon'
import { Icon } from './Icon'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
} from '@chakra-ui/react'
import { TrovePreview } from './Trove/TrovePreview'
import { StabilityPreview } from './Stability/StabilityPreview'
import { StakingPreview } from './Staking/StakingPreview'

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
    const { activate, deactivate, active, error } = useWeb3React<unknown>()
    const triedAuthorizedConnection = useAuthorizedConnection()
    const [connectionState, dispatch] = useReducer(walletReducer, {
        type: 'inactive',
    })
    const [isMetaMask, setIsMetaMask] = useState(false)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const router = useRouter()

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
    }, [error, deactivate])

    useEffect(() => {
        if (active) {
            dispatch({ type: 'finishActivating' })
        } else {
            dispatch({ type: 'deactivate' })
        }
    }, [active])

    if (!triedAuthorizedConnection) {
        return <>{loader}</>
    }

    if (connectionState.type != 'active') {
        return <>{children}</>
    }

    const trovePreview = router.pathname == '/' && <TrovePreview />
    const stabilityPreview = router.pathname == '/Pool' && <StabilityPreview />
    const stakingPreview = router.pathname == '/Stake' && <StakingPreview />

    return (
        <>
            {console.log('router path', router.pathname)}
            <Flex
                sx={{
                    height: '100vh',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                {trovePreview}
                {stabilityPreview}
                {stakingPreview}
                <Button
                    onClick={() => {
                        dispatch({
                            type: 'startActivating',
                            connector: injectedConnector,
                        })
                        activate(injectedConnector)
                    }}
                >
                    {isMetaMask ? (
                        <>
                            <MetaMaskIcon />
                            <Box sx={{ ml: 2 }}>Connect to MetaMask</Box>
                        </>
                    ) : (
                        <>
                            <Icon name='plug' size='lg' />
                            <Box sx={{ ml: 2 }}>Connect wallet</Box>
                        </>
                    )}
                </Button>
            </Flex>
            {console.log('connection state', connectionState.type)}
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
