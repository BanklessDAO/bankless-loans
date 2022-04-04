import React, { useEffect, useState } from 'react'
import { Box, Text } from '@chakra-ui/react'
import { Decimal, LiquityStoreState } from '@liquity/lib-base'
import { useLiquitySelector } from '../../hooks/useLiquitySelector'
import { InfoIcon } from '../InfoIcon'
import { useLiquity } from '../../hooks/LiquityContext'
import { Badge } from '../Badge'
import { fetchLqtyPrice } from './context/fetchLqtyPrice'

const selector = ({
    lusdInStabilityPool,
    remainingStabilityPoolLQTYReward,
}: LiquityStoreState) => ({
    lusdInStabilityPool,
    remainingStabilityPoolLQTYReward,
})

export const Yield: React.FC = () => {
    const {
        liquity: {
            connection: { addresses },
        },
    } = useLiquity()
    const { lusdInStabilityPool, remainingStabilityPoolLQTYReward } =
        useLiquitySelector(selector)

    const [lqtyPrice, setLqtyPrice] = useState<Decimal | undefined>(undefined)
    const hasZeroValue =
        remainingStabilityPoolLQTYReward.isZero || lusdInStabilityPool.isZero
    const lqtyTokenAddress = addresses['lqtyToken']

    useEffect(() => {
        ;(async () => {
            try {
                const { lqtyPriceUSD } = await fetchLqtyPrice(lqtyTokenAddress)
                setLqtyPrice(lqtyPriceUSD)
            } catch (error) {
                console.error(error)
            }
        })()
    }, [lqtyTokenAddress])

    if (hasZeroValue || lqtyPrice === undefined) return null

    const yearlyHalvingSchedule = 0.5 // 50% see LQTY distribution schedule for more info
    const remainingLqtyOneYear = remainingStabilityPoolLQTYReward.mul(
        yearlyHalvingSchedule
    )
    const remainingLqtyOneYearInUSD = remainingLqtyOneYear.mul(lqtyPrice)
    const aprPercentage = remainingLqtyOneYearInUSD
        .div(lusdInStabilityPool)
        .mul(100)
    const remainingLqtyInUSD = remainingStabilityPoolLQTYReward.mul(lqtyPrice)

    if (aprPercentage.isZero) return null

    return (
        <Badge>
            <Text>LQTY APR {aprPercentage.toString(2)}%</Text>
            <InfoIcon
                tooltip={
                    <Box
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
                    >
                        <p>
                            An <Text sx={{ fontWeight: 'bold' }}>estimate</Text>{' '}
                            of the LQTY return on the LUSD deposited to the
                            Stability Pool over the next year, not including
                            your ETH gains from liquidations.
                        </p>
                        <p
                            style={{
                                fontSize: '12px',
                                fontFamily: 'monospace',
                                marginTop: 2,
                            }}
                        >
                            (($LQTY_REWARDS * YEARLY_DISTRIBUTION%) /
                            DEPOSITED_LUSD) * 100 ={' '}
                            <Text sx={{ fontWeight: 'bold' }}> APR</Text>
                        </p>
                        <p
                            style={{
                                fontSize: '12px',
                                fontFamily: 'monospace',
                            }}
                        >
                            ($
                            {remainingLqtyInUSD.shorten()} * 50% / $
                            {lusdInStabilityPool.shorten()}) * 100 =
                            <Text sx={{ fontWeight: 'bold' }}>
                                {' '}
                                {aprPercentage.toString(2)}%
                            </Text>
                        </p>
                    </Box>
                }
            ></InfoIcon>
        </Badge>
    )
}
