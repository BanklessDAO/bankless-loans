import { VStack } from '@chakra-ui/react'

export const VStackBase: React.FC = ({ children }) => (
    <VStack
        maxHeight='662px'
        h='fit-content'
        overflow='hidden'
        flex='1'
        py={['0px', '0px', '80px']}
        justifyContent={['flex-start', 'flex-start', 'flex-start']}
    >
        {children}
    </VStack>
)
