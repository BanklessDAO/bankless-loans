import { useDisclosure, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, Stack } from "@chakra-ui/react"
import {useWallet} from 'use-wallet'
import styles from '../styles/Web3SignIn.module.css'

export default function Web3SignIn() {

    const wallet = useWallet()

    const connectWallet = (provider?: string) => {
        //provider is going to be empty for metamask (browser wallet)
        wallet.connect(provider)
    }

    //this comes from chakra-ui, keeps open, close status and method cleaner//
    const {isOpen, onOpen, onClose} = useDisclosure()

    return(
        <>
            <Button bg='brand.900' variant='outline' onClick={onOpen} textAlign='center'>Connect Wallet</Button>
            <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose} >
                <ModalOverlay>
                    <ModalContent mt={150}>
                        <ModalHeader mt={10} textAlign='center'>Choose a Wallet to connect</ModalHeader>
                        <ModalBody>
                            <Stack mt={5} mb={10}>
                             <Button onClick={() => connectWallet()} className={styles.wbutton}> 
                             <img src='/metamask-logo.png' className={styles.logo} />MetaMask</Button>
                             <Button onClick={() => connectWallet('walletconnect')} className={styles.wbutton}>
                             <img src='/wallet-connect.png' className={styles.logo} /> WalletConnect</Button>
                             <Button onClick={() => connectWallet('portis')} className={styles.wbutton}>
                             <img src='/portis-icon.png' className={styles.logo} /> Portis</Button>
                             <Button onClick={() => connectWallet('fortmatic')} className={styles.wbutton}>
                             <img src='/fortmatic-logo.png' className={styles.logo} /> Fortmatic</Button>
                             <Button onClick={() => connectWallet('authereum')} className={styles.wbutton}>
                             <img src='/authereum-logo.png' className={styles.logo} />Authereum</Button>
                            </Stack>
                        </ModalBody>
                    </ModalContent>
                </ModalOverlay>
            </Modal>
        </>
    )
}