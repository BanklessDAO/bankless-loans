import React, { useState } from 'react'
import {
    Button,
    Box,
    HStack,
    Heading,
    Text,
    Circle,
    Tooltip,
} from '@chakra-ui/react'
import { VStackBase } from 'components/Layout/VStackBase'
import { CardBase } from 'components/Layout/CardBase'
import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons'
import useIsMobile from '../hooks/useIsMobile'

type SlideProps = {
    title: string
    paras: Array<string>
}

const Slide = ({ title, paras }: SlideProps): JSX.Element => {
    return (
        <>
            <Heading as='h3' size='md' my={4}>
                {title}
            </Heading>
            {paras.map(para => (
                <Text my={2}>{para}</Text>
            ))}
        </>
    )
}

type SlidePipsProps = {
    slides: Array<SlideProps>
    activeSlide: number
}

const SlidePips = ({ slides, activeSlide }: SlidePipsProps) => {
    return (
        <nav>
            <HStack
                as='ul'
                justifyContent='center'
                my={4}
                mb={6}
                listStyleType={'none'}
            >
                {slides.map((slide, index) => (
                    <Tooltip
                        label={slide.title}
                        aria-label={slide.title}
                        bg='interactive.gray.22'
                        color='white'
                        p='16px'
                    >
                        <Circle
                            as='li'
                            size='16px'
                            bg={
                                index === activeSlide
                                    ? 'interactive.darkPurple'
                                    : 'interactive.dark'
                            }
                            border={
                                index === activeSlide ? '1px solid white' : ''
                            }
                        />
                    </Tooltip>
                ))}
            </HStack>
        </nav>
    )
}

