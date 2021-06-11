const Button = {
    baseStyle: {
        fontWeight: "medium",
        boxSizing: "border-box",
        mx: "20px"
    },
    sizes: {
        primary: {
            px: "51px",
            py: "23px",
            borderRadius: "24px",
            fontSize: "24px",
            lineHeight: "22px",
        },
        secondary: {
            px: "20px",
            py: "10px",
            borderRadius: "13px",
            fontSize: "1rem",
            lineHeight: "1.225",
        }
    },
    variants: { // TODO: Relative units
        solid: {
            bg: "interactive.dark",
            color: "interactive.white",
            _hover: {
                bg: "interactive.darkPurple"
            },
            _active: {
                bg: "interactive.dark",
            },
            _disabled: {
                bg: "interactive.gray",
                color: "interactive.transparentWhite"
            }
        },
        outline: {
            bg: "none",
            color: "interactive.dark",
            border: "2px solid",
            _hover: {
                bg: "interactive.darkPurple",
                color: "interactive.white",
                border: "2px solid",
                borderColor: "rgba(0,0,0,0)"
            },
            _active: {
                bg: "interactive.dark",
            },
            _disabled: {
                bg: "interactive.gray",
                color: "interactive.transparentWhite"
            }
        }
    },
    defaultProps: {}
}


export default Button;