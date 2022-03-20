import { Grid, Box, Flex } from '@chakra-ui/react'
import { Wallet } from '@ethersproject/wallet'
import { Decimal, Difference, Trove } from '@liquity/lib-base'
import { useLiquity } from '../hooks/LiquityContext'
import { Stability } from '../components/Stability/Stability'
import { StabilityViewProvider } from '../components/Stability/context/StabilityViewProvider'
import { LiquityStoreProvider } from 'components/LiquityStoreProvider'

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
                <Grid display='flex' justifyContent='center' bg='#363636'>
                    <Flex
                        sx={{
                            flexDirection: 'column',
                            minHeight: '100%',
                            height: '100vh',
                        }}
                    >
                        <Stability />
                    </Flex>
                </Grid>
            </StabilityViewProvider>
        </LiquityStoreProvider>
    )
}

export default Pool