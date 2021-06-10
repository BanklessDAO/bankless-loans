const Button = {
    baseStyle: {
    },
    sizes: { // TODO: Address sizes.
        lg: {
            height: "64px",
            width: "228px"
        },
        // md: {

        // },
        // sm: {

        // }
    },
    variants: { // TODO: Relative units
        large: {
            borderRadius: "24px",
            fontSize: "24px",
            lineHeight: "22px",
            height: "64px",
            bg: "interactive.dark",
            color: "interactive.white",
            _hover: {
                bg: "interactive.darkPurple"
            },
            _active: {

            },
            _disabled: {
                bg: "interactive.gray",
                color: "interactive.transparentWhite"
            }
        },
        outline: {
            bg: "transparent",
            border: "2px solid",
            borderColor: "interactive.purple",
            color: "interactive.white"
        }
    },
    defaultProps: {}
}


export default Button;