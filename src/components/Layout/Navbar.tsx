import React from 'react'
import { Flex, IconButton, Link } from '@chakra-ui/react'
import Logo from 'components/Logo'
import NavbarLinks from 'components/NavbarLinks'
import { WalletConnector } from 'components/WalletConnector'
import { useModal } from 'hooks/ModalContext'
import NextLink from 'next/link'

export default function Navbar() {
    const modal = useModal()
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
            <NextLink href='/' passHref>
                <Link
                    _focus={{ boxShadow: 'none' }}
                    _hover={{ bg: 'transparent' }}
                >
                    <Logo />
                </Link>
            </NextLink>
            <NavbarLinks />
            <Flex
                as='section'
                alignItems='center'
                display={['none', 'none', 'flex']}
            >
                <WalletConnector
                    isOpen={modal.isModalOpen}
                    onOpen={modal.openModal}
                    onClose={modal.closeModal}
                />
            </Flex>
        </Flex>
    )
}
