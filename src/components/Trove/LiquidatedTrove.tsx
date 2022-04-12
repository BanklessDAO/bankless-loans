import React, { useCallback } from 'react'
import { Box, Button, HStack } from '@chakra-ui/react'
import { CollateralSurplusAction } from '../CollateralSurplusAction'
import { LiquityStoreState } from '@liquity/lib-base'
import { useLiquitySelector } from '../../hooks/useLiquitySelector'
import { useTroveView } from './context/TroveViewContext'
import { CardBase } from 'components/Layout/CardBase'
import { HeadingBase } from 'components/HeadingBase'
import { ActionDescriptionV2 } from 'components/ActionDescriptionV2'

const select = ({ collateralSurplusBalance }: LiquityStoreState) => ({
    hasSurplusCollateral: !collateralSurplusBalance.isZero,
})

export const LiquidatedTrove: React.FC = () => {
    const { hasSurplusCollateral } = useLiquitySelector(select)
    const { dispatchEvent } = useTroveView()

    const handleOpenTrove = useCallback(() => {
        dispatchEvent('OPEN_TROVE_PRESSED')
    }, [dispatchEvent])

    return (
        <CardBase>
            <HeadingBase>Trove</HeadingBase>
            <Box>
                <ActionDescriptionV2>
                    {`Your Trove has been liquidated. ${
                        hasSurplusCollateral
                            ? 'Please reclaim your remaining collateral before opening a new Trove.'
                            : 'You can borrow LUSD by opening a Trove.'
                    }`}
                </ActionDescriptionV2>

                <HStack>
                    {hasSurplusCollateral && <CollateralSurplusAction />}
                    {!hasSurplusCollateral && (
                        <Button variant='mainPurple' onClick={handleOpenTrove}>
                            Open Trove
                        </Button>
                    )}
                </HStack>
            </Box>
        </CardBase>
    )
}
