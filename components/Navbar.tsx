import {Box, Flex} from '@chakra-ui/react'
import React from 'react'

export default function Navbar() {
    return(
        <Box h='120px' bg='#1E2230' borderRadius='18px'>
            <Flex flexDirection='row' alignItems='center' justify='space-between' ml='42px' mr='42px' height='100%'>
                <h1>Liquity</h1>
                <Box d='flex' alignItems='center' justify='space-between'>
                    <p>Borrow</p>
                    <p>Deposit</p>
                    <p>Stake</p>
                </Box>
            </Flex>
        </Box>
    )
}