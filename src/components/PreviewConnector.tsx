import React, { useEffect, useReducer } from 'react'
import { useRouter } from 'next/router'
import { useWeb3React } from '@web3-react/core'
import { useWalletReducer } from '../hooks/useWalletReducer'
import { Flex } from '@chakra-ui/react'
import { useAuthorizedConnection } from '../hooks/useAuthorizedConnection'
import { TrovePreview } from './Trove/TrovePreview'
import { StabilityPreview } from './Stability/StabilityPreview'
import { StakingPreview } from './Staking/StakingPreview'
import Landing from '../pages/landing'

type PreviewConnectorProps = {
    loader?: React.ReactNode
}

export const PreviewConnector: React.FC<PreviewConnectorProps> = ({
    children,
    loader,
}) => {
    const { deactivate, active, error } = useWeb3React<unknown>()
    const triedAuthorizedConnection = useAuthorizedConnection()
    const [connectionState, dispatch] = useReducer(useWalletReducer, {
        type: 'inactive',
    })
    const router = useRouter()
    const trovePreview = router.pathname === '/borrow' && <TrovePreview />
    const stabilityPreview = router.pathname === '/pool' && <StabilityPreview />
    const stakingPreview = router.pathname === '/stake' && <StakingPreview />

    useEffect(() => {
        if (error) {
            dispatch({ type: 'fail', error })
            deactivate()
        }
    }, [error, deactivate])

    useEffect(() => {
        if (active) {
            dispatch({ type: 'finishActivating' })
        } else {
            dispatch({ type: 'deactivate' })
        }
    }, [active])

    if (!triedAuthorizedConnection) {
        return <>{loader}</>
    }

    if (connectionState.type === 'active' || router.pathname === '/') {
        return <>{children}</>
    }

    return (
        <>
            <Flex
                sx={{
                    height: '100vh',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                {trovePreview}
                {stabilityPreview}
                {stakingPreview}
            </Flex>
        </>
    )
}
