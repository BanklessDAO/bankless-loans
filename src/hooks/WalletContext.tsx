import React, { Dispatch } from 'react'
import { ConnectionState, ConnectionAction } from './useWalletReducer'

interface WalletContextProps {
    connectionState: ConnectionState
    dispatch: Dispatch<ConnectionAction>
}

const WalletContext = React.createContext({} as WalletContextProps)

export function useWalletContext() {
    return React.useContext(WalletContext)
}

export default WalletContext
