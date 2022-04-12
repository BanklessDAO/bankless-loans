import React, { useCallback, useEffect, useState } from 'react'
import { Button, Box, Spinner, HStack } from '@chakra-ui/react'
import {
    LiquityStoreState,
    Decimal,
    Trove,
    LUSD_LIQUIDATION_RESERVE,
    LUSD_MINIMUM_NET_DEBT,
    Percent,
} from '@liquity/lib-base'
import { useLiquitySelector } from '../../hooks/useLiquitySelector'

import { useStableTroveChange } from '../../hooks/useStableTroveChange'
import { useMyTransactionState } from '../Transaction'
import { TroveAction } from './TroveAction'
import { useTroveView } from './context/TroveViewContext'
import { Icon } from '../Icon'
import { LoadingOverlay } from '../LoadingOverlay'
import { EditableRow, StaticRow } from './Editor'
import {
    ExpensiveTroveChangeWarning,
    GasEstimationState,
} from '../ExpensiveTroveChangeWarning'
import {
    selectForTroveChangeValidation,
    validateTroveChange,
} from './validation/validateTroveChange'
import { CardBase } from 'components/Layout/CardBase'
import { CollateralRatioV2 } from './CollateralRatioV2'
import { ActionDescription } from 'components/ActionDescription'
import { HeadingBase } from 'components/HeadingBase'

const selector = (state: LiquityStoreState) => {
    const { fees, price, accountBalance } = state
    return {
        fees,
        price,
        accountBalance,
        validationContext: selectForTroveChangeValidation(state),
    }
}

const EMPTY_TROVE = new Trove(Decimal.ZERO, Decimal.ZERO)
const TRANSACTION_ID = 'trove-creation'
const GAS_ROOM_ETH = Decimal.from(0.1)

