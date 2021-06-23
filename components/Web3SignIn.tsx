import { useDisclosure, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, Stack } from "@chakra-ui/react"


export default function Web3SignIn() {

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
                             <Button>Metamask</Button>
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