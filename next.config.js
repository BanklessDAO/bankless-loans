const ContentSecurityPolicy = `
  default-src 'self';
`

const securityHeaders = [
    {
        key: 'X-Frame-Options',
        value: 'DENY',
    },
//     {
//         key: 'Content-Security-Policy',
//         value: ContentSecurityPolicy.replace(/\s{2,}/g, ' ').trim(),
//     },
]

module.exports = {
    reactStrictMode: true,
    async headers() {
        return [
            {
                // Apply these headers to all routes in your application.
                source: '/:path*',
                headers: securityHeaders,
            },
        ]
    },
}
