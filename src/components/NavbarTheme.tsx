import React from 'react'
import styled from '@emotion/styled'

const StyledSection = styled.section`
    display: flex;
    align-items: center;
    padding: 8px 10px;
    background-color: #131313;
    border-radius: 18px;
    border: 0.8px solid #7d7d7d;
`

const StyledButton = styled.button`
    height: 28px;
    width: 28px;
`

export default function NavbarTheme() {
    return (
        <StyledSection>
            <StyledButton>
                <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 28 28'
                >
                    <path
                        fill='#fff'
                        d='M7.3 5.5 5 3.2 3.2 5l2.3 2.3 1.8-1.8Zm-3.5 7.2H0v2.6h3.8v-2.6ZM15.3 0h-2.6v3.8h2.6V0Zm9.5 5L23 3.2l-2.3 2.3 1.8 1.8L24.8 5Zm-4.1 17.5 2.2 2.3 1.8-1.8-2.2-2.3-1.8 1.8Zm3.5-9.8v2.6H28v-2.6h-3.8ZM14 6.3a7.7 7.7 0 0 0 0 15.4 7.7 7.7 0 0 0 0-15.4ZM12.7 28h2.6v-3.8h-2.6V28Zm-9.5-5L5 24.8l2.3-2.3-1.8-1.8L3.2 23Z'
                    />
                </svg>
            </StyledButton>
        </StyledSection>
    )
}
