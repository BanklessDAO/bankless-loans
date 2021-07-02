import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import {useWallet } from 'use-wallet'
import React from 'react'

export default function Home() {

  // const web3Context = useWeb3Context()

  React.useEffect(() => {
    // web3Context.setFirstValidConnector(['MetaMask', 'Infura'])
  }, [])


  const wallet = useWallet()
  console.log('wallet', wallet.account, wallet.balance)
  return (
    <div className={styles.container}>
    </div>
  )
}
