import React from 'react'
import styled from '@emotion/styled'
import Image from 'next/image'
const StyledSection = styled.section`
    background-color: #131313;
    display: flex;
    margin-right: 10px;
    padding: 4px 10px;
    border-radius: 18px;
    align-items: center;
    border: 0.8px solid #7d7d7d;
    & > * {
        margin-right: 10px;
    }

    & > *:last-child {
        margin-right: 0;
    }
`

const StyledFigure = styled.figure`
    padding: 6px 0;
    & > img {
        border-radius: 50%;
    }
`

export default function NavbarWallet() {
    return (
        <StyledSection>
            <p>0xd4eb...534C</p>
            <StyledFigure>
                <Image src='walletIcon.jpg' />
            </StyledFigure>
        </StyledSection>
    )
}