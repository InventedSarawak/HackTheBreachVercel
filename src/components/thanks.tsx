'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

// Import the data
import thanksDataRaw from '@/data/thanksData.json'

// Types for our data
interface ThankYouPerson {
    id: string
    name: string
    role: string
    image: string
    designation?: string
}

interface ThanksData {
    pageTitle: string
    pageDescription: string
    thanks: ThankYouPerson[]
}

// Type assertion for imported JSON
const thanksData = thanksDataRaw as unknown as ThanksData

// Card component for each person
const ThankYouCard = ({
    person,
    index
}: {
    person: ThankYouPerson
    index: number
}) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 * index }}
            viewport={{ once: true }}
            className="flex flex-col items-center text-center"
        >
            {/* Name and Role */}
            <h3 className="mt-24 mb-2 font-mono text-2xl font-bold text-white">
                {person.role}
            </h3>
            <span className="text-lg text-zinc-300">{person.name}</span>
            <span className="mb-2 text-sm text-zinc-400">
                {person.designation}
            </span>
            {/* Image with gradient overlay */}
            <div className="relative h-64 w-64 overflow-hidden rounded-xl md:h-[300px] md:w-[300px]">
                <div className="absolute inset-0 z-10 to-black/70" />
                <Image
                    src={person.image}
                    alt={person.name}
                    fill
                    quality={95}
                    sizes="(max-width: 768px) 256px, 400px"
                    className="bg-white object-cover transition-transform duration-500 hover:scale-105"
                    priority={index < 2} // Load first two images with priority
                />
            </div>
        </motion.div>
    )
}

// Main component
export default function SpecialThanks() {
    return (
        <section id="thanks" className="w-full py-16 md:py-24">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="mb-16 text-center"
                >
                    <h2 className="mb-2 font-mono text-3xl font-bold tracking-tight md:text-4xl">
                        {thanksData.pageTitle}
                    </h2>
                    <p className="mx-auto max-w-2xl text-zinc-400">
                        {thanksData.pageDescription}
                    </p>
                </motion.div>

                <div className="-mt-24 -mb-16 flex flex-col items-center">
                    {thanksData.thanks.map((person, index) => (
                        <ThankYouCard
                            key={person.id}
                            person={person}
                            index={index}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}
