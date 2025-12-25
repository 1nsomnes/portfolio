import SectionWrapper from '../common/SectionWrapper';
import { useState, useMemo, useEffect } from 'react';

interface Project {
    title: string;
    description: string;
    tags: string[];
    selected_tags: string[];
    link: string;
}

const FALLBACK_DATA = {
    projects: [
        {
            title: "E-Commerce Dashboard",
            description: "A comprehensive dashboard for managing online stores, featuring real-time analytics and inventory management.",
            tags: ["React", "TypeScript", "Tailwind", "Recharts"],
            selected_tags: ["Dashboard", "Full Stack"],
            link: "#"
        },
        {
            title: "Task Management App",
            description: "A collaborative task manager with Kanban boards, real-time updates, and team collaboration features.",
            tags: ["Next.js", "Prisma", "PostgreSQL"],
            selected_tags: ["Web App", "Full Stack"],
            link: "#"
        },
        {
            title: "Portfolio Website",
            description: "My personal portfolio website (this one!) built to showcase my projects and skills.",
            tags: ["React", "Vite", "Tailwind v4"],
            selected_tags: ["Website", "Frontend"],
            link: "https://github.com/"
        },
    ]
};

const DATA_URL = "https://raw.githubusercontent.com/1nsomnes/portfolio-database/refs/heads/main/projects.json";

interface ProjectsSectionProps {
    className?: string;
}

export default function ProjectsSection({ className = '' }: ProjectsSectionProps) {
    const [projectsData, setProjectsData] = useState<Project[]>(FALLBACK_DATA.projects);
    const [activeFilter, setActiveFilter] = useState<string | null>(null);

    // Initialize active filter after data is loaded/available
    const allFilters = useMemo(() => {
        const tags = new Set<string>();
        projectsData.forEach(project => {
            project.selected_tags.forEach(tag => tags.add(tag));
        });
        return Array.from(tags);
    }, [projectsData]);

    // Initialize/Ensure active filter is valid
    useEffect(() => {
        if (allFilters.length > 0) {
            if (!activeFilter || !allFilters.includes(activeFilter)) {
                setActiveFilter(allFilters[0]);
            }
        }
    }, [projectsData, allFilters, activeFilter]);


    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await fetch(DATA_URL);
                if (!response.ok) {
                    throw new Error('Failed to fetch projects');
                }
                const data = await response.json();
                if (data && Array.isArray(data.projects)) {
                    setProjectsData(data.projects);
                }
            } catch (error) {
                console.error("Error fetching projects, using fallback:", error);
                // Fallback is already initial state, so valid even if fetch fails
            }
        };

        fetchProjects();
    }, []);



    const filteredProjects = useMemo(() => {
        if (!activeFilter) return projectsData;
        return projectsData.filter(project => project.selected_tags.includes(activeFilter));
    }, [activeFilter, projectsData]);

    const handleFilterClick = (filter: string) => {
        setActiveFilter(current => current === filter ? null : filter);
    };

    return (
        <SectionWrapper id="projects" className={`bg-neutral-900/50 ${className}`}>
            <div className="mb-10">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Selected Projects</h2>
                <div className="h-1 w-20 bg-blue-500 rounded-full mb-6"></div>

                <div className="flex flex-wrap gap-3">
                    {allFilters.map((filter) => (
                        <button
                            key={filter}
                            onClick={() => handleFilterClick(filter)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeFilter === filter
                                ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/25 scale-105'
                                : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                                }`}
                        >
                            {filter}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProjects.map((project, index) => (
                    <a
                        key={index}
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group bg-white/5 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 border border-white/5 hover:border-white/10 block h-full flex flex-col cursor-pointer"
                    >
                        <div className="mb-4">
                            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                                {project.title}
                            </h3>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                {project.description}
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-2 mt-auto">
                            {project.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="px-3 py-1 text-xs font-medium text-blue-300 bg-blue-500/10 rounded-full"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </a>
                ))}
            </div>
        </SectionWrapper>
    );
}
