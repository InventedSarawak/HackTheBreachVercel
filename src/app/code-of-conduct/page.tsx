import CodeOfConduct from '@/components/code-of-conduct'
import NavBar from '@/components/navbar'
import Footer from '@/components/footer'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Code of Conduct'
}

export default function CodeOfConductPage() {
    return (
        <div className="cursor-default font-mono select-none">
            <NavBar />
            <CodeOfConduct />
            <Footer />
        </div>
    )
}
