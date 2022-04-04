import React from 'react'
import {
    HStack,
    Box,
    Text,
    Flex,
    Heading,
    Stack,
    GlobalStyle,
    LightMode,
} from '@chakra-ui/react'
import { SoftCard } from '../components/Layout/SoftCard'
import { Lifebuoy, PalmUp, Blocks } from '../components/LandingLogos'
import { Icon } from '@chakra-ui/react'

export default function Landing() {
    return (
        <Box h='100vh'>
            <LightMode>
                <GlobalStyle />
                <Flex direction='column'>
                    <Heading color='#FFFFFF'>Become Bankless,</Heading>
                    <Heading color='#FFFFFF'>
                        take out an interest-free loan
                    </Heading>
                </Flex>
                <Box mt='3' p='5'>
                    <HStack>
                        <SoftCard
                            iconBoxColor='#6D29FE'
                            icon={<Icon as={PalmUp} />}
                            title='Borrow'
                            header='Deposit ETH'
                            body='Borrow LUSD at 0% interest'
                        />
                        <SoftCard
                            iconBoxColor='#BE04FF'
                            icon={<Icon as={Blocks} />}
                            title='Pool'
                            header='Deposit LUSD'
                            body='Earn ETH & LQTY'
                        />
                        <SoftCard
                            iconBoxColor='#00FFA3'
                            icon={<Icon as={Lifebuoy} />}
                            title='Stake'
                            header='Stake LQTY'
                            body='Earn LUSD & ETH'
                        />
                    </HStack>
                </Box>
            </LightMode>
        </Box>
    )
}
