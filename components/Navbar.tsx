import {Box, Flex, Text, Stack, useDisclosure, Heading, Button} from '@chakra-ui/react'
import {HamburgerIcon, CloseIcon} from '@chakra-ui/icons'
import React from 'react'

export default function Navbar() {

    const {isOpen, onOpen, onClose} = useDisclosure()

    console.log('isOpen', isOpen)
    const handleToggle = () => (isOpen ? onClose() : onOpen())

    return( 
        <Flex as='nav' h='120px' w='100%' bg='#1E2230' borderRadius='18px'
        align="center"
        justify="space-between"
        wrap="wrap"
        color='white'
        >
            <Flex h='100%' alignItems='center'>
                <Text fontSize='28px' color='white' ml='43px'>Liquity</Text>
            </Flex>
                
            <Box display={{ base: "block", md: "none" }} onClick={handleToggle}>
                <HamburgerIcon color='white' mr='43px'/>
            </Box>

            <Stack
                direction={{base:'column', md:'row'}}
                display={{base: isOpen ? 'block' : 'none', md:'flex'}}
                width={{ base: "full", md: "auto" }}
                alignItems="center"
                // mt={{ base: 4, md: 0 }}
                bg='red'
            >
                <Text>Borrow</Text>
                <Text>Deposit</Text>
                <Text>Stake</Text>
            </Stack>
        </Flex>
    )
}