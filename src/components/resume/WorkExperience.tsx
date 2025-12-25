import SectionWrapper from '../common/SectionWrapper';
import type { Company } from './resumeData';

interface WorkExperienceProps {
    experience: Company[];
}

export default function WorkExperience({ experience }: WorkExperienceProps) {
    return (
        <SectionWrapper id="experience" className="bg-neutral-900 !py-6">
            <div className="mb-6">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Experience</h2>
                <div className="h-1 w-20 bg-blue-500 rounded-full"></div>
            </div>

            <div className="space-y-8">
                {experience.map((company, companyIndex) => (
                    <div key={companyIndex} className="flex gap-4 md:gap-6">

                        {/* Left Column: Logo & Timeline */}
                        <div className="flex flex-col items-center">
                            {/* Company Logo */}
                            <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-neutral-800 border border-white/5 flex items-center justify-center text-xl font-bold text-blue-500 z-10 shrink-0 overflow-hidden">
                                {company.logo.startsWith('http') || company.logo.startsWith('/') ? (
                                    <img src={company.logo} alt={company.name} className="w-full h-full object-cover" />
                                ) : (
                                    company.logo
                                )}
                            </div>

                            {/* Continuous vertical line if multiple roles or connecting to next */}
                            {/* Only show line if there are multiple roles to connect OR if we want a global timeline. 
                  LinkedIn connects roles within a company. Let's do that. */}
                            {company.roles.length > 1 && (
                                <div className="w-0.5 bg-neutral-800 flex-grow mt-2 mb-2"></div>
                            )}
                        </div>

                        {/* Right Column: Content */}
                        <div className="flex-grow pt-1">
                            <div className="mb-6">
                                <h3 className="text-xl md:text-2xl font-bold text-white">{company.name}</h3>
                                {company.totalPeriod && (
                                    <div className="text-sm text-gray-500">{company.totalPeriod}</div>
                                )}
                            </div>

                            <div className="space-y-6">
                                {company.roles.map((role, roleIndex) => (
                                    <div key={roleIndex} className="relative group">

                                        {/* Role Node on Timeline (if multiple roles) */}
                                        {company.roles.length > 1 && (
                                            <div className="absolute -left-[33px] md:-left-[41px] top-1.5 w-3 h-3 bg-neutral-600 rounded-full border-2 border-neutral-900 group-hover:bg-blue-500 transition-colors"></div>
                                        )}

                                        <div>
                                            <h4 className="text-lg font-bold text-gray-200">{role.title}</h4>
                                            <div className="text-sm text-gray-400 mb-3 flex flex-wrap gap-x-4">
                                                <span>{role.period}</span>
                                                {role.location && (
                                                    <>
                                                        <span className="text-gray-600">•</span>
                                                        <span>{role.location}</span>
                                                    </>
                                                )}
                                            </div>

                                            {role.description.length === 1 ? (
                                                <p className="text-gray-400 leading-relaxed text-base">
                                                    {role.description[0]}
                                                </p>
                                            ) : (
                                                <ul className="space-y-2">
                                                    {role.description.map((item, i) => (
                                                        <li key={i} className="text-gray-400 leading-relaxed text-base flex items-start">
                                                            <span className="mr-2 mt-2 block w-1 h-1 bg-gray-500 rounded-full flex-shrink-0"></span>
                                                            {item}
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </SectionWrapper>
    );
}
