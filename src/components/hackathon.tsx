'use client'

import React, { JSX } from 'react'
import { motion } from 'framer-motion'
import { HyperText } from '@/components/magicui/hyper-text'
import { Button } from '@/components/ui/button'
import {
    Terminal,
    Trophy,
    Users,
    Calendar,
    Clock,
    Brain,
    Globe,
    Lock,
    FileCode,
    Laptop,
    Braces,
    Search,
    ArrowUpRight,
    LucideIcon
} from 'lucide-react'
import Link from 'next/link'

// Import the JSON data
import hackathonDataRaw from '@/data/hackathonData.json'

// Types for our data
interface KeyDetail {
    icon: string
    title: string
    main: string
    note: string
}

interface PrizeTier {
    place: string
    prizes: string[]
    cash?: string
}

interface ChallengeCategory {
    name: string
    description: string
    icon: string
    difficulty: 'beginner' | 'intermediate' | 'advanced' | 'all'
}

interface HackathonData {
    title: string
    description: string
    registerButtonText: string
    keyDetails: KeyDetail[]
    prizePool: {
        title: string
        amount?: string
        description: string
        tiers: PrizeTier[]
    }
    challengeCategories: {
        title: string
        description: string
        categories: ChallengeCategory[]
    }
}

// Type assertion for imported JSON
const hackathonData = hackathonDataRaw as unknown as HackathonData

// Function to get icon component from string name
const getIconComponent = (iconName: string): JSX.Element => {
    const iconMap: Record<string, LucideIcon> = {
        Calendar,
        Clock,
        Users,
        Brain,
        Globe,
        Lock,
        FileCode,
        Terminal,
        Search,
        Laptop,
        Braces,
        Trophy
    }

    const Icon = iconMap[iconName] || Calendar
    return <Icon className="text-primary h-5 w-5 sm:h-6 sm:w-6" />
}

export default function Hackathon() {
    const characterSet = [
        '0',
        '1',
        '/',
        '\\',
        '>',
        '<',
        '%',
        '$',
        '#',
        '@',
        '!',
        '&',
        '*'
    ]

    return (
        <section id="hackathon" className="py-16">
            <div className="container mx-auto px-4">
                {/* Container with positioning context */}
                <div className="relative rounded-xl border border-zinc-800">
                    {/* Mobile background - visible only on small screens */}
                    <div className="absolute inset-0 rounded-xl bg-black/60 md:hidden"></div>

                    {/* Desktop WarpBackground - hidden on mobile */}
                    <div className="absolute inset-0 hidden md:block"></div>

                    {/* Content - visible on all screen sizes */}
                    <div className="relative z-10 p-8 md:p-12 lg:p-16">
                        {/* Header */}
                        <div className="mb-10 md:mb-16">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5 }}
                                className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
                            >
                                <div>
                                    <div className="mb-2 flex items-center gap-2">
                                        <Trophy className="text-primary h-5 w-5 sm:h-6 sm:w-6" />
                                        <h2 className="font-mono text-3xl font-bold tracking-tight md:text-4xl">
                                            <HyperText
                                                characterSet={characterSet}
                                                delay={200}
                                                animateOnHover={false}
                                            >
                                                {hackathonData.title}
                                            </HyperText>
                                        </h2>
                                    </div>
                                    <p className="max-w-2xl text-zinc-400">
                                        {hackathonData.description}
                                    </p>
                                </div>

                                <div className="mt-4 md:mt-0 ">
                                    <Link
                                        href={'https://ctf.hackthebreach.xyz'}
                                    >
                                        <Button size="lg" variant="default" className='cursor-pointer'>
                                            {hackathonData.registerButtonText}{' '}
                                            <ArrowUpRight className="ml-2 h-4 w-4" />
                                        </Button>
                                    </Link>
                                </div>
                            </motion.div>
                        </div>

                        {/* Key Details */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="mb-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4"
                        >
                            {hackathonData.keyDetails.map((detail, index) => {
                                return (
                                    <div
                                        key={index}
                                        className="rounded-xl border border-zinc-800 bg-black/60 p-6"
                                    >
                                        <div className="bg-primary/10 mb-3 inline-flex rounded-full p-2">
                                            {getIconComponent(detail.icon)}
                                        </div>
                                        <h3 className="mb-1 font-medium">
                                            {detail.title}
                                        </h3>
                                        <p className="text-sm text-zinc-400">
                                            {detail.main}
                                        </p>
                                        <p className="mt-1 text-xs text-zinc-500">
                                            {detail.note}
                                        </p>
                                    </div>
                                )
                            })}
                        </motion.div>

                        {/* Prize Pool */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="mb-10"
                        >
                            <div className="mb-6">
                                <h3 className="text-2xl font-bold">
                                    {hackathonData.prizePool.title}{' '}
                                    <span className="text-primary">
                                        {hackathonData.prizePool.amount}
                                    </span>
                                </h3>
                                <p className="text-zinc-400">
                                    {hackathonData.prizePool.description}
                                </p>
                            </div>
                        </motion.div>

                        {/* Challenge Categories */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                        >
                            <div className="mb-6">
                                <h3 className="text-2xl font-bold">
                                    {hackathonData.challengeCategories.title}
                                </h3>
                                <p className="text-zinc-400">
                                    {
                                        hackathonData.challengeCategories
                                            .description
                                    }
                                </p>
                            </div>

                            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                {hackathonData.challengeCategories.categories.map(
                                    (category, index) => {
                                        // Get icon component
                                        return (
                                            <div
                                                key={index}
                                                className="flex flex-col rounded-xl border border-zinc-800 bg-black/60 p-4 sm:flex-row"
                                            >
                                                <div className="bg-primary/10 mb-4 flex-shrink-0 self-start rounded-full p-3 sm:mr-4 sm:mb-0">
                                                    {getIconComponent(
                                                        category.icon
                                                    )}
                                                </div>
                                                <div>
                                                    <div className="flex flex-wrap items-center gap-2">
                                                        <h4 className="font-medium">
                                                            {category.name}
                                                        </h4>
                                                        <span
                                                            className={`rounded px-2 py-0.5 text-xs ${
                                                                category.difficulty ===
                                                                'beginner'
                                                                    ? 'bg-green-950/50 text-green-400'
                                                                    : category.difficulty ===
                                                                        'intermediate'
                                                                      ? 'bg-yellow-950/50 text-yellow-400'
                                                                      : category.difficulty ===
                                                                          'advanced'
                                                                        ? 'bg-red-950/50 text-red-400'
                                                                        : 'bg-zinc-800 text-zinc-400'
                                                            }`}
                                                        >
                                                            {category.difficulty ===
                                                            'all'
                                                                ? 'All Levels'
                                                                : category.difficulty}
                                                        </span>
                                                    </div>
                                                    <p className="mt-1 text-sm text-zinc-400">
                                                        {category.description}
                                                    </p>
                                                </div>
                                            </div>
                                        )
                                    }
                                )}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    )
}
