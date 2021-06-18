import {Box, Flex, Text, Stack, useDisclosure, Heading, Button} from '@chakra-ui/react'
import {HamburgerIcon, CloseIcon} from '@chakra-ui/icons'
import React from 'react'

export default function Navbar() {

    const {isOpen, onOpen, onClose} = useDisclosure()

    const handleToggle = () => (isOpen ? onClose() : onOpen())

    console.log('isOpen', isOpen)
    
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
                <HamburgerIcon color='white' mr='43px' fontSize='30px'/>
            </Box>

            <Stack
                direction={{base:'column', md:'row'}}
                display={{base: isOpen ? 'block' : 'none', md:'flex'}}
                width={{ base: "92%", md: "auto" }}
                height={{base: 'full', md:'100px'}}
                alignItems="center"
                mr='auto'
                ml='auto'
                // mt={{ base: 4, md: 0 }}
                bg='#1E2230'
            >
                <Text textAlign='center'>Borrow</Text>
                <Text textAlign='center'>Deposit</Text>
                <Text textAlign='center'>Stake</Text>
            </Stack>
        </Flex>
    )
}