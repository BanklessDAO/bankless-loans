import { Flex } from '@chakra-ui/react'
import { Wallet } from '@ethersproject/wallet'
import { Decimal, Difference, Trove } from '@liquity/lib-base'
import { useLiquity } from '../hooks/LiquityContext'
import { Stability } from '../components/Stability/Stability'
import { StabilityViewProvider } from '../components/Stability/context/StabilityViewProvider'
import { LiquityStoreProvider } from 'components/LiquityStoreProvider'
import { VStackBase } from 'components/Layout/VStackBase'
import { TransactionMonitor } from '../components/Transaction'

type LiquityFrontendProps = {
    loader?: React.ReactNode
}
const Pool = ({ loader }: LiquityFrontendProps): JSX.Element => {
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
            <StabilityViewProvider>
                <Flex h='100%'>
                    <VStackBase maxH='auto'>
                        <Stability />
                    </VStackBase>
                </Flex>
            </StabilityViewProvider>
            <TransactionMonitor />
        </LiquityStoreProvider>
    )
}

export default Pool
