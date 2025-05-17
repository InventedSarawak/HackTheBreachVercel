import type { Metadata } from 'next'
import Head from 'next/head'
import { Space_Mono } from 'next/font/google'
import './globals.css'

const spaceMono = Space_Mono({
    weight: ['400', '700'],
    variable: '--font-space-mono',
    subsets: ['latin']
})

export const metadata: Metadata = {
    title: {
        template: '%s | Hack The Breach',
        default: 'Hack The Breach | Cybersecurity Workshop'
    },
    description:
        'An online workshop for cybersecurity enthusiasts! Join us in shaping the future of cybersecurity. Hack The Breach brings together the brightest minds to tackle tomorrow’s security challenges today.',
    metadataBase: new URL('https://hackthebreach.xyz'),
    icons: {
        icon: [{ url: '/apple-icon.jpg' }],
        shortcut: [{ url: '/apple-icon.jpg' }]
    },
    twitter: {
        title: 'Hack The Breach'
    },
    keywords: [
        'Cybersecurity workshop',
        'Online CTF competition',
        'Ethical hacking event',
        'Cybersecurity training',
        'Capture The Flag (CTF)',
        'Penetration testing',
        'Reverse engineering',
        'Cryptography challenges',
        'Web security',
        'Digital forensics',
        'Cybersecurity students',
        'Ethical hackers',
        'CTF beginners',
        'Red team training',
        'Bug bounty hunters',
        'Learn ethical hacking',
        'Compete in CTF',
        'Hack and secure',
        'Solve cybersecurity challenges',
        'Improve hacking skills',
        'Hack The Breach'
    ],
    openGraph: {
        description: 'An online workshop for cybersecurity enthusiasts!',
        title: 'Hack The Breach',
        images: ['apple-icon.jpg'],
        siteName: 'Hack The Breach',
        locale: 'en_US',
        type: 'website'
    }
}

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <Head>
                {/* Structured Data */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            '@context': 'https://schema.org',
                            '@type': 'WebSite',
                            name: 'Hack The Breach',
                            url: 'https://hackthebreach.xyz'
                        })
                    }}
                />
            </Head>
            <body className={`${spaceMono.variable} dark antialiased`}>
                {children}
            </body>
        </html>
    )
}
