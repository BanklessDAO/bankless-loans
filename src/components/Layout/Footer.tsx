import * as React from 'react'
import Image from 'next/image'
import {
    Box,
    Button,
    Container,
    VStack,
    HStack,
    Stack,
    Text,
    Icon,
    Center,
    Link,
} from '@chakra-ui/react'
import { Discord } from '../../components/LandingLogos'
import logo from '../../../public/bankless-logo.png'

export const Footer: React.FC = () => {
    return (
        <Box w='100vw' h='212px' fontSize={['xs', 'sm']} bg='#101010'>
            <Box p={[4, 8]}>
                <Container
                    d='flex'
                    flexDir={{ base: 'column-reverse', md: 'row' }}
                    justifyContent='space-between'
                    maxW='4xl'
                    textAlign={{ base: 'center', md: 'initial' }}
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
                            <Text>
                                A small one time fee is added to your debt.
                            </Text>
                            <Text>Repay your loan anytime.</Text>
                            {/* <Button
                  colorScheme="black"
                  d="inline-block"
                  fontWeight="bold"
                  size="sm"
                  variant="link"
                >
                </Button> */}
                            <HStack justify='center' align='flex-start'>
                                <Center
                                    bg='#6D29FE'
                                    w='28px'
                                    h='28px'
                                    borderRadius='50%'
                                >
                                    <Link
                                        href='https://bankless.community'
                                        isExternal
                                    >
                                        <Icon as={Discord} />
                                    </Link>
                                </Center>
                                <Link
                                    href='https://bankless.community'
                                    isExternal
                                >
                                    <Image
                                        alt='bankless logo'
                                        height='30px'
                                        width='30px'
                                        src={logo}
                                    />
                                </Link>
                            </HStack>
                        </VStack>
                        <br />
                    </Box>

                    <HStack
                        align='flex-start'
                        justify='center'
                        pb={12}
                        pt={{ base: 12, md: 0 }}
                        spacing={16}
                    >
                        <Stack>
                            <Text variant='sitemap-title'>Navigate</Text>
                        </Stack>
                    </HStack>
                </Container>
            </Box>
        </Box>
    )
}
