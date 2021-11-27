import { Box, Flex, Text, Stack, useDisclosure, Button } from '@chakra-ui/react'
import Link from 'next/link'
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons'
import React from 'react'
import Web3SignIn from '../Web3SignIn'

export default function Navbar() {
    const { isOpen, onOpen, onClose } = useDisclosure()

    const handleToggle = () => (isOpen ? onClose() : onOpen())

    return (
        <Flex
            as='nav'
            h={16}
            w='100%'
            pl={5}
            pr={3.5}
            bg='#121212'
            align='center'
            justify='space-between'
            wrap='wrap'
            color='white'
        >
            <Flex h='100%' alignItems='center'>
                <Text fontSize='28px' color='white'>
                    Bankless Loans
                </Text>
            </Flex>

            <Box
                w={9}
                h={9}
                display={{ base: 'flex', md: 'none' }}
                alignItems='center'
                justifyContent='center'
                borderRadius={5}
                bgColor='rgb(33, 36, 41)'
                onClick={handleToggle}
            >
                {isOpen ? (
                    <CloseIcon color='white' fontSize='15px' />
                ) : (
                    <HamburgerIcon color='white' fontSize='25px' />
                )}
            </Box>

            <Stack
                direction={{ base: 'column', md: 'row' }}
                display={{ base: isOpen ? 'block' : 'none', md: 'flex' }}
                width={{ base: '92%', md: 'auto' }}
                height={{ base: 'full', lg: 'auto' }}
                alignItems='center'
                //this keeps it centered on mobile but allowing "space-between" on Navbar//
                mr={{ base: 'auto', md: '43px' }}
                ml={{ base: 'auto', md: '0px' }}
                spacing={8}
            >
                <Link href='/'>Borrow</Link>
                {/* <Link href='/deposit'>
                    Deposit
                </Link>
                <Link href='stake'>
                    Stake
                </Link> */}
                {/* <Web3SignIn /> */}
            </Stack>
        </Flex>
    )
}
