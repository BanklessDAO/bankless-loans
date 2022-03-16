import {
    useDisclosure,
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    Stack,
} from '@chakra-ui/react'
import Image from 'next/image'
import styles from '../styles/Web3SignIn.module.css'

export default function Web3SignIn() {
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <>
            <Button
                bg='brand.900'
                variant='outline'
                onClick={onOpen}
                textAlign='center'
            >
                Connect Wallet
            </Button>
            <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay>
                    <ModalContent mt={150}>
                        <ModalHeader mt={10} textAlign='center'>
                            Choose a Wallet to connect
                        </ModalHeader>
                        <ModalBody>
                            <Stack mt={5} mb={10}>
                                <Button className={styles.wbutton}>
                                    <Image
                                        src='/metamask-logo.png'
                                        className={styles.logo}
                                    />
                                    MetaMask
                                </Button>
                                <Button className={styles.wbutton}>
                                    <Image
                                        src='/wallet-connect.png'
                                        className={styles.logo}
                                    />{' '}
                                    WalletConnect
                                </Button>
                                <Button className={styles.wbutton}>
                                    <Image
                                        src='/portis-icon.png'
                                        className={styles.logo}
                                    />{' '}
                                    Coinbase
                                </Button>
                            </Stack>
                        </ModalBody>
                    </ModalContent>
                </ModalOverlay>
            </Modal>
        </>
    )
}
