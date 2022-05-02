import React from 'react'
import { Container, Spinner } from '@chakra-ui/react'

export const LoadingOverlay: React.FC = () => (
    <Container
        variant='disabledOverlay'
        mt='32px'
        size='16px'
        style={{ display: 'flex', justifyContent: 'center' }}
    >
        <Spinner size='lg' color='text' />
    </Container>
)
