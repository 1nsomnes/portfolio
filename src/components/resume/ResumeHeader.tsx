import { Link } from 'react-router-dom';
import SectionWrapper from '../common/SectionWrapper';
import type { ResumeData } from './resumeData';

interface ResumeHeaderProps {
    header: ResumeData['header'];
}

export default function ResumeHeader({ header }: ResumeHeaderProps) {
    return (
        <SectionWrapper id="resume-header" className="!py-4">
            <div className="border-b border-white/10 pb-4">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">{header.name}</h1>
                <h2 className="text-xl md:text-2xl text-blue-500 font-medium mb-4">{header.title}</h2>

                <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm md:text-base text-gray-400">
                    <a href={header.linkedIn.startsWith('http') ? header.linkedIn : `https://${header.linkedIn}`} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-2">
                        <span>🔗</span> LinkedIn
                    </a>
                    <div className="flex items-center gap-2">
                        <span>📍</span> {header.location}
                    </div>
                    <Link to="/links" className="hover:text-white transition-colors flex items-center gap-2">
                        <span>📝</span> More Links
                    </Link>
                </div>

                <p className="mt-6 text-gray-300 max-w-3xl leading-relaxed">
                    {header.summary}
                </p>
            </div>
        </SectionWrapper>
    );
}
