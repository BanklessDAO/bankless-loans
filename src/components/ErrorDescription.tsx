import { Box, Flex, Text } from '@chakra-ui/react'
import { Icon } from './Icon'

export const ErrorDescription: React.FC = ({ children }) => (
    <Box
        sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-around',

            mb: [2, 3],
            p: 3,

            border: 1,
            borderRadius: '8px',
            borderColor: 'danger',
            boxShadow: 2,
            bg: '#370b0b',
            fontSize: '18px',
        }}
    >
        <Flex align='center' direction='row' wrap='nowrap'>
            <Icon name='exclamation-triangle' size='lg' color='#fee500' />
            <Text sx={{ ml: 2 }}>{children}</Text>
        </Flex>
    </Box>
)
