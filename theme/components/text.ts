const Text = {
    baseStyle: { // html fontsize set to 18px
        fontSize: { // responsive styles for the defined breakpoints in theme.ts
            base: "1rem",
            md: "1.25rem",
            lg: "1.5rem"
        }, 
        fontWeight: "medium",
        lineHeight: "1.225"
    },
    sizes: {
        sm: {},
        md: {},
        lg: {},
        xl: {}
    },
    variants: {
        body: {},
        datapoint: {
            fontSize: 'sm'
        },
        bold: {
            fontWeight: "semibold"
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
            fontSize: "30px",
            lineHeight: "32px",
            letterSpacing: "-0.5px"
        },
        dataPointMd: {
            fontSize: "36px",
            lineHeight: "36px",
            letterSpacing: "-0.5px"
        },
        dataPointLg: {
            fontSize: "42px",
            lineHeight: "50px",
            letterSpacing: "-0.5px"
        },
        dataPointXl: {
            fontSize: "48px",
            lineHeight: "60px",
            letterSpacing: "-1px"
        }
    },
    defaultProps: {}
}

export default Text;