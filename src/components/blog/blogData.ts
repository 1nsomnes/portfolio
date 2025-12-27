export interface Blog {
    slug: string;
    coverImg: string;
    title: string;
    desc: string;
    date: string;
    tags: string[];
    hidden: boolean;
}

export const blogs: Blog[] = [
    {
        slug: 'how-to-use-vite',
        coverImg: 'https://images.unsplash.com/photo-1628233306632-613dbe6addc2?q=80&w=1000&auto=format&fit=crop',
        title: 'How to use Vite',
        desc: 'Learn how to set up a React project with Vite for lightning-fast development.',
        date: '2024-12-23',
        tags: ['Tech', 'React', 'Tooling'],
        hidden: false
    },
    {
        slug: 'understanding-react-hooks',
        coverImg: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=1000&auto=format&fit=crop',
        title: 'Understanding React Hooks',
        desc: 'A deep dive into useState, useEffect, and custom hooks.',
        date: '2024-11-15',
        tags: ['Tech', 'React'],
        hidden: false
    },
    {
        slug: 'future-of-ai',
        coverImg: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1000&auto=format&fit=crop',
        title: 'The Future of AI',
        desc: 'Exploring the impact of artificial intelligence on software development.',
        date: '2024-10-05',
        tags: ['Tech', 'AI', 'Future'],
        hidden: false
    },
    {
        slug: 'typography-in-web-design',
        coverImg: 'https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=1000&auto=format&fit=crop',
        title: 'Typography in Web Design',
        desc: 'Why fonts matter and how to choose the right ones for your project.',
        date: '2024-09-20',
        tags: ['Design', 'UI/UX'],
        hidden: false
    },
    {
        slug: 'mastering-tailwind-css',
        coverImg: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1000&auto=format&fit=crop',
        title: 'Mastering Tailwind CSS',
        desc: 'Tips and tricks for building beautiful implementations faster with Tailwind.',
        date: '2024-08-10',
        tags: ['Tech', 'CSS', 'Design'],
        hidden: false
    },
    {
        slug: 'politics-and-tech',
        coverImg: 'https://images.unsplash.com/photo-1529101091760-61df6e24080e?q=80&w=1000&auto=format&fit=crop',
        title: 'Politics and Tech',
        desc: 'How technology influences modern political landscapes.',
        date: '2024-07-01',
        tags: ['Politics', 'Tech'],
        hidden: false
    }
];
