import { Box } from '@chakra-ui/react'
import { useWindowSize } from '../utils/useWindowSize'

export const CardBase: React.FC = ({ children }) => {
    const { width } = useWindowSize()
    const stylesPaddingTotal = 19 * 2 // 19px on each side

    return (
        <Box
            as='article'
            overflow='auto'
            h='fit-content'
            w='100vw'
            maxW={[`${width - stylesPaddingTotal}px`, '555px', '555px']}
            borderWidth={1}
            borderRadius='31px'
            bg='interactive.gray.13'
            color='interactive.white'
            m='0px !important'
            p={[8, 8, 8]}
        >
            {children && children}
        </Box>
    )
}
