import { useState, useEffect } from 'react';
import { resumeData } from '../components/resume/resumeData';
import type { ResumeData } from '../components/resume/resumeData';

const RESUME_API_URL = 'https://raw.githubusercontent.com/1nsomnes/portfolio-database/refs/heads/main/resume.json';

export function useResume() {
    const [data, setData] = useState<ResumeData>(resumeData);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        async function fetchResume() {
            try {
                const response = await fetch(RESUME_API_URL);
                if (!response.ok) {
                    throw new Error('Failed to fetch resume data');
                }
                const jsonData = await response.json();
                setData(jsonData);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching resume data:', err);
                setError(err instanceof Error ? err : new Error('Unknown error'));
                setLoading(false);
                // Keep using fallback data (resumeData) which is already set as initial state
            }
        }

        fetchResume();
    }, []);

    return { data, loading, error };
}
