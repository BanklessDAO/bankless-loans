import React from 'react'
import { Button } from '@chakra-ui/react'

import { useLiquity } from '../../../hooks/LiquityContext'
import { useTransactionFunction } from '../../Transaction'

type ClaimRewardsProps = {
    disabled?: boolean
}

export const ClaimRewards: React.FC<ClaimRewardsProps> = ({
    disabled,
    children,
}) => {
    const { liquity } = useLiquity()

    const [sendTransaction] = useTransactionFunction(
        'stability-deposit',
        liquity.send.withdrawGainsFromStabilityPool.bind(liquity.send)
    )

    return (
        <Button
            variant='mainPurple'
            onClick={sendTransaction}
            disabled={disabled}
            m={0}
            fontSize={['14px', '18px', '18px']}
        >
            {children}
        </Button>
    )
}
