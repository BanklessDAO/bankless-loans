import React, { useCallback, useEffect } from 'react'
import { Box, Button, HStack } from '@chakra-ui/react'

import { LiquityStoreState } from '@liquity/lib-base'
import { useLiquitySelector } from '../../hooks/useLiquitySelector'

import { COIN, GT } from '../../strings'
import { Icon } from '../Icon'
import { LoadingOverlay } from '../LoadingOverlay'
import { useMyTransactionState } from '../Transaction'
import { StaticRowV2 } from '../Trove/Editor'
import { ClaimAndMove } from './actions/ClaimAndMove'
import { ClaimRewards } from './actions/ClaimRewards'
import { useStabilityView } from './context/StabilityViewContext'
import { CardBase } from 'components/Layout/CardBase'
import { HeadingBase } from 'components/HeadingBase'

const selector = ({
    stabilityDeposit,
    trove,
    lusdInStabilityPool,
}: LiquityStoreState) => ({
    stabilityDeposit,
    trove,
    lusdInStabilityPool,
})

export const ActiveDeposit: React.FC = () => {
    const { dispatchEvent } = useStabilityView()
    const { stabilityDeposit, trove, lusdInStabilityPool } =
        useLiquitySelector(selector)

    const poolShare = stabilityDeposit.currentLUSD.mulDiv(
        100,
        lusdInStabilityPool
    )

    const handleAdjustDeposit = useCallback(() => {
        dispatchEvent('ADJUST_DEPOSIT_PRESSED')
    }, [dispatchEvent])

    const hasReward = !stabilityDeposit.lqtyReward.isZero
    const hasGain = !stabilityDeposit.collateralGain.isZero
    const hasTrove = !trove.isEmpty

    const transactionId = 'stability-deposit'
    const transactionState = useMyTransactionState(transactionId)
    const isWaitingForTransaction =
        transactionState.type === 'waitingForApproval' ||
        transactionState.type === 'waitingForConfirmation'

    useEffect(() => {
        if (transactionState.type === 'confirmedOneShot') {
            dispatchEvent('REWARDS_CLAIMED')
        }
    }, [transactionState.type, dispatchEvent])

    return (
        <CardBase>
            <HeadingBase>Stability Pool</HeadingBase>
            <Box my={4}>
                <StaticRowV2
                    label='Deposit'
                    inputID='deposit-lusd'
                    amount={stabilityDeposit.currentLUSD.prettify()}
                    unit={COIN}
                />

                <StaticRowV2
                    label='Pool share'
                    inputID='deposit-share'
                    amount={poolShare.prettify(4)}
                    unit='%'
                />

                <StaticRowV2
                    label='Liquidation gain'
                    inputID='deposit-gain'
                    amount={stabilityDeposit.collateralGain.prettify(4)}
                    color={stabilityDeposit.collateralGain.nonZero && 'success'}
                    unit='ETH'
                />

                <StaticRowV2
                    label='Reward'
                    inputID='deposit-reward'
                    amount={stabilityDeposit.lqtyReward.prettify()}
                    color={stabilityDeposit.lqtyReward.nonZero && 'success'}
                    unit={GT}
                    tooltipText='Although the LQTY rewards accrue every minute, the value on the UI only updates when a user transacts with the Stability Pool. Therefore you may receive more rewards than is displayed when you claim or adjust your deposit.'
                />
            </Box>

            <HStack marginTop={8} marginBottom={4}>
                <Button
                    variant='darkGrey'
                    onClick={handleAdjustDeposit}
                    m={0}
                    marginRight={18}
                >
                    <Icon name='pen' size='sm' />
                    &nbsp;Adjust
                </Button>

                <ClaimRewards disabled={!hasGain && !hasReward}>
                    Claim ETH and LQTY
                </ClaimRewards>
            </HStack>

            {hasTrove && (
                <ClaimAndMove disabled={!hasGain}>
                    Claim LQTY and move ETH to Trove
                </ClaimAndMove>
            )}

            {isWaitingForTransaction && <LoadingOverlay />}
        </CardBase>
    )
}
