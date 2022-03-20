import React from 'react'
import { HStack, useDisclosure } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import styled from '@emotion/styled'

import Link from 'next/link'

const StyledLi = styled.li<any>`
    height: fit-content;
    background-color: ${props => (props.active ? '#242424' : 'transparent')};
    border-radius: 13px;
    min-width: 136px;
    display: flex;
`

const StyledA = styled.a<any>`
    height: 100%;
    text-align: center;
    width: 100%;
    font-size: 18px;
    padding: 6px 0;
    border-radius: 13px;
    color: ${props => (props.active ? 'white' : '#A1A1A1')};
    :hover {
        li & {
            background-color: #242424;
            color: white;
        }
    }
    :focus,
    :active {
        li & {
            background-color: #242424;
            color: white;
        }
    }
`

const ListLink: React.FC<any> = ({ text, ...props }) => (
    <StyledA {...props}>{text}</StyledA>
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
            <ListLink
                tabIndex='0'
                currentPath={currentPath}
                active={
                    currentPath === '' && link?.path === 'borrow'
                        ? true
                        : currentPath === link.path
                }
                {...link}
            />
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
        <HStack
            display='flex'
            justifyContent='center'
            alignItems='center'
            bg='#131313'
            borderRadius={18}
            border='0.8px solid #7d7d7d'
            p={1}
            as='ul'
            spacing={1.5}
        >
            {allPaths.map(path => (
                <ListItem {...path} currentPath={pathname} />
            ))}
        </HStack>
    )
}
