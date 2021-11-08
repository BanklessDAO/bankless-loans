import React, { useState } from 'react'
import { Container, Text, Flex, Input, Button } from '@chakra-ui/react'

import { Icon } from '../Icon'

type RowProps = {
    label: string
    labelId?: string
    labelFor?: string
    infoIcon?: React.ReactNode
    sx?: Record<string, unknown>
}

export const Row: React.FC<RowProps> = ({
    sx,
    label,
    labelId,
    labelFor,
    children,
    infoIcon,
}) => {
    return (
        <Flex sx={{ alignItems: 'stretch', ...sx }}>
            <Container
                id={labelId}
                htmlFor={labelFor}
                sx={{
                    p: 0,
                    pl: 3,
                    pt: '12px',
                    position: 'absolute',

                    fontSize: 1,
                    border: 1,
                    borderColor: 'transparent',
                }}
            >
                <Flex sx={{ alignItems: 'center' }}>
                    {label}
                    {infoIcon && infoIcon}
                </Flex>
            </Container>
            {children}
        </Flex>
    )
}

type PendingAmountProps = {
    value: string
    sx: Record<string, unknown>
}

const PendingAmount: React.FC<PendingAmountProps> = ({ sx, value }) => (
    <Text {...{ sx }}>
        (
        {value === '++' ? (
            <Icon name='angle-double-up' />
        ) : value === '--' ? (
            <Icon name='angle-double-down' />
        ) : value?.startsWith('+') ? (
            <>
                <Icon name='angle-up' /> {value.substr(1)}
            </>
        ) : value?.startsWith('-') ? (
            <>
                <Icon name='angle-down' /> {value.substr(1)}
            </>
        ) : (
            value
        )}
        )
    </Text>
)

type StaticAmountsProps = {
    inputID: string
    labelledBy?: string
    amount: string
    unit?: string
    color?: string
    pendingAmount?: string
    pendingColor?: string
    onClick?: () => void
    sx?: Record<string, unknown>
}

export const StaticAmounts: React.FC<StaticAmountsProps> = ({
    sx,
    inputID,
    labelledBy,
    amount,
    unit,
    color,
    pendingAmount,
    pendingColor,
    onClick,
    children,
}) => {
    return (
        <Flex
            id={inputID}
            aria-labelledby={labelledBy}
            {...{ onClick }}
            sx={{
                justifyContent: 'space-between',
                alignItems: 'center',

                ...(onClick ? { cursor: 'text' } : {}),

                ...staticStyle,
                ...sx,
            }}
        >
            <Flex sx={{ alignItems: 'center' }}>
                <Text sx={{ color, fontWeight: 'medium' }}>{amount}</Text>

                {unit && (
                    <>
                        &nbsp;
                        <Text sx={{ fontWeight: 'light', opacity: 0.8 }}>
                            {unit}
                        </Text>
                    </>
                )}

                {pendingAmount && (
                    <>
                        &nbsp;
                        <PendingAmount
                            sx={{
                                color: pendingColor,
                                opacity: 0.8,
                                fontSize: '0.666em',
                            }}
                            value={pendingAmount}
                        />
                    </>
                )}
            </Flex>

            {children}
        </Flex>
    )
}

const staticStyle = {
    flexGrow: 1,

    mb: 0,
    pl: 3,
    pr: '11px',
    pb: 0,
    pt: '28px',

    fontSize: 3,

    border: 1,
    borderColor: 'transparent',
}

const editableStyle = {
    flexGrow: 1,

    mb: [2, 3],
    pl: 3,
    pr: '11px',
    pb: 2,
    pt: '28px',

    fontSize: 4,

    boxShadow: [1, 2],
    border: 1,
    borderColor: 'muted',
}

type StaticRowProps = RowProps & StaticAmountsProps

export const StaticRow: React.FC<StaticRowProps> = ({
    label,
    labelId,
    labelFor,
    infoIcon,
    ...props
}) => (
    <Row
        {...{ label, labelId, labelFor, infoIcon }}
        sx={{ mt: [-2, -3], pb: [2, 3] }}
    >
        <StaticAmounts {...props} />
    </Row>
)

type DisabledEditableRowProps = Omit<
    StaticAmountsProps,
    'labelledBy' | 'onClick'
> & {
    label: string
    sx?: Record<string, unknown>
}

export const DisabledEditableRow: React.FC<DisabledEditableRowProps> = ({
    inputID,
    label,
    unit,
    amount,
    color,
    pendingAmount,
    pendingColor,
}) => (
    <Row labelId={`${inputID}-label`} {...{ label, unit }}>
        <StaticAmounts
            sx={{ ...editableStyle, boxShadow: 0 }}
            labelledBy={`${inputID}-label`}
            {...{ inputID, amount, unit, color, pendingAmount, pendingColor }}
        />
    </Row>
)

type EditableRowProps = DisabledEditableRowProps & {
    editingState: [string | undefined, (editing: string | undefined) => void]
    editedAmount: string
    setEditedAmount: (editedAmount: string) => void
    maxAmount?: string
    maxedOut?: boolean
}

export const EditableRow: React.FC<EditableRowProps> = ({
    label,
    inputID,
    unit,
    amount,
    color,
    pendingAmount,
    pendingColor,
    editingState,
    editedAmount,
    setEditedAmount,
    maxAmount,
    maxedOut,
}) => {
    const [editing, setEditing] = editingState
    const [invalid, setInvalid] = useState(false)

    return editing === inputID ? (
        <Row {...{ label, labelFor: inputID, unit }}>
            <Input
                autoFocus
                id={inputID}
                type='number'
                step='any'
                defaultValue={editedAmount}
                {...{ invalid }}
                onChange={e => {
                    try {
                        setEditedAmount(e.target.value)
                        setInvalid(false)
                    } catch {
                        setInvalid(true)
                    }
                }}
                onBlur={() => {
                    setEditing(undefined)
                    setInvalid(false)
                }}
                variant='editor'
                sx={{
                    ...editableStyle,
                    fontWeight: 'medium',
                    bg: invalid ? 'invalid' : 'background',
                }}
            />
        </Row>
    ) : (
        <Row labelId={`${inputID}-label`} {...{ label, unit }}>
            <StaticAmounts
                sx={{
                    ...editableStyle,
                    bg: invalid ? 'invalid' : 'background',
                }}
                labelledBy={`${inputID}-label`}
                onClick={() => setEditing(inputID)}
                {...{
                    inputID,
                    amount,
                    unit,
                    color,
                    pendingAmount,
                    pendingColor,
                    invalid,
                }}
            >
                {maxAmount && (
                    <Button
                        sx={{ fontSize: 1, p: 1, px: 3 }}
                        onClick={event => {
                            setEditedAmount(maxAmount)
                            event.stopPropagation()
                        }}
                        disabled={maxedOut}
                    >
                        max
                    </Button>
                )}
            </StaticAmounts>
        </Row>
    )
}
