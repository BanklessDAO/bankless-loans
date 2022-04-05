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
        },
        'home-subtitle': {
            as: 'h3',
            color: '#D8D8D8',
            fontSize: ['md', 'lg', 'xl', '2xl'],
            fontWeight: '400',
            letterSpacing: 'tight',
            size: 'lg',
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
