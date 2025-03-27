'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import {
    Terminal,
    AnimatedSpan,
    TypingAnimation
} from '@/components/magicui/terminal'

// Define proper types for your JSON structure
interface AboutData {
    title: string
    paragraphs: string[]
}

interface FeatureItem {
    title: string
    description: string
}

interface FeaturesData {
    features: FeatureItem[]
}

interface AudienceData {
    title: string
    attendees: string[]
}

interface TerminalInputLine {
    type: 'input'
    content?: string
    delay?: number
}

interface TerminalOutputLine {
    type: 'output'
    content?: string
    contentType?: 'about' | 'features' | 'audience'
    delay?: number
    data?: AboutData | FeaturesData | AudienceData
}

type RawTerminalLine = TerminalInputLine | TerminalOutputLine

interface AboutDataJson {
    terminalLines: RawTerminalLine[]
}

// Import the data - with type assertion
import rawData from '@/data/aboutData.json'
const aboutData = rawData as unknown as AboutDataJson

// Define type for processed terminal lines
interface ProcessedLine {
    type: 'input' | 'output'
    content: string | React.ReactNode
    delay?: number
}

export default function About() {
    const [displayedLines, setDisplayedLines] = useState<ProcessedLine[]>([])
    const terminalContentRef = useRef<HTMLDivElement>(null)
    const sectionRef = useRef<HTMLElement>(null)
    const [hasStartedAnimation, setHasStartedAnimation] = useState(false)
    const [processedData, setProcessedData] = useState<ProcessedLine[]>([])

    // Process the JSON data into React components
    useEffect(() => {
        // Verify the data structure first with console log

        try {
            const processed = aboutData.terminalLines.map(
                (line: RawTerminalLine): ProcessedLine => {
                    if (line.type === 'input') {
                        return {
                            type: 'input',
                            content: line.content || '',
                            delay: line.delay || 500
                        }
                    } else {
                        // Process output based on contentType
                        let content: React.ReactNode

                        if (line.contentType === 'about' && line.data) {
                            const aboutData = line.data as AboutData
                            content = (
                                <div className="mt-2 mb-5 text-sm sm:text-base">
                                    <p className="mb-2 text-lg font-bold text-green-500 sm:text-xl">
                                        {aboutData.title || ''}
                                    </p>
                                    {aboutData.paragraphs &&
                                        aboutData.paragraphs.map((p, i) => (
                                            <p
                                                key={i}
                                                className={
                                                    i <
                                                    (aboutData.paragraphs
                                                        ?.length || 1) -
                                                        1
                                                        ? 'mb-3'
                                                        : ''
                                                }
                                            >
                                                {p}
                                            </p>
                                        ))}
                                </div>
                            )
                        } else if (
                            line.contentType === 'features' &&
                            line.data
                        ) {
                            const featuresData = line.data as FeaturesData
                            content = (
                                <div className="mt-2 mb-5 space-y-3 text-sm sm:text-base">
                                    {featuresData.features &&
                                        featuresData.features.map(
                                            (feature, i) => (
                                                <div key={i}>
                                                    <span className="font-semibold text-yellow-500">
                                                        ▶ {feature.title || ''}
                                                        :
                                                    </span>{' '}
                                                    {feature.description || ''}
                                                </div>
                                            )
                                        )}
                                </div>
                            )
                        } else if (
                            line.contentType === 'audience' &&
                            line.data
                        ) {
                            const audienceData = line.data as AudienceData
                            content = (
                                <div className="mt-2 mb-5 space-y-2 text-sm sm:text-base">
                                    <p className="font-mono text-cyan-400">
                                        {audienceData.title || ''}
                                    </p>
                                    <ul className="list-inside list-disc space-y-1 pl-1">
                                        {audienceData.attendees &&
                                            audienceData.attendees.map(
                                                (attendee, i) => (
                                                    <li key={i}>{attendee}</li>
                                                )
                                            )}
                                    </ul>
                                </div>
                            )
                        } else if (line.content) {
                            // Simple text content
                            content = line.content
                        } else {
                            content = 'Error: Invalid output format'
                        }

                        return {
                            type: 'output',
                            content,
                            delay: line.delay || 1000
                        }
                    }
                }
            )

            setProcessedData(processed)
        } catch (error) {
            console.error('Error processing terminal data:', error)
            // Set fallback data
            setProcessedData([
                {
                    type: 'input',
                    content: "echo 'Error loading terminal data'"
                },
                {
                    type: 'output',
                    content:
                        'Error loading terminal data. Please try again later.'
                }
            ])
        }
    }, [])

    // Setup intersection observer
    // Setup intersection observer
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !hasStartedAnimation) {
                    setHasStartedAnimation(true)
                }
            },
            { threshold: 0.2 }
        )

        // Store the current value of the ref
        const currentElement = sectionRef.current

        if (currentElement) {
            observer.observe(currentElement)
        }

        return () => {
            // Use the stored reference in cleanup
            if (currentElement) {
                observer.unobserve(currentElement)
            }
        }
    }, [hasStartedAnimation])

    // Debug helper - log when data changes
    useEffect(() => {}, [displayedLines])

    // Display lines sequentially
    useEffect(() => {
        if (!hasStartedAnimation || processedData.length === 0) return

        let index = 0
        const timeoutIds: NodeJS.Timeout[] = []

        const showNextLine = () => {
            if (index < processedData.length) {
                const line = processedData[index]
                const delay = line.delay || 500

                const timeoutId = setTimeout(() => {
                    setDisplayedLines((prev) => [...prev, line])
                    index++
                    showNextLine()
                }, delay)

                timeoutIds.push(timeoutId)
            }
        }

        showNextLine()

        return () => {
            timeoutIds.forEach((id) => clearTimeout(id))
        }
    }, [hasStartedAnimation, processedData])

    return (
        <section
            id="about"
            className="cursor-default py-16 md:py-24"
            ref={sectionRef}
        >
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="mx-auto max-w-4xl"
                >
                    <h2 className="mb-6 text-center font-mono text-3xl font-bold tracking-tight md:text-4xl">
                        About The Event
                    </h2>
                    {/* Debug button */}

                    <Terminal className="max-w-full">
                        <div
                            ref={terminalContentRef}
                            className="overflow-x-hidden overflow-y-auto pr-2 font-mono"
                        >
                            {displayedLines.map((line, index) => {
                                return (
                                    <div key={index} className="break-words">
                                        {line.type === 'input' ? (
                                            <div className="flex flex-wrap">
                                                <span className="mr-1 whitespace-nowrap text-blue-400">
                                                    root@hackbreach:~${' '}
                                                </span>
                                                {/* Restore typing animation */}
                                                <TypingAnimation
                                                    delay={
                                                        index === 0 ? 300 : 0
                                                    }
                                                    duration={30}
                                                    className="break-all text-green-400"
                                                >
                                                    {String(line.content || '')}
                                                </TypingAnimation>
                                            </div>
                                        ) : /* Handle output content based on type */
                                        typeof line.content === 'string' ? (
                                            /* Use AnimatedSpan for string content */
                                            <AnimatedSpan
                                                delay={200}
                                                className="text-zinc-300"
                                            >
                                                {line.content}
                                            </AnimatedSpan>
                                        ) : (
                                            /* For React nodes, use motion.div with fade-in */
                                            <motion.div
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ duration: 0.5 }}
                                                className="mt-3 mb-4 text-zinc-300"
                                            >
                                                {line.content}
                                            </motion.div>
                                        )}
                                    </div>
                                )
                            })}

                            {displayedLines.length > 0 && (
                                <div className="ml-1 inline-block h-4 w-2 animate-pulse bg-white">
                                    ▌
                                </div>
                            )}
                        </div>
                    </Terminal>
                </motion.div>
            </div>
        </section>
    )
}
