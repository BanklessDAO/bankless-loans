import React from 'react'
import { Flex } from '@chakra-ui/react'
import Logo from 'components/Logo'
import NavbarLinks from 'components/NavbarLinks'
import NavbarWallet from 'components/NavbarWallet'
import NavbarTheme from 'components/NavbarTheme'

export default function Navbar() {
    return (
        <Flex
            as='nav'
            height='130px'
            width='100%'
            justifyContent='space-between'
            alignItems='center'
            padding='0 5vw'
        >
            <Logo />
            <NavbarLinks />
            <Flex
                as='section'
                alignItems='center'
                display={{ base: 'none', md: 'flex' }}
            >
                <NavbarWallet />
                <NavbarTheme />
            </Flex>
        </Flex>
    )
}
