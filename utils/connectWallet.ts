import {useWallet} from 'use-wallet'

export default function connectWallet() {

    const wallet = useWallet()
    console.log('this is from connect wallet', wallet)
}