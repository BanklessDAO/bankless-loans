import { extendTheme } from '@chakra-ui/react'
import styled from '@emotion/styled'

const palette = {
    red: '#dd1111',
    light: '#ffcccc',
    background: '#131313',
}

const Button = {
    baseStyle: {
        fontWeight: 'bold',
        textTransform: 'uppercase',
        borderRadius: 'base', // < -- border radius is same for all variants and sizes
    },
    sizes: {
        sm: {
            fontSize: 'sm',
            px: 4, // <-- px is short for paddingLeft and paddingRight
            py: 3, // <-- py is short for paddingTop and paddingBottom
        },
        md: {
            fontSize: 'md',
            px: 6, // <-- these values are tokens from the design system
            py: 4, // <-- these values are tokens from the design system
        },
    },
    variants: {
        redOutline: {
            border: '1px solid',
            borderColor: 'red.500',
            color: 'red.00',
            bg: 'transparent',
            _hover: { bg: 'red.500', color: 'white' },
        },
        outline: {
            border: '1px solid',
            borderColor: 'gray.600',
            color: 'gray.900',
            bg: 'white',
        },
        solid: {
            bg: 'red.600',
            color: 'white',
        },
    },
    // The default size and variant values
    defaultProps: {
        size: 'md',
        variant: 'redOutline',
    },
}

const theme = extendTheme({
    colors: {
        palette,
    },
    styles: {
        global: {
            body: {
                bg: palette.background,
            },
            div: {
                borderRadius: 'lg',
            },
            ul: {
                listStyle: 'none',
                padding: 0,
                margin: 0,
            },
        },
    },
    components: {
        Button,
    },
})

export default theme
