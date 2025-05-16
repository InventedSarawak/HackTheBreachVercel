'use client'

import { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'

export default function NotFound() {
    const [animationComplete, setAnimationComplete] = useState(false)
    const [asciiArt, setAsciiArt] = useState('')
    const asciiRef = useRef('')

    // Generate hacking-inspired ASCII art background
    useEffect(() => {
        // ASCII art patterns - same as before
        const patterns = [
            `
 ┌─┐┌─┐┬ ┬┬─┐┬┌┬┐┬ ┬  ┌┐ ┬─┐┌─┐┌─┐┌─┐┬ ┬
 └─┐├┤ │ │├┬┘│ │ └┬┘  ├┴┐├┬┘├┤ ├─┤│  ├─┤
 └─┘└─┘└─┘┴└─┴ ┴  ┴   └─┘┴└─└─┘┴ ┴└─┘┴ ┴
            `,
            `
 ╔═╗╦═╗╦═╗╔═╗╦═╗  ┬┌─┐┬ ┬
 ║╣ ╠╦╝╠╦╝║ ║╠╦╝  │├┤ │││
 ╚═╝╩╚═╩╚═╚═╝╩╚═  ┴└  └┴┘
            `,
            `
 ┌┐ ┌─┐┬  ┌─┐  ┌┐┌┌─┐┌┬┐  ┌─┐┌─┐┬ ┬┌┐┌┌┬┐
 ├┴┐├─┤│  ├┤   ││││ │ │   ├┤ │ ││ │││││ │ 
 └─┘┴ ┴┴─┘└─┘  ┘└┘└─┘ ┴   └  └─┘└─┘┘└┘ ┴ 
            `,
            `
 ╦ ╦╔═╗╔═╗╦╔═╔═╗╔╦╗
 ╠═╣╠═╣║  ╠╩╗║╣  ║║
 ╩ ╩╩ ╩╚═╝╩ ╩╚═╝═╩╝
            `
        ]

        // Create full background with repeated patterns - same as before
        const createAsciiBackground = () => {
            // Same implementation as before
            let result = ''
            const hackingSymbols = [
                '/',
                '\\',
                '[',
                ']',
                '{',
                '}',
                '|',
                '<',
                '>',
                '*',
                '#',
                '$',
                '%',
                '^',
                '&',
                '@',
                '!'
            ]

            // Add random symbols and patterns
            for (let i = 0; i < 30; i++) {
                // Add a pattern every few lines
                if (i % 8 === 0) {
                    const pattern =
                        patterns[Math.floor(Math.random() * patterns.length)]
                    result += pattern + '\n'
                    continue
                }

                // Create a line with hacking-style symbols
                let line = ''
                for (let j = 0; j < 70; j++) {
                    // Create clusters of symbols to make it look like code blocks
                    if (j % 15 === 0) {
                        line += '  '
                    } else if (Math.random() > 0.7) {
                        line +=
                            hackingSymbols[
                                Math.floor(
                                    Math.random() * hackingSymbols.length
                                )
                            ]
                    } else if (Math.random() > 0.8) {
                        line += Math.random() > 0.5 ? '1' : '0' // Binary sprinkled in
                    } else if (Math.random() > 0.95) {
                        // Occasionally add "ERROR" or "ACCESS DENIED" messages
                        line +=
                            Math.random() > 0.5 ? ' ERROR ' : ' ACCESS DENIED '
                        j += 12
                    } else {
                        line += ' '
                    }
                }
                result += line + '\n'
            }

            return result
        }

        // Initial ASCII art
        const initialArt = createAsciiBackground()
        asciiRef.current = initialArt
        setAsciiArt(initialArt)

        // Animate ascii art periodically
        const interval = setInterval(() => {
            const newArt = createAsciiBackground()
            asciiRef.current = newArt
            setAsciiArt(newArt)
        }, 3000) // Slower updates for better readability

        return () => clearInterval(interval)
    }, [])

    return (
        <div className="cursor-default font-mono select-none">
            {/* Changed background color to dark red */}
            <div
                className="flex min-h-screen flex-col items-center justify-center px-4 text-center"
                style={{ backgroundColor: '#120303' }} // Very dark red background
            >
                {/* Added red tint to the ASCII art */}
                <div
                    className="pointer-events-none fixed inset-0 z-0 overflow-hidden opacity-10 select-none"
                    style={{ color: '#ff2222' }} // Reddish color for the ASCII art
                >
                    <pre className="font-mono text-[0.5rem] leading-none sm:text-xs">
                        {asciiArt}
                    </pre>
                </div>

                {/* Added an additional subtle red gradient overlay */}
                <div
                    className="pointer-events-none fixed inset-0 z-0 opacity-20"
                    style={{
                        background:
                            'radial-gradient(circle at center, rgba(255,0,0,0.1) 0%, rgba(80,0,0,0.05) 70%, rgba(20,0,0,0) 100%)'
                    }}
                ></div>

                {/* Main content */}
                <div className="z-10 max-w-2xl">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1 }}
                    >
                        {/* Glitchy 404 text - adjusted colors for red theme */}
                        <motion.h1
                            className="mb-6 font-mono text-8xl font-bold text-red-500"
                            initial={{ y: -100, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{
                                type: 'spring',
                                damping: 10,
                                stiffness: 100,
                                onComplete: () => setAnimationComplete(true)
                            }}
                        >
                            <span className="glitch" data-text="404">
                                404
                            </span>
                        </motion.h1>

                        {/* Terminal-style message - adjusted for red theme */}
                        <motion.div
                            className="mb-8 rounded-lg border border-red-900/50 bg-zinc-900/80 p-6 backdrop-blur-md"
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                        >
                            <div className="mb-2 flex items-center">
                                <div className="mr-2 h-3 w-3 rounded-full bg-red-500"></div>
                                <div className="mr-2 h-3 w-3 rounded-full bg-yellow-500"></div>
                                <div className="h-3 w-3 rounded-full bg-green-500"></div>
                            </div>

                            <div className="font-mono text-zinc-200">
                                <p className="mb-2">
                                    <span className="text-red-400">
                                        root@hack-the-breach:~$
                                    </span>{' '}
                                    find /page
                                </p>
                                <p className="mb-2 text-red-500">
                                    Error: Target not found in filesystem
                                </p>
                                <p className="mb-2">
                                    <span className="text-red-400">
                                        root@hack-the-breach:~$
                                    </span>{' '}
                                    echo &ldquo;The page you are looking for does not
                                    exist or has been moved.&rdquo;
                                </p>
                                <p className="text-zinc-400">
                                    The page you are looking for does not exist
                                    or has been moved.
                                </p>
                            </div>
                        </motion.div>

                        {/* Action button - adjusted for red theme */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{
                                opacity: animationComplete ? 1 : 0,
                                y: animationComplete ? 0 : 20
                            }}
                            transition={{ delay: 0.6, duration: 0.5 }}
                        >
                            <Link href="/">
                                <Button
                                    size="lg"
                                    className="cursor-pointer bg-red-900 font-mono text-base hover:bg-red-800"
                                >
                                    Return to Base
                                </Button>
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            {/* CSS for glitch effect - adjusted for red theme */}
            <style jsx global>{`
                .glitch {
                    position: relative;
                    display: inline-block;
                }

                .glitch::before,
                .glitch::after {
                    content: attr(data-text);
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                }

                .glitch::before {
                    left: 2px;
                    text-shadow: -1px 0 #ff0000;
                    animation: glitch-animation-1 2s infinite linear
                        alternate-reverse;
                    clip: rect(44px, 450px, 56px, 0);
                }

                .glitch::after {
                    left: -2px;
                    text-shadow: 2px 0 #990000;
                    animation: glitch-animation-2 3s infinite linear
                        alternate-reverse;
                    clip: rect(24px, 450px, 100px, 0);
                }

                @keyframes glitch-animation-1 {
                    0% {
                        clip: rect(20px, 450px, 76px, 0);
                    }
                    20% {
                        clip: rect(37px, 450px, 54px, 0);
                    }
                    40% {
                        clip: rect(86px, 450px, 92px, 0);
                    }
                    60% {
                        clip: rect(11px, 450px, 34px, 0);
                    }
                    80% {
                        clip: rect(69px, 450px, 71px, 0);
                    }
                    100% {
                        clip: rect(44px, 450px, 46px, 0);
                    }
                }

                @keyframes glitch-animation-2 {
                    0% {
                        clip: rect(86px, 450px, 98px, 0);
                    }
                    20% {
                        clip: rect(52px, 450px, 74px, 0);
                    }
                    40% {
                        clip: rect(27px, 450px, 31px, 0);
                    }
                    60% {
                        clip: rect(46px, 450px, 96px, 0);
                    }
                    80% {
                        clip: rect(13px, 450px, 59px, 0);
                    }
                    100% {
                        clip: rect(72px, 450px, 74px, 0);
                    }
                }
            `}</style>
        </div>
    )
}
