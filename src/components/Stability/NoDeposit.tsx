import React, { useCallback } from 'react'
import { Box, Flex, Button } from '@chakra-ui/react'
import { useStabilityView } from './context/StabilityViewContext'
import { CardBase } from 'components/Layout/CardBase'
import { HeadingBase } from 'components/HeadingBase'
import { ActionDescriptionV2 } from 'components/ActionDescriptionV2'

export const NoDeposit: React.FC = () => {
    const { dispatchEvent } = useStabilityView()

    const handleOpenTrove = useCallback(() => {
        dispatchEvent('DEPOSIT_PRESSED')
    }, [dispatchEvent])

    return (
        <CardBase>
            <HeadingBase>Stability Pool</HeadingBase>
            <Box>
                <ActionDescriptionV2>
                    {`You have no LUSD in the Stability Pool. You can earn ETH and LQTY rewards by depositing LUSD.`}
                </ActionDescriptionV2>

                <Flex>
                    <Button variant='mainPurple' onClick={handleOpenTrove}>
                        Deposit
                    </Button>
                </Flex>
            </Box>
        </CardBase>
    )
}
