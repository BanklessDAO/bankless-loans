import React from 'react'
import { Flex, Box, Heading } from '@chakra-ui/react'
import { WalletConnector } from '../WalletConnector'
import {
    EditableRow,
    StaticRow,
    StaticAmounts,
    Row,
    DisabledEditableRow,
} from '../Trove/Editor'

const editableStyle = {
    flexGrow: 1,
    marginBottom: 3,
    paddingLeft: 3,
    paddingRight: '11px',
    paddingTop: '28px',
    fontSize: '22px',
    boxShadow: [1, 2],
    border: 1,
    borderColor: 'muted',
}

export const StakingPreview = (): JSX.Element => {
    //will need to address hard-coded width for mobile
    return (
        <Flex
            w='555px'
            height='400px'
            alignItems='center'
            justifyContent='center'
        >
            <Box
                w='100%'
                h='100%'
                maxW='md'
                borderRadius='31px'
                overflow='hidden'
                padding={[10, 34, 34, 5]}
                bg='#131313'
                color='#FFFFFF'
            >
                <Heading>LQTY Staking</Heading>

                <DisabledEditableRow
                    label='Stake'
                    inputID='stake-lqty'
                    amount={'0.000'}
                    unit={'LQTY'}
                />

                <Box ml='10px' w='full' h='100px'>
                    <h3>Please connect your wallet to use our services</h3>
                    <br />
                    <WalletConnector />
                </Box>
            </Box>
        </Flex>
    )
}
