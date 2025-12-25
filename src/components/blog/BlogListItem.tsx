import { Link } from 'react-router-dom';
import type { Blog } from './blogData';

interface BlogListItemProps {
    blog: Blog;
}

export default function BlogListItem({ blog }: BlogListItemProps) {
    return (
        <div className="flex flex-col md:flex-row gap-4 group p-4 rounded-lg hover:bg-white/5 transition-colors border-b border-white/5 last:border-0">
            {/* Optional: Thumbnail for visual flair, keeping it small like a news result */}
            <div className="flex-shrink-0 w-full md:w-48 h-32 md:h-28 rounded-lg overflow-hidden hidden md:block">
                <img
                    src={blog.coverImg}
                    alt={blog.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
            </div>

            <div className="flex-grow">
                <div className="flex items-center gap-2 mb-1">
                    <div className="text-xs text-emerald-400 font-mono">
                        portfolio.com/blog/{blog.slug}
                    </div>
                </div>

                <Link
                    to={`/blog/open?id=${blog.slug}`}
                    className="block"
                >
                    <h3 className="text-xl font-medium text-blue-400 hover:underline mb-2">
                        {blog.title}
                    </h3>
                </Link>

                <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                    <span className="text-gray-500 mr-2">
                        {new Date(blog.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })} —
                    </span>
                    {blog.desc}
                </p>

                <div className="flex flex-wrap gap-2">
                    {blog.tags.map((tag) => (
                        <span
                            key={tag}
                            className="text-xs text-gray-500 bg-neutral-800 border border-white/10 px-2 py-0.5 rounded-md"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}
