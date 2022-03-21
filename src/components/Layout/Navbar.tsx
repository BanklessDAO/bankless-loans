import React from 'react'
import { Flex, Box } from '@chakra-ui/react'
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
                <NavbarWallet />
            </Flex>
        </Flex>
    )
}
