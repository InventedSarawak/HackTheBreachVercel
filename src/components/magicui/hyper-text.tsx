'use client'

import { cn } from '@/lib/utils'
import { motion, MotionProps } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

type CharacterSet = string[] | readonly string[]

interface HyperTextProps extends MotionProps {
    /** The text content to be animated */
    children: string
    /** Optional className for styling */
    className?: string
    /** Duration of the animation in milliseconds */
    duration?: number
    /** Delay before animation starts in milliseconds */
    delay?: number
    /** Component to render as - defaults to div */
    as?: React.ElementType
    /** Whether to start animation when element comes into view */
    startOnView?: boolean
    /** Whether to trigger animation on hover */
    animateOnHover?: boolean
    /** Custom character set for scramble effect. Defaults to uppercase alphabet */
    characterSet?: CharacterSet
}

const DEFAULT_CHARACTER_SET = Object.freeze(
    'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
) as readonly string[]

const getRandomInt = (max: number): number => Math.floor(Math.random() * max)

export function HyperText({
    children,
    className,
    duration = 1400,
    delay = 0,
    startOnView = false,
    animateOnHover = true,
    characterSet = DEFAULT_CHARACTER_SET,
    ...props
}: HyperTextProps) {
    // Split the original text
    const originalText = children.split('')

    // Animation and state tracking
    const [displayText, setDisplayText] = useState<string[]>(originalText)
    const [isAnimating, setIsAnimating] = useState(false)
    const [initialAnimationComplete, setInitialAnimationComplete] =
        useState(false)
    const [isHovering, setIsHovering] = useState(false)
    const elementRef = useRef<HTMLDivElement>(null)
    const iterationCount = useRef(0)

    // Handle hover animation trigger
    const handleMouseEnter = () => {
        if (!animateOnHover || isAnimating) return

        setIsHovering(true)
        setIsAnimating(true)
        iterationCount.current = 0
    }

    const handleMouseLeave = () => {
        setIsHovering(false)
    }

    // Handle initial animation on view or delay
    useEffect(() => {
        if (initialAnimationComplete || isAnimating) return

        if (!startOnView) {
            if (delay > 0) {
                const startTimeout = setTimeout(() => {
                    setIsAnimating(true)
                }, delay)
                return () => clearTimeout(startTimeout)
            }
            return
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (
                    entry.isIntersecting &&
                    !initialAnimationComplete &&
                    !isAnimating
                ) {
                    setTimeout(() => {
                        setIsAnimating(true)
                    }, delay)
                    observer.disconnect()
                }
            },
            { threshold: 0.1 }
        )

        if (elementRef.current) {
            observer.observe(elementRef.current)
        }

        return () => observer.disconnect()
    }, [delay, startOnView, initialAnimationComplete, isAnimating])

    // Handle scramble animation
    useEffect(() => {
        if (!isAnimating) return

        const maxIterations = children.length
        const intervalDuration = Math.min(duration / (maxIterations * 10), 50)

        const interval = setInterval(() => {
            if (iterationCount.current < maxIterations) {
                setDisplayText((currentText) =>
                    currentText.map((letter, index) => {
                        if (letter === ' ') return ' '

                        // Fix the letter if we've passed its position
                        if (index <= iterationCount.current) {
                            return originalText[index]
                        }

                        // Otherwise scramble it
                        return characterSet[getRandomInt(characterSet.length)]
                    })
                )
                iterationCount.current += 0.5 // Speed up the animation
            } else {
                // Animation complete
                setDisplayText(originalText)
                setIsAnimating(false)

                // If this was the initial animation (not from hover), mark it complete
                if (!isHovering) {
                    setInitialAnimationComplete(true)
                }

                clearInterval(interval)
            }
        }, intervalDuration)

        return () => clearInterval(interval)
    }, [
        isAnimating,
        children,
        characterSet,
        duration,
        originalText,
        isHovering
    ])

    return (
        <motion.div
            ref={elementRef}
            className={cn('relative', className)}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            {...props}
        >
            {/* Original text - invisible but clickable */}
            <span className="invisible">{children}</span>

            {/* Animated text - visible but not clickable (overlaid on top) */}
            <span
                className="pointer-events-none absolute top-0 left-0"
                aria-hidden="true"
            >
                {displayText.map((char, i) => (
                    <span
                        key={i}
                        className={char === ' ' ? 'inline-block w-[0.3em]' : ''}
                    >
                        {char}
                    </span>
                ))}
            </span>
        </motion.div>
    )
}
