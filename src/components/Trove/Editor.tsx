import React, { useState } from 'react'
import { FormLabel, Text, Flex, Input, Button } from '@chakra-ui/react'

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
            <FormLabel
                id={labelId}
                htmlFor={labelFor}
                sx={{
                    p: 0,
                    pl: 3,
                    pt: '12px',
                    position: 'absolute',

                    fontSize: '14px',
                    border: 1,
                    borderColor: 'transparent',
                }}
            >
                <Flex sx={{ alignItems: 'center' }}>
                    {label}
                    {infoIcon && infoIcon}
                </Flex>
            </FormLabel>
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
                                fontSize: '22px',
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
    marginBottom: 0,
    paddingLeft: 3,
    paddingRight: '11px',
    paddingBottom: 0,
    paddingTop: '28px',
    fontSize: '22px',
    border: 1,
    borderColor: 'transparent',
}

const editableStyle = {
    flexGrow: 1,
    marginBottom: [2, 3],
    paddingLeft: 3,
    paddingRight: '11px',
    paddingBottom: 2,
    paddingTop: '28px',
    fontSize: '22px',
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
        sx={{ marginTop: [-2, -3], paddingBottom: [2, 3] }}
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
                size='md'
                fontSize='22px'
                autoFocus
                id={inputID}
                type='number'
                step='any'
                defaultValue={editedAmount}
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
                    fontSize: '22px',
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
                }}
            >
                {maxAmount && (
                    <Button
                        sx={{
                            fontSize: '22px',
                            padding: 1,
                            paddingX: 3,
                            height: '40px',
                        }}
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
