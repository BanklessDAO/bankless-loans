import React, { useCallback, useEffect, useState } from 'react'
import { Flex, Button, Box, Heading, Spinner } from '@chakra-ui/react'
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
import { ActionDescription } from '../ActionDescription'
import { useMyTransactionState } from '../Transaction'
import { TroveAction } from './TroveAction'
import { useTroveView } from './context/TroveViewContext'
import { Icon } from '../Icon'
import { InfoIcon } from '../InfoIcon'
import { LoadingOverlay } from '../LoadingOverlay'
import { CollateralRatio } from './CollateralRatio'
import { EditableRow, StaticRow } from './Editor'
import {
    ExpensiveTroveChangeWarning,
    GasEstimationState,
} from '../ExpensiveTroveChangeWarning'
import {
    selectForTroveChangeValidation,
    validateTroveChange,
} from './validation/validateTroveChange'

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
                </Heading>

                <Box w='full' sx={{ p: [2, 3] }}>
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

                    <StaticRow
                        label='Liquidation Reserve'
                        inputID='trove-liquidation-reserve'
                        amount={`${LUSD_LIQUIDATION_RESERVE}`}
                        unit={'LUSD'}
                        infoIcon={
                            <InfoIcon
                                tooltip={
                                    <Box
                                        borderWidth='1px'
                                        borderRadius='md'
                                        borderColor='#aaa'
                                        overflow='hidden'
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
                                        md={{}}
                                        lg={{}}
                                    >
                                        An amount set aside to cover the
                                        liquidator’s gas costs if your Trove
                                        needs to be liquidated. The amount
                                        increases your debt and is refunded if
                                        you close your Trove by fully paying off
                                        its net debt.
                                    </Box>
                                }
                            />
                        }
                    />

                    <StaticRow
                        label='Borrowing Fee'
                        inputID='trove-borrowing-fee'
                        amount={fee.prettify(2)}
                        pendingAmount={feePct.toString(2)}
                        unit={'LUSD'}
                        infoIcon={
                            <InfoIcon
                                tooltip={
                                    <Box
                                        borderWidth='1px'
                                        borderRadius='md'
                                        borderColor='#aaa'
                                        overflow='hidden'
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
                                        md={{}}
                                        lg={{}}
                                    >
                                        This amount is deducted from the
                                        borrowed amount as a one-time fee. There
                                        are no recurring fees for borrowing,
                                        which is thus interest-free.
                                    </Box>
                                }
                            />
                        }
                    />

                    <StaticRow
                        label='Total debt'
                        inputID='trove-total-debt'
                        amount={totalDebt.prettify(2)}
                        unit={'LUSD'}
                        infoIcon={
                            <InfoIcon
                                placement='right'
                                tooltip={
                                    <Box
                                        borderWidth='1px'
                                        borderRadius='md'
                                        borderColor='#aaa'
                                        overflow='hidden'
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
                                        md={{}}
                                        lg={{}}
                                    >
                                        The total amount of LUSD your Trove will
                                        hold.{' '}
                                        {isDirty && (
                                            <>
                                                You will need to repay{' '}
                                                {totalDebt
                                                    .sub(
                                                        LUSD_LIQUIDATION_RESERVE
                                                    )
                                                    .prettify(2)}{' '}
                                                LUSD to reclaim your collateral
                                                (
                                                {LUSD_LIQUIDATION_RESERVE.toString()}{' '}
                                                LUSD Liquidation Reserve
                                                excluded).
                                            </>
                                        )}
                                    </Box>
                                }
                            />
                        }
                    />

                    <CollateralRatio value={collateralRatio} />

                    {description ?? (
                        <ActionDescription>
                            Start by entering the amount of ETH you&apos;d like
                            to deposit as collateral.
                        </ActionDescription>
                    )}

                    <ExpensiveTroveChangeWarning
                        troveChange={stableTroveChange}
                        maxBorrowingRate={maxBorrowingRate}
                        borrowingFeeDecayToleranceMinutes={60}
                        gasEstimationState={gasEstimationState}
                        setGasEstimationState={setGasEstimationState}
                    />

                    <Flex variant='layout.actions'>
                        <Button variant='cancel' onClick={handleCancelPressed}>
                            Cancel
                        </Button>

                        {gasEstimationState.type === 'inProgress' ? (
                            <Button disabled>
                                <Spinner
                                    size='md'
                                    sx={{ color: 'background' }}
                                />
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
                    </Flex>
                </Box>
                {isTransactionPending && <LoadingOverlay />}
            </Box>
        </Flex>
    )
}
