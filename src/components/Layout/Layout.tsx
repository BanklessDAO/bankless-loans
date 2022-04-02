import { Container, VStack } from '@chakra-ui/react'
import Navbar from './Navbar'
import NavbarMobile from '../NavbarMobile'
import { useRouter } from 'next/router'

type LayoutProps = {
    children?: React.ReactNode
}

export const Layout = ({ children }: LayoutProps): JSX.Element => {
    const { pathname: page } = useRouter()
    const allowedRoutes = ['/']

    // useEffect(() => {
    //     if (allowedRoutes.includes(page))
    //         document.body.className += ' background-red'
    //     else if (!allowedRoutes.includes(page) && hasClass('landing-background')) {
    //         document.body.classList.remove('landing-background');
    //         document.body.classList.add('background');
    //     }
    // });

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
