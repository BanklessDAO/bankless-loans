import { Box, Flex, Text } from '@chakra-ui/react'
import { Icon } from './Icon'

export const ActionDescription: React.FC = ({ children }) => (
    <Box
        sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-around',
            mb: [2, 3],
            p: 3,
            border: 1,
            borderRadius: '8px',
            borderColor: 'accent',
            boxShadow: 2,
            bg: '#222222',
            fontSize: '18px',
        }}
    >
        <Flex sx={{ alignItems: 'center' }}>
            <Icon name='info-circle' size='lg' color='#505050' />
            <Text sx={{ ml: 2 }}>{children}</Text>
        </Flex>
    </Box>
)

export const Amount: React.FC = ({ children }) => (
    <Text sx={{ fontWeight: 'bold', whiteSpace: 'nowrap' }}>{children}</Text>
)
