import { Container, VStack } from '@chakra-ui/react'
import Navbar from './Navbar'
import NavbarMobile from '../NavbarMobile'
import { useRouter } from 'next/router'
import { Footer } from '../../components/Layout/Footer'

type LayoutProps = {
    children?: React.ReactNode
}

export const Layout = ({ children }: LayoutProps): JSX.Element => {
    const router = useRouter()
    const footer = router.pathname === '/' && <Footer />
    return (
        <Container maxW='container.xl' p={0}>
            <VStack align='center' as='main' position='relative' height='100vh'>
                <Navbar />
                {children}
                {footer}
                <NavbarMobile />
            </VStack>
        </Container>
    )
}
