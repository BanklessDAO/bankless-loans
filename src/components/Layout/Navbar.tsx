import React from 'react'
import { Flex, Link, useBreakpointValue, Grid } from '@chakra-ui/react'
import Logo from 'components/Logo'
import NavbarLinks from 'components/NavbarLinks'
import { WalletConnector } from 'components/WalletConnector'
import { useModal } from 'hooks/ModalContext'
import NextLink from 'next/link'

export default function Navbar() {
    const modal = useModal()
    const isMobile = useBreakpointValue({ base: true, md: false })
    const navbarLinks = !isMobile && <NavbarLinks />

    return (
        <Grid
            as='nav'
            height='130px'
            width='100%'
            templateColumns='repeat(3, 1fr)'
            alignItems='center'
            padding='28px 5vw'
            position='relative'
        >
            <NextLink href='/' passHref>
                <Link
                    _focus={{ boxShadow: 'none' }}
                    _hover={{ bg: 'transparent' }}
                >
                    <Logo />
                </Link>
            </NextLink>
            {navbarLinks}
            <Flex
                as='section'
                alignItems='center'
                display={['none', 'none', 'flex']}
                justify='flex-end'
            >
                <WalletConnector
                    isOpen={modal.isModalOpen}
                    onOpen={modal.openModal}
                    onClose={modal.closeModal}
                />
            </Flex>
        </Grid>
    )
}
