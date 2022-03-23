import React, { useCallback, useEffect } from 'react'
import { Heading, Box, Flex, Button } from '@chakra-ui/react'

import { LiquityStoreState } from '@liquity/lib-base'
import { useLiquitySelector } from '../../hooks/useLiquitySelector'

import { COIN, GT } from '../../strings'
import { Icon } from '../Icon'
import { LoadingOverlay } from '../LoadingOverlay'
import { useMyTransactionState } from '../Transaction'
import { DisabledEditableRow, StaticRow } from '../Trove/Editor'
import { ClaimAndMove } from './actions/ClaimAndMove'
import { ClaimRewards } from './actions/ClaimRewards'
import { useStabilityView } from './context/StabilityViewContext'
import { RemainingLQTY } from './RemainingLQTY'
import { Yield } from './Yield'
import { InfoIcon } from '../InfoIcon'
import { CardBase } from 'components/Layout/CardBase'

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
            <Heading>
                Stability Pool
                {!isWaitingForTransaction && (
                    <Flex sx={{ justifyContent: 'flex-end' }}>
                        <RemainingLQTY />
                    </Flex>
                )}
            </Heading>
            <Box sx={{ p: [2, 3] }}>
                <Box>
                    <DisabledEditableRow
                        label='Deposit'
                        inputID='deposit-lusd'
                        amount={stabilityDeposit.currentLUSD.prettify()}
                        unit={COIN}
                    />

                    <StaticRow
                        label='Pool share'
                        inputID='deposit-share'
                        amount={poolShare.prettify(4)}
                        unit='%'
                    />

                    <StaticRow
                        label='Liquidation gain'
                        inputID='deposit-gain'
                        amount={stabilityDeposit.collateralGain.prettify(4)}
                        color={
                            stabilityDeposit.collateralGain.nonZero && 'success'
                        }
                        unit='ETH'
                    />

                    <Flex sx={{ alignItems: 'center' }}>
                        <StaticRow
                            label='Reward'
                            inputID='deposit-reward'
                            amount={stabilityDeposit.lqtyReward.prettify()}
                            color={
                                stabilityDeposit.lqtyReward.nonZero && 'success'
                            }
                            unit={GT}
                            infoIcon={
                                <InfoIcon
                                    tooltip={
                                        <Box
                                            sx={{
                                                padding: '10px',
                                                bg: '#a7a7e3',
                                                fontSize: '1em',
                                                color: '#333',
                                                minW: '12.5vw',
                                                height: 'auto',
                                                maxW: '33vm',
                                                fontStyle: 'italic',
                                            }}
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
                        <Flex sx={{ justifyContent: 'flex-end', flex: 1 }}>
                            <Yield />
                        </Flex>
                    </Flex>
                </Box>

                <Flex>
                    <Button variant='outline' onClick={handleAdjustDeposit}>
                        <Icon name='pen' size='sm' />
                        &nbsp;Adjust
                    </Button>

                    <ClaimRewards disabled={!hasGain && !hasReward}>
                        Claim ETH and LQTY
                    </ClaimRewards>
                </Flex>

                {hasTrove && (
                    <ClaimAndMove disabled={!hasGain}>
                        Claim LQTY and move ETH to Trove
                    </ClaimAndMove>
                )}
            </Box>

            {isWaitingForTransaction && <LoadingOverlay />}
        </CardBase>
    )
}
