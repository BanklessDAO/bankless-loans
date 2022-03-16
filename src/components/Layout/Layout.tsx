import { Fragment } from 'react'
import styled from '@emotion/styled'
import Navbar from './Navbar'

const StyledMain = styled.main`
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 1440px;
    margin: 0 auto;
`

export default function Layout({ children }: any) {
    return (
        <StyledMain>
            <Navbar />
            {children}
        </StyledMain>
    )
}
