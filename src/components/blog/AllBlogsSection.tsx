import { useState, useMemo } from 'react';
import { useBlogs } from '../../hooks/useBlogs';
import BlogListItem from './BlogListItem';

export default function AllBlogsSection() {
    const { blogs } = useBlogs();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    // Get unique tags
    const allTags = useMemo(() => {
        const tags = new Set<string>();
        blogs.forEach(blog => blog.tags.forEach(tag => tags.add(tag)));
        return Array.from(tags).sort();
    }, [blogs]);

    const filteredBlogs = useMemo(() => {
        return blogs.filter(blog => {
            const matchesSearch =
                blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                blog.desc.toLowerCase().includes(searchQuery.toLowerCase());

            const matchesTags =
                selectedTags.length === 0 ||
                blog.tags.some(tag => selectedTags.includes(tag));

            return matchesSearch && matchesTags;
        }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }, [searchQuery, selectedTags, blogs]);

    const toggleTag = (tag: string) => {
        setSelectedTags(prev =>
            prev.includes(tag)
                ? prev.filter(t => t !== tag)
                : [...prev, tag]
        );
    };

    return (
        <section className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-8 border-l-4 border-purple-500 pl-4">
                All Blogs
            </h2>

            {/* Controls */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
                {/* Search */}
                <div className="relative flex-grow">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <input
                        type="text"
                        placeholder="Search blogs..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-neutral-800 text-white pl-10 pr-4 py-2 rounded-lg border border-white/10 focus:outline-none focus:ring-2 focus:ring-purple-500/50 placeholder-gray-500"
                    />
                </div>

                {/* Filter Dropdown */}
                <div className="relative min-w-[200px]">
                    <button
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="w-full bg-neutral-800 text-white px-4 py-2 rounded-lg border border-white/10 hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-purple-500/50 flex items-center justify-between"
                    >
                        <span className="truncate">
                            {selectedTags.length === 0
                                ? 'Filter by tags'
                                : `${selectedTags.length} selected`}
                        </span>
                        <svg className={`fill-current h-4 w-4 text-gray-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                        </svg>
                    </button>

                    {isDropdownOpen && (
                        <>
                            <div
                                className="fixed inset-0 z-40 bg-transparent"
                                onClick={() => setIsDropdownOpen(false)}
                            />
                            <div className="absolute z-50 mt-1 w-full bg-neutral-800 rounded-lg border border-white/10 shadow-xl max-h-60 overflow-y-auto p-2">
                                {allTags.map(tag => (
                                    <label key={tag} className="flex items-center px-2 py-2 hover:bg-white/5 rounded cursor-pointer group">
                                        <div className={`w-4 h-4 rounded border flex items-center justify-center mr-3 transition-colors ${selectedTags.includes(tag) ? 'bg-purple-500 border-purple-500' : 'border-gray-500 group-hover:border-gray-400'}`}>
                                            {selectedTags.includes(tag) && (
                                                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                                </svg>
                                            )}
                                        </div>
                                        <span className={`text-sm ${selectedTags.includes(tag) ? 'text-white' : 'text-gray-300'}`}>
                                            {tag}
                                        </span>
                                        <input
                                            type="checkbox" // Hidden but accessible
                                            className="hidden"
                                            checked={selectedTags.includes(tag)}
                                            onChange={() => toggleTag(tag)}
                                        />
                                    </label>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>

            {/* Results Box */}
            <div className="h-[600px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-neutral-700 scrollbar-track-neutral-900">
                {filteredBlogs.length > 0 ? (
                    <div className="flex flex-col">
                        {filteredBlogs.map(blog => (
                            <BlogListItem key={blog.slug} blog={blog} />
                        ))}
                    </div>
                ) : (
                    <div className="h-full flex flex-col items-center justify-center text-gray-400">
                        <svg className="w-12 h-12 mb-4 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <p>No blogs found matching your criteria.</p>
                    </div>
                )}
            </div>
        </section>
    );
}
