import React from 'react'
import Image from 'next/image'
import { Box, Text, chakra, HStack } from '@chakra-ui/react'
import walletImage from '../../public/walletIcon.jpg'

const ChakraNextImage = chakra(Image)

export default function NavbarWallet() {
    return (
        <HStack
            bg='#131313'
            spacing={2}
            p={2}
            borderRadius='18px'
            alignItems='center'
            border='0.8px solid #7d7d7d'
            mr={1}
        >
            <Text as='p' ml={2}>
                0xd4eb...534C
            </Text>
            <Box as='figure' h='28px' w='28px'>
                <ChakraNextImage
                    src={walletImage}
                    alt='wallet image'
                    borderRadius='50%'
                />
            </Box>
        </HStack>
    )
}
