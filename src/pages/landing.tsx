import React from 'react'
import {
    Container,
    Stack,
    VStack,
    Wrap,
    WrapItem,
    Box,
    Text,
    GlobalStyle,
    LightMode,
    Icon,
} from '@chakra-ui/react'
import { GlassCard } from '../components/Layout/GlassCard'
import { Lifebuoy, PalmUp, Blocks } from '../components/LandingLogos'
import { Footer } from '../components/Layout/Footer'

export default function Landing() {
    return (
        <Stack justify='space-between'>
            <Container as='section' maxW='6xl' pt={[4, 8]} px={[4, 8]}>
                <Stack spacing={[4, 8]}>
                    <LightMode>
                        <GlobalStyle />
                        <Text variant='home-title'>
                            Become Bankless,
                            <br />
                            take out an interest-free loan
                        </Text>
                        <Text variant='home-subtitle'>
                            Borrow, Earn and Stake with the fully decentralised
                            Bankless DAO App, built on the Liquity protocol.
                        </Text>
                        <Box as='section' pt={[0, 12]} pb={[0, 16]}>
                            <Container
                                as={VStack}
                                maxW='6xl'
                                px={[4, 8]}
                                spacing={[8, 12]}
                            >
                                <Wrap justify='center' spacing={[4, 8]}>
                                    <WrapItem>
                                        <GlassCard
                                            iconBoxColor='#6D29FE'
                                            icon={<Icon as={PalmUp} />}
                                            title='Borrow'
                                            header='Deposit ETH'
                                            body='Borrow LUSD at 0% interest'
                                        />
                                    </WrapItem>
                                    <WrapItem>
                                        <GlassCard
                                            iconBoxColor='#BE04FF'
                                            icon={<Icon as={Blocks} />}
                                            title='Pool'
                                            header='Deposit LUSD'
                                            body='Earn ETH & LQTY'
                                        />
                                    </WrapItem>
                                    <WrapItem>
                                        <GlassCard
                                            iconBoxColor='#00FFA3'
                                            icon={<Icon as={Lifebuoy} />}
                                            title='Stake'
                                            header='Stake LQTY'
                                            body='Earn LUSD & ETH'
                                        />
                                    </WrapItem>
                                </Wrap>
                            </Container>
                        </Box>
                    </LightMode>
                </Stack>
            </Container>
        </Stack>
    )
}
