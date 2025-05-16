'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Logo } from '@/components/logo'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { HyperText } from '@/components/magicui/hyper-text'

const NavBar = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const dialogRef = useRef<HTMLDialogElement>(null)
    const buttonRef = useRef<HTMLButtonElement>(null)
    const navbarRef = useRef<HTMLElement>(null)

    // Track scroll position and visibility states
    const [show, setShow] = useState(true)
    const [lastScrollY, setLastScrollY] = useState(0)
    const [hiddenByClick, setHiddenByClick] = useState(false)
    const [hasScrolledDown, setHasScrolledDown] = useState(false)

    // Control navbar visibility when scrolling
    useEffect(() => {
        const controlNavbar = () => {
            if (typeof window !== 'undefined') {
                // Don't hide when menu is open
                if (mobileMenuOpen) {
                    setShow(true)
                    return
                }

                // Track if user has scrolled down beyond threshold
                if (window.scrollY > 100) {
                    setHasScrolledDown(true)
                }

                // Override hidden state from clicking outside when scrolling up
                if (window.scrollY < lastScrollY) {
                    setHiddenByClick(false)
                }

                // At the top of page, always show navbar and reset states
                if (window.scrollY <= 10) {
                    setShow(true)
                    setHiddenByClick(false)
                    // Only reset hasScrolledDown if we're truly at the top
                    if (window.scrollY === 0) {
                        setHasScrolledDown(false)
                    }
                }
                // Hide navbar when scrolling down beyond threshold
                else if (window.scrollY > lastScrollY && window.scrollY > 100) {
                    setShow(false)
                }
                // When scrolling up, show navbar unless hidden by click
                else {
                    if (!hiddenByClick) {
                        setShow(true)
                    }
                }

                // Update scroll position
                setLastScrollY(window.scrollY)
            }
        }

        window.addEventListener('scroll', controlNavbar)
        return () => {
            window.removeEventListener('scroll', controlNavbar)
        }
    }, [lastScrollY, mobileMenuOpen, hiddenByClick])

    // Handle click outside navbar
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            // Skip if mobile menu is open
            if (mobileMenuOpen) return

            // Skip if at the top of the page and hasn't scrolled down yet
            if (!hasScrolledDown) return

            // Check if click is outside the navbar
            if (
                navbarRef.current &&
                !navbarRef.current.contains(event.target as Node) &&
                // Don't hide if clicking on elements that should show the navbar
                !(event.target as Element).closest('.navbar-reveal-zone')
            ) {
                setHiddenByClick(true)
                setShow(false)
            }
        }

        // Only add listener if in desktop view
        if (typeof window !== 'undefined' && window.innerWidth >= 768) {
            document.addEventListener('mousedown', handleClickOutside)
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [mobileMenuOpen, hasScrolledDown])

    // Handle hover at top to reveal navbar
    const handleTopHover = () => {
        setHiddenByClick(false)
        setShow(true)
    }

    // Handle dialog open/close
    useEffect(() => {
        if (!dialogRef.current) return

        if (mobileMenuOpen) {
            // Open the dialog
            dialogRef.current.showModal()
            // Prevent body scrolling
            document.body.style.overflow = 'hidden'
        } else if (dialogRef.current.open) {
            // Close animation
            const dialog = dialogRef.current
            dialog.classList.add('closing')

            setTimeout(() => {
                dialog.close()
                dialog.classList.remove('closing')
                // Restore scrolling
                document.body.style.overflow = ''
            }, 300)
        }

        return () => {
            document.body.style.overflow = ''
        }
    }, [mobileMenuOpen])

    const characterSet = [
        'a',
        'b',
        'c',
        'd',
        'e',
        'f',
        'g',
        'h',
        'i',
        'j',
        'k',
        'l',
        'm',
        'n',
        'o',
        'p',
        'q',
        'r',
        's',
        't',
        'u',
        'v',
        'w',
        'x',
        'y',
        'z'
    ]

    return (
        <>
            {/* Navbar reveal zone - only visible when navbar is hidden */}
            <div
                className={`navbar-reveal-zone fixed top-0 right-0 left-0 z-40 h-4 ${show ? 'hidden' : 'block'}`}
                onMouseEnter={handleTopHover}
            />

            <header
                ref={navbarRef}
                className={`sticky top-0 right-0 left-0 z-50 transition-transform duration-300 ${
                    show ? 'translate-y-2' : '-translate-y-full'
                } bg-background/80 mx-2 flex flex-row items-center justify-between rounded-xl border border-zinc-800 px-8 py-2 backdrop-blur-md`}
            >
                <Link href={'/'}>
                    <Logo alt="Hack The Breach Logo" />
                </Link>

                {/* Desktop Navigation - Changed from md to lg breakpoint */}
                <div className="hidden items-center lg:flex lg:space-x-4 xl:space-x-8">
                    <Link
                        className="hover:text-primary text-base transition-colors"
                        href="/#about"
                    >
                        <HyperText characterSet={characterSet} delay={170}>
                            /about
                        </HyperText>
                    </Link>
                    <Link
                        className="hover:text-primary text-base transition-colors"
                        href="/#speakers"
                    >
                        <HyperText characterSet={characterSet} delay={340}>
                            /speakers
                        </HyperText>
                    </Link>
                    <Link
                        className="hover:text-primary text-base transition-colors"
                        href="/#agenda"
                    >
                        <HyperText characterSet={characterSet} delay={510}>
                            /agenda
                        </HyperText>
                    </Link>
                    <Link
                        className="hover:text-primary text-base transition-colors"
                        href="/#organizers"
                    >
                        <HyperText characterSet={characterSet} delay={680}>
                            /organizers
                        </HyperText>
                    </Link>
                    <Link
                        className="hover:text-primary text-base transition-colors"
                        href="https://ctf.hackthebreach.xyz"
                    >
                        <HyperText characterSet={characterSet} delay={850}>
                            /ctf
                        </HyperText>
                    </Link>
                    <Link
                        className="hover:text-primary text-base transition-colors"
                        href="/#faq"
                    >
                        <HyperText characterSet={characterSet} delay={850}>
                            /faq
                        </HyperText>
                    </Link>
                    <Link href={'/register/closed'}>
                        <Button className="ml-3 cursor-pointer text-base">
                            Register
                        </Button>
                    </Link>
                </div>

                {/* Mobile Menu Button - Changed from md to lg breakpoint */}
                <div className="flex items-center lg:hidden">
                    <Button
                        variant="ghost"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="p-2"
                        ref={buttonRef}
                    >
                        {mobileMenuOpen ? (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="rotate-90 transition-transform duration-300"
                            >
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        ) : (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="transition-transform duration-300"
                            >
                                <line x1="3" y1="12" x2="21" y2="12"></line>
                                <line x1="3" y1="6" x2="21" y2="6"></line>
                                <line x1="3" y1="18" x2="21" y2="18"></line>
                            </svg>
                        )}
                    </Button>
                </div>

                {/* Mobile Menu Dialog */}
                <dialog
                    ref={dialogRef}
                    className="fixed inset-0 z-50 m-0 w-full max-w-full bg-transparent p-0 text-white backdrop:bg-black/50 backdrop:backdrop-blur-md lg:hidden"
                    data-backdrop="true"
                    onClick={(e) => {
                        const target = e.target as HTMLElement
                        // Only close if clicking on an element with data-backdrop attribute
                        if (target.hasAttribute('data-backdrop')) {
                            setMobileMenuOpen(false)
                        }
                    }}
                >
                    {/* Dialog content */}
                    <div className="animate-in bg-background/80 slide-in-from-top mx-2 mt-20 rounded-xl border border-zinc-800 p-4 shadow-lg backdrop-blur-md duration-300">
                        <div className="flex flex-col gap-4">
                            <Link
                                className="hover:bg-muted animate-in fade-in slide-in-from-bottom-2 rounded-md px-4 py-2 transition-all delay-[50ms] duration-200 hover:translate-x-1 hover:transition-none hover:duration-75"
                                href="/#about"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                About
                            </Link>
                            <Link
                                className="hover:bg-muted animate-in fade-in slide-in-from-bottom-2 rounded-md px-4 py-2 transition-all delay-[100ms] duration-200 hover:translate-x-1 hover:transition-none hover:duration-75"
                                href="/#speakers"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Speakers
                            </Link>
                            <Link
                                className="hover:bg-muted animate-in fade-in slide-in-from-bottom-2 rounded-md px-4 py-2 transition-all delay-[150ms] duration-200 hover:translate-x-1 hover:transition-none hover:duration-75"
                                href="/#agenda"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Agenda
                            </Link>
                            <Link
                                className="hover:bg-muted animate-in fade-in slide-in-from-bottom-2 rounded-md px-4 py-2 transition-all delay-[200ms] duration-200 hover:translate-x-1 hover:transition-none hover:duration-75"
                                href="/#organizers"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Organizers
                            </Link>
                            <Link
                                className="hover:bg-muted animate-in fade-in slide-in-from-bottom-2 rounded-md px-4 py-2 transition-all delay-[250ms] duration-200 hover:translate-x-1 hover:transition-none hover:duration-75"
                                href="/#hackathon"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Hackathon
                            </Link>
                            <Link
                                className="hover:bg-muted animate-in fade-in slide-in-from-bottom-2 rounded-md px-4 py-2 transition-all delay-[250ms] duration-200 hover:translate-x-1 hover:transition-none hover:duration-75"
                                href="/#faq"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                FAQ
                            </Link>
                            <Link
                                href={'/register/closed'}
                                className="hover:bg-muted animate-in fade-in slide-in-from-bottom-2 cursor-default rounded-md px-4 py-2 transition-all delay-[300ms] duration-200 hover:translate-x-1 hover:transition-none hover:duration-75"
                            >
                                <Button
                                    className="animate-in fade-in slide-in-from-bottom-2 mt-2 cursor-pointer transition-all delay-[300ms] duration-200 hover:scale-105 hover:transition-none hover:duration-75"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Register
                                </Button>
                            </Link>
                        </div>
                    </div>
                </dialog>

                {/* Add global styling for dialog */}
                <style jsx global>{`
                    dialog {
                        border: none;
                        padding: 0;
                        overflow: visible;
                    }

                    dialog::backdrop {
                        background-color: rgba(0, 0, 0, 0.5);
                        backdrop-filter: blur(4px);
                        transition: opacity 0.3s ease;
                    }

                    dialog.closing::backdrop {
                        opacity: 0;
                    }

                    dialog.closing > div {
                        transform: translateY(-10px) scale(0.95);
                        opacity: 0;
                    }

                    dialog > div {
                        transition: all 0.3s ease;
                    }
                `}</style>
            </header>
        </>
    )
}

export default NavBar