const Disclaimer = (): JSX.Element => {
    const fullText = false // Switches between slides and full text
    const [activeSlide, setActiveSlide] = useState(0)
    const isMobile = useIsMobile()
    const slides = [
        {
            title: 'A. BanklessLoans General Terms & Conditions',
            paras: [
                'BanklessLoans is a frontend for Liquity Protocol smart contracts and associated technology (generally referenced as “Liquity” throughout this document).',
                'BanklessLoans is in no way affiliated with any company or team associated with Liquity and cannot make guarantees regarding its stability or security. Additionally, BanklessLoans cannot provide guarantees regarding the safety of funds deposited in Liquity through the BanklessLoans frontend. BanklessLoans cannot compensate users for funds that have been lost during use of Liquity. By using BanklessLoans you agree to the terms and conditions described in this document and acknowledge that you are aware of the potential risks and regulatory issues (discussed below). You agree that you knowingly accept these potential risks and agree to hold BanklessLoans harmless.',
            ],
        },
        {
            title: 'B.1 Additional Information About Liquity & DeFi',
            paras: [
                "In order to understand the potential risks of using decentralized finance, BanklessLoans strongly encourages users to get acquainted with the workings of the underlying protocol as much as possible. Further general information about Liquity, which you are accessing through our frontend, can be found here. More specific information regarding security audits of the Liquity Protocol Software can be reviewed here, and Liquity's disclaimer regarding use of the smart contracts can be reviewed here.",
            ],
        },
        {
            title: 'B.2 Additional Information About Liquity & DeFi',
            paras: [
                "Liquity Protocol is a DeFi application that can be integrated into third-party projects or applications, such as Bankless DAO's BanklessLoans. The protocol allows users to create interest-free liquidity in LUSD (a USD pegged stablecoin) by depositing ETH in autonomous smart contracts. LUSD is stabilized by a liquidation mechanism and a Stability Pool, both are fully decentralized and smart contract based. What this means is that the Liquity smart contracts automatically and autonomously deduct technical fees which can be claimed by Liquity users. All functions of Liquity are autonomous and if something goes wrong with the contracts, there is no recourse against a private individual or legal entity. Similarly, while BanklessLoans operates the frontend interface, BanklessLoans is not responsible for issues with the Liquity contracts. BanklessLoans cannot access or control deposits or transactions initiated through the BanklessLoans frontend. BanklessLoans has no relationship with Liquity AG, Liquity, or other Liquity frontend operators. BanklessLoans does not and will not enter into any legal or factual relationship with any user of BanklessLoans beyond provision and maintenance of the frontend.",
            ],
        },
        {
            title: 'B.3 Additional Information About Liquity & DeFi',
            paras: [
                'Liquity is based on experimental blockchain and smart contract technology which carries significant and inherent operational, technological, financial, and regulatory risks. It is a possibility that, as a result of defects, technical bugs, network forks, intentional attacks of third parties, acts of God, unscheduled maintenance, or other events, Liquity experiences disruption, suspension or termination, and/or the value of ETH, LSUD, and LQTY over time may experience extreme volatility or depreciate in full or be lost. Attacks by hackers on Liquity smart contracts or other software used may have unforeseeable consequences, including loss of deposited funds. Also, market conditions may change and no market liquidity is guaranteed. All smart contracts are ultimately controlled by the network of miners. There are also other risks associated with the use of Liquity through BanklessLoans, including those that cannot be anticipated. Users of BanklessLoans declare and confirm that they understand the risks of using experimental autonomous blockchain technology. Use of these products and technology without proper skills and preparation may result in unintended consequences. Users of BanklessLoans expressly acknowledge, understand and agree that use of BanklessLoans and Liquity is at the user\'s sole risk and the service is provided, used, and acquired on an “AS IS" and on an “AS AVAILABLE” basis without representations, warranties, promises or guarantees whatsoever of any kind by any entity and the user shall rely on their own examination and investigation.',
            ],
        },
        {
            title: 'C.1 IMPORTANT LEGAL STUFF',
            paras: [
                'BANKLESS LOANS IS NOT LIABLE TO ANY USER FOR DAMAGES, INCLUDING ANY GENERAL, SPECIAL, INCIDENTAL OR CONSEQUENTIAL DAMAGES ARISING OUT OF THE USE, IN CONNECTION WITH THE USE OR INABILITY TO USE THE LIQUITY PROTOCOL SOFTWARE (INCLUDING BUT NOT LIMITED TO LOSS OF ETH, LUSD OR LQTY, NON-ALLOCATION OF TECHNICAL FEES TO LQTY HOLDERS, LOSS OF DATA, BUSINESS INTERRUPTION, DATA BEING RENDERED INACCURATE OR OTHER LOSSES SUSTAINED BY A USER OR THIRD PARTIES RELATED TO THE LIQUITY PROTOCOL SOFTWARE OR A FAILURE OF THE LIQUITY PROTOCOL SOFTWARE.',
                'THE LIQUITY PROTOCOL SOFTWARE HAS BEEN PROVIDED FOR USE AND INTEGRATION BY THIRD-PARTY FRONTENDS "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.',
            ],
        },
        {
            title: 'C.2 IMPORTANT LEGAL STUFF',
            paras: [
                'THE LIQUITY PROTOCOL SOFTWARE HAS BEEN PROVIDED FOR USE AND INTEGRATION BY THIRD-PARTY FRONTENDS "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.',
                'THE LIQUITY PROTOCOL SOFTWARE IS HIGHLY EXPERIMENTAL AND ANY REAL ETH AND/OR LUSD AND/OR LQTY SENT, STAKED OR DEPOSITED TO THE LIQUITY PROTOCOL SOFTWARE ARE AT RISK OF BEING LOST INDEFINITELY, WITHOUT ANY KIND OF CONSIDERATION.',
            ],
        },
        {
            title: 'D. Regulatory Risk & User Compliance With Applicable Laws',
            paras: [
                'There is the potential Liquity or BanklessLoans could be impacted by one or more regulatory inquiries or regulatory actions which could impede or limit your ability to access or use Liquity or the BanklessLoans frontend.',
                'You agree that you are solely responsible for complying with applicable laws when interacting with BanklessLoans and represent and warrant that you are of legal age. By using BanklessLoans you further represent and warrant that the use is not unlawful or prohibited under the laws of your jurisdiction or any other jurisdiction to which you may be subject and that you shall be in full compliance with applicable laws (including, but not limited to, in compliance with any tax or disclosure obligations to which you may be subject in any applicable jurisdiction).',
            ],
        },
    ]
    const pageHeaderText = 'Disclaimer'
    const pageSubHeaderText = 'BanklessLoans Liquity Frontend Disclaimer'
    const pageDescText =
        'Please read this Disclaimer carefully before accessing, interacting with, or using Liquity through the BanklessLoans frontend at banklessloans.finance.'
    function goForward() {
        if (activeSlide + 1 !== slides.length) {
            setActiveSlide(activeSlide + 1)
        } else {
            setActiveSlide(0)
        }
    }
    function goBackwards() {
        if (activeSlide - 1 !== -1) {
            setActiveSlide(activeSlide - 1)
        } else {
            setActiveSlide(slides.length - 1)
        }
    }
    return (
        <VStackBase maxH='auto'>
            {!fullText && (
                <CardBase>
                    <HStack marginBottom={4} justifyContent='space-between'>
                        <Heading>{pageHeaderText}</Heading>
                        {!isMobile && (
                            <HStack spacing={2}>
                                <Button
                                    leftIcon={<ArrowBackIcon />}
                                    variant='solid'
                                    onClick={() => goBackwards()}
                                    px={[0, 0, 2]}
                                >
                                    Prev
                                </Button>
                                <Button
                                    rightIcon={<ArrowForwardIcon />}
                                    variant='solid'
                                    onClick={() => goForward()}
                                    px={[0, 0, 2]}
                                >
                                    Next
                                </Button>
                            </HStack>
                        )}
                        {isMobile && (
                            <HStack spacing={2}>
                                <Button
                                    variant='solid'
                                    onClick={() => goBackwards()}
                                    px={[0, 0, 2]}
                                >
                                    <ArrowBackIcon />
                                </Button>
                                <Button
                                    variant='solid'
                                    onClick={() => goForward()}
                                    px={[0, 0, 2]}
                                >
                                    <ArrowForwardIcon />
                                </Button>
                            </HStack>
                        )}
                    </HStack>

                    <Box overflow='hidden' m={0}>
                        <Heading as='h2' size='md' marginBottom={2}>
                            {pageSubHeaderText}
                        </Heading>
                        <Text marginBottom={6}>{pageDescText}</Text>
                        <SlidePips slides={slides} activeSlide={activeSlide} />
                        <Slide {...slides[activeSlide]} />
                    </Box>
                </CardBase>
            )}
            {fullText && (
                <CardBase>
                    <HStack marginBottom={4} justifyContent='space-between'>
                        <Heading>{pageHeaderText}</Heading>
                    </HStack>
                    <Box overflow='hidden' m={0}>
                        <Heading as='h2' size='md' marginBottom={2}>
                            {pageSubHeaderText}
                        </Heading>
                        <Text marginBottom={6}>{pageDescText}</Text>
                        <section>
                            {slides.map(slide => (
                                <Slide {...slide} />
                            ))}
                        </section>
                    </Box>
                </CardBase>
            )}
        </VStackBase>
    )
}

export default Disclaimer
