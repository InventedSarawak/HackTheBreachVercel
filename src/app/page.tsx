import Navbar from '@/components/navbar'
import Hero from '@/components/hero'
import About from '@/components/about'
import Speakers from '@/components/speakers'
import Organizers from '@/components/organizers'
import Footer from '@/components/footer'
import FAQ from '@/components/faq'
import Agenda from '@/components/agenda'
import Hackathon from '@/components/hackathon'
import Sponsors from '@/components/sponsors'
import Thanks from '@/components/thanks'

export default function Home() {
    return (
        <div className="font-mono select-none">
            <Navbar />
            <Hero />
            <About />
            <Thanks />
            <Sponsors />
            <Speakers />
            <Agenda />
            <Organizers />
            <Hackathon />
            <FAQ />
            <Footer />
        </div>
    )
}
