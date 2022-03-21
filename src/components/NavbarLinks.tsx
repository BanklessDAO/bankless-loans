import React from 'react'
import { HStack, Box, Link } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import NextLink from 'next/link'

type Path = {
    text: string
    path: string
}

const PATH_DATA: Array<Path> = [
    {
        text: 'Borrow',
        path: 'borrow',
    },

    {
        path: 'pool',
        text: 'Stability Pool',
    },

    {
        path: 'stake',
        text: 'Stake LQTY',
    },
]

const NavbarMenuListItem = ({
    path,
    routerPathname,
    text,
}: {
    path: string
    routerPathname: string
    text: string
}) => {
    function setLinkBg(linkPath: string, routePath: string) {
        if (routePath === '' && linkPath === 'borrow') {
            return '#242424'
        }
        if (linkPath === routePath) {
            return '#242424'
        } else {
            return 'transparent'
        }
    }

    function setLinkColor(linkPath: string, routePath: string) {
        if (routePath === '' && linkPath === 'borrow') {
            return 'whiteAlpha.0'
        }
        if (linkPath !== routePath) {
            return '#A1A1A1'
        } else {
            return 'whiteAlpha.0'
        }
    }

    return (
        <Box
            as='li'
            display='flex'
            h='fit-content'
            minW='136px'
            borderRadius='13px'
            bg={setLinkBg(path, routerPathname)}
            _hover={{ backgroundColor: '#242424' }}
        >
            <NextLink href={path === 'borrow' ? '/' : `/${path}`} passHref>
                <Link
                    h='100%'
                    w='100%'
                    borderRadius='13px'
                    p='6px 0'
                    fontSize='18px'
                    textAlign='center'
                    color={setLinkColor(path, routerPathname)}
                    textDecoration='none'
                    _hover={{ textDecoration: 'none' }}
                >
                    {text}
                </Link>
            </NextLink>
        </Box>
    )
}

const NavbarMenuList = ({
    linkPaths,
    routerPathname,
}: {
    linkPaths: Array<Path>
    routerPathname: string
}) => {
    return (
        <HStack
            display={['none', 'none', 'flex']}
            justifyContent='center'
            alignItems='center'
            bg='#131313'
            borderRadius={18}
            border='0.8px solid #7d7d7d'
            p={1}
            as='ul'
            spacing={1.5}
        >
            {linkPaths.map((linkData: any) => (
                <NavbarMenuListItem
                    {...linkData}
                    routerPathname={routerPathname}
                />
            ))}
        </HStack>
    )
}

export default function NavbarLinks() {
    const router = useRouter()
    const [_, routerPathname] = router.pathname.split('/')

    return (
        <NavbarMenuList linkPaths={PATH_DATA} routerPathname={routerPathname} />
    )
}
