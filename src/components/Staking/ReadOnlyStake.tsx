import { Heading, Box, Flex, Button, HStack } from '@chakra-ui/react'
import { LiquityStoreState } from '@liquity/lib-base'
import { useLiquitySelector } from '../../hooks/useLiquitySelector'
import { COIN, GT } from '../../strings'
import { DisabledEditableRow, StaticRow, StaticRowV2 } from '../Trove/Editor'
import { LoadingOverlay } from '../LoadingOverlay'
import { Icon } from '../Icon'
import { useStakingView } from './context/StakingViewContext'
import { StakingGainsAction } from './StakingGainsAction'
import { CardBase } from 'components/Layout/CardBase'
import { HeadingBase } from 'components/HeadingBase'

const select = ({ lqtyStake, totalStakedLQTY }: LiquityStoreState) => ({
    lqtyStake,
    totalStakedLQTY,
})

export const ReadOnlyStake: React.FC = () => {
    const { changePending, dispatch } = useStakingView()
    const { lqtyStake, totalStakedLQTY } = useLiquitySelector(select)
    const poolShare = lqtyStake.stakedLQTY.mulDiv(100, totalStakedLQTY)

    return (
        <CardBase>
            <HeadingBase>Staking</HeadingBase>

            <StaticRowV2
                label='Stake'
                inputID='stake-lqty'
                amount={lqtyStake.stakedLQTY.prettify()}
                unit={GT}
            />

            <StaticRowV2
                label='Pool share'
                inputID='stake-share'
                amount={poolShare.prettify(4)}
                unit='%'
            />

            <StaticRowV2
                label='Redemption gain'
                inputID='stake-gain-eth'
                amount={lqtyStake.collateralGain.prettify(4)}
                color={lqtyStake.collateralGain.nonZero && 'success'}
                unit='ETH'
            />

            <StaticRowV2
                label='Issuance gain'
                inputID='stake-gain-lusd'
                amount={lqtyStake.lusdGain.prettify()}
                color={lqtyStake.lusdGain.nonZero && 'success'}
                unit={COIN}
            />

            <HStack marginTop={6}>
                <Button
                    variant='darkGrey'
                    onClick={() => dispatch({ type: 'startAdjusting' })}
                    m={0}
                >
                    <HStack>
                        <Icon name='pen' size='sm' />
                        <p>Adjust</p>
                    </HStack>
                </Button>

                <StakingGainsAction />
            </HStack>

            {changePending && <LoadingOverlay />}
        </CardBase>
    )
}
