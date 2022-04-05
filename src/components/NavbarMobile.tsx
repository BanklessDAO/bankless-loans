import React from 'react'
import {
    Box,
    Container,
    Button,
    HStack,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    useDisclosure,
} from '@chakra-ui/react'
import { WalletConnector } from './WalletConnector'
import { useModal } from 'hooks/ModalContext'
import NavbarLinks from './NavbarLinks'

export default function NavbarMobile() {
    const modal = useModal()
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <Container
            maxW='container.xl'
            p={0}
            w='100%'
            centerContent
            display={['block', 'block', 'none']}
        >
            <Box
                bg='#101010'
                h='92px'
                position='sticky'
                bottom={0}
                w='100%'
                borderRadius='30px 30px 0px 0px'
                boxShadow='0px 1px 18px #343434'
                display='flex'
                alignItems='center'
                justifyContent='center'
            >
                <HStack spacing={3}>
                    <WalletConnector
                        isOpen={modal.isModalOpen}
                        onOpen={modal.openModal}
                        onClose={modal.closeModal}
                    />
                    <Button variant='navBarMobile' onClick={onOpen}>
                        App
                    </Button>
                </HStack>
                <Modal isOpen={isOpen} onClose={onClose} isCentered>
                    <ModalOverlay />
                    <ModalContent w='300px'>
                        <ModalBody paddingBottom='1.5rem'>
                            <NavbarLinks />
                        </ModalBody>
                    </ModalContent>
                </Modal>
            </Box>
        </Container>
    )
}
