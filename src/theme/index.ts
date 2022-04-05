import { extendTheme, type ThemeConfig } from '@chakra-ui/react'
import { createBreakpoints } from '@chakra-ui/theme-tools'

const config: ThemeConfig = {
    initialColorMode: 'light',
    useSystemColorMode: false,
}

const breakpoints = createBreakpoints({
    sm: '30em',
    md: '48em',
    lg: '62em',
    xl: '80em',
    '2xl': '96em',
})

// Global style overrides
import styles from './styles'

// Font overrides.
import fonts from './fonts'

// Color overrides.
import colors from './colors'

// Component style overrides.
import Section from './components/section'
import { Box, Container } from '@chakra-ui/layout'
import Button from './components/button'
import Link from './components/link'
import Text from './components/text'
import Heading from './components/heading'
import Popover from './components/popover'
import Checkbox from './components/checkbox'

const customTheme = extendTheme({
    config,
    colors,
    styles,
    fonts,
    components: {
        Section,
        Box,
        Container,
        Button,
        Text,
    },
    layerStyles: {
        baseStyle: {
            width: '555px',
            height: '622px',
            bg: '#131313',
            color: '#FFFFFF',
            borderRadius: '31px',
        },
        otherStyle: {
            width: '555px',
            height: '622px',
            bg: '#131313',
            color: 'red',
            borderRadius: '0px',
        },
    },
})

export default customTheme