export const Opening: React.FC = () => {
    const { dispatchEvent } = useTroveView()
    const { fees, price, accountBalance, validationContext } =
        useLiquitySelector(selector)
    const borrowingRate = fees.borrowingRate()
    const editingState = useState<string>()
    const [collateral, setCollateral] = useState<Decimal>(Decimal.ZERO)
    const [borrowAmount, setBorrowAmount] = useState<Decimal>(Decimal.ZERO)
    const maxBorrowingRate = borrowingRate.add(0.005)
    const fee = borrowAmount.mul(borrowingRate)
    const feePct = new Percent(borrowingRate)
    const totalDebt = borrowAmount.add(LUSD_LIQUIDATION_RESERVE).add(fee)
    const isDirty = !collateral.isZero || !borrowAmount.isZero
    const trove = isDirty ? new Trove(collateral, totalDebt) : EMPTY_TROVE
    const maxCollateral = accountBalance.gt(GAS_ROOM_ETH)
        ? accountBalance.sub(GAS_ROOM_ETH)
        : Decimal.ZERO
    const collateralMaxedOut = collateral.eq(maxCollateral)
    const collateralRatio =
        !collateral.isZero && !borrowAmount.isZero
            ? trove.collateralRatio(price)
            : undefined
    const [troveChange, description] = validateTroveChange(
        EMPTY_TROVE,
        trove,
        borrowingRate,
        validationContext
    )
    const stableTroveChange = useStableTroveChange(troveChange)
    const [gasEstimationState, setGasEstimationState] =
        useState<GasEstimationState>({ type: 'idle' })
    const transactionState = useMyTransactionState(TRANSACTION_ID)
    const isTransactionPending =
        transactionState.type === 'waitingForApproval' ||
        transactionState.type === 'waitingForConfirmation'
    const handleCancelPressed = useCallback(() => {
        dispatchEvent('CANCEL_ADJUST_TROVE_PRESSED')
    }, [dispatchEvent])
    const reset = useCallback(() => {
        setCollateral(Decimal.ZERO)
        setBorrowAmount(Decimal.ZERO)
    }, [])

    useEffect(() => {
        if (!collateral.isZero && borrowAmount.isZero) {
            setBorrowAmount(LUSD_MINIMUM_NET_DEBT)
        }
    }, [collateral, borrowAmount])
    //will need to address hard-coded width for mobile
    return (
        <CardBase>
            <HeadingBase>
                Trove
                {isDirty && !isTransactionPending && (
                    <Button
                        variant='titleIcon'
                        sx={{ ':enabled:hover': { color: 'danger' } }}
                        onClick={reset}
                    >
                        <Icon name='history' size='lg' />
                    </Button>
                )}
            </HeadingBase>

            <EditableRow
                label='Collateral'
                inputID='trove-collateral'
                amount={collateral.prettify(4)}
                maxAmount={maxCollateral.toString()}
                maxedOut={collateralMaxedOut}
                editingState={editingState}
                unit='ETH'
                editedAmount={collateral.toString(4)}
                setEditedAmount={(amount: string) =>
                    setCollateral(Decimal.from(amount))
                }
            />

            <EditableRow
                label='Borrow'
                inputID='trove-borrow-amount'
                amount={borrowAmount.prettify()}
                unit={'LUSD'}
                editingState={editingState}
                editedAmount={borrowAmount.toString(2)}
                setEditedAmount={(amount: string) =>
                    setBorrowAmount(Decimal.from(amount))
                }
            />
            <Box w='full' marginTop={4}>
                <StaticRow
                    label='Liquidation Reserve'
                    inputID='trove-liquidation-reserve'
                    amount={`${LUSD_LIQUIDATION_RESERVE}`}
                    unit={'LUSD'}
                    tooltipText='An amount set aside to cover the liquidator’s gas costs if your Trove needs to be liquidated. The amount increases your debt and is refunded if you close your Trove by fully paying off its net debt.'
                />

                <StaticRow
                    label='Borrowing Fee'
                    inputID='trove-borrowing-fee'
                    amount={fee.prettify(2)}
                    pendingAmount={feePct.toString(2)}
                    unit={'LUSD'}
                    tooltipText='This amount is deducted from the borrowed amount as a one-time fee. There are no recurring fees for borrowing, which is thus interest-free.'
                />

                <StaticRow
                    label='Total debt'
                    inputID='trove-total-debt'
                    amount={totalDebt.prettify(2)}
                    unit={'LUSD'}
                    tooltipText={`The total amount of LUSD your Trove will
                    hold. ${
                        isDirty ? (
                            <>
                                You will need to repay{' '}
                                {totalDebt
                                    .sub(LUSD_LIQUIDATION_RESERVE)
                                    .prettify(2)}{' '}
                                LUSD to reclaim your collateral (
                                {LUSD_LIQUIDATION_RESERVE.toString()} LUSD
                                Liquidation Reserve excluded).
                            </>
                        ) : (
                            ''
                        )
                    }`}
                />

                <CollateralRatioV2 value={collateralRatio} />

                {description ?? (
                    <ActionDescription>
                        Start by entering the amount of ETH you&apos;d like to
                        deposit as collateral.
                    </ActionDescription>
                )}

                <ExpensiveTroveChangeWarning
                    troveChange={stableTroveChange}
                    maxBorrowingRate={maxBorrowingRate}
                    borrowingFeeDecayToleranceMinutes={60}
                    gasEstimationState={gasEstimationState}
                    setGasEstimationState={setGasEstimationState}
                />

                <HStack>
                    <Button
                        variant='darkGrey'
                        onClick={handleCancelPressed}
                        margin='0px'
                    >
                        Cancel
                    </Button>

                    {gasEstimationState.type === 'inProgress' ? (
                        <Button variant='darkGrey' disabled>
                            <Spinner size='md' sx={{ color: 'background' }} />
                        </Button>
                    ) : stableTroveChange ? (
                        <TroveAction
                            transactionId={TRANSACTION_ID}
                            change={stableTroveChange}
                            maxBorrowingRate={maxBorrowingRate}
                            borrowingFeeDecayToleranceMinutes={60}
                        >
                            Confirm
                        </TroveAction>
                    ) : (
                        <Button disabled>Confirm</Button>
                    )}
                </HStack>
            </Box>
            {isTransactionPending && <LoadingOverlay />}
        </CardBase>
    )
}
