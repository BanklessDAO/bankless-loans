import React, { useState } from 'react'
import { Box, Button } from '@chakra-ui/react'
import {
    Decimal,
    Decimalish,
    Difference,
    LiquityStoreState,
    LQTYStake,
} from '@liquity/lib-base'
import { useLiquitySelector } from '../../hooks/useLiquitySelector'
import { COIN, GT } from '../../strings'
import { Icon } from '../Icon'
import { EditableRow, StaticRowV2 } from '../Trove/Editor'
import { LoadingOverlay } from '../LoadingOverlay'
import { CardBase } from '../Layout/CardBase'
import { useStakingView } from './context/StakingViewContext'
import { HeadingBase } from 'components/HeadingBase'

const select = ({ lqtyBalance, totalStakedLQTY }: LiquityStoreState) => ({
    lqtyBalance,
    totalStakedLQTY,
})

type StakingEditorProps = {
    title: string
    originalStake: LQTYStake
    editedLQTY: Decimal
    dispatch: (
        action: { type: 'setStake'; newValue: Decimalish } | { type: 'revert' }
    ) => void
}

export const StakingEditor: React.FC<StakingEditorProps> = ({
    children,
    title,
    originalStake,
    editedLQTY,
    dispatch,
}) => {
    const { lqtyBalance, totalStakedLQTY } = useLiquitySelector(select)
    const { changePending } = useStakingView()
    const editingState = useState<string>()
    const edited = !editedLQTY.eq(originalStake.stakedLQTY)
    const maxAmount = originalStake.stakedLQTY.add(lqtyBalance)
    const maxedOut = editedLQTY.eq(maxAmount)
    const totalStakedLQTYAfterChange = totalStakedLQTY
        .sub(originalStake.stakedLQTY)
        .add(editedLQTY)
    const originalPoolShare = originalStake.stakedLQTY.mulDiv(
        100,
        totalStakedLQTY
    )
    const newPoolShare = editedLQTY.mulDiv(100, totalStakedLQTYAfterChange)
    const poolShareChange =
        originalStake.stakedLQTY.nonZero &&
        Difference.between(newPoolShare, originalPoolShare).nonZero

    return (
        <CardBase>
            <HeadingBase>
                {title}
                {edited && !changePending && (
                    <Button
                        variant='titleIcon'
                        sx={{ ':enabled:hover': { color: 'danger' } }}
                        onClick={() => dispatch({ type: 'revert' })}
                    >
                        <Icon name='history' size='lg' />
                    </Button>
                )}
            </HeadingBase>
            <EditableRow
                label='Stake'
                inputID='stake-lqty'
                amount={editedLQTY.prettify()}
                maxAmount={maxAmount.toString()}
                maxedOut={maxedOut}
                unit={GT}
                {...{ editingState }}
                editedAmount={editedLQTY.toString(2)}
                setEditedAmount={newValue =>
                    dispatch({ type: 'setStake', newValue })
                }
            />
            <Box py={4}>
                {newPoolShare.infinite ? (
                    <StaticRowV2
                        label='Pool share'
                        inputID='stake-share'
                        amount='N/A'
                    />
                ) : (
                    <StaticRowV2
                        label='Pool share'
                        inputID='stake-share'
                        amount={newPoolShare.prettify(4)}
                        pendingAmount={poolShareChange?.prettify(4).concat('%')}
                        pendingColor={
                            poolShareChange?.positive ? 'success' : 'danger'
                        }
                        unit='%'
                    />
                )}
                {!originalStake.isEmpty && (
                    <>
                        <StaticRowV2
                            label='Redemption gain'
                            inputID='stake-gain-eth'
                            amount={originalStake.collateralGain.prettify(4)}
                            color={
                                originalStake.collateralGain.nonZero &&
                                'success'
                            }
                            unit='ETH'
                        />

                        <StaticRowV2
                            label='Issuance gain'
                            inputID='stake-gain-lusd'
                            amount={originalStake.lusdGain.prettify()}
                            color={originalStake.lusdGain.nonZero && 'success'}
                            unit={COIN}
                        />
                    </>
                )}
            </Box>
            {children}
            {changePending && <LoadingOverlay />}
        </CardBase>
    )
}
