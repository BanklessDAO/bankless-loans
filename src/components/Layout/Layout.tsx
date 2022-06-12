import { Container, VStack, useBreakpointValue } from '@chakra-ui/react'
import Navbar from './Navbar'
import NavbarMobile from '../NavbarMobile'
import { useRouter } from 'next/router'
import { Footer } from '../../components/Layout/Footer'

type LayoutProps = {
    children?: React.ReactNode
}

const gradient = `radial-gradient(circle at left, rgba(109, 41, 254, 0.3) 0%,
    rgba(109, 41, 254, 0) 30%), radial-gradient(circle at right,
    rgba(255, 4, 16, 0.24) 0%, rgba(255, 4, 16, 0) 30%), #000000`

const gradientAndImage = `radial-gradient(circle at left, rgba(109, 41, 254, 0.3) 0%,
    rgba(109, 41, 254, 0) 30%), radial-gradient(circle at right,
    rgba(255, 4, 16, 0.24) 0%, rgba(255, 4, 16, 0) 30%),
    center top url(/futuristic-background.png), #000000`

export const Layout = ({ children }: LayoutProps): JSX.Element => {
    const router = useRouter()
    const footer = router.pathname === '/' && <Footer />
    const bg = router.pathname === '/' ? gradientAndImage : gradient
    const isMobile = useBreakpointValue({ base: true, md: false })
    const justify =
        router.pathname === '/' || isMobile ? 'space-between' : 'flex-start'
    return (
        <VStack
            bg={bg}
            maxW='full'
            p={0}
            minH='100vh'
            justify={justify}
            align='center'
            as='main'
            position='relative'
        >
            <Navbar />
            {children}
            {footer}
            <NavbarMobile />
        </VStack>
    )
}
