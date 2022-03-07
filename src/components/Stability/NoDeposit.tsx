import React, { useCallback } from 'react'
import { Heading, Box, Flex, Button } from '@chakra-ui/react'
import { InfoMessage } from '../InfoMessage'
import { useStabilityView } from './context/StabilityViewContext'
import { RemainingLQTY } from './RemainingLQTY'
import { Yield } from './Yield'

export const NoDeposit: React.FC = () => {
    const { dispatchEvent } = useStabilityView()

    const handleOpenTrove = useCallback(() => {
        dispatchEvent('DEPOSIT_PRESSED')
    }, [dispatchEvent])

    return (
        <Flex
            w='555px'
            height='432px'
            alignItems='center'
            justifyContent='center'
        >
            <Box
                w='100%'
                h='100%'
                maxW='md'
                borderWidth={1}
                borderRadius='31px'
                overflow='hidden'
                bg='#131313'
                color='#FFFFFF'
            >
                <Heading>
                    Stability Pool
                    <Flex sx={{ justifyContent: 'flex-end' }}>
                        <RemainingLQTY />
                    </Flex>
                </Heading>
                <Box sx={{ p: [2, 3] }}>
                    <InfoMessage title='You have no LUSD in the Stability Pool.'>
                        You can earn ETH and LQTY rewards by depositing LUSD.
                    </InfoMessage>

                    <Flex variant='layout.actions'>
                        <Flex
                            sx={{
                                justifyContent: 'flex-start',
                                flex: 1,
                                alignItems: 'center',
                            }}
                        >
                            <Yield />
                        </Flex>
                        <Button onClick={handleOpenTrove}>Deposit</Button>
                    </Flex>
                </Box>
            </Box>
        </Flex>
    )
}
