import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useWeb3Context } from 'web3-react'
import React from 'react'

export default function Home() {

  // const web3Context = useWeb3Context()

  React.useEffect(() => {
    // web3Context.setFirstValidConnector(['MetaMask', 'Infura'])
  }, [])

  // if (!web3Context.active && !web3Context.error) {
  //   console.log("something's wrong with web3Context")
  //   return(
  //     <p>Web3Context is broken</p>
  //   )
  // } else if (web3Context.error) {
  //   console.log('web3Context error')
  //   return(
  //     <p>Web3Context error</p>
  //   )
  // } else{
  //   console.log('web3Context', web3Context.account)
  //   return(
  //     <p>Web3Context works {web3Context.account}</p>
  //   )
  // }

  return (
    <div className={styles.container}>
    </div>
  )
}
