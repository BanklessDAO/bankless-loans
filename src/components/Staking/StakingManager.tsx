import React from 'react'
import { Button, HStack } from '@chakra-ui/react'

import {
    Decimal,
    Decimalish,
    LiquityStoreState,
    LQTYStake,
    LQTYStakeChange,
} from '@liquity/lib-base'

import { LiquityStoreUpdate } from '../../hooks/useLiquityReducer'
import { useLiquitySelector } from '../../hooks/useLiquitySelector'
import { useLiquityReducer } from '../../hooks/useLiquityReducer'

import { GT, COIN } from '../../strings'

import { useStakingView } from './context/StakingViewContext'
import { StakingEditor } from './StakingEditor'
import { StakingManagerAction } from './StakingManagerAction'
import { ActionDescriptionV2, Amount } from '../ActionDescriptionV2'
import { ErrorDescription } from '../ErrorDescription'

const init = ({ lqtyStake }: LiquityStoreState) => ({
    originalStake: lqtyStake,
    editedLQTY: lqtyStake.stakedLQTY,
})

type StakeManagerState = ReturnType<typeof init>
type StakeManagerAction =
    | LiquityStoreUpdate
    | { type: 'revert' }
    | { type: 'setStake'; newValue: Decimalish }

const reduce = (
    state: StakeManagerState,
    action: StakeManagerAction
): StakeManagerState => {
    const { originalStake, editedLQTY } = state

    switch (action.type) {
        case 'setStake':
            return { ...state, editedLQTY: Decimal.from(action.newValue) }

        case 'revert':
            return { ...state, editedLQTY: originalStake.stakedLQTY }

        case 'updateStore': {
            const {
                stateChange: { lqtyStake: updatedStake },
            } = action

            if (updatedStake) {
                return {
                    originalStake: updatedStake,
                    editedLQTY: updatedStake.apply(
                        originalStake.whatChanged(editedLQTY)
                    ),
                }
            }
        }
    }
    return state
}

const selectLQTYBalance = ({ lqtyBalance }: LiquityStoreState) => lqtyBalance

type StakingManagerActionDescriptionProps = {
    originalStake: LQTYStake
    change: LQTYStakeChange<Decimal>
}

const StakingManagerActionDescription: React.FC<
    StakingManagerActionDescriptionProps
> = ({ originalStake, change }) => {
    const stakeLQTY = change.stakeLQTY?.prettify().concat(' ', GT)
    const unstakeLQTY = change.unstakeLQTY?.prettify().concat(' ', GT)
    const collateralGain = originalStake.collateralGain.nonZero
        ?.prettify(4)
        .concat(' ETH')
    const lusdGain = originalStake.lusdGain.nonZero
        ?.prettify()
        .concat(' ', COIN)

    if (originalStake.isEmpty && stakeLQTY) {
        return (
            <ActionDescriptionV2>
                You are staking <Amount>{stakeLQTY}</Amount>.
            </ActionDescriptionV2>
        )
    }

    return (
        <ActionDescriptionV2>
            {stakeLQTY && (
                <>
                    You are adding <Amount>{stakeLQTY}</Amount> to your stake
                </>
            )}
            {unstakeLQTY && (
                <>
                    You are withdrawing <Amount>{unstakeLQTY}</Amount> to your
                    wallet
                </>
            )}
            {(collateralGain || lusdGain) && (
                <>
                    {' '}
                    and claiming{' '}
                    {collateralGain && lusdGain ? (
                        <>
                            <Amount>{collateralGain}</Amount> and{' '}
                            <Amount>{lusdGain}</Amount>
                        </>
                    ) : (
                        <>
                            <Amount>{collateralGain ?? lusdGain}</Amount>
                        </>
                    )}
                </>
            )}
            .
        </ActionDescriptionV2>
    )
}

export const StakingManager: React.FC = () => {
    const { dispatch: dispatchStakingViewAction } = useStakingView()
    const [{ originalStake, editedLQTY }, dispatch] = useLiquityReducer(
        reduce,
        init
    )
    const lqtyBalance = useLiquitySelector(selectLQTYBalance)
    const change = originalStake.whatChanged(editedLQTY)
    const [validChange, description] = !change
        ? [undefined, undefined]
        : change.stakeLQTY?.gt(lqtyBalance)
        ? [
              undefined,
              <ErrorDescription>
                  The amount you are trying to stake exceeds your balance by{' '}
                  <Amount>
                      {change.stakeLQTY.sub(lqtyBalance).prettify()} {GT}
                  </Amount>
                  .
              </ErrorDescription>,
          ]
        : [
              change,
              <StakingManagerActionDescription
                  originalStake={originalStake}
                  change={change}
              />,
          ]

    const makingNewStake = originalStake.isEmpty
    return (
        <StakingEditor
            title={'Staking'}
            {...{ originalStake, editedLQTY, dispatch }}
        >
            {description ??
                (makingNewStake ? (
                    <ActionDescriptionV2>
                        Enter the amount of {GT} you would like to stake.
                    </ActionDescriptionV2>
                ) : (
                    <ActionDescriptionV2>
                        Adjust the {GT} amount to stake or withdraw.
                    </ActionDescriptionV2>
                ))}

            <HStack>
                <Button
                    variant='darkGrey'
                    onClick={() =>
                        dispatchStakingViewAction({ type: 'cancelAdjusting' })
                    }
                    m={0}
                >
                    Cancel
                </Button>
                {validChange ? (
                    <StakingManagerAction change={validChange}>
                        Confirm
                    </StakingManagerAction>
                ) : (
                    <Button variant='darkPurple' disabled>
                        Confirm
                    </Button>
                )}
            </HStack>
        </StakingEditor>
    )
}
