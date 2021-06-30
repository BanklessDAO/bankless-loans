const Popover = {
    parts: [
        "pop", 
        "content", 
        "header", 
        "body", 
        "footer", 
        "arrow"
    ],
    baseStyle: {
        content: {
            background: "interactive.dark",
            minWidth: "393px",
            lineHeight: "22px",
            bg: "interactive.dark",
            border: "none",
            fontSize: "1rem"
        },
        header: {
            padding: "14px 26px 0 20px",
            border: "none",
            color:"interactive.darkGrey"
        },
        body: {
            padding: "14px 26px 14px 20px",
            color: "white"
        }
    },
    sizes: {

    },
    variants: {

    },
    defaultProps: {}
}

export default Popover;