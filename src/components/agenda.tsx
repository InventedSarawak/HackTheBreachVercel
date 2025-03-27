'use client'

import React, { useState } from 'react'
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

    // Use the imported data directly - no state or useEffect needed
    const visibleDays = showAllDays
        ? agendaData?.days || []
        : (agendaData?.days || []).slice(0, 3)

    return (
        <section id="agenda" className="mb-6 py-16 md:py-24">
            <div className="container mx-auto px-4">
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
                                                        <div className="mb-2 flex items-center gap-2">
                                                            <EventTypeIcon
                                                                type={
                                                                    event.type
                                                                }
                                                            />
                                                            <h3 className="text-lg font-medium text-white">
                                                                {event.title}
                                                            </h3>
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
