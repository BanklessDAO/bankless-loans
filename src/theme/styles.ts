import { color } from '@chakra-ui/styled-system'

const styles = {
    global: {
        html: {
            fontSize: '18px',
        },
        body: {
            backgroundColor: '#363636',
            background: `radial-gradient(circle at left, rgba(109, 41, 254, 0.3) 0%, rgba(109, 41, 254, 0) 30%),
            radial-gradient(circle at right, rgba(255, 4, 16, 0.24) 0%, rgba(255, 4, 16, 0) 30%)`,
        },
        tippyPopper: {
            bg: '#ff0000',
            color: 'ff0000',
        },
    },
}

export default styles
