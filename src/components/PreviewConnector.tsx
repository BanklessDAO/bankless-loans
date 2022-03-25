import React, { useEffect, useReducer, useState } from 'react'
import { useRouter } from 'next/router'
import { useWeb3React } from '@web3-react/core'
import { AbstractConnector } from '@web3-react/abstract-connector'
import { useWalletReducer } from '../hooks/useWalletReducer'
import { Button, Text, Flex, Link, Box } from '@chakra-ui/react'
import { useAuthorizedConnection } from '../hooks/useAuthorizedConnection'
import { RetryDialog } from './RetryDialog'
import { ConnectionConfirmationDialog } from './ConnectionConfirmationDialog'
import { Icon } from './Icon'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
} from '@chakra-ui/react'
import { TrovePreview } from './Trove/TrovePreview'
import { StabilityPreview } from './Stability/StabilityPreview'
import { StakingPreview } from './Staking/StakingPreview'
import { connectors } from '../connectors/connectors'

interface MaybeHasMetaMask {
    ethereum?: {
        isMetaMask?: boolean
    }
}

type PreviewConnectorProps = {
    loader?: React.ReactNode
}

export const PreviewConnector: React.FC<PreviewConnectorProps> = ({
    children,
    loader,
}) => {
    const { activate, deactivate, active, error } = useWeb3React<unknown>()
    const triedAuthorizedConnection = useAuthorizedConnection()
    const [connectionState, dispatch] = useReducer(useWalletReducer, {
        type: 'inactive',
    })
    const [isMetaMask, setIsMetaMask] = useState(false)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const router = useRouter()
    const trovePreview = router.pathname == '/' && <TrovePreview />
    const stabilityPreview = router.pathname == '/pool' && <StabilityPreview />
    const stakingPreview = router.pathname == '/stake' && <StakingPreview />

    useEffect(() => {
        const provider = window.localStorage.getItem('provider')
        if (provider) activate(connectors[provider as keyof object])
    }, [activate])

    useEffect(() => {
        const detectMetaMask = () =>
            (window as MaybeHasMetaMask).ethereum?.isMetaMask ?? false
        setIsMetaMask(detectMetaMask)
    }, [])

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

    if (connectionState.type === 'active') {
        return <>{children}</>
    }

    return (
        <>
            {console.log('router path', router.pathname)}
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
