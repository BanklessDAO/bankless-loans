import React, { useCallback } from 'react'
import { Container, Heading, Box, Button, Flex } from '@chakra-ui/react'
import { CollateralSurplusAction } from '../CollateralSurplusAction'
import { LiquityStoreState } from '@liquity/lib-base'
import { useLiquitySelector } from '../../hooks/useLiquitySelector'
import { useTroveView } from './context/TroveViewContext'
import { InfoMessage } from '../InfoMessage'
import { CardBase } from 'components/Layout/CardBase'

const select = ({ collateralSurplusBalance }: LiquityStoreState) => ({
    hasSurplusCollateral: !collateralSurplusBalance.isZero,
})

export const RedeemedTrove: React.FC = () => {
    const { hasSurplusCollateral } = useLiquitySelector(select)
    const { dispatchEvent } = useTroveView()

    const handleOpenTrove = useCallback(() => {
        dispatchEvent('OPEN_TROVE_PRESSED')
    }, [dispatchEvent])

    return (
        <CardBase>
            <Heading>Trove</Heading>
            <Box sx={{ p: [2, 3] }}>
                <InfoMessage title='Your Trove has been redeemed.'>
                    {hasSurplusCollateral
                        ? 'Please reclaim your remaining collateral before opening a new Trove.'
                        : 'You can borrow LUSD by opening a Trove.'}
                </InfoMessage>

                <Flex variant='layout.actions'>
                    {hasSurplusCollateral && <CollateralSurplusAction />}
                    {!hasSurplusCollateral && (
                        <Button onClick={handleOpenTrove}>Open Trove</Button>
                    )}
                </Flex>
            </Box>
        </CardBase>
    )
}
