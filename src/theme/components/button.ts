const easeInTransition = (property: string) => {
    const transitionTime = 175
    return `${property} ${transitionTime}ms ease-in`
}

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
                // some views change color to black on hover, futmaure bug will need fix
                color: 'white',
            },
        },
        max: {
            maxHeight: 10,
            position: 'absolute',
            top: 'calc(50% - 22.5px)',
            right: 3,
            m: 0,
            p: 0,
            bg: 'interactive.grey',
            transition: easeInTransition('background'),
            zIndex: '2',
            _hover: {
                bg: 'interactive.gray.24',
                transition: easeInTransition('background'),
                '&  > *': {
                    color: 'interactive.grey',
                    transition: easeInTransition('color'),
                },
            },
            '& > *': {
                py: 3,
                px: 5,
                color: 'black',
                fontFamily: 'fonts.buttons.max',
                fontWeight: 800,
                fontSize: '1em',
                textTransform: 'uppercase',
                transition: easeInTransition('color'),
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
            py: '20px',
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
        navBarMobile: {
            bg: '#B5B5B5',
            width: '56px',
            height: '39px',
            borderRadius: '6px',
            fontWeight: '700',
            fontSize: '16px',
        },
    },
    defaultProps: {},
}

export default Button
