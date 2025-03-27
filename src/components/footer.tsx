'use client'

import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { IconCloud } from '@/components/magicui/icon-cloud'
import { FaDiscord, FaLinkedin, FaGithub } from 'react-icons/fa'

// Import your logo - adjust path as needed
import { Logo } from '@/components/logo'
import {
    Terminal,
    Shield,
    Lock,
    Server,
    Cpu,
    Database,
    Code,
    Network,
    Bug,
    FileCode,
    CloudOff,
    Webhook,
    Wifi,
    UserCheck,
    Fingerprint
} from 'lucide-react'

// Custom multicolor SVG icons for the cloud
// Custom multicolor SVG icons for the cloud

export default function Footer() {
    const securityIcons = [
        <Shield key="shield" size={100} color="#0ea5e9" strokeWidth={1.5} />,
        <Lock key="lock" size={100} color="#10b981" strokeWidth={1.5} />,
        <Bug key="bug" size={100} color="#f59e0b" strokeWidth={1.5} />,
        <Terminal
            key="terminal"
            size={100}
            color="#8b5cf6"
            strokeWidth={1.5}
        />,
        <Server key="server" size={100} color="#ef4444" strokeWidth={1.5} />,
        <Cpu key="cpu" size={100} color="#ec4899" strokeWidth={1.5} />,
        <Database
            key="database"
            size={100}
            color="#14b8a6"
            strokeWidth={1.5}
        />,
        <Code key="code" size={100} color="#6366f1" strokeWidth={1.5} />,
        <Network key="network" size={100} color="#f43f5e" strokeWidth={1.5} />,
        <FileCode
            key="filecode"
            size={100}
            color="#a855f7"
            strokeWidth={1.5}
        />,
        <CloudOff
            key="cloudoff"
            size={100}
            color="#d946ef"
            strokeWidth={1.5}
        />,
        <Webhook key="webhook" size={100} color="#84cc16" strokeWidth={1.5} />,
        <Wifi key="wifi" size={100} color="#3b82f6" strokeWidth={1.5} />,
        <UserCheck
            key="usercheck"
            size={100}
            color="#22c55e"
            strokeWidth={1.5}
        />,
        <Fingerprint
            key="fingerprint"
            size={100}
            color="#eab308"
            strokeWidth={1.5}
        />
    ]
    // Get multi-colored SVG icons

    return (
        <footer className="-mt-10 border-t border-zinc-800 bg-black py-10">
            <div className="container mx-auto px-4">
                {/* Main footer content with improved alignment */}
                <div className="mb-8 flex flex-col items-center justify-between gap-8 md:flex-row md:items-center">
                    {/* Left side with logo, text, and CTA - with added padding */}
                    <div className="flex max-w-md flex-col justify-between pl-4 md:ml-8 md:pl-8">
                        <div className="mb-6">
                            {/* Further increased logo size */}
                            <Logo
                                alt="Hack The Breach Logo"
                                width={150}
                                height={150}
                            />
                        </div>

                        <div className="flex flex-1 flex-col">
                            <p className="mb-4 text-zinc-400">
                                Join us in shaping the future of cybersecurity.
                                Hack The Breach brings together the brightest
                                minds to tackle tomorrow&lsquo;s security
                                challenges today.
                            </p>

                            <Button
                                variant="default"
                                size="lg"
                                className="w-fit"
                            >
                                <Link href="/register/closed">
                                    Register Now
                                </Link>
                            </Button>
                        </div>
                    </div>

                    {/* Right side with IconCloud - adjusted vertical alignment */}
                    <div className="relative -top-14 -mb-24 hidden w-full max-w-[500px] justify-center py-4 md:mt-0 md:block">
                        <Link href={'/secret'}>
                            <IconCloud icons={securityIcons} />
                        </Link>
                    </div>
                </div>

                {/* Divider */}
                <div className="h-px w-full bg-zinc-800"></div>

                {/* Bottom footer section - improved with three-column layout */}
                <div className="mt-6 -mb-4 grid grid-cols-1 items-center gap-6 md:grid-cols-3">
                    {/* Copyright on left with increased size */}
                    <div className="ml-2 text-center text-base text-zinc-400 md:text-left">
                        &copy; 2025 Hack The Breach. All rights reserved.
                    </div>

                    {/* Social links in middle - truly centered */}
                    <div className="flex justify-center gap-6">
                        <Link
                            href="https://github.com/orgs/Hack-The-Breach"
                            className="transition-colors hover:text-zinc-300"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <FaGithub className="h-5 w-5" />
                        </Link>
                        <Link
                            href="https://www.linkedin.com/company/hackthebreach"
                            className="transition-colors hover:text-zinc-300"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <FaLinkedin className="h-5 w-5" />
                        </Link>
                        <Link
                            href="#"
                            className="transition-colors hover:text-zinc-300"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <FaDiscord className="h-5 w-5" />
                        </Link>
                        {/* <Link
                            href="https://discord.gg/puPJWDkh6j"
                            className="transition-colors hover:text-zinc-300"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <FaDiscord className="h-5 w-5" />
                        </Link> */}
                    </div>

                    {/* Code of conduct on right */}
                    <div className="text-center md:text-right">
                        <Link
                            href="/code-of-conduct"
                            className="text-base transition-colors hover:text-zinc-300 md:mr-8"
                        >
                            Code of Conduct
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}
