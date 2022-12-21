import React, { useEffect, useState } from 'react'
import { Box, Text } from '@chakra-ui/react'
import { Decimal, LiquityStoreState } from '@liquity/lib-base'
import { useLiquitySelector } from '../../hooks/useLiquitySelector'
import { InfoIcon } from '../InfoIcon'
import { Badge } from '../Badge'
import { fetchLqtyPrice } from './context/fetchLqtyPrice'

const selector = ({
    lusdInStabilityPool,
    remainingStabilityPoolLQTYReward,
}: LiquityStoreState) => ({
    lusdInStabilityPool,
    remainingStabilityPoolLQTYReward,
})

const yearlyIssuanceFraction = 0.5
const dailyIssuanceFraction = Decimal.from(
    1 - yearlyIssuanceFraction ** (1 / 365)
)
const dailyIssuancePercentage = dailyIssuanceFraction.mul(100)

export const Yield: React.FC = () => {
    const { lusdInStabilityPool, remainingStabilityPoolLQTYReward } =
        useLiquitySelector(selector)

    const [lqtyPrice, setLqtyPrice] = useState<Decimal | undefined>(undefined)
    const hasZeroValue =
        remainingStabilityPoolLQTYReward.isZero || lusdInStabilityPool.isZero

    useEffect(() => {
        ;(async () => {
            try {
                const { lqtyPriceUSD } = await fetchLqtyPrice()
                setLqtyPrice(lqtyPriceUSD)
            } catch (error) {
                console.error(error)
            }
        })()
    }, [])

    if (hasZeroValue || lqtyPrice === undefined) return null

    const lqtyIssuanceOneDay = remainingStabilityPoolLQTYReward.mul(
        dailyIssuanceFraction
    )
    const lqtyIssuanceOneDayInUSD = lqtyIssuanceOneDay.mul(lqtyPrice)
    const aprPercentage = lqtyIssuanceOneDayInUSD.mulDiv(
        365 * 100,
        lusdInStabilityPool
    )
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
                            (($LQTY_REWARDS * DAILY_ISSUANCE%) / DEPOSITED_LUSD)
                            * 365 * 100 ={' '}
                            <Text sx={{ fontWeight: 'bold' }}> APR</Text>
                        </p>
                        <p
                            style={{
                                fontSize: '12px',
                                fontFamily: 'monospace',
                            }}
                        >
                            ($
                            {remainingLqtyInUSD.shorten()} *{' '}
                            {dailyIssuancePercentage.toString(4)}% / $
                            {lusdInStabilityPool.shorten()}) * 365 * 100 =
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
