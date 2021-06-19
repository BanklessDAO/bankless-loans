const Link = {
    baseStyle: ({ onDark } : { onDark?: boolean}) => ({
        color: onDark ? "interactive.white" : 'black',
        textDecoration: onDark ? "none": "underline",
        fontWeight: 500,
        fontSize: {
            base: '1rem',
        },
        _hover: {
            color: onDark ? "interactive.purple" : "interactive.darkPurple",
            textDecoration: onDark ? "none" : "underline"
        },
        _active: {
            color: onDark ? "background.blueBg" : "interactive.white"
        },
        _visited: {
            color: onDark ? "interactive.grey": "black"
        }
    }),
    sizes: {},
    variants: {
        body: {

        },
        light: {
            color:"interactive.white",
            _hover: {
                color: "interactive.purple"
            }
        },
        dark: {
            color:"interactive.dark",
            _hover: {
                color: "interactive.purple"
            }
        }
    },
    defaultProps: {}
}


export default Link;