import React from 'react'
import { Text, Flex, Box, Heading } from '@chakra-ui/react'
import { LiquityStoreState } from '@liquity/lib-base'
import { useLiquitySelector } from '../hooks/useLiquitySelector'
import { useLiquity } from '../hooks/LiquityContext'
import { shortenAddress } from '../utils/shortenAddress'
import { Icon } from './Icon'

const select = ({
    accountBalance,
    lusdBalance,
    lqtyBalance,
}: LiquityStoreState) => ({
    accountBalance,
    lusdBalance,
    lqtyBalance,
})

export const UserAccount: React.FC = () => {
    const { account } = useLiquity()
    const { accountBalance, lusdBalance, lqtyBalance } =
        useLiquitySelector(select)

    return (
        <Box sx={{ display: ['flex', 'flex'] }}>
            <Flex sx={{ alignItems: 'center' }}>
                <Icon name='user-circle' size='lg' />
                <Flex sx={{ ml: 3, mr: 4, flexDirection: 'column' }}>
                    <Heading sx={{ fontSize: 1 }}>Connected as</Heading>
                    <Text as='span' sx={{ fontSize: 1 }}>
                        {shortenAddress(account)}
                    </Text>
                </Flex>
            </Flex>
            <Flex sx={{ alignItems: 'center' }}>
                <Icon name='wallet' size='lg' />

                {(
                    [
                        ['ETH', accountBalance],
                        ['LUSD', lusdBalance],
                        ['LQTY', lqtyBalance],
                    ] as const
                ).map(([currency, balance], i) => (
                    <Flex key={i} sx={{ ml: 3, flexDirection: 'column' }}>
                        <Heading sx={{ fontSize: 1 }}>{currency}</Heading>
                        <Text sx={{ fontSize: 1 }}>{balance.prettify()}</Text>
                    </Flex>
                ))}
            </Flex>
        </Box>
    )
}
