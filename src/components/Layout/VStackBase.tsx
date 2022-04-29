import { VStack } from '@chakra-ui/react'

type VStackBaseProps = {
    children: React.ReactNode
    maxH: string
}

export const VStackBase = ({ children, maxH = '960px' }: VStackBaseProps) => (
    <VStack
        maxHeight={maxH}
        m={0}
        h='fit-content'
        overflow='hidden'
        flex='1'
        py={['0px', '0px', '40px']}
        justifyContent={['flex-start', 'flex-start', 'flex-start']}
    >
        {children}
    </VStack>
)
