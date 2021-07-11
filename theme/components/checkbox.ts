const Checkbox = {
    parts: [
        "container",
        "control",
        "label",
        "icon"
    ],
    baseStyle: {
        control: {
            borderColor: 'interactive.dark',
            _hover: {
                borderColor: "interactive.purple"
            },
            _disabled: {
                borderColor: "rgba(0,0,0,0)",
                pointerEvents: "none",
                backgroundColor: "interacitve.grey",
                border: "none"
            },
            _checked: {
                borderColor: "rgba(0,0,0,0)",
                background: "supplementary.green"
            }
        }
    },
    sizes: {
    },
    variants: {
    },
    defaultProps: {}
}

export default Checkbox;