import { Box, Flex, Stack, useDisclosure } from '@chakra-ui/react'
import Link from 'next/link'
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons'
import React from 'react'

export default function Navbar() {
    const { isOpen, onOpen, onClose } = useDisclosure()

    const handleToggle = () => (isOpen ? onClose() : onOpen())

    return (
        <Flex
            as='nav'
            h={16}
            w='100%'
            px={4}
            bg='#121212'
            // borderBottomWidth={1}
            align='center'
            justify='space-between'
            wrap='wrap'
            color='white'
        >
            <Flex h='100%' alignItems='center'>
                {/* <Text fontSize='28px' color='white' >
                    Bankless Loans
                </Text> */}
            </Flex>

            <Box
                display={{ base: 'block', md: 'none' }}
                px={1.5}
                py={1}
                bgColor='#212121'
                borderRadius={5}
                onClick={handleToggle}
            >
                {isOpen ? (
                    <CloseIcon color='white' fontSize='15px' />
                ) : (
                    <HamburgerIcon color='white' fontSize='28px' />
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
            </Stack>
        </Flex>
    )
}
