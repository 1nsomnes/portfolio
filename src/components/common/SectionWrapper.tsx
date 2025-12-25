import type { ReactNode } from 'react';

interface SectionWrapperProps {
    children: ReactNode;
    className?: string;
    id?: string;
}

export default function SectionWrapper({ children, className = '', id = '' }: SectionWrapperProps) {
    return (
        <section id={id} className={`w-full px-6 md:px-12 lg:px-24 py-16 md:py-24 max-w-7xl mx-auto ${className}`}>
            {children}
        </section>
    );
}
