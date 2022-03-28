import React from 'react'
import { Box, Container } from '@chakra-ui/react'
import NavbarWallet from './NavbarWallet'

export default function NavbarMobile() {
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
                <NavbarWallet />
            </Box>
        </Container>
    )
}