const Box = {
    baseStyle: {
        bg: 'red.100',
        borderRadius: "base"
    },
    sizes: {
        md: {
            p: 40,
            borderRadius: 18
        }
    },
    variants: {
        outline: {
            bg: "liquity.transparentWhite",
            borderColor: "liquity.dark",
            border: "2px solid #6257DE",
        }
    },
    defaultProps: {
        size: "md",
        variant: "outline"
    }
};

export default Box;