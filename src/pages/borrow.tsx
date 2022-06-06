import React from 'react'
import { Flex } from '@chakra-ui/react'
import { Wallet } from '@ethersproject/wallet'
import { Decimal, Difference, Trove } from '@liquity/lib-base'
import { LiquityStoreProvider } from '../components/LiquityStoreProvider'
import { useLiquity } from '../hooks/LiquityContext'
import { TransactionMonitor } from '../components/Transaction'
import { VStackBase } from '../components/Layout/VStackBase'
import { Trove as TroveEditor } from '../components/Trove/Trove'
import { TroveViewProvider } from '../components/Trove/context/TroveViewProvider'

type LiquityFrontendProps = {
    loader?: React.ReactNode
}
const Borrow = ({ loader }: LiquityFrontendProps): JSX.Element => {
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
            <TroveViewProvider>
                <Flex h='100%'>
                    <VStackBase maxH='auto'>
                        <TroveEditor />
                    </VStackBase>
                </Flex>
            </TroveViewProvider>
            <TransactionMonitor />
        </LiquityStoreProvider>
    )
}

export default Borrow
