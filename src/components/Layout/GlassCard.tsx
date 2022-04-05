import React from 'react'
import { Box, Heading, Text, Center } from '@chakra-ui/react'
import { useWindowSize } from '../utils/useWindowSize'

interface GlassCardProps {
    title: string
    header: string
    body: string
    icon?: React.ReactNode
    iconBoxColor: string
}
export const GlassCard = ({
    title,
    header,
    body,
    icon,
    iconBoxColor,
}: GlassCardProps): JSX.Element => {
    const { width } = useWindowSize()
    const stylesPaddingTotal = 38 * 2 // 38px on each side

    return (
        <>
            <Box
                as='article'
                overflow='hidden'
                h={['137px', '256px', '256px']}
                maxHeight='256px'
                w='100vw'
                maxW={[`${width - stylesPaddingTotal}px`, '274px', '274px']}
                color='#FFFFFF'
                padding='10px'
                bgGradient={`linear-gradient(126.6deg, rgba(255, 255, 255, 0.06) 28.69%, rgba(255, 255, 255, 0) 100%)`}
                backdropFilter='blur(30px)'
                borderRadius='24.5221px'
                m='0px !important'
                p={[3, 3, 6]}
            >
                <Box display='flex' alignItems='baseline'>
                    <Center
                        w={['20.58px', '30px']}
                        h={['20.58px', '30px']}
                        bg={iconBoxColor}
                        borderRadius='5px'
                    >
                        {icon}
                    </Center>
                    <Heading
                        fontWeight='bold'
                        letterSpacing='wide'
                        size='xs'
                        textTransform='uppercase'
                        pl='7px'
                    >
                        {title}
                    </Heading>
                </Box>
                <Text
                    fontSize='30px'
                    fontWeight='bold'
                    lineHeight='38px'
                    letterSpacing='0em'
                    textAlign='left'
                    pt={['23.3px', '37px']}
                >
                    {header}
                </Text>
                <Text
                    noOfLines={[1, 2]}
                    color='#CBCBCB'
                    fontSize={['20px', '24px']}
                    lineHeight='31px'
                    pt={['10px', '19px']}
                    pr={['0px', '10px']}
                >
                    {body}
                </Text>
            </Box>
        </>
    )
}
