import { mode } from '@chakra-ui/theme-tools'

const gradient = `radial-gradient(circle at left, rgba(109, 41, 254, 0.3) 0%, rgba(109, 41, 254, 0) 30%),
            radial-gradient(circle at right, rgba(255, 4, 16, 0.24) 0%, rgba(255, 4, 16, 0) 30%), #000000`

const gradientAndImage = `radial-gradient(circle at left, rgba(109, 41, 254, 0.3) 0%, rgba(109, 41, 254, 0) 30%),
            radial-gradient(circle at right, rgba(255, 4, 16, 0.24) 0%, rgba(255, 4, 16, 0) 30%), url(/futuristic-background.png)`

const styles = {
    global: (props: object) => ({
        html: {
            fontSize: '18px',
        },
        body: {
            background: mode(gradientAndImage, gradient)(props),
            backgroundSize: '100% auto',
        },
        tippyPopper: {
            bg: '#ff0000',
            color: 'ff0000',
        },
    }),
}

export default styles
