import React, { useCallback } from 'react'
import { Heading, Box, Flex, Button } from '@chakra-ui/react'
import { InfoMessage } from '../InfoMessage'
import { useTroveView } from './context/TroveViewContext'

export const NoTrove: React.FC = props => {
    const { dispatchEvent } = useTroveView()

    const handleOpenTrove = useCallback(() => {
        dispatchEvent('OPEN_TROVE_PRESSED')
    }, [dispatchEvent])

    return (
        <Flex
            w='555px'
            height='432px'
            alignItems='center'
            justifyContent='center'
        >
            <Box
                w='100%'
                h='100%'
                maxW='md'
                borderWidth={1}
                borderRadius='31px'
                overflow='hidden'
                bg='#131313'
                color='#FFFFFF'
            >
                <Heading>Trove</Heading>
                <Box sx={{ p: [2, 3] }}>
                    <InfoMessage title="You haven't borrowed any LUSD yet.">
                        You can borrow LUSD by opening a Trove.
                    </InfoMessage>

                    <Flex variant='layout.actions'>
                        <Button onClick={handleOpenTrove}>Open Trove</Button>
                    </Flex>
                </Box>
            </Box>
        </Flex>
    )
}
