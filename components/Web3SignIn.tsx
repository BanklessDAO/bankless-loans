import { useDisclosure, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, Stack } from "@chakra-ui/react"
import { injected, walletconnect } from "../connectors"
import { Web3ReactProvider, useWeb3React, UnsupportedChainIdError } from '@web3-react/core'
import { Web3Provider } from "@ethersproject/providers"
import { useWallet } from 'use-wallet'

export default function Web3SignIn() {

    // const context = useWeb3React<Web3Provider>()

    // const { connector, library, chainId, account, activate, deactivate, active, error} = context
    const wallet = useWallet()

    const connectWallet = () => {
        wallet.connect()
    }

    console.log('wallet', wallet)
    const {isOpen, onOpen, onClose} = useDisclosure()
    return(
        <>
            <Button onClick={onOpen}>Connect Wallet</Button>
            <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay>
                    <ModalContent>
                        <ModalHeader textAlign='center'>Choose a Wallet</ModalHeader>
                        <ModalBody >
                            <Stack>
                             <Button onClick={connectWallet}>Metamask</Button>
                             <Button>WalletConnect</Button>
                             <Button>Portis</Button>
                             <Button>Fortmatic</Button>
                             <Button>Authereum</Button>
                            </Stack>
                        </ModalBody>
                    </ModalContent>
                </ModalOverlay>
            </Modal>
        </>
    )
}