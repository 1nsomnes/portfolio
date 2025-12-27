import { useState, useMemo, useEffect } from 'react';
import { useBlogs } from '../../hooks/useBlogs';
import BlogCarousel from './BlogCarousel';

export default function FilteredBlogsSection() {
    const { blogs } = useBlogs();

    // Get unique tags
    const allTags = useMemo(() => {
        const tags = new Set<string>();
        blogs.forEach(blog => blog.tags.forEach(tag => tags.add(tag)));
        return Array.from(tags).sort();
    }, [blogs]);

    const [selectedTag, setSelectedTag] = useState<string>(allTags[0] || 'Tech');
    const [isOpen, setIsOpen] = useState(false);

    // Update selected tag if current selection is invalid or empty when tags are available
    useEffect(() => {
        if (allTags.length > 0 && !allTags.includes(selectedTag)) {
            setSelectedTag(allTags[0]);
        }
    }, [allTags, selectedTag]);

    const filteredBlogs = useMemo(() => {
        return blogs
            .filter(blog => blog.tags.includes(selectedTag))
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }, [selectedTag]);

    return (
        <section className="mb-12">
            <div className="flex flex-col md:flex-row md:items-center gap-4 mb-8">
                <h2 className="text-3xl font-bold text-white flex items-center gap-3">
                    <span className="border-l-4 border-emerald-500 pl-4">Blogs about</span>

                    <div className="relative inline-block">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="bg-neutral-800 text-emerald-400 font-bold py-1 px-4 pr-10 rounded-lg border border-white/10 hover:bg-neutral-700 cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-500/50 flex items-center relative"
                        >
                            {selectedTag}
                            <div className="absolute right-0 top-0 bottom-0 flex items-center px-2 text-emerald-400 pointer-events-none">
                                <svg className={`fill-current h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                </svg>
                            </div>
                        </button>

                        {isOpen && (
                            <div className="absolute z-50 mt-1 w-full min-w-[150px] bg-neutral-800 rounded-lg border border-white/10 shadow-xl overflow-hidden py-1 max-h-60 overflow-y-auto">
                                {allTags.map(tag => (
                                    <button
                                        key={tag}
                                        onClick={() => {
                                            setSelectedTag(tag);
                                            setIsOpen(false);
                                        }}
                                        className={`w-full text-left px-4 py-2 hover:bg-white/5 transition-colors text-sm font-medium ${selectedTag === tag ? 'text-emerald-400 bg-white/5' : 'text-gray-300'
                                            }`}
                                    >
                                        {tag}
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* Backdrop to close when clicking outside */}
                        {isOpen && (
                            <div
                                className="fixed inset-0 z-40 bg-transparent"
                                onClick={() => setIsOpen(false)}
                            />
                        )}
                    </div>
                </h2>
            </div>

            <BlogCarousel blogs={filteredBlogs} />
        </section>
    );
}
