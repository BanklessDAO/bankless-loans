import React, { useState } from 'react'
import { Heading, Box, Button } from '@chakra-ui/react'

import {
    Decimal,
    Decimalish,
    StabilityDeposit,
    LiquityStoreState,
    Difference,
} from '@liquity/lib-base'

import { useLiquitySelector } from '../../hooks/useLiquitySelector'

import { COIN, GT } from '../../strings'

import { Icon } from '../Icon'
import { EditableRow, StaticRow } from '../Trove/Editor'
import { LoadingOverlay } from '../LoadingOverlay'
import { InfoIcon } from '../InfoIcon'

const select = ({ lusdBalance, lusdInStabilityPool }: LiquityStoreState) => ({
    lusdBalance,
    lusdInStabilityPool,
})

type StabilityDepositEditorProps = {
    originalDeposit: StabilityDeposit
    editedLUSD: Decimal
    changePending: boolean
    dispatch: (
        action:
            | { type: 'setDeposit'; newValue: Decimalish }
            | { type: 'revert' }
    ) => void
}

export const StabilityDepositEditor: React.FC<StabilityDepositEditorProps> = ({
    originalDeposit,
    editedLUSD,
    changePending,
    dispatch,
    children,
}) => {
    const { lusdBalance, lusdInStabilityPool } = useLiquitySelector(select)
    const editingState = useState<string>()

    const edited = !editedLUSD.eq(originalDeposit.currentLUSD)

    const maxAmount = originalDeposit.currentLUSD.add(lusdBalance)
    const maxedOut = editedLUSD.eq(maxAmount)

    const lusdInStabilityPoolAfterChange = lusdInStabilityPool
        .sub(originalDeposit.currentLUSD)
        .add(editedLUSD)

    const originalPoolShare = originalDeposit.currentLUSD.mulDiv(
        100,
        lusdInStabilityPool
    )
    const newPoolShare = editedLUSD.mulDiv(100, lusdInStabilityPoolAfterChange)
    const poolShareChange =
        originalDeposit.currentLUSD.nonZero &&
        Difference.between(newPoolShare, originalPoolShare).nonZero

    return (
        <Box maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden'>
            <Heading>
                Stability Pool
                {edited && !changePending && (
                    <Button
                        variant='titleIcon'
                        sx={{ ':enabled:hover': { color: 'danger' } }}
                        onClick={() => dispatch({ type: 'revert' })}
                    >
                        <Icon name='history' size='lg' />
                    </Button>
                )}
            </Heading>

            <Box sx={{ p: [2, 3] }}>
                <EditableRow
                    label='Deposit'
                    inputID='deposit-lqty'
                    amount={editedLUSD.prettify()}
                    maxAmount={maxAmount.toString()}
                    maxedOut={maxedOut}
                    unit={COIN}
                    {...{ editingState }}
                    editedAmount={editedLUSD.toString(2)}
                    setEditedAmount={newValue =>
                        dispatch({ type: 'setDeposit', newValue })
                    }
                />

                {newPoolShare.infinite ? (
                    <StaticRow
                        label='Pool share'
                        inputID='deposit-share'
                        amount='N/A'
                    />
                ) : (
                    <StaticRow
                        label='Pool share'
                        inputID='deposit-share'
                        amount={newPoolShare.prettify(4)}
                        pendingAmount={poolShareChange?.prettify(4).concat('%')}
                        pendingColor={
                            poolShareChange?.positive ? 'success' : 'danger'
                        }
                        unit='%'
                    />
                )}

                {!originalDeposit.isEmpty && (
                    <>
                        <StaticRow
                            label='Liquidation gain'
                            inputID='deposit-gain'
                            amount={originalDeposit.collateralGain.prettify(4)}
                            color={
                                originalDeposit.collateralGain.nonZero &&
                                'success'
                            }
                            unit='ETH'
                        />

                        <StaticRow
                            label='Reward'
                            inputID='deposit-reward'
                            amount={originalDeposit.lqtyReward.prettify()}
                            color={
                                originalDeposit.lqtyReward.nonZero && 'success'
                            }
                            unit={GT}
                            infoIcon={
                                <InfoIcon
                                    tooltip={
                                        <Box
                                            variant='tooltip'
                                            sx={{ width: '240px' }}
                                        >
                                            Although the LQTY rewards accrue
                                            every minute, the value on the UI
                                            only updates when a user transacts
                                            with the Stability Pool. Therefore
                                            you may receive more rewards than is
                                            displayed when you claim or adjust
                                            your deposit.
                                        </Box>
                                    }
                                />
                            }
                        />
                    </>
                )}
                {children}
            </Box>

            {changePending && <LoadingOverlay />}
        </Box>
    )
}
