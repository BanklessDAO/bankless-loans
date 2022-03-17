import React from 'react'
import { Stack, useDisclosure } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import styled from '@emotion/styled'

import Link from 'next/link'

const StyledLi = styled.li<any>`
    height: fit-content;
    background-color: ${props => (props.active ? '#242424' : 'transparent')};
    border-radius: 13px;
    min-width: 125px;
    display: flex;
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
    const { isOpen } = useDisclosure()
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

    console.log('path ::', pathname)
    return (
        <>
            <Stack
                as='ul'
                bg='#131313'
                direction={{ base: 'column', md: 'row' }}
                display={{ base: isOpen ? 'block' : 'none', md: 'flex' }}
                width={{ base: '92%', md: 'auto' }}
                height={{ base: 'fit-content', lg: 'auto' }}
                alignItems='center'
                //this keeps it centered on mobile but allowing "space-between" on Navbar//
                mr={{ base: 'auto', md: '43px' }}
                ml={{ base: 'auto', md: '0px' }}
                padding={'4px'}
                spacing={'8px'}
                listStyleType={'none'}
                borderRadius={'18px'}
                border={'0.8px solid #7D7D7D'}
            >
                {allPaths.map(path => (
                    <ListItem {...path} currentPath={pathname} />
                ))}
            </Stack>
        </>
    )
}
