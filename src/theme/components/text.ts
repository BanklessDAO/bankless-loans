const Text = {
    baseStyle: {
        // html fontsize set to 18px
    },
    sizes: {},
    variants: {
        body: {},
        datapoint: {
            fontSize: 'sm',
        },
        bold: {
            fontWeight: 'semibold',
        },
        'home-title': {
            as: 'h3',
            color: '#FFFFFF',
            fontSize: ['3xl', '4xl', '5xl', '6xl'],
            fontWeight: 'extrabold',
            letterSpacing: 'tighter',
            lineHeight: 'none',
            textAlign: 'center',
        },
        'home-subtitle': {
            as: 'h4',
            color: '#D8D8D8',
            fontSize: ['md', 'lg', 'xl', '24px'],
            fontWeight: '400',
            letterSpacing: 'tight',
            textAlign: 'center',
        },
        'sitemap-title': {
            fontSize: 'sm',
            fontWeight: 'bold',
            letterSpacing: 'widest',
            textTransform: 'uppercase',
        },
    },
    defaultProps: {},
}

export default Text
