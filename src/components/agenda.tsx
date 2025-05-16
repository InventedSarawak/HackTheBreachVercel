'use client'

import React, { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import {
    ArrowRight,
    X,
    Clock,
    Users,
    Trophy,
    Coffee,
    Code,
    LucideIcon
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger
} from '@/components/ui/accordion'

// Import the JSON data
import agendaDataRaw from '@/data/agendaData.json'

// Types for agenda data
type EventType = 'talk' | 'workshop' | 'hackathon' | 'break' | 'networking'

interface AgendaEvent {
    time: string
    title: string
    speaker?: string
    description: string
    type: EventType
    location?: string
}

interface AgendaDay {
    date: string
    dayName: string
    events: AgendaEvent[]
}

interface AgendaSettings {
    note: string
}

interface AgendaData {
    days: AgendaDay[]
    settings: AgendaSettings
}

// Type assertion for imported JSON - move outside component
const agendaData = agendaDataRaw as unknown as AgendaData

// Icon mapping for event types
const EventTypeIcon = ({ type }: { type: EventType }) => {
    let Icon: LucideIcon

    switch (type) {
        case 'talk':
            Icon = Users
            break
        case 'workshop':
            Icon = Code
            break
        case 'hackathon':
            Icon = Trophy
            break
        case 'break':
            Icon = Coffee
            break
        case 'networking':
            Icon = Users
            break
        default:
            Icon = Clock
    }

    return <Icon className="text-primary h-5 w-5" />
}

export default function Agenda() {
    const [showAllDays, setShowAllDays] = useState(false)
    // Add test mode state variables
    const [isTestMode, setIsTestMode] = useState(false)
    const [testDate, setTestDate] = useState<string>('')

    // Calculate visible days based on current date or test date
    const visibleDays = useMemo(() => {
        if (showAllDays) {
            return agendaData?.days || []
        }

        // If no days data, return empty array
        if (!agendaData?.days?.length) {
            return []
        }

        // Use test date if in test mode, otherwise use current date
        const today = isTestMode && testDate ? new Date(testDate) : new Date()

        today.setHours(0, 0, 0, 0) // Normalize to start of day

        // Create array with parsed dates and original indices
        const daysWithDates = agendaData.days.map((day, index) => {
            try {
                // Parse date format like "December 15" or "January 5, 2025"
                const dateParts = day.date.split(',')[0].trim().split(' ')
                const monthName = dateParts[0]
                const dayNum = parseInt(dateParts[1])
                const year = today.getFullYear() // Assume current year

                // Get month number from month name
                const month = new Date(`${monthName} 1, 2000`).getMonth()

                const date = new Date(year, month, dayNum)
                date.setHours(0, 0, 0, 0)

                return {
                    day,
                    parsedDate: date,
                    index
                }
            } catch (e) {
                console.error(`Error parsing date: ${day.date}`, e)
                return {
                    day,
                    parsedDate: new Date(0), // Default to epoch
                    index
                }
            }
        })

        // Sort by date (earliest first)
        daysWithDates.sort(
            (a, b) => a.parsedDate.getTime() - b.parsedDate.getTime()
        )

        // Find today or the next upcoming day
        let startIndex = -1

        for (let i = 0; i < daysWithDates.length; i++) {
            if (daysWithDates[i].parsedDate >= today) {
                startIndex = i
                break
            }
        }

        // If all days are in the past or parsing failed, start with the first day
        if (startIndex === -1 && daysWithDates.length > 0) {
            startIndex = 0
        }

        // Get three consecutive days from the starting point
        const result: AgendaDay[] = [] // Explicitly type the array
        const totalDays = daysWithDates.length

        for (let i = 0; i < Math.min(3, totalDays); i++) {
            const idx = (startIndex + i) % totalDays
            result.push(daysWithDates[idx].day)
        }

        return result
    }, [showAllDays, isTestMode, testDate])

    return (
        <section id="agenda" className="mb-6 py-16">
            <div className="container mx-auto px-4">
                {/* Test Controls - Only visible during development */}
                {process.env.NODE_ENV !== 'production' && (
                    <div className="mb-8 rounded-md border border-zinc-700 bg-zinc-900 p-4">
                        <h3 className="text-primary mb-2 font-bold">
                            Date Testing Controls
                        </h3>
                        <div className="flex flex-wrap items-center gap-4">
                            <label className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    checked={isTestMode}
                                    onChange={(e) =>
                                        setIsTestMode(e.target.checked)
                                    }
                                    className="h-4 w-4 rounded border-zinc-600 bg-zinc-800"
                                />
                                <span>Test Mode</span>
                            </label>

                            {isTestMode && (
                                <>
                                    <input
                                        type="date"
                                        value={testDate}
                                        onChange={(e) =>
                                            setTestDate(e.target.value)
                                        }
                                        className="rounded border border-zinc-700 bg-zinc-800 px-3 py-1"
                                    />
                                    <button
                                        onClick={() => setTestDate('')}
                                        className="rounded border border-zinc-700 bg-zinc-800 px-3 py-1 text-sm hover:bg-zinc-700"
                                    >
                                        Reset
                                    </button>
                                </>
                            )}
                        </div>
                        {isTestMode && (
                            <div className="mt-2 text-sm text-zinc-400">
                                {testDate
                                    ? `Testing with date: ${new Date(testDate).toDateString()}`
                                    : "No test date selected. Using today's date."}
                            </div>
                        )}
                    </div>
                )}

                {/* Section Header */}
                <div className="mb-12 flex flex-col items-center justify-center gap-2 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2
                            className="mb-2 font-mono text-3xl font-bold tracking-tight md:text-4xl"
                            id="agenda"
                        >
                            Workshop Agenda
                        </h2>
                        <p className="mx-auto max-w-2xl text-zinc-400">
                            Explore our lineup of talks, workshops, and
                            activities scheduled over the conference days.
                        </p>
                    </motion.div>
                </div>

                {/* Agenda Accordion */}
                <div className="mx-auto max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <Accordion type="single" collapsible className="w-full">
                            {visibleDays.map((day, dayIndex) => (
                                <AccordionItem
                                    key={dayIndex}
                                    value={`day-${dayIndex}`}
                                    className="border-b border-zinc-800"
                                >
                                    <AccordionTrigger className="hover:text-primary text-xl font-semibold hover:no-underline">
                                        <div className="flex cursor-pointer items-center">
                                            <span className="bg-primary/10 text-primary mr-3 rounded px-2 py-1 font-mono text-xs">
                                                {day.dayName}
                                            </span>
                                            <span>{day.date}</span>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        <div className="space-y-6">
                                            {day.events.map(
                                                (event, eventIndex) => (
                                                    <div
                                                        key={eventIndex}
                                                        className="group hover:border-primary relative border-l-2 border-zinc-800 pl-4"
                                                    >
                                                        {/* Time */}
                                                        <div className="mb-1 flex items-center gap-2 text-sm text-zinc-400">
                                                            <Clock className="h-4 w-4" />
                                                            <span>
                                                                {event.time}
                                                            </span>
                                                        </div>

                                                        {/* Title with type icon */}
                                                        <div className="relative mb-2">
                                                            <div className="float-left mt-1.5 mr-3">
                                                                <EventTypeIcon
                                                                    type={
                                                                        event.type
                                                                    }
                                                                />
                                                            </div>
                                                            <h3 className="text-lg font-medium text-white">
                                                                {event.title}
                                                            </h3>
                                                            <div className="clear-both"></div>
                                                        </div>

                                                        {/* Speaker if available */}
                                                        {event.speaker && (
                                                            <div className="text-primary mb-1 text-sm font-medium">
                                                                {event.speaker}
                                                            </div>
                                                        )}

                                                        {/* Description */}
                                                        <p className="mb-2 text-sm text-zinc-400">
                                                            {event.description}
                                                        </p>

                                                        {/* Location */}
                                                        {event.location && (
                                                            <div className="text-xs text-zinc-500">
                                                                Location:{' '}
                                                                {event.location}
                                                            </div>
                                                        )}
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </motion.div>
                </div>

                {/* Toggle Button */}
                {agendaData.days.length > 3 && (
                    <div className="mt-8 text-center">
                        <Button
                            variant={showAllDays ? 'secondary' : 'outline'}
                            className="group"
                            onClick={() => setShowAllDays(!showAllDays)}
                        >
                            {showAllDays ? (
                                <>
                                    Show Less
                                    <X className="ml-2 h-4 w-4" />
                                </>
                            ) : (
                                <>
                                    View Full Schedule
                                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </>
                            )}
                        </Button>
                    </div>
                )}

                {/* Additional Note from settings */}
                <div className="mt-12 text-center">
                    <p className="text-sm text-zinc-400">
                        {agendaData.settings.note}
                    </p>
                </div>
            </div>
        </section>
    )
}
