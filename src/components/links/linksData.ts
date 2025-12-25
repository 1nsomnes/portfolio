
export interface LinkData {
    label: string;
    url: string;
    icon?: string; // We can use icon names or components later if needed
    description?: string;
    featured?: boolean;
}

export const links: LinkData[] = [
    {
        label: 'Portfolio',
        url: '/',
        description: '',
        featured: false,
    },
    {
        label: 'Blog',
        url: '/blog',
        description: '',
    },
    {
        label: 'GitHub',
        url: 'https://github.com/1nsomnes',
        description: '',
    },
    {
        label: 'LinkedIn',
        url: 'https://www.linkedin.com/in/cedric-claessens-412414250/',
        description: '',
    }
];
