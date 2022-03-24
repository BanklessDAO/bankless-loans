import { Flex, Grid, Box, VStack } from '@chakra-ui/react'
import { Wallet } from '@ethersproject/wallet'
import { Decimal, Difference, Trove } from '@liquity/lib-base'
import { useLiquity } from '../hooks/LiquityContext'
import { Staking } from '../components/Staking/Staking'
import { StakingViewProvider } from '../components/Staking/context/StakingViewProvider'
import { LiquityStoreProvider } from 'components/LiquityStoreProvider'
import { VStackBase } from 'components/Layout/VStackBase'

type LiquityFrontendProps = {
    loader?: React.ReactNode
}
const Stake = ({ loader }: LiquityFrontendProps): JSX.Element => {
    const { account, provider, liquity } = useLiquity()

    // For console tinkering ;-)
    Object.assign(window, {
        account,
        provider,
        liquity,
        Trove,
        Decimal,
        Difference,
        Wallet,
    })

    return (
        <LiquityStoreProvider {...{ loader }} store={liquity.store}>
            <StakingViewProvider>
                <VStackBase>
                    <Staking />
                </VStackBase>
            </StakingViewProvider>
        </LiquityStoreProvider>
    )
}

export default Stake
