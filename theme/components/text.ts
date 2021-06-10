const Text = {
    baseStyle: {
        fontSize: "1rem",
        fontWeight: "500",
        lineHeight: "1.225"
    },
    sizes: {},
    variants: {
        datapoint: {
            fontSize: 'sm'
        },
        bold: {
            fontWeight: "600"
        },
        caption: {
            fontSize: "14px", // change to relative units.
            lineHeight: "1.15"
        },
        "micro-caption": {
            fontSize: "12px",
            lineHeight: "1"
        },
        dataPointSm: {
            fontWeight: "500",
            fontSize: "30px",
            lineHeight: "32px",
            letterSpacing: "-0.5px"
        },
        dataPointMd: {
            fontWeight: "500",
            fontSize: "36px",
            lineHeight: "36px",
            letterSpacing: "-0.5px"
        },
        dataPointLg: {
            fontWeight: "500",
            fontSize: "42px",
            lineHeight: "50px",
            letterSpacing: "-0.5px"
        },
        dataPointXl: {
            fontWeight: "600",
            fontSize: "48px",
            lineHeight: "60px",
            letterSpacing: "-1px"
        }
    },
    defaultProps: {}
}

export default Text;