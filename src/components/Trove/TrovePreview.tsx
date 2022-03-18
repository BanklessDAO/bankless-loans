import React, { useCallback, useEffect, useState } from 'react'
import { Flex, Button, Box, Heading } from '@chakra-ui/react'

import {
    EditableRow,
    StaticRow,
    StaticAmounts,
    Row,
    DisabledEditableRow,
} from './Editor'

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

export const TrovePreview: React.FC = () => {
    //will need to address hard-coded width for mobile
    return (
        <Flex
            w='555px'
            height='622px'
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
                <Heading>Trove</Heading>

                <DisabledEditableRow
                    label='Stake'
                    inputID='stake-lqty'
                    amount={'0.000'}
                    unit={'ETH'}
                />

                <DisabledEditableRow
                    label='Stake'
                    inputID='stake-lqty'
                    amount={'0.000'}
                    unit={'LUSD'}
                />

                <Box w='full'>
                    <StaticAmounts
                        inputID='static-trove'
                        amount='0.000'
                        sx={{
                            ...editableStyle,
                            fontSize: '22px',
                            bg: 'background',
                            height: '70px',
                        }}
                    />

                    <Flex variant='layout.actions'>
                        <Button disabled>Connect Wallet</Button>
                    </Flex>
                </Box>
            </Box>
        </Flex>
    )
}
