import React from 'react'
import { Box, Text, Flex, Heading, Button, Stack } from '@chakra-ui/react'

export default function Landing() {
    return (
        <Box>
            <Flex direction='column'>
                <Heading color='#FFFFFF'>Become Bankless,</Heading>
                <Heading color='#FFFFFF'>
                    Take out an interest-free loan
                </Heading>
            </Flex>
            <Box mt='3' p='5'>
                <Stack
                    mt='3'
                    justifyContent='space-around'
                    direction={['column', 'row']}
                >
                    <Box>
                        <Text as='b' fontSize='sm'>
                            title
                        </Text>
                        <Text fontSize='xs'>descirption</Text>
                    </Box>
                </Stack>
            </Box>
        </Box>
    )
}
