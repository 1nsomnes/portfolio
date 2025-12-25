import { useBlogs } from '../../hooks/useBlogs';
import BlogCarousel from './BlogCarousel';

const MAX_RECENT_ITEMS = 5;

export default function RecentBlogsSection() {
    const { blogs } = useBlogs();
    // Sort by date descending
    const sortedBlogs = [...blogs].sort((a, b) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    const recentBlogs = sortedBlogs.slice(0, MAX_RECENT_ITEMS);

    return (
        <section className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-8 border-l-4 border-blue-500 pl-4">
                Recent Blogs
            </h2>
            <BlogCarousel blogs={recentBlogs} />
        </section>
    );
}
