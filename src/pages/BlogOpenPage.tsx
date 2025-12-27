import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

export default function BlogOpenPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) {
            navigate('/blog');
            return;
        }

        const fetchBlogContent = async () => {
            try {
                const response = await fetch(`https://raw.githubusercontent.com/1nsomnes/portfolio-database/refs/heads/main/blogs/${id}.md`);
                if (!response.ok) {
                    throw new Error('Failed to load blog content');
                }
                const text = await response.text();
                setContent(text);
                setError(null);
            } catch (err) {
                console.error('Error fetching blog content:', err);
                setError('Failed to load blog content. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchBlogContent();
    }, [id, navigate]);

    if (loading) {
        return (
            <div className="min-h-screen pt-24 pb-20 px-6 flex items-center justify-center">
                <div className="text-white text-xl animate-pulse">Loading...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen pt-24 pb-20 px-6 flex flex-col items-center justify-center gap-4">
                <div className="text-red-400 text-xl">{error}</div>
                <button
                    onClick={() => navigate('/blog')}
                    className="px-6 py-2 bg-neutral-800 text-white rounded-lg hover:bg-neutral-700 transition-colors"
                >
                    Back to Blog
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-24 pb-20 px-6 md:px-12 lg:px-24">
            <article className="max-w-4xl mx-auto prose prose-invert prose-lg">
                <button
                    onClick={() => navigate('/blog')}
                    className="mb-8 flex items-center gap-2 text-gray-400 hover:text-white transition-colors no-underline"
                >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back to Blogs
                </button>

                <ReactMarkdown
                    components={{
                        // Custom styling for markdown elements if needed
                        h1: ({ node, ...props }) => <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400 mb-8 pb-2" {...props} />,
                        h2: ({ node, ...props }) => <h2 className="text-3xl font-bold text-white mt-8 mb-4 border-b border-white/10 pb-2" {...props} />,
                        h3: ({ node, ...props }) => <h3 className="text-2xl font-semibold text-blue-400 mt-6 mb-3" {...props} />,
                        a: ({ node, ...props }) => <a className="text-blue-400 hover:text-blue-300 transition-colors" {...props} />,
                        img: ({ node, ...props }) => <img className="rounded-xl border border-white/10 my-4" {...props} />,
                        p: ({ node, ...props }) => <p className="text-lg md:text-xl text-gray-300 mb-6 leading-relaxed" {...props} />,
                        pre: ({ node, ...props }) => <pre className="bg-neutral-900/50 border border-white/10 p-4 rounded-xl overflow-x-auto my-4" {...props} />,
                    }}
                >
                    {content}
                </ReactMarkdown>
            </article>
        </div>
    );
}
