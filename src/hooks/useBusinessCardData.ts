import { useState, useEffect } from 'react';

export interface BusinessCardItem {
    name: string;
    link?: string;
}

export interface BusinessCardData {
    currentProjects: BusinessCardItem[];
    featuredBlogs: BusinessCardItem[];
}

const FALLBACK_DATA: BusinessCardData = {
    currentProjects: [
        { name: "Learning FP and Scala", link: "https://www.amazon.com/Functional-Programming-Scala-Paul-Chiusano/dp/1617290653" },
        { name: "Resting 😴" }
    ],
    featuredBlogs: [
        { name: "Understanding React Hooks", link: "/blog/understanding-react-hooks" },
        { name: "The Future of AI", link: "/blog/future-of-ai" },
        { name: "Mastering Tailwind CSS", link: "/blog/mastering-tailwind-css" }
    ]
};

const DATA_URL = "https://raw.githubusercontent.com/1nsomnes/portfolio-database/refs/heads/main/business_card.json";

export const useBusinessCardData = () => {
    const [data, setData] = useState<BusinessCardData>(FALLBACK_DATA);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(DATA_URL);
                if (!response.ok) {
                    throw new Error('Failed to fetch business card data');
                }
                const jsonData = await response.json();

                // Validate/Merge with fallback if partial data? 
                // For now assuming clean replacement if successful
                if (jsonData) {
                    setData({
                        currentProjects: Array.isArray(jsonData.currentProjects) ? jsonData.currentProjects : FALLBACK_DATA.currentProjects,
                        featuredBlogs: Array.isArray(jsonData.featuredBlogs) ? jsonData.featuredBlogs : FALLBACK_DATA.featuredBlogs,
                    });
                }
                setError(null);
            } catch (err) {
                console.warn('Failed to fetch business card data, using fallback:', err);
                // Fallback is already initial state
                setError(err instanceof Error ? err.message : 'Unknown error');
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    return { data, isLoading, error };
};
