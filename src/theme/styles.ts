import { mode } from '@chakra-ui/theme-tools'

const styles = {
    global: (props: object) => ({
        html: {
            fontSize: '18px',
        },
        body: {
            background: '#000000',
            //backgroundSize: '100% auto',
        },
        tippyPopper: {
            bg: '#ff0000',
            color: 'ff0000',
        },
    }),
}

export default styles
