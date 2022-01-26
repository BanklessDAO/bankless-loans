import React from 'react'
import { Flex } from '@chakra-ui/react'

export const Badge: React.FC = ({ children }) => {
    return (
        <Flex
            sx={{
                border: 0,
                borderRadius: 3,
                p: 1,
                px: 2,
                backgroundColor: 'muted',
                color: 'slate',
                fontSize: 1,
                fontWeight: 'body',
            }}
        >
            {children}
        </Flex>
    )
}
