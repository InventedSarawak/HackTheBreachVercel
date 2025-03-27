'use client'

import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, Linkedin, Globe, Github, ArrowRight, X } from 'lucide-react'
import {
    Carousel,
    CarouselApi,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious
} from '@/components/ui/carousel'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

// Import JSON data
import speakersDataRaw from '@/data/speakersData.json'

// Speaker data types
interface SpeakerSocial {
    mail?: string
    linkedin?: string
    website?: string
    github?: string
}

interface Speaker {
    id: string
    name: string
    role: string
    company: string
    bio: string
    image?: string
    social: SpeakerSocial
    talkTitle?: string
    featured?: boolean
}

interface SpeakersData {
    pageTitle: string
    pageDescription: string
    viewAllButtonText: string
    hideAllButtonText: string
    speakers: Speaker[]
}

// Type assertion for imported JSON
const speakersData = speakersDataRaw as unknown as SpeakersData

// Move this sorting logic to a regular function or inside the component
const getSortedSpeakers = (speakers: Speaker[]) => {
    return [...speakers].sort((a, b) => {
        if (a.featured && !b.featured) return -1
        if (!a.featured && b.featured) return 1
        return 0
    })
}

// Speaker card component
const SpeakerCard = ({ speaker }: { speaker: Speaker }) => {
    const [isHovered, setIsHovered] = useState(false)

    return (
        <div
            className="group relative mx-auto h-[400px] w-[90%] overflow-hidden rounded-xl border border-zinc-800 bg-black select-none"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Speaker Image */}
            <div className="absolute inset-0 transition-all duration-500 group-hover:scale-110 group-hover:opacity-60">
                <Image
                    src={speaker.image || '/speakers/speaker-placeholder.jpg'}
                    alt={speaker.name}
                    fill
                    draggable="false"
                    className="pointer-events-none object-cover"
                    sizes="(max-width: 768px) 100vw, 300px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

                {/* Featured badge */}
            </div>

            {/* Speaker Name and Role - Move up on hover */}
            <div
                className={cn(
                    'absolute right-0 left-0 p-4 transition-all duration-300',
                    isHovered ? 'top-4 bottom-auto' : 'bottom-0'
                )}
            >
                <h3 className="text-xl font-bold tracking-tight">
                    {speaker.name}
                </h3>
                <p className="text-sm text-zinc-400">{speaker.role}</p>
                <p className="text-primary text-xs">{speaker.company}</p>
            </div>

            {/* Additional Info - Visible on hover */}
            <div
                className={cn(
                    'absolute inset-x-0 bottom-0 flex flex-col gap-3 p-4 transition-all duration-300',
                    isHovered
                        ? 'translate-y-0 opacity-100'
                        : 'translate-y-20 opacity-0'
                )}
            >
                <p className="line-clamp-3 text-xs leading-tight text-zinc-300">
                    {speaker.bio}
                </p>

                {/* Talk title */}
                {speaker.talkTitle && (
                    <div className="border-primary border-l-2 pl-2 text-xs text-zinc-400 italic">
                        &lsquo;{speaker.talkTitle}&rsquo;
                    </div>
                )}

                {/* Social links */}
                <div className="flex gap-2 pt-1">
                    {speaker.social.mail && (
                        <a
                            href={speaker.social.mail}
                            className="rounded-full bg-zinc-800 p-1.5 transition-colors hover:bg-zinc-700"
                        >
                            <Mail className="h-4 w-4 text-zinc-400" />
                        </a>
                    )}
                    {speaker.social.linkedin && (
                        <a
                            href={speaker.social.linkedin}
                            className="rounded-full bg-zinc-800 p-1.5 transition-colors hover:bg-zinc-700"
                        >
                            <Linkedin className="h-4 w-4 text-zinc-400" />
                        </a>
                    )}
                    {speaker.social.website && (
                        <a
                            href={speaker.social.website}
                            className="rounded-full bg-zinc-800 p-1.5 transition-colors hover:bg-zinc-700"
                        >
                            <Globe className="h-4 w-4 text-zinc-400" />
                        </a>
                    )}
                    {speaker.social.github && (
                        <a
                            href={speaker.social.github}
                            className="rounded-full bg-zinc-800 p-1.5 transition-colors hover:bg-zinc-700"
                        >
                            <Github className="h-4 w-4 text-zinc-400" />
                        </a>
                    )}
                </div>
            </div>
        </div>
    )
}

