import React from 'react'
import { Container } from '@chakra-ui/react'

export const Modal: React.FC = ({ children }) => (
    <Container variant='modalOverlay'>
        <Container variant='modal'>{children}</Container>
    </Container>
)
