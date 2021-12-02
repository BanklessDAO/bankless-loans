import React from 'react'
import { Container, Spinner } from '@chakra-ui/react'

export const LoadingOverlay: React.FC = () => (
    <Container
        variant='disabledOverlay'
        size='14px'
        style={{ display: 'flex', justifyContent: 'flex-end' }}
    >
        <Spinner size='lg' color='text' />
    </Container>
)
