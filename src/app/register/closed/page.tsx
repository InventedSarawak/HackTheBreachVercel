import RegistrationsFilled from '@/components/registrations-filled'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Registrations Closed'
}

export default function RegistrationsClosedPage() {
    return (
        <div className="font-mono select-none">
            <RegistrationsFilled />
        </div>
    )
}
