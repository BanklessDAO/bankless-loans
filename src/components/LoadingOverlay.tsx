import React, { useEffect, useState } from 'react'
import { Container, Spinner, Text, Badge } from '@chakra-ui/react'
import { useTransactionState } from './Transaction'

type LoadingBadgeProps = {
    type: string
}

const LoadingBadge = ({ type }: LoadingBadgeProps) => {
    switch (type) {
        case 'waitingForApproval':
        case 'waitingForConfirmation':
            return (
                <Badge ml='16px' colorScheme='purple'>
                    Waiting
                </Badge>
            )
        case 'failed':
            return (
                <Badge ml='16px' colorScheme='red'>
                    Failed
                </Badge>
            )
        case 'cancelled':
            return (
                <Badge ml='16px' colorScheme='orange'>
                    Cancelled
                </Badge>
            )
        default:
            return (
                <Badge ml='16px' colorScheme='teal'>
                    Confirmed
                </Badge>
            )
    }
}

type LoadingFeedbackProps = {
    type: string
}

const LoadingFeedback = ({ type }: LoadingFeedbackProps) => {
    const [localType, setLocalType] = useState<null | string>(null)
    function parseType(type: string) {
        // Message usually arrives as camelCase eg waitingForApproval
        const messageWithSpaces = type.replace(/([a-z](?=[A-Z]))/g, '$1 ')
        const messageCapitalised =
            messageWithSpaces.charAt(0).toUpperCase() +
            messageWithSpaces.slice(1)
        const oddCases = ['cancelled', 'failed']

        return oddCases.includes(type)
            ? `Transaction ${messageCapitalised}!`
            : messageCapitalised
    }
    useEffect(() => {
        if (type) {
            setLocalType(type)
        }
    }, [type])
    return (
        <Container
            variant='disabledOverlay'
            p={0}
            mt='32px'
            size='16px'
            style={{
                display: 'flex',
                justifyContent: 'start',
                alignItems: 'center',
            }}
        >
            {localType && localType !== 'idle' && (
                <>
                    <Spinner size='lg' color='text' />
                    <LoadingBadge type={localType} />
                    <Text ml='16px' px={0}>
                        {parseType(localType)}
                    </Text>
                </>
            )}
        </Container>
    )
}

export const LoadingOverlay: React.FC = () => {
    const [transactionState] = useTransactionState()
    console.log('transaction St :', transactionState)
    return <LoadingFeedback type={transactionState.type} />
}
