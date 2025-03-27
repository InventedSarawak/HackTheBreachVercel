'use client'

import React from 'react'
import { motion } from 'framer-motion'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger
} from '@/components/ui/accordion'

// Import the FAQ data
import faqDataRaw from '@/data/faqData.json'

// Types for our FAQ data structure
interface FAQItem {
    question: string
    answer: string
}

interface ContactInfo {
    text: string
    email: string
}

interface FAQData {
    pageTitle: string
    pageDescription: string
    items: FAQItem[]
    contactInfo: ContactInfo
}

// Type assertion for imported JSON
const faqData = faqDataRaw as unknown as FAQData

// Function to parse special link syntax in answers
const parseAnswer = (answer: string): React.ReactNode => {
    // Check if the answer contains link markers [[url|text]]
    if (!answer.includes('[[')) return answer

    // Regular expression to find link patterns
    const parts = answer.split(/(\[\[.*?\]\])/g)

    return (
        <>
            {parts.map((part, index) => {
                // Check if this part is a link
                if (part.startsWith('[[') && part.endsWith(']]')) {
                    // Extract URL and text from [[url|text]]
                    const linkContent = part.slice(2, -2)
                    const [url, text] = linkContent.split('|')

                    return (
                        <a
                            key={index}
                            href={url}
                            className="text-primary hover:underline"
                        >
                            {text || url}
                        </a>
                    )
                }

                // Return regular text
                return <React.Fragment key={index}>{part}</React.Fragment>
            })}
        </>
    )
}

export default function FAQ() {
    return (
        <section id="faq" className="py-16 md:py-24">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <div className="mb-12 flex flex-col items-center justify-center gap-2 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="mb-2 font-mono text-3xl font-bold tracking-tight md:text-4xl">
                            {faqData.pageTitle}
                        </h2>
                        <p className="mx-auto max-w-2xl text-zinc-400">
                            {faqData.pageDescription}
                        </p>
                    </motion.div>
                </div>

                {/* FAQ Accordion */}
                <div className="mx-auto max-w-3xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <Accordion type="single" collapsible className="w-full">
                            {faqData.items.map((item, index) => (
                                <AccordionItem
                                    key={index}
                                    value={`item-${index}`}
                                    className="border-b border-zinc-800"
                                >
                                    <AccordionTrigger className="hover:text-primary cursor-pointer text-lg font-medium text-white hover:no-underline">
                                        {item.question}
                                    </AccordionTrigger>
                                    <AccordionContent className="text-zinc-400">
                                        {parseAnswer(item.answer)}
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </motion.div>
                </div>

                {/* Contact CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="mt-12 text-center"
                >
                    <p className="text-zinc-400">
                        {faqData.contactInfo.text}{' '}
                        <a
                            href={`mailto:${faqData.contactInfo.email}`}
                            className="text-primary hover:underline"
                        >
                            {faqData.contactInfo.email}
                        </a>
                    </p>
                </motion.div>
            </div>
        </section>
    )
}
