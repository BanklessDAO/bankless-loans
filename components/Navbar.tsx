import {Box, Flex, Text, Button} from '@chakra-ui/react'
import React from 'react'

export default function Navbar() {
    return(
        <Box h='120px' w='100%' bg='#1E2230' borderRadius='18px'>
            <Flex h='100%' alignItems='center' justifyContent='space-between'>
                <Text fontSize='28px' color='white' ml='43px'>Liquity</Text>
                <Box d='flex' alignItems='center' justify='space-between' height='100%'>
                    <Text m='43px' fontSize='18px' color='white'>Borrow</Text>
                    <Text m='43px' color='white'>Deposit</Text>
                    <Text m='43px' color='white'>Stake</Text>
                </Box>

            </Flex>
        </Box>
    )
}