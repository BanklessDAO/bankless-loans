import { Box } from '@chakra-ui/react'
import { useWindowSize } from '../utils/useWindowSize'

export const CardBase: React.FC = ({ children }) => {
    const { width } = useWindowSize()
    const stylesPaddingTotal = 19 * 2 // 19px on each side

    return (
        <Box
            as='article'
            overflow='scroll'
            h='100%'
            minH='432px'
            w='100%'
            maxW={[`${width - stylesPaddingTotal}px`, '550px', '550px']}
            borderWidth={1}
            borderRadius='31px'
            bg='interactive.gray.13'
            color='interactive.white'
        >
            {children && children}
        </Box>
    )
}
