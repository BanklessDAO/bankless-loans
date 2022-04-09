import React from 'react'

import {
    CRITICAL_COLLATERAL_RATIO,
    Decimal,
    Difference,
    Percent,
} from '@liquity/lib-base'

import { StaticRowV2 } from './Editor'
import { ActionDescription } from '../ActionDescription'

type CollateralRatioProps = {
    value?: Decimal
    change?: Difference
}

export const CollateralRatioV2: React.FC<CollateralRatioProps> = ({
    value,
    change,
}) => {
    const collateralRatioPct = new Percent(value ?? { toString: () => 'N/A' })
    const changePct = change && new Percent(change)
    return (
        <>
            <StaticRowV2
                label='Collateral ratio'
                inputID='trove-collateral-ratio'
                amount={collateralRatioPct.prettify()}
                color={
                    value?.gt(CRITICAL_COLLATERAL_RATIO)
                        ? 'success'
                        : value?.gt(1.2)
                        ? 'warning'
                        : value?.lte(1.2)
                        ? 'danger'
                        : 'muted'
                }
                pendingAmount={
                    change?.positive?.absoluteValue?.gt(10)
                        ? '++'
                        : change?.negative?.absoluteValue?.gt(10)
                        ? '--'
                        : changePct?.nonZeroish(2)?.prettify()
                }
                pendingColor={change?.positive ? 'success' : 'danger'}
                tooltipText='The ratio between the dollar value of the collateral and the debt (in LUSD) you are depositing. While the Minimum Collateral Ratio is 110% during normal operation, it is recommended to keep the Collateral Ratio always above 150% to avoid liquidation under Recovery Mode. A Collateral Ratio above 200% or 250% is recommended for additional safety.'
            />
            {value?.lt(1.5) && (
                <ActionDescription>
                    Keeping your CR above 150% can help avoid liquidation under
                    Recovery Mode.
                </ActionDescription>
            )}
        </>
    )
}
