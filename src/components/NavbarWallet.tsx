import React from 'react'
import Image from 'next/image'
import { Box, Text, chakra, HStack } from '@chakra-ui/react'
import walletImage from '../../public/walletIcon.jpg'

const ChakraNextImage = chakra(Image)

type Props = {
    walletAddress?: string
}

export default function NavbarWallet({
    walletAddress = '0x820C24163f64AcB6AA6fa094B3F2444A6Ab1bCe9',
}: Props) {
    return (
        <HStack
            bg='#131313'
            p={2}
            borderRadius='18px'
            alignItems='center'
            border='0.8px solid #7d7d7d'
            mr={1}
        >
            <Text as='p' isTruncated noOfLines={0} maxWidth='126px'>
                {walletAddress}
            </Text>
            <Box as='figure' h='28px' w='28px' ml={2}>
                <ChakraNextImage
                    src={walletImage}
                    alt='wallet image'
                    borderRadius='50%'
                />
            </Box>
        </HStack>
    )
}
