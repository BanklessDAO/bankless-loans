import React, { useState } from 'react'
import { Flex, Heading, Box, Button } from '@chakra-ui/react'
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
import { EditableRow, StaticRow } from '../Trove/Editor'
import { LoadingOverlay } from '../LoadingOverlay'
import { useStakingView } from './context/StakingViewContext'

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
        <Flex
            w='555px'
            height='622px'
            alignItems='center'
            justifyContent='center'
        >
            <Box
                w='100%'
                h='100%'
                maxW='md'
                borderRadius='31px'
                overflow='hidden'
                padding={[10, 34, 34, 5]}
                bg='#131313'
                color='#FFFFFF'
            >
                <Heading>
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
                </Heading>
                <Box sx={{ p: [2, 3] }}>
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
                    {newPoolShare.infinite ? (
                        <StaticRow
                            label='Pool share'
                            inputID='stake-share'
                            amount='N/A'
                        />
                    ) : (
                        <StaticRow
                            label='Pool share'
                            inputID='stake-share'
                            amount={newPoolShare.prettify(4)}
                            pendingAmount={poolShareChange
                                ?.prettify(4)
                                .concat('%')}
                            pendingColor={
                                poolShareChange?.positive ? 'success' : 'danger'
                            }
                            unit='%'
                        />
                    )}
                    {!originalStake.isEmpty && (
                        <>
                            <StaticRow
                                label='Redemption gain'
                                inputID='stake-gain-eth'
                                amount={originalStake.collateralGain.prettify(
                                    4
                                )}
                                color={
                                    originalStake.collateralGain.nonZero &&
                                    'success'
                                }
                                unit='ETH'
                            />

                            <StaticRow
                                label='Issuance gain'
                                inputID='stake-gain-lusd'
                                amount={originalStake.lusdGain.prettify()}
                                color={
                                    originalStake.lusdGain.nonZero && 'success'
                                }
                                unit={COIN}
                            />
                        </>
                    )}
                    {children}
                </Box>
                {changePending && <LoadingOverlay />}
            </Box>
        </Flex>
    )
}
