import { useState, useEffect, useReducer } from 'react'
import { useWeb3React } from '@web3-react/core'
import { useWalletReducer } from './useWalletReducer'
import { injectedConnector } from '../connectors/injectedConnector'

interface MaybeHasMetaMask {
    ethereum?: {
        isMetaMask?: boolean
    }
}

export function useWalletConnection(): Record<string, unknown> {
    const { activate, active, error, deactivate } = useWeb3React<unknown>()
    const [tried, setTried] = useState(false)
    const [connectionState, dispatch] = useReducer(useWalletReducer, {
        type: 'inactive',
    })
    const [isMetaMask, setIsMetaMask] = useState(false)

    useEffect(() => {
        const detectMetaMask = () =>
            (window as MaybeHasMetaMask).ethereum?.isMetaMask ?? false
        setIsMetaMask(detectMetaMask)
    }, [])

    useEffect(() => {
        const tryToActivateIfAuthorized = async () => {
            try {
                if (await injectedConnector.isAuthorized()) {
                    await activate(injectedConnector, undefined, true)
                } else {
                    throw new Error('Unauthorized')
                }
            } catch {
                setTried(true)
            }
        }
        tryToActivateIfAuthorized()
    }, [activate])

    useEffect(() => {
        if (active) {
            setTried(true)
        }
    }, [active])

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

    return connectionState
}
