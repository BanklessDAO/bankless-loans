import React from 'react'
import { Flex, Container } from '@chakra-ui/react'
import { Wallet } from '@ethersproject/wallet'

import { Decimal, Difference, Trove } from '@liquity/lib-base'
import { LiquityStoreProvider } from '../components/LiquityStoreProvider'

import { useLiquity } from '../hooks/LiquityContext'
import { TransactionMonitor } from '../components/Transaction'
import { SystemStatsPopup } from '../components/SystemStatsPopup'
import Dashboard from './Dashboard'

import { TroveViewProvider } from '../components/Trove/context/TroveViewProvider'

type LiquityFrontendProps = {
    loader?: React.ReactNode
}
const LiquityFrontend = ({ loader }: LiquityFrontendProps): JSX.Element => {
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
                <Flex sx={{ flexDirection: 'column', minHeight: '100%' }}>
                    <SystemStatsPopup />

                    <Container
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            width: '100vw',
                            maxWidth: '912px',
                        }}
                    >
                        <Dashboard />
                    </Container>
                </Flex>
            </TroveViewProvider>
            <TransactionMonitor />
        </LiquityStoreProvider>
    )
}

export default LiquityFrontend
