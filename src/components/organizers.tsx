'use client'

import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Github, Linkedin, Globe, ArrowRight, X } from 'lucide-react'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious, 
    type CarouselApi
} from '@/components/ui/carousel'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

// Import the JSON data
import organizersDataRaw from '@/data/organizersData.json'

// Type definitions for the organizer data
interface OrganizerSocial {
    github?: string
    linkedin?: string
    website?: string
}

interface Organizer {
    id: string
    name: string
    role: string
    organization: string
    image: string
    social: OrganizerSocial
}

interface OrganizersData {
    pageTitle: string
    pageDescription: string
    viewAllButtonText: string
    hideAllButtonText: string
    organizers: Organizer[]
}

// Type assertion for imported JSON
const organizersData = organizersDataRaw as unknown as OrganizersData

// Organizer card component with non-selectable content
const OrganizerCard = ({ organizer }: { organizer: Organizer }) => {
    const [isHovered, setIsHovered] = useState(false)

    return (
        <div
            className="group relative mx-auto h-[400px] w-[90%] overflow-hidden rounded-xl border border-zinc-800 bg-black select-none"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Organizer Image with zoom and darken on hover */}
            <div className="absolute inset-0 transition-all duration-500 group-hover:scale-110">
                <Image
                    src={organizer.image}
                    alt={organizer.name}
                    fill
                    draggable="false"
                    className={cn(
                        'pointer-events-none object-cover transition-all duration-500',
                        isHovered ? 'brightness-[0.7] contrast-125' : ''
                    )}
                    sizes="(max-width: 768px) 100vw, 300px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            </div>

            {/* Organizer Name and Role - Always visible */}
            <div className="absolute right-0 bottom-0 left-0 p-4">
                <h3 className="text-lg font-bold tracking-tight">
                    {organizer.name}
                </h3>
                <p className="text-sm text-zinc-300">{organizer.role}</p>
                <p className="text-primary text-xs">{organizer.organization}</p>
            </div>

            {/* Social links - Only visible on hover */}
            <div
                className={cn(
                    'absolute top-4 right-4 flex gap-2 transition-all duration-300',
                    isHovered ? 'scale-100 opacity-100' : 'scale-75 opacity-0'
                )}
            >
                {organizer.social.github && (
                    <a
                        href={organizer.social.github}
                        className="hover:bg-primary/30 rounded-full bg-zinc-800/80 p-2 transition-all duration-200 hover:scale-110"
                        target="_blank"
                    >
                        <Github className="h-4 w-4 text-zinc-100" />
                    </a>
                )}
                {organizer.social.linkedin && (
                    <a
                        href={organizer.social.linkedin}
                        className="hover:bg-primary/30 rounded-full bg-zinc-800/80 p-2 transition-all duration-200 hover:scale-110"
                        target="_blank"
                    >
                        <Linkedin className="h-4 w-4 text-zinc-100" />
                    </a>
                )}
                {organizer.social.website && (
                    <a
                        href={organizer.social.website}
                        className="hover:bg-primary/30 rounded-full bg-zinc-800/80 p-2 transition-all duration-200 hover:scale-110"
                        target="_blank"
                    >
                        <Globe className="h-4 w-4 text-zinc-100" />
                    </a>
                )}
            </div>
        </div>
    )
}

// Main Organizers component with continuous auto-rotation
export default function Organizers() {
    const [showAllOrganizers, setShowAllOrganizers] = useState(false)
    const [api, setApi] = useState<CarouselApi | null>(null)
    const autoplayRef = useRef<NodeJS.Timeout | null>(null)

    // Setup continuous auto-rotation without pausing
    useEffect(() => {
        // Only run if we're showing the carousel and have an API
        if (showAllOrganizers || !api) return

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
    }, [api, showAllOrganizers])

    return (
        <section id="organizers" className="cursor-default py-16">
            <div className="container mx-auto px-4">
                <div className="mb-12 flex flex-col items-center justify-center gap-2 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2
                            className="mb-2 font-mono text-3xl font-bold tracking-tight md:text-4xl"
                            id="organizers"
                        >
                            {organizersData.pageTitle}
                        </h2>
                        <p className="mx-auto max-w-2xl text-zinc-400">
                            {organizersData.pageDescription}
                        </p>
                    </motion.div>
                </div>

                <AnimatePresence mode="wait">
                    {!showAllOrganizers ? (
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
                                    align: 'start',
                                    loop: true,
                                    dragFree: false,
                                    containScroll: 'trimSnaps',
                                    skipSnaps: false
                                }}
                                setApi={setApi}
                                className="w-full select-none"
                            >
                                <CarouselContent className="-ml-4 md:-ml-6">
                                    {organizersData.organizers.map(
                                        (organizer) => (
                                            <CarouselItem
                                                key={organizer.id}
                                                className="pl-4 md:basis-1/2 md:pl-6 lg:basis-1/3"
                                            >
                                                <OrganizerCard
                                                    organizer={organizer}
                                                />
                                            </CarouselItem>
                                        )
                                    )}
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
                                {organizersData.organizers.map((organizer) => (
                                    <OrganizerCard
                                        key={organizer.id}
                                        organizer={organizer}
                                    />
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="mt-12 text-center">
                    <Button
                        variant={showAllOrganizers ? 'secondary' : 'outline'}
                        className="group"
                        onClick={() => setShowAllOrganizers(!showAllOrganizers)}
                    >
                        {showAllOrganizers ? (
                            <>
                                {organizersData.hideAllButtonText}
                                <X className="ml-2 h-4 w-4" />
                            </>
                        ) : (
                            <>
                                {organizersData.viewAllButtonText}
                                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </>
                        )}
                    </Button>
                </div>
            </div>
        </section>
    )
}
