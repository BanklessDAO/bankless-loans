import React, { useCallback } from 'react'
import { Heading, Box, Flex, Button } from '@chakra-ui/react'
import { InfoMessage } from '../InfoMessage'
import { useTroveView } from './context/TroveViewContext'
import { CardBase } from 'components/Layout/CardBase'

export const NoTrove: React.FC = props => {
    const { dispatchEvent } = useTroveView()

    const handleOpenTrove = useCallback(() => {
        dispatchEvent('OPEN_TROVE_PRESSED')
    }, [dispatchEvent])

    return (
        <CardBase>
            <Heading>Trove</Heading>
            <Box sx={{ p: [2, 3] }}>
                <InfoMessage title="You haven't borrowed any LUSD yet.">
                    You can borrow LUSD by opening a Trove.
                </InfoMessage>

                <Flex variant='layout.actions'>
                    <Button variant='mainPurple' onClick={handleOpenTrove}>
                        Open Trove
                    </Button>
                </Flex>
            </Box>
        </CardBase>
    )
}
