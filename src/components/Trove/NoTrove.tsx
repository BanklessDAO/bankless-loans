import React, { useCallback } from 'react'
import { Box, Button, HStack } from '@chakra-ui/react'
import { useTroveView } from './context/TroveViewContext'
import { CardBase } from 'components/Layout/CardBase'
import { ActionDescriptionV2 } from 'components/ActionDescriptionV2'
import { HeadingBase } from 'components/HeadingBase'

export const NoTrove: React.FC = props => {
    const { dispatchEvent } = useTroveView()

    const handleOpenTrove = useCallback(() => {
        dispatchEvent('OPEN_TROVE_PRESSED')
    }, [dispatchEvent])

    return (
        <CardBase>
            <HeadingBase>Trove</HeadingBase>
            <Box>
                <ActionDescriptionV2>
                    {`You haven't borrowed any LUSD yet. You can borrow LUSD by opening a Trove.`}
                </ActionDescriptionV2>
                <HStack>
                    <Button
                        variant='mainPurple'
                        onClick={handleOpenTrove}
                        margin='0'
                    >
                        Open Trove
                    </Button>
                </HStack>
            </Box>
        </CardBase>
    )
}
