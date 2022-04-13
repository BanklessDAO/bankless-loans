import { Text, HStack } from '@chakra-ui/react'
import { Icon } from './Icon'

export const ActionDescription: React.FC = ({ children }) => (
    <HStack
        justifyContent='space-around'
        mb={6}
        px={6}
        py={2}
        border={1}
        borderRadius={8}
        borderColor='accent'
        boxShadow={2}
        bg='interactive.gray.22'
        fontSize={24}
        sx={{
            '& > *:first-child': {
                marginRight: '0.25em',
            },
        }}
    >
        <Icon name='info-circle' size='lg' style={{ color: '#505050' }} />
        <Text ml={2} fontSize='18px' fontFamily='Space Grotesk'>
            {children}
        </Text>
    </HStack>
)

export const Amount: React.FC = ({ children }) => (
    <Text sx={{ fontWeight: 'bold', whiteSpace: 'nowrap' }}>{children}</Text>
)
