import * as React from 'react'
import {
    Box,
    Container,
    VStack,
    HStack,
    Text,
    Icon,
    Center,
    Link,
} from '@chakra-ui/react'
import { Discord } from '../../components/LandingLogos'
import DisclaimerLink from 'components/DisclaimerLink'

export const Footer = () => {
    return (
        <Box w='100%' h='212px' fontSize={['xs', 'sm']} bg='#101010' p={[4, 8]}>
            <Container
                d='flex'
                flexDir={{ base: 'column-reverse', md: 'row' }}
                justifyContent='space-between'
                maxW='4xl'
                textAlign={{ base: 'center', md: 'initial' }}
                pt={4}
            >
                <Box>
                    <Text color='#FFFFFF'>BanklessLoans</Text>
                    <VStack
                        justify={{ base: 'center', md: 'flex-start' }}
                        align='flex-start'
                        spacing={1}
                        color='#D8D8D8'
                        pt='10px'
                    >
                        <Text>A small one time fee is added to your debt.</Text>
                        <Text>
                            Repay your loan anytime. <DisclaimerLink />
                        </Text>
                        <HStack justify='center' align='flex-start' pt={2}>
                            <Center
                                bg='#6D29FE'
                                w='28px'
                                h='28px'
                                borderRadius='50%'
                            >
                                <Link
                                    href='https://discord.gg/eeExAAb6'
                                    isExternal
                                >
                                    <Icon as={Discord} />
                                </Link>
                            </Center>
                            <Link href='https://bankless.community' isExternal>
                                <img
                                    alt='bankless logo'
                                    height='30px'
                                    width='30px'
                                    src='/bankless-logo.png'
                                />
                            </Link>
                        </HStack>
                    </VStack>
                    <br />
                </Box>
                <Box>
                    <Text color='#FFFFFF'>Liquity</Text>
                    <VStack
                        justify={{ base: 'center', md: 'flex-start' }}
                        align='flex-start'
                        spacing={1}
                        color='#6D29FE'
                        pt='10px'
                    >
                        <Link href='https://youtu.be/bxWhnZKulD8' isExternal>
                            <Text>Liquity Use Cases (Video)</Text>
                        </Link>
                        <Link
                            href='https://www.liquity.org/disclaimer-protocol'
                            isExternal
                        >
                            <Text>Liquity Disclaimer</Text>
                        </Link>
                        <Link href='https://docs.liquity.org/' isExternal>
                            <Text>Liquity Documentation</Text>
                        </Link>
                    </VStack>
                </Box>
            </Container>
        </Box>
    )
}
