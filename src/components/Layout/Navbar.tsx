import React from 'react'
import styled from '@emotion/styled'
import Logo from 'components/Logo'
import NavbarLinks from 'components/NavbarLinks'
import NavbarWallet from 'components/NavbarWallet'
import NavbarTheme from 'components/NavbarTheme'

const StyledNav = styled.nav`
    height: 130px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 5vw;
    & > * {
        flex: 0 0 auto;
    }
`

const StyledSection = styled.section`
    display: flex;
    align-items: center;
`

export default function Navbar() {
    return (
        <StyledNav>
            <Logo />
            <NavbarLinks />
            <StyledSection>
                <NavbarWallet />
                <NavbarTheme />
            </StyledSection>
        </StyledNav>
        // <Flex
        //     as='nav'
        //     h='130px'
        //     borderRadius='18px'
        //     w='100%'
        //     align='center'
        //     wrap='nowrap'
        //     color='white'
        //     justify='space-between'
        // >
        //     <Flex h='100%' alignItems='center'>
        //         <Text fontSize='28px' color='white' ml='43px'>
        //             Bankless Loans
        //         </Text>
        //     </Flex>

        //     <Box display={{ base: 'block', md: 'none' }} onClick={handleToggle}>
        //         {isOpen ? (
        //             <CloseIcon color='white' mr='43px' fontSize='15px' />
        //         ) : (
        //             <HamburgerIcon color='white' mr='43px' fontSize='25px' />
        //         )}
        //     </Box>
        //     <Flex h='100%' alignItems='center'>
        //         <Stack
        //             bg='#131313'
        //             direction={{ base: 'column', md: 'row' }}
        //             display={{ base: isOpen ? 'block' : 'none', md: 'flex' }}
        //             width={{ base: '92%', md: 'auto' }}
        //             height={{ base: 'full', lg: 'auto' }}
        //             alignItems='center'
        //             //this keeps it centered on mobile but allowing "space-between" on Navbar//
        //             mr={{ base: 'auto', md: '43px' }}
        //             ml={{ base: 'auto', md: '0px' }}
        //             spacing={8}
        //             padding='8px'
        //             borderRadius='42px'
        //             border='1px solid'
        //         >
        //             <Link href='/'>Borrow</Link>
        //             <Link href='/Pool'>Stability Pool</Link>
        //             <Link href='/Stake'>Stake LQTY</Link>
        //         </Stack>
        //     </Flex>
        //     <Flex w='150px'>Connect Wallet</Flex>
        // </Flex>
    )
}
