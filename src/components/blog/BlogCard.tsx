import { Link } from 'react-router-dom';
import type { Blog } from './blogData';

interface BlogCardProps {
    blog: Blog;
}

export default function BlogCard({ blog }: BlogCardProps) {
    return (
        <Link
            to={`/blog/${blog.slug}`}
            className="block w-72 flex-shrink-0 bg-neutral-800 rounded-xl overflow-hidden hover:scale-105 transition-transform duration-300 border border-white/5 cursor-pointer group"
        >
            <div className="h-40 overflow-hidden">
                <img
                    src={blog.coverImg}
                    alt={blog.title}
                    className="w-full h-full object-cover group-hover:opacity-90 transition-opacity"
                />
            </div>
            <div className="p-4">
                <h3 className="text-lg font-bold text-white mb-2 line-clamp-1">{blog.title}</h3>
                <p className="text-gray-400 text-xs mb-3 line-clamp-2">{blog.desc}</p>

                <div className="flex flex-wrap gap-2">
                    {blog.tags.map((tag) => (
                        <span
                            key={tag}
                            className="bg-white/10 text-gray-300 text-[10px] px-2 py-0.5 rounded-full border border-white/5"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
                <div className="mt-3 text-[10px] text-gray-500">
                    {new Date(blog.date).toLocaleDateString()}
                </div>
            </div>
        </Link>
    );
}
