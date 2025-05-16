'use client'

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Marquee } from '@/components/magicui/marquee'
import sponsorsData from '@/data/sponsorsData.json'

// Sponsor data type (simplified)
type Sponsor = {
    id: string
    name: string
    logo: string
    website: string
    css?: string
    invertColors?: boolean
}

const SPONSORS = sponsorsData.sponsors

// Individual sponsor item component with just the logo
const SponsorItem = ({ sponsor }: { sponsor: Sponsor }) => {
    const isSvg = sponsor.logo.toLowerCase().endsWith('.svg')
    return (
        <a
            href={sponsor.website}
            target="_blank"
            rel="noopener noreferrer"
            className="group mx-4 flex items-center"
        >
            {/* Logo only - white color, no background, fixed height */}
            <div className="flex h-16 items-center justify-center md:h-20">
                <Image
                    src={sponsor.logo}
                    alt={`${sponsor.name} logo`}
                    width={200}
                    height={80}
                    quality={95}
                    className={`h-full w-auto object-contain ${sponsor.css}`}
                    style={{
                        maxHeight: '80px',
                        filter:
                            isSvg && sponsor.invertColors
                                ? 'brightness(0) invert(1)'
                                : undefined
                    }}
                    unoptimized={isSvg} // Don't optimize SVGs since they're already vector format
                />
            </div>
        </a>
    )
}
// Make sure these animations are defined in your globals.css file
const cssToAdd = `
@keyframes marquee {
  0% { transform: translateX(0); }
  100% { transform: translateX(calc(-100% - var(--gap))); }
}

.animate-marquee {
  animation: marquee var(--duration) linear infinite;
}
`

// Main Sponsors component with full-width, scrolling marquee
export default function Sponsors() {
    // We'll duplicate this to ensure sufficient content
    const sponsorEntries = React.useMemo(() => [...SPONSORS], [])

    return (
        <section id="sponsors" className="w-full py-16">
            <div className="mb-12 flex flex-col items-center justify-center gap-2 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="mb-2 font-mono text-3xl font-bold tracking-tight md:text-4xl">
                        {sponsorsData.pageTitle}
                    </h2>
                    <p className="mx-auto max-w-2xl text-zinc-400">
                        {sponsorsData.pageDescription}
                    </p>
                </motion.div>
            </div>

            {/* Full-width sponsors marquee with top and bottom borders */}
            <div className="w-full border-t border-b border-zinc-800 bg-zinc-900/20 py-6">
                {/* Using multiple marquees to ensure content wraps around properly */}
                <style jsx>{cssToAdd}</style>

                {/* Using the Marquee from magicui with proper props to ensure animation */}
                <Marquee
                    className="py-4 [--duration:8s]"
                    pauseOnHover={false}
                    repeat={6}
                >
                    {sponsorEntries.map((sponsor) => (
                        <SponsorItem key={sponsor.id} sponsor={sponsor} />
                    ))}
                </Marquee>
            </div>

            {/* <div className="container mx-auto mt-16 px-4 text-center">
                <p className="text-zinc-400">
                    {sponsorsData.contactText}{' '}
                    <a
                        href={`mailto:${sponsorsData.contactEmail}`}
                        className="text-primary hover:underline"
                    >
                        {sponsorsData.contactEmail}
                    </a>
                </p>
            </div> */}
        </section>
    )
}
