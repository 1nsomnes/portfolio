import { useState, useEffect } from 'react';
import { blogs as localBlogs } from '../components/blog/blogData';
import type { Blog } from '../components/blog/blogData';

export const useBlogs = () => {
    const [blogs, setBlogs] = useState<Blog[]>(localBlogs);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await fetch('https://raw.githubusercontent.com/1nsomnes/portfolio-database/refs/heads/main/blogs.json');
                if (!response.ok) {
                    throw new Error('Failed to fetch blogs');
                }
                const data = await response.json();
                setBlogs(data);
                setError(null);
            } catch (err) {
                console.warn('Failed to fetch blogs, using local fallback:', err);
                setBlogs(localBlogs); // Fallback to local data
                setError(err instanceof Error ? err.message : 'Unknown error');
            } finally {
                setIsLoading(false);
            }
        };

        fetchBlogs();
    }, []);

    return { blogs, isLoading, error };
};
