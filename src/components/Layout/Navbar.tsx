import React from 'react'
import styled from '@emotion/styled'
import Logo from 'components/Logo'
import NavbarLinks from 'components/NavbarLinks'
import NavbarWallet from 'components/NavbarWallet'

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

export default function Navbar() {
    return (
        <StyledNav>
            <Logo />
            <NavbarLinks />
            <NavbarWallet />
        </StyledNav>
    )
}
