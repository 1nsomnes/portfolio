import { useState, useEffect } from 'react';

import type { Blog } from '../components/blog/blogData';

export const useBlogs = () => {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await fetch('https://raw.githubusercontent.com/1nsomnes/portfolio-database/refs/heads/main/blogs.json');
                if (!response.ok) {
                    throw new Error('Failed to fetch blogs');
                }
                const data: Blog[] = await response.json();
                setBlogs(data.filter(blog => !blog.hidden));
                setError(null);
            } catch (err) {
                console.error('Failed to fetch blogs:', err);
                setBlogs([]); // Ensure empty on error
                setError(err instanceof Error ? err.message : 'Unknown error');
            } finally {
                setIsLoading(false);
            }
        };

        fetchBlogs();
    }, []);

    return { blogs, isLoading, error };
};
