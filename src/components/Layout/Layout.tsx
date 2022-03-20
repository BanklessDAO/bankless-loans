import { Container, VStack } from '@chakra-ui/react'
import Navbar from './Navbar'

export default function Layout({ children }: JSX.ElementChildrenAttribute) {
    return (
        <Container maxW='container.xl'>
            <VStack align='center'>
                <Navbar />
                {children}
            </VStack>
        </Container>
    )
}
