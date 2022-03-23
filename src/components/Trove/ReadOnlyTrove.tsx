import React, { useCallback } from 'react'
import { Container, Heading, Box, Flex, Button } from '@chakra-ui/react'
import { useLiquitySelector } from '../../hooks/useLiquitySelector'
import { LiquityStoreState } from '@liquity/lib-base'
import { DisabledEditableRow } from './Editor'
import { useTroveView } from './context/TroveViewContext'
import { Icon } from '../Icon'
import { CollateralRatio } from './CollateralRatio'
import { CardBase } from '../Layout/CardBase'

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
            <Heading>Trove</Heading>
            <Box overflow='hidden'>
                <Box>
                    <DisabledEditableRow
                        label='Collateral'
                        inputID='trove-collateral'
                        amount={trove.collateral.prettify(4)}
                        unit='ETH'
                    />

                    <DisabledEditableRow
                        label='Debt'
                        inputID='trove-debt'
                        amount={trove.debt.prettify()}
                        unit={'LUSD'}
                    />

                    <CollateralRatio value={trove.collateralRatio(price)} />
                </Box>

                <Flex variant='layout.actions'>
                    <Button variant='outline' onClick={handleCloseTrove}>
                        Close Trove
                    </Button>
                    <Button onClick={handleAdjustTrove}>
                        <Icon name='pen' size='sm' />
                        &nbsp;Adjust
                    </Button>
                </Flex>
            </Box>
        </CardBase>
    )
}
