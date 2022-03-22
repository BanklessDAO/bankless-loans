import { useReducer } from 'react'
import {
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
} from '@chakra-ui/react'
import Image from 'next/image'
import { useWeb3React } from '@web3-react/core'
import { CoinbaseWallet } from '../config/connectors'
import { WalletConnect } from '../config/connectors'
import { Injected } from '../config/connectors'
import styles from '../styles/Web3SignIn.module.css'
import { injectedConnector } from '../connectors/injectedConnector'
import { useWalletReducer } from '../hooks/useWalletReducer'

type WalletProviderModalProps = {
    isOpen: boolean
    onOpen?: () => void
    closeModal: () => void
}

export const WalletProviderModal = ({
    isOpen,
    closeModal,
    onOpen,
}: WalletProviderModalProps): JSX.Element => {
    const { activate } = useWeb3React()
    const [connectionState, dispatch] = useReducer(useWalletReducer, {
        type: 'inactive',
    })
    const setProvider = (type: string) => {
        window.localStorage.setItem('provider', type)
    }

    return (
        <>
            <Button variant='active' onClick={onOpen}>
                <Box sx={{ ml: 2 }}>Connect wallet</Box>
            </Button>
            <Modal isOpen={isOpen} onClose={closeModal} isCentered>
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
                                onClick={
                                    // () => {
                                    // activate(Injected);
                                    // setProvider("injected");
                                    // closeModal();
                                    () => {
                                        dispatch({
                                            type: 'startActivating',
                                            connector: injectedConnector,
                                        })
                                        activate(injectedConnector)
                                    }
                                }
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
                                onClick={
                                    // () => {
                                    // activate(WalletConnect);
                                    // setProvider("walletConnect");
                                    // closeModal();
                                    () => {
                                        dispatch({
                                            type: 'startActivating',
                                            connector: WalletConnect,
                                        })
                                        activate(WalletConnect)
                                    }
                                }
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
                                onClick={
                                    // () => {
                                    // activate(CoinbaseWallet);
                                    // closeModal();
                                    () => {
                                        dispatch({
                                            type: 'startActivating',
                                            connector: CoinbaseWallet,
                                        })
                                        activate(CoinbaseWallet)
                                    }
                                }
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
        </>
    )
}
