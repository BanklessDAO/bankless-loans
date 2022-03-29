import React from 'react'
import Image from 'next/image'
import { Box, Text, chakra, HStack, Button } from '@chakra-ui/react'
import walletImage from '../../public/walletIcon.jpg'
import { useWeb3React } from '@web3-react/core'
import { truncateAddress } from '../utils'

type NavbarWalletProps = {
    onClick: () => void
}

const ChakraNextImage = chakra(Image)

export const NavbarWallet = ({ onClick }: NavbarWalletProps): JSX.Element => {
    const { account } = useWeb3React()
    const address = account ? account : ''

    return (
        <Button variant='wallet' onClick={onClick}>
            <HStack>
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
        </Button>
    )
}
