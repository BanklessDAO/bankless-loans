import React from 'react'
import { Button } from '@chakra-ui/react'
import { useLiquity } from '../../../hooks/LiquityContext'
import { useTransactionFunction } from '../../Transaction'

type ClaimAndMoveProps = {
    disabled?: boolean
}

export const ClaimAndMove: React.FC<ClaimAndMoveProps> = ({
    disabled,
    children,
}) => {
    const { liquity } = useLiquity()

    const [sendTransaction] = useTransactionFunction(
        'stability-deposit',
        liquity.send.transferCollateralGainToTrove.bind(liquity.send)
    )

    if (disabled) {
        return (
            <Button variant='darkPurple' disabled m={0} w='100%'>
                {children}
            </Button>
        )
    }

    return (
        <Button
            variant='mainPurple'
            sx={{ mt: 3, width: '100%' }}
            onClick={sendTransaction}
            disabled={disabled}
            m={0}
            w='100%'
        >
            {children}
        </Button>
    )
}
