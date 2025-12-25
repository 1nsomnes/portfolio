import SectionWrapper from '../common/SectionWrapper';
import { Link } from 'react-router-dom';
import { useBusinessCardData } from '../../hooks/useBusinessCardData';
import type { BusinessCardItem } from '../../hooks/useBusinessCardData';

export default function BusinessCard() {
    const { data } = useBusinessCardData();
    const { currentProjects, featuredBlogs } = data;

    const renderItem = (item: BusinessCardItem, index: number) => {
        const isExternal = item.link?.startsWith('http');
        const LinkComponent = isExternal ? 'a' : Link;
        const linkProps = isExternal
            ? { href: item.link, target: '_blank', rel: 'noopener noreferrer' }
            : { to: item.link || '#' };

        return (
            <li key={index}>
                {item.link ? (
                    // @ts-ignore - Dynamic component prop types
                    <LinkComponent
                        {...linkProps}
                        className="flex items-center gap-3 group text-neutral-400 hover:text-blue-400 transition-colors"
                    >
                        <span className="w-1.5 h-1.5 rounded-full bg-neutral-600 group-hover:bg-blue-400 transition-colors"></span>
                        <span className="underline decoration-neutral-700 group-hover:decoration-blue-400/50 underline-offset-4 transition-all line-clamp-1">
                            {item.name}
                        </span>
                    </LinkComponent>
                ) : (
                    <div className="flex items-center gap-3 text-neutral-500">
                        <span className="w-1.5 h-1.5 rounded-full bg-neutral-700"></span>
                        <span>
                            {item.name}
                        </span>
                    </div>
                )}
            </li>
        );
    };

    return (
        <SectionWrapper className="min-h-[80vh] flex items-center justify-center p-4">
            <div className="w-full max-w-4xl bg-neutral-800/50 backdrop-blur-md border border-neutral-700/50 rounded-2xl shadow-2xl overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-2">
                    {/* Left Column - Personal Info */}
                    <div className="p-8 md:p-12 flex flex-col justify-center space-y-8 border-b md:border-b-0 md:border-r border-neutral-700/50">
                        <div className="space-y-2">
                            <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
                                Cedric
                            </h1>
                            <p className="text-blue-400 font-medium text-lg tracking-wide uppercase">
                                Software Engineer
                            </p>
                        </div>

                        <div className="w-16 h-1 bg-neutral-700 rounded-full"></div>

                        <p className="text-neutral-300 leading-relaxed text-base md:text-lg">
                            Professional software engineer. Studying computer science and mathematics.
                        </p>

                        <div className="flex flex-wrap gap-4 pt-2">
                            <Link
                                to="/resume"
                                className="px-6 py-2.5 bg-neutral-700 text-white font-medium rounded-full hover:bg-neutral-600 transition-colors text-sm w-full md:w-auto text-center"
                            >
                                Resume
                            </Link>
                            <Link
                                to="/blog"
                                className="px-6 py-2.5 bg-neutral-700 text-white font-medium rounded-full hover:bg-neutral-600 transition-colors text-sm w-full md:w-auto text-center"
                            >
                                Blog
                            </Link>
                        </div>
                    </div>

                    {/* Right Column - Updates */}
                    <div className="p-8 md:p-12 bg-neutral-900/30 flex flex-col justify-center space-y-10">
                        {/* Current Projects */}
                        <div className="space-y-4">
                            <h2 className="text-xl font-bold text-white">
                                Current Projects
                            </h2>
                            <ul className="space-y-3">
                                {currentProjects.map(renderItem)}
                            </ul>
                        </div>

                        {/* Featured Blogs */}
                        <div className="space-y-4">
                            <h2 className="text-xl font-bold text-white">
                                Featured Blogs
                            </h2>
                            {featuredBlogs.length > 0 ? (
                                <ul className="space-y-3">
                                    {featuredBlogs.map(renderItem)}
                                </ul>
                            ) : (
                                <div className="p-4 rounded-xl bg-neutral-800/50 border border-neutral-700/30 border-dashed text-center">
                                    <p className="text-neutral-500 text-sm italic">
                                        No results for now
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </SectionWrapper>
    );
}
