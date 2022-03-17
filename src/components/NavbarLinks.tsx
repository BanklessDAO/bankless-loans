import React from 'react'
import { Stack, useDisclosure } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import styled from '@emotion/styled'

import Link from 'next/link'

const StyledUl = styled.ul`
    background-color: #131313;
    display: flex;
    border-radius: 18px;
    border: 0.8px solid #7d7d7d;
    list-style: none;
    padding: 4px;
`

const StyledLi = styled.li<any>`
    height: fit-content;
    background-color: ${props => (props.active ? '#242424' : 'transparent')};
    border-radius: 13px;
    min-width: 125px;
    display: flex;
    margin-right: 10px;
    &:last-child {
        margin-right: 0;
    }
`

const StyledA = styled.a`
    height: 100%;
    text-align: center;
    width: 100%;
    font-size: 18px;
    padding: 6px 0;
    border-radius: 13px;
    color: white;
    :hover {
        // color: magenta
        li & {
            background-color: #242424;
        }
    }
    :focus,
    :active {
        li & {
            background-color: #242424;
        }
    }
`

const ListLink: React.FC<any> = ({ text, ...props }) => (
    <StyledA {...props} active={true}>
        {text}
    </StyledA>
)

const ListItem: React.FC<any> = ({ currentPath, children, link, ...props }) => (
    <StyledLi
        {...props}
        active={
            currentPath === '' && link?.path === 'borrow'
                ? true
                : currentPath === link.path
        }
    >
        <Link href={`/${link?.path === 'borrow' ? '' : link.path}`}>
            <ListLink tabIndex='0' currentPath={currentPath} {...link} />
        </Link>
    </StyledLi>
)

export default function NavbarLinks() {
    const router = useRouter()
    const [_, pathname] = router.pathname.split('/')
    const allPaths = [
        {
            link: {
                text: 'Borrow',
                path: 'borrow',
            },
        },
        {
            link: {
                path: 'pool',
                text: 'Stability Pool',
            },
        },
        {
            link: {
                path: 'stake',
                text: 'Stake LQTY',
            },
        },
    ]

    return (
        <StyledUl>
            {allPaths.map(path => (
                <ListItem {...path} currentPath={pathname} />
            ))}
        </StyledUl>
    )
}
