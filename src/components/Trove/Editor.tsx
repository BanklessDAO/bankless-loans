import React, { useState } from 'react'
import {
    FormLabel,
    Text,
    Flex,
    Input,
    Button,
    keyframes,
    HStack,
    Box,
} from '@chakra-ui/react'
import { InfoIcon } from '../InfoIcon'
import { Icon } from '../Icon'

type RowProps = {
    label: string
    labelId?: string
    labelFor?: string
    infoIcon?: React.ReactNode
    sx?: Record<string, unknown>
}

type PendingAmountProps = {
    value: string
    sx: Record<string, unknown>
}

type TooltipProps = {
    tooltipText: string
}

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
    tooltipText?: string
}

type StaticRowProps = RowProps & StaticAmountsProps

type DisabledEditableRowProps = Omit<
    StaticAmountsProps,
    'labelledBy' | 'onClick'
> & {
    label: string
    sx?: Record<string, unknown>
}

type EditableRowProps = DisabledEditableRowProps & {
    editingState: [string | undefined, (editing: string | undefined) => void]
    editedAmount: string
    setEditedAmount: (editedAmount: string) => void
    maxAmount?: string
    maxedOut?: boolean
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

export const Row: React.FC<RowProps> = ({
    sx,
    label,
    labelId,
    labelFor,
    children,
    infoIcon,
}) => {
    return (
        <Flex sx={{ alignItems: 'stretch', ...sx }} position='relative'>
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
                    zIndex: 1000,
                }}
            >
                <Flex sx={{ alignItems: 'center', justifyContent: 'center' }}>
                    {label}
                    {infoIcon && infoIcon}
                </Flex>
            </FormLabel>
            {children}
        </Flex>
    )
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
            <Flex
                sx={{ alignItems: 'center', justifyContent: 'space-between' }}
            >
                <Text sx={{ color, fontWeight: 'medium', minWidth: '97px' }}>
                    {amount}
                </Text>
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
    paddingLeft: 3,
    paddingRight: '11px',
    paddingTop: '28px',
    fontSize: '18px',
    border: 1,
    borderColor: 'muted',
    borderRadius: '10px',
}

const editableStyle = {
    flexGrow: 1,
    marginBottom: 3,
    paddingLeft: 3,
    paddingRight: 3,
    paddingTop: 6,
    fontSize: '22px',
    boxShadow: [1, 2],
    border: 1,
    borderColor: 'muted',
}

const graytransition = keyframes`
  to {background: #242424;}
  from {background: #2F2F2F;}
`

const Tooltip: React.FC<TooltipProps> = ({ tooltipText }) => {
    return (
        <InfoIcon
            tooltip={
                <Box
                    w='300px'
                    backgroundColor='#222222'
                    p={4}
                    borderRadius='4px'
                >
                    <p>{tooltipText}</p>
                </Box>
            }
        />
    )
}

export const StaticRow: React.FC<StaticRowProps> = ({
    label,
    labelId,
    labelFor,
    amount,
    unit,
    pendingAmount,
    pendingColor,
    tooltipText,
}) => (
    <HStack
        justifyContent='space-between'
        alignItems='center'
        marginBottom='16px'
    >
        <FormLabel
            id={labelId}
            htmlFor={labelFor}
            fontSize={14}
            color='#CCCCCC'
            fontFamily='Space Grotesk'
            margin={0}
        >
            <Flex alignItems='center' justifyContent='center' w='100%'>
                {label}
                {tooltipText && <Tooltip tooltipText={tooltipText} />}
            </Flex>
        </FormLabel>
        <HStack>
            <Text fontWeight='bold' fontSize={18}>
                {amount}
            </Text>
            {unit && (
                <Text fontWeight='light' fontSize={18} opacity={1}>
                    {unit}
                </Text>
            )}
            {pendingAmount && (
                <PendingAmount
                    sx={{
                        color: pendingColor,
                        opacity: 0.8,
                        fontSize: '18px',
                    }}
                    value={pendingAmount}
                />
            )}
        </HStack>
    </HStack>
)

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
        <Row
            {...{ label, labelFor: inputID, unit }}
            sx={{
                bg: invalid ? 'salmon' : 'interactive.gray.24',
                borderRadius: '10px',
                marginBottom: 3,
                height: '69px',
                position: 'relative',
                animation: `${graytransition} forwards 250ms ease-out`,
            }}
        >
            <Input
                size='md'
                autoFocus
                id={inputID}
                type='number'
                defaultValue={editedAmount}
                inputMode='decimal'
                autoComplete='off'
                autoCorrect='off'
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
                    marginTop: '12px',
                    bg: 'transparent',
                }}
            />
        </Row>
    ) : (
        <Row labelId={`${inputID}-label`} {...{ label, unit }}>
            <StaticAmounts
                sx={{
                    ...editableStyle,
                    position: 'relative',
                    bg: invalid ? 'salmon' : 'interactive.gray.2F',
                    height: '69px',
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
                        variant='max'
                        onClick={event => {
                            setEditedAmount(maxAmount)
                            event.stopPropagation()
                        }}
                        disabled={maxedOut}
                    >
                        <Text>max</Text>
                    </Button>
                )}
            </StaticAmounts>
        </Row>
    )
}
