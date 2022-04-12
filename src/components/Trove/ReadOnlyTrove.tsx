import React, { useCallback } from 'react'
import { Box, Button, HStack } from '@chakra-ui/react'
import { useLiquitySelector } from '../../hooks/useLiquitySelector'
import { LiquityStoreState } from '@liquity/lib-base'
import { StaticRow } from './Editor'
import { useTroveView } from './context/TroveViewContext'
import { Icon } from '../Icon'
import { CardBase } from '../Layout/CardBase'
import { CollateralRatioV2 } from './CollateralRatioV2'
import { HeadingBase } from 'components/HeadingBase'

const select = ({ trove, price }: LiquityStoreState) => ({ trove, price })

export const ReadOnlyTrove: React.FC = () => {
    const { dispatchEvent } = useTroveView()
    const handleAdjustTrove = useCallback(() => {
        dispatchEvent('ADJUST_TROVE_PRESSED')
    }, [dispatchEvent])
    const handleCloseTrove = useCallback(() => {
        dispatchEvent('CLOSE_TROVE_PRESSED')
    }, [dispatchEvent])
    const { trove, price } = useLiquitySelector(select)

    return (
        <CardBase>
            <HeadingBase>Trove</HeadingBase>
            <Box overflow='hidden' m={0}>
                <Box>
                    <StaticRow
                        label='Collateral'
                        inputID='trove-collateral'
                        amount={trove.collateral.prettify(4)}
                        unit='ETH'
                    />

                    <StaticRow
                        label='Debt'
                        inputID='trove-debt'
                        amount={trove.debt.prettify()}
                        unit={'LUSD'}
                    />

                    <CollateralRatioV2 value={trove.collateralRatio(price)} />
                </Box>
                <HStack marginTop={6}>
                    <Button variant='darkGrey' onClick={handleCloseTrove} m={0}>
                        Close Trove
                    </Button>
                    <Button variant='mainPurple' onClick={handleAdjustTrove}>
                        <HStack>
                            <Icon name='pen' size='sm' />
                            <p>Adjust</p>
                        </HStack>
                    </Button>
                </HStack>
            </Box>
        </CardBase>
    )
}
