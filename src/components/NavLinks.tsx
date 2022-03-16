import React from 'react'
import { Stack, useDisclosure } from '@chakra-ui/react'
import Link from 'next/link'
export default function NavLinks() {
    const { isOpen } = useDisclosure()
    return (
        <>
            <Stack
                bg='magenta'
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
                <Link href='/Pool'>Stability Pool</Link>
                <Link href='/Stake'>Stake LQTY</Link>
            </Stack>
        </>
    )
}
