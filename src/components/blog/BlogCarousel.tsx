import { useRef, useState } from 'react';
import type { Blog } from './blogData';
import BlogCard from './BlogCard';

interface BlogCarouselProps {
    blogs: Blog[];
    title?: string; // Optional title for the carousel itself, though sections might handle headers
}

export default function BlogCarousel({ blogs }: BlogCarouselProps) {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [isMouseDown, setIsMouseDown] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const [isDragging, setIsDragging] = useState(false);

    if (blogs.length === 0) {
        return <div className="text-gray-400 italic">No blogs found.</div>;
    }

    const handleMouseDown = (e: React.MouseEvent) => {
        if (!scrollRef.current) return;
        setIsMouseDown(true);
        setIsDragging(false);
        setStartX(e.pageX - scrollRef.current.offsetLeft);
        setScrollLeft(scrollRef.current.scrollLeft);
    };

    const handleMouseLeave = () => {
        setIsMouseDown(false);
        setIsDragging(false);
    };

    const handleMouseUp = () => {
        setIsMouseDown(false);
        // We keep isDragging true briefly to block the click, then reset it
        setTimeout(() => setIsDragging(false), 50);
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isMouseDown || !scrollRef.current) return;
        e.preventDefault();
        const x = e.pageX - scrollRef.current.offsetLeft;
        const walk = (x - startX) * 2; // Scroll-fast
        scrollRef.current.scrollLeft = scrollLeft - walk;

        // If moved more than a few pixels, consider it a drag
        if (Math.abs(x - startX) > 5) {
            setIsDragging(true);
        }
    };

    const handleCaptureClick = (e: React.MouseEvent) => {
        if (isDragging) {
            e.preventDefault();
            e.stopPropagation();
        }
    };

    return (
        <div className="relative">
            {/* Gradient fade on the right to indicate more content */}
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-neutral-900 to-transparent pointer-events-none z-10 hidden md:block" />

            <div
                ref={scrollRef}
                className="flex gap-4 overflow-x-auto pb-4 pt-2 scrollbar-hide px-1 snap-x cursor-grab active:cursor-grabbing select-none"
                onMouseDown={handleMouseDown}
                onMouseLeave={handleMouseLeave}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}
                onClickCapture={handleCaptureClick}
            >
                {blogs.map((blog) => (
                    <div key={blog.slug} className="snap-start pointer-events-auto">
                        <BlogCard blog={blog} />
                    </div>
                ))}
            </div>
        </div>
    );
}
