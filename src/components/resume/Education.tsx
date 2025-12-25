import SectionWrapper from '../common/SectionWrapper';
import type { EducationItem } from './resumeData';

interface EducationProps {
    education: EducationItem[];
}

export default function Education({ education }: EducationProps) {
    return (
        <SectionWrapper id="education" className="bg-neutral-900 !py-6">
            <div className="mb-6">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Education</h2>
                <div className="h-1 w-20 bg-blue-500 rounded-full"></div>
            </div>

            <div className="space-y-8">
                {education.map((edu, index) => (
                    <div key={index} className="flex gap-4 md:gap-6">

                        {/* Left Column: Logo */}
                        <div className="flex flex-col items-center">
                            <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-neutral-800 border border-white/5 flex items-center justify-center text-xl font-bold text-blue-500 z-10 shrink-0 overflow-hidden">
                                {edu.logo.startsWith('http') || edu.logo.startsWith('/') ? (
                                    <img src={edu.logo} alt={edu.school} className="w-full h-full object-cover" />
                                ) : (
                                    edu.logo
                                )}
                            </div>
                        </div>

                        {/* Right Column: Content */}
                        <div className="flex-grow pt-1">
                            <div className="mb-2">
                                <h3 className="text-xl md:text-2xl font-bold text-white">{edu.school}</h3>
                            </div>

                            <div className="relative group">
                                <div>
                                    <h4 className="text-lg font-bold text-gray-200">{edu.degree}</h4>
                                    <div className="text-sm text-gray-400 mb-2 flex flex-wrap gap-x-4">
                                        <span>{edu.period}</span>
                                        <span className="text-gray-600">•</span>
                                        <span>{edu.location}</span>
                                    </div>

                                    {edu.description && edu.description.length > 0 && (
                                        <div className="mt-4">
                                            {edu.description.length === 1 ? (
                                                <p className="text-gray-400 leading-relaxed text-base">
                                                    {edu.description[0]}
                                                </p>
                                            ) : (
                                                <ul className="space-y-2">
                                                    {edu.description.map((item, i) => (
                                                        <li key={i} className="text-gray-400 leading-relaxed text-base flex items-start">
                                                            <span className="mr-2 mt-2 block w-1 h-1 bg-gray-500 rounded-full flex-shrink-0"></span>
                                                            {item}
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </SectionWrapper>
    );
}
