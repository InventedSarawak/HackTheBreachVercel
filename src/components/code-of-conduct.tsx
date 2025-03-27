'use client'

import React from 'react'
import { motion } from 'framer-motion'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger
} from '@/components/ui/accordion'

// Import the data
import codeOfConductData from '@/data/codeOfConductData.json'

// Define types for our data
interface ReportingMethod {
    name: string
    details: string
    isLink?: boolean
    url?: string
    linkText?: string
}

interface CodeOfConductData {
    pageTitle: string
    pageDescription: string
    introduction: {
        title: string
        paragraphs: string[]
    }
    rules: Array<{
        id: string
        title: string
        items: string[]
    }>
    reporting: {
        title: string
        description: string
        methods: ReportingMethod[]
        note: string
    }
    enforcement: {
        title: string
        paragraphs: string[]
        consequences: string[]
    }
}

// Type assertion for imported JSON
const conductData = codeOfConductData as unknown as CodeOfConductData

export default function CodeOfConduct() {
    return (
        <section id="code-of-conduct" className="w-full py-16 md:py-24">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="mb-12 text-center"
                >
                    <h2 className="mb-2 font-mono text-3xl font-bold tracking-tight md:text-4xl">
                        {conductData.pageTitle}
                    </h2>
                    <p className="mx-auto max-w-2xl text-zinc-400">
                        {conductData.pageDescription}
                    </p>
                </motion.div>

                <div className="mx-auto max-w-3xl">
                    {/* Introduction */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        viewport={{ once: true }}
                        className="mb-8 rounded-xl border border-zinc-800 bg-zinc-900/50 p-6"
                    >
                        <h3 className="text-primary mb-4 text-xl font-bold">
                            {conductData.introduction.title}
                        </h3>
                        {conductData.introduction.paragraphs.map(
                            (paragraph, index) => (
                                <p
                                    key={index}
                                    className={`${
                                        index <
                                        conductData.introduction.paragraphs
                                            .length -
                                            1
                                            ? 'mb-4 text-zinc-300'
                                            : 'text-zinc-400'
                                    }`}
                                >
                                    {paragraph}
                                </p>
                            )
                        )}
                    </motion.div>

                    {/* Main rules in accordion format */}
                    <Accordion type="single" collapsible className="mb-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            viewport={{ once: true }}
                        >
                            {conductData.rules.map((rule) => (
                                <AccordionItem
                                    key={rule.id}
                                    value={rule.id}
                                    className="border-zinc-800"
                                >
                                    <AccordionTrigger className="hover:text-primary cursor-pointer text-lg font-medium">
                                        {rule.title}
                                    </AccordionTrigger>
                                    <AccordionContent className="text-zinc-400">
                                        <ul className="list-outside list-disc space-y-2 pl-5">
                                            {rule.items.map((item, index) => (
                                                <li
                                                    key={index}
                                                    className="pl-1"
                                                >
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </motion.div>
                    </Accordion>

                    {/* Reporting Violations */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        viewport={{ once: true }}
                        className="mb-8 rounded-xl border border-zinc-800 bg-zinc-900/50 p-6"
                    >
                        <h3 className="text-primary mb-4 text-xl font-bold">
                            {conductData.reporting.title}
                        </h3>

                        <p className="mb-4 text-zinc-300">
                            {conductData.reporting.description}
                        </p>

                        <ul className="mb-4 list-outside list-disc space-y-2 pl-5 text-zinc-400">
                            {conductData.reporting.methods.map(
                                (method, index) => (
                                    <li key={index} className="pl-1">
                                        <span className="font-medium text-zinc-300">
                                            {method.name}:
                                        </span>{' '}
                                        {method.isLink ? (
                                            <a
                                                href={method.url}
                                                className="text-primary hover:underline"
                                            >
                                                {method.linkText ||
                                                    method.details}
                                            </a>
                                        ) : (
                                            method.details
                                        )}
                                    </li>
                                )
                            )}
                        </ul>

                        <p className="text-zinc-400">
                            {conductData.reporting.note}
                        </p>
                    </motion.div>

                    {/* Consequences */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        viewport={{ once: true }}
                        className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6"
                    >
                        <h3 className="text-primary mb-4 text-xl font-bold">
                            {conductData.enforcement.title}
                        </h3>

                        {conductData.enforcement.paragraphs.map(
                            (paragraph, index) => (
                                <p key={index} className="mb-4 text-zinc-300">
                                    {paragraph}
                                </p>
                            )
                        )}

                        <ul className="list-outside list-disc space-y-2 pl-5 text-zinc-400">
                            {conductData.enforcement.consequences.map(
                                (consequence, index) => (
                                    <li key={index} className="pl-1">
                                        {consequence}
                                    </li>
                                )
                            )}
                        </ul>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
