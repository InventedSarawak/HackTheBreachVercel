import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    const baseUrl = 'https://hackthebreach.xyz'
    return {
        rules: {
            userAgent: '*',
            allow: ['/', '/code-of-conduct', '/register', '/register/closed', '/secret'],
            disallow: []
        },
        sitemap: `${baseUrl}/sitemap.xml`
    }
}
