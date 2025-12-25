import { useState, useEffect } from 'react';
import { links as localLinks } from '../components/links/linksData';
import type { LinkData } from '../components/links/linksData';

export const useLinks = () => {
    const [links, setLinks] = useState<LinkData[]>(localLinks);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchLinks = async () => {
            try {
                const response = await fetch('https://raw.githubusercontent.com/1nsomnes/portfolio-database/refs/heads/main/links.json');
                if (!response.ok) {
                    throw new Error('Failed to fetch links');
                }
                const data = await response.json();
                setLinks(data);
                setError(null);
            } catch (err) {
                console.warn('Failed to fetch links, using local fallback:', err);
                setLinks(localLinks); // Fallback to local data
                setError(err instanceof Error ? err.message : 'Unknown error');
            } finally {
                setIsLoading(false);
            }
        };

        fetchLinks();
    }, []);

    return { links, isLoading, error };
};