// Main Speakers component with continuous auto-rotation
export default function Speakers() {
    const [showAllSpeakers, setShowAllSpeakers] = useState(false)
    const [api, setApi] = useState<(CarouselApi | null)>(null)
    const autoplayRef = useRef<NodeJS.Timeout | null>(null)

    // Setup continuous auto-rotation without pausing
    useEffect(() => {
        // Only run if we're showing the carousel and have an API
        if (showAllSpeakers || !api) return

        const autoplayNext = () => {
            if (api) {
                api.scrollNext()
                // Immediately set the next timeout after scrolling
                autoplayRef.current = setTimeout(autoplayNext, 5000)
            }
        }

        // Clear any existing timeout
        if (autoplayRef.current) {
            clearTimeout(autoplayRef.current)
        }

        // Set a new timeout
        autoplayRef.current = setTimeout(autoplayNext, 5000)

        // Cleanup on unmount or when dependencies change
        return () => {
            if (autoplayRef.current) {
                clearTimeout(autoplayRef.current)
            }
        }
    }, [api, showAllSpeakers])

    const sortedSpeakers = getSortedSpeakers(speakersData.speakers)

    return (
        <section id="speakers" className="cursor-default py-16 md:py-24">
            <div className="container mx-auto px-4">
                <div className="mb-12 flex flex-col items-center justify-center gap-2 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="mb-2 font-mono text-3xl font-bold tracking-tight md:text-4xl">
                            {speakersData.pageTitle}
                        </h2>
                        <p className="mx-auto max-w-2xl text-zinc-400">
                            {speakersData.pageDescription}
                        </p>
                    </motion.div>
                </div>

                <AnimatePresence mode="wait">
                    {!showAllSpeakers ? (
                        <motion.div
                            key="carousel"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}
                            className="relative overflow-visible px-6 md:px-8"
                        >
                            <Carousel
                                opts={{
                                    align: 'center',
                                    loop: true,
                                    dragFree: false,
                                    containScroll: 'trimSnaps',
                                    skipSnaps: false
                                }}
                                setApi={setApi}
                                className="w-full select-none"
                            >
                                <CarouselContent className="-ml-4 md:-ml-6">
                                    {sortedSpeakers.map((speaker) => (
                                        <CarouselItem
                                            key={speaker.id}
                                            className="pl-4 md:basis-1/2 md:pl-6 lg:basis-1/3"
                                        >
                                            <SpeakerCard speaker={speaker} />
                                        </CarouselItem>
                                    ))}
                                </CarouselContent>
                                {/* Hide arrows on small devices, show on sm and up */}
                                <CarouselPrevious className="bg-background/80 hover:bg-primary/10 -left-1 hidden border-zinc-800 backdrop-blur-sm sm:-left-3 sm:flex md:-left-4 lg:-left-6" />
                                <CarouselNext className="bg-background/80 hover:bg-primary/10 -right-1 hidden border-zinc-800 backdrop-blur-sm sm:-right-3 sm:flex md:-right-4 lg:-right-6" />
                            </Carousel>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="grid"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                                {sortedSpeakers.map((speaker) => (
                                    <SpeakerCard
                                        key={speaker.id}
                                        speaker={speaker}
                                    />
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="mt-12 text-center">
                    <Button
                        variant={showAllSpeakers ? 'secondary' : 'outline'}
                        className="group"
                        onClick={() => setShowAllSpeakers(!showAllSpeakers)}
                    >
                        {showAllSpeakers ? (
                            <>
                                {speakersData.hideAllButtonText}
                                <X className="ml-2 h-4 w-4" />
                            </>
                        ) : (
                            <>
                                {speakersData.viewAllButtonText}
                                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </>
                        )}
                    </Button>
                </div>
            </div>
        </section>
    )
}
