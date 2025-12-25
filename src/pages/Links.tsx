import { useLinks } from '../hooks/useLinks';

export default function LinksPage() {
    const { links, isLoading } = useLinks();

    if (isLoading) {
        return (
            <div className="min-h-screen pt-36 pb-12 px-4 flex justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-36 pb-12 px-4 max-w-md mx-auto flex flex-col items-center">
            <div className="text-center mb-8 space-y-3">
                <h1 className="text-3xl font-bold tracking-tight">Cédric Claessens</h1>
                <p className="text-neutral-400 max-w-sm mx-auto text-sm">
                    Some more of my links, check it out!
                </p>
            </div>

            <div className="w-full space-y-3">
                {links.map((link, index) => (
                    <a
                        key={index}
                        href={link.url}
                        target={link.url.startsWith('http') || link.url.startsWith('mailto') ? '_blank' : undefined}
                        rel={link.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className={`
              block w-full p-3 rounded-xl border transition-all duration-300 transform hover:-translate-y-1
              ${link.featured
                                ? 'bg-white text-black border-white hover:bg-neutral-200 hover:border-neutral-200'
                                : 'bg-neutral-800/50 border-neutral-700 text-white hover:bg-neutral-800 hover:border-neutral-500'
                            }
            `}
                    >
                        <div className="flex items-center justify-center relative">
                            <div className="text-center">
                                <div className="font-semibold">{link.label}</div>
                                {link.description && (
                                    <div className={`text-xs mt-0.5 ${link.featured ? 'text-neutral-600' : 'text-neutral-400'}`}>
                                        {link.description}
                                    </div>
                                )}
                            </div>
                        </div>
                    </a>
                ))}
            </div>
        </div>
    );
}
