import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    const baseUrl = 'https://hacktthebreach.xyz'
    return {
        rules: {
            userAgent: '*',
            allow: ['/', '/code-of-conduct', '/register', '/register/closed'],
            disallow: []
        },
        sitemap: `${baseUrl}/sitemap.xml`
    }
}
