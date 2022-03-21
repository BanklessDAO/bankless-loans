import { Container, VStack } from '@chakra-ui/react'
import Navbar from './Navbar'
import NavbarMobile from '../NavbarMobile'

type LayoutProps = {
    children?: React.ReactNode
}

export const Layout = ({ children }: LayoutProps): JSX.Element => {
    return (
        <Container maxW='container.xl' p={0}>
            <VStack align='center' as='main' position='relative' height='100vh'>
                <Navbar />
                {children}
                <NavbarMobile />
            </VStack>
        </Container>
    )
}
