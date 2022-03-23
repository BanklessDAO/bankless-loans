import React from 'react'
import Image from 'next/image'
import { Box, Text, chakra, HStack } from '@chakra-ui/react'
import walletImage from '../../public/walletIcon.jpg'
import { useWeb3React } from '@web3-react/core'
import { truncateAddress } from '../utils'

const ChakraNextImage = chakra(Image)

export const NavbarWallet = (): JSX.Element => {
    const { account } = useWeb3React()
    const address = account ? account : ''
    return (
        <HStack
            bg='interactive.gray.13'
            p={2}
            borderRadius='18px'
            alignItems='center'
            borderWidth='1.6px'
            borderStyle='solid'
            borderColor='interactive.gray.7D'
            mr={1}
        >
            <Text
                as='p'
                isTruncated
                noOfLines={0}
                maxWidth='126px'
                color='interactive.white'
            >
                {truncateAddress(address)}
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
