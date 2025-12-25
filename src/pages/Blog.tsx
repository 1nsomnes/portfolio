import RecentBlogsSection from '../components/blog/RecentBlogsSection';
import FilteredBlogsSection from '../components/blog/FilteredBlogsSection';
import AllBlogsSection from '../components/blog/AllBlogsSection';

export default function BlogPage() {
    return (
        <div className="min-h-screen pt-24 pb-20 px-6 md:px-12 lg:px-24">
            <div className="max-w-7xl mx-auto">
                <div className="mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400 mb-4 pb-2">
                        Blog
                    </h1>
                    <p className="text-xl text-gray-400 max-w-2xl">
                        Thoughts, tutorials, and insights on web development, design, and technology.
                    </p>
                </div>

                <RecentBlogsSection />

                <FilteredBlogsSection />

                <AllBlogsSection />
            </div>
        </div>
    );
}
