import React from 'react'
import { Container, Heading, Box } from '@chakra-ui/react'

import {
    Percent,
    Difference,
    Decimalish,
    Decimal,
    Trove,
    LiquityStoreState,
    LUSD_LIQUIDATION_RESERVE,
} from '@liquity/lib-base'
import { useLiquitySelector } from '../../hooks/useLiquitySelector'

import { StaticRow } from './Editor'
import { LoadingOverlay } from '../LoadingOverlay'
import { CollateralRatio } from './CollateralRatio'
import { InfoIcon } from '../InfoIcon'
import { CardBase } from '../Layout/CardBase'
import { CollateralRatioV2 } from './CollateralRatioV2'

type TroveEditorProps = {
    original: Trove
    edited: Trove
    fee: Decimal
    borrowingRate: Decimal
    changePending: boolean
    dispatch: (
        action:
            | { type: 'setCollateral' | 'setDebt'; newValue: Decimalish }
            | { type: 'revert' }
    ) => void
}

const select = ({ price }: LiquityStoreState) => ({ price })

export const TroveEditor: React.FC<TroveEditorProps> = ({
    children,
    original,
    edited,
    fee,
    borrowingRate,
    changePending,
}) => {
    const { price } = useLiquitySelector(select)

    const feePct = new Percent(borrowingRate)

    const originalCollateralRatio = !original.isEmpty
        ? original.collateralRatio(price)
        : undefined
    const collateralRatio = !edited.isEmpty
        ? edited.collateralRatio(price)
        : undefined
    const collateralRatioChange = Difference.between(
        collateralRatio,
        originalCollateralRatio
    )

    return (
        <CardBase>
            <Heading marginBottom={18}>Trove</Heading>

            <Box>
                <StaticRow
                    label='Collateral'
                    inputID='trove-collateral'
                    amount={edited.collateral.prettify(4)}
                    unit='ETH'
                />

                <StaticRow
                    label='Debt'
                    inputID='trove-debt'
                    amount={edited.debt.prettify()}
                    unit={'LUSD'}
                />

                {original.isEmpty && (
                    <StaticRow
                        label='Liquidation Reserve'
                        inputID='trove-liquidation-reserve'
                        amount={`${LUSD_LIQUIDATION_RESERVE}`}
                        unit={'LUSD'}
                        tooltipText='An amount set aside to cover the liquidator’s gas costs if your Trove needs to be liquidated. The amount increases your debt and is refunded if you close your Trove by fully paying off its net debt.'
                    />
                )}

                <StaticRow
                    label='Borrowing Fee'
                    inputID='trove-borrowing-fee'
                    amount={fee.toString(2)}
                    pendingAmount={feePct.toString(2)}
                    unit={'LUSD'}
                    tooltipText='This amount is deducted from the borrowed amount as a one-time fee. There are no recurring fees for borrowing, which is thus interest-free.'
                />

                <CollateralRatioV2
                    value={collateralRatio}
                    change={collateralRatioChange}
                />

                {children}
            </Box>

            {changePending && <LoadingOverlay />}
        </CardBase>
    )
}
