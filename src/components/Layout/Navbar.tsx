import React from 'react'
import { Flex, Box, useDisclosure } from '@chakra-ui/react'
import Logo from 'components/Logo'
import NavbarLinks from 'components/NavbarLinks'
import { WalletConnector } from 'components/WalletConnector'

export default function Navbar() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <Flex
            as='nav'
            height='130px'
            width='100%'
            justifyContent={['center', 'center', 'space-between']}
            alignItems='center'
            padding='28px 5vw'
            position='relative'
        >
            <Logo />
            <NavbarLinks />
            <Flex
                as='section'
                alignItems='center'
                display={['none', 'none', 'flex']}
            >
                <WalletConnector
                    isOpen={isOpen}
                    onOpen={onOpen}
                    onClose={onClose}
                />
            </Flex>
        </Flex>
    )
}
