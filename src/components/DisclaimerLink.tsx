import React from 'react'
import { Link } from '@chakra-ui/react'
import NextLink from 'next/link'

export default function DisclaimerLink() {
    return (
        <NextLink href={`/disclaimer`} passHref>
            <Link
                h='100%'
                w='100%'
                p='8px 0'
                textAlign='center'
                textDecoration='underline'
                _hover={{ textDecoration: 'none' }}
            >
                Disclaimer
            </Link>
        </NextLink>
    )
}
