import React, { useEffect, useReducer, useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import { AbstractConnector } from '@web3-react/abstract-connector'
import { injectedConnector } from '../connectors/injectedConnector'

interface MaybeHasMetaMask {
    ethereum?: {
        isMetaMask?: boolean
    }
}

type ConnectionState =
    | { type: 'inactive' }
    | {
          type:
              | 'activating'
              | 'active'
              | 'rejectedByUser'
              | 'alreadyPending'
              | 'failed'
          connector: AbstractConnector
      }

type ConnectionAction =
    | { type: 'startActivating'; connector: AbstractConnector }
    | { type: 'fail'; error: Error }
    | { type: 'finishActivating' | 'retry' | 'cancel' | 'deactivate' }

export const walletReducer: React.Reducer<ConnectionState, ConnectionAction> = (
    state,
    action
) => {
    switch (action.type) {
        case 'startActivating':
            return {
                type: 'activating',
                connector: action.connector,
            }
        case 'finishActivating':
            return {
                type: 'active',
                connector:
                    state.type === 'inactive'
                        ? injectedConnector
                        : state.connector,
            }
        case 'fail':
            if (state.type !== 'inactive') {
                return {
                    type: action.error.message.match(/user rejected/i)
                        ? 'rejectedByUser'
                        : action.error.message.match(/already pending/i)
                        ? 'alreadyPending'
                        : 'failed',
                    connector: state.connector,
                }
            }
            break
        case 'retry':
            if (state.type !== 'inactive') {
                return {
                    type: 'activating',
                    connector: state.connector,
                }
            }
            break
        case 'cancel':
            return {
                type: 'inactive',
            }
        case 'deactivate':
            return {
                type: 'inactive',
            }
    }

    console.warn('Ignoring connectionReducer action:')
    console.log(action)
    console.log('  in state:')
    console.log(state)

    return state
}
