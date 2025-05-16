import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: 'https://hackthebreach.xyz',
            lastModified: new Date(),
            priority: 1,
            images: ['https://hackthebreach.xyz/apple-icon.jpg']
        },
        {
            url: 'https://hackthebreach.xyz/register/closed',
            lastModified: new Date(),
            priority: 0.7,
            images: ['https://hackthebreach.xyz/apple-icon.jpg']
        },
        {
            url: 'https://hackthebreach.xyz/code-of-conduct',
            lastModified: new Date(),
            priority: 0.3,
            images: ['https://hackthebreach.xyz/apple-icon.jpg']
        },
        {
            url: 'https://hackthebreach.xyz/secret',
            lastModified: new Date(),
            priority: 0.1,
            images: ['https://hackthebreach.xyz/apple-icon.jpg']
        }
    ]
}
