const Button = {
    baseStyle: {
        fontWeight: 'medium',
        color: 'white',
        boxSizing: 'border-box',
        mx: '.25em',
    },
    sizes: {
        primary: {
            px: {
                base: '20px',
                md: '28px',
                lg: '51px',
            },
            py: {
                base: '12px',
                md: '14px',
                lg: '23px',
            },
            borderRadius: {
                base: '.15em',
                md: '.15em',
                lg: '.15em',
            },
            fontSize: {
                base: '16px',
                md: '18px',
                lg: '20px',
            },
            lineHeight: '18px',
        },
        secondary: {
            px: '20px',
            py: '10px',
            borderRadius: '13px',
            fontSize: '1rem',
            lineHeight: '1.225',
        },
    },
    variants: {
        // TODO: Relative units
        solid: ({ onDark }: { onDark?: boolean }) => ({
            bg: !onDark ? 'interactive.dark' : 'none',
            color: 'interactive.white',
            border: !onDark ? 'none' : '2px solid',
            borderColor: !onDark ? 'rgba(0,0,0,0)' : 'interactive.purple',
            _hover: {
                bg: 'interactive.darkPurple',
            },
            _active: {
                bg: !onDark ? 'interactive.dark' : 'interactive.darkPurple',
            },
            _disabled: {
                bg: 'interactive.gray',
                color: 'interactive.transparentWhite',
            },
        }),
        mainPurple: {
            bg: 'interactive.purple',
            color: 'interactive.white',
            flex: '1',
            _hover: {
                bg: 'interactive.darkPurple',
            },
        },
        darkPurple: {
            bg: 'interactive.darkPurple',
            color: 'interactive.white',
            flex: '1',
            _hover: {
                bg: 'interactive.purple',
            },
        },
        darkGrey: {
            bg: 'interactive.darkGrey',
            color: 'interactive.white',
            flex: '1',
            _hover: {
                bg: 'interactive.grey',
                // some views change color to black on hover, future bug will need fix
                color: 'white',
            },
        },
        transparent: {
            bg: 'none',
            fontSize: '24px',
            flex: '1',
            _hover: {
                fontWeight: 'bold',
            },
        },
        max: {
            bg: 'interactive.grey',
            fontSize: '22px',
            color: 'white',
            py: 1,
            px: 3,
            height: '40px',
            marginBottom: '10px',
            _hover: {
                bg: 'interactive.darkGrey',
                color: '#000000',
            },
        },
        outline: {
            bg: 'none',
            color: 'interactive.dark',
            border: '2px solid',
            _hover: {
                bg: 'interactive.darkPurple',
                color: 'interactive.white',
                border: '2px solid',
                borderColor: 'rgba(0,0,0,0)',
            },
            _active: {
                bg: 'interactive.dark',
            },
            _disabled: {
                bg: 'interactive.gray',
                color: 'interactive.transparentWhite',
            },
        },
        active: {
            bg: 'interactive.darkPurple',
            color: 'interactive.white',
            borderRadius: '6px',
        },
        wallet: {
            bg: 'interactive.gray.13',
            p: 2,
            borderRadius: '18px',
            alignItems: 'center',
            borderWidth: '1.6px',
            borderStyle: 'solid',
            borderColor: 'interactive.gray.7D',
            mr: 1,
            _hover: {
                bg: 'interactive.gray.24',
            },
        },
    },
    defaultProps: {},
}

export default Button
