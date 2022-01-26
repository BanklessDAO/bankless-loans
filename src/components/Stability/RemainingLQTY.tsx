import React from 'react'
import { Flex } from '@chakra-ui/react'

import { LiquityStoreState } from '@liquity/lib-base'
import { useLiquitySelector } from '../../hooks/useLiquitySelector'

const selector = ({ remainingStabilityPoolLQTYReward }: LiquityStoreState) => ({
    remainingStabilityPoolLQTYReward,
})

export const RemainingLQTY: React.FC = () => {
    const { remainingStabilityPoolLQTYReward } = useLiquitySelector(selector)

    return (
        <Flex sx={{ mr: 2, fontSize: 2, fontWeight: 'medium' }}>
            {remainingStabilityPoolLQTYReward.prettify(0)} LQTY remaining
        </Flex>
    )
}
