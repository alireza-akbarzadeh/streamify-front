import { useStore } from '@tanstack/react-store';
import { Film, Heart, LayoutGrid, Music, Play, Sparkles, User } from 'lucide-react';
import type { ReactNode } from 'react';
import { actions, blogStore } from '@/domains/blog/blog.store';
import { MOCK_ARTICLES } from '@/domains/blog/blog-mock';


const CATEGORIES = [
    { id: 'all', label: 'All Stories', icon: LayoutGrid },
    { id: 'music', label: 'Music Stories', icon: Music },
    { id: 'movies', label: 'Movie Reviews', icon: Film },
    { id: 'artists', label: 'Artist Spotlights', icon: User },
    { id: 'behind', label: 'Behind the Scenes', icon: Play },
];

interface BlogLayoutProps {
    children: ReactNode
}
export function BlogLayout(props: BlogLayoutProps) {
    const { children } = props
    const activeCategory = useStore(blogStore, (s) => s.activeCategory);
    const bookmarks = useStore(blogStore, (s) => s.bookmarks);
    const likes = useStore(blogStore, (s) => s.likes);
    const readingProgress = useStore(blogStore, (s) => s.readingProgress);
    const unfinishedArticles = MOCK_ARTICLES.filter(a =>
        readingProgress[a.id] > 0 && readingProgress[a.id] < 100
    ).slice(0, 2);

    return (
        <div className="flex min-h-screen bg-[#050505] text-white">
            <aside className="w-72 border-r border-white/5 flex flex-col sticky top-0 h-screen bg-black/50 backdrop-blur-xl">
                <div className="p-6 flex-1 overflow-y-auto">
                    {/* Editorial Section */}
                    <div className="mb-8">
                        <h2 className="px-4 text-[10px] font-black uppercase tracking-[0.2em] text-neutral-600 mb-4">
                            Editorial
                        </h2>
                        <nav className="space-y-1">
                            {CATEGORIES.map((cat) => (
                                <button
                                    type="button"
                                    key={cat.id}
                                    onClick={() => actions.setActiveCategory(cat.id)}
                                    className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all ${activeCategory === cat.id
                                        ? 'bg-white/10 text-white shadow-[0_0_20px_rgba(255,255,255,0.02)]'
                                        : 'text-neutral-500 hover:text-neutral-200 hover:bg-white/5'
                                        }`}
                                >
                                    <cat.icon size={18} className={activeCategory === cat.id ? 'text-purple-400' : ''} />
                                    <span className="text-sm font-semibold">{cat.label}</span>
                                </button>
                            ))}
                        </nav>
                    </div>

                    {/* Library Section */}
                    <div>
                        <h2 className="px-4 text-[10px] font-black uppercase tracking-[0.2em] text-neutral-600 mb-4">
                            Library
                        </h2>
                        <div className="space-y-1">
                            {/* Saved / Bookmarks */}
                            <button
                                type="button"
                                onClick={() => actions.setActiveCategory('bookmarks')}
                                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all ${activeCategory === 'bookmarks' ? 'bg-white/10 text-white' : 'text-neutral-500 hover:text-neutral-200 hover:bg-white/5'
                                    }`}
                            >
                                <Sparkles size={18} className={bookmarks.length > 0 ? "text-yellow-400" : ""} />
                                <span className="text-sm font-semibold">Saved Stories</span>
                                {bookmarks.length > 0 && (
                                    <span className="ml-auto text-[10px] bg-white/10 text-white px-2 py-0.5 rounded-full font-bold">
                                        {bookmarks.length}
                                    </span>
                                )}
                            </button>

                            {/* Liked Stories */}
                            <button
                                type="button"
                                onClick={() => actions.setActiveCategory('likes')}
                                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all ${activeCategory === 'likes' ? 'bg-white/10 text-white' : 'text-neutral-500 hover:text-neutral-200 hover:bg-white/5'
                                    }`}
                            >
                                <Heart size={18} className={likes.length > 0 ? "text-pink-500" : ""} fill={likes.length > 0 ? "currentColor" : "none"} />
                                <span className="text-sm font-semibold">Liked Stories</span>
                                {likes.length > 0 && (
                                    <span className="ml-auto text-[10px] bg-pink-500/20 text-pink-400 px-2 py-0.5 rounded-full font-bold">
                                        {likes.length}
                                    </span>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
                {unfinishedArticles.length > 0 && (
                    <div className="px-6 mb-8">
                        <h2 className="px-4 text-[10px] font-black uppercase tracking-[0.2em] text-neutral-600 mb-4">
                            Continue Reading
                        </h2>
                        <div className="space-y-3">
                            {unfinishedArticles.map(article => (
                                <div key={article.id} className="group cursor-pointer px-4">
                                    <p className="text-xs font-bold text-neutral-300 group-hover:text-white truncate">
                                        {article.title}
                                    </p>
                                    <div className="mt-2 h-1 w-full bg-white/5 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-purple-500"
                                            style={{ width: `${readingProgress[article.id]}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                {/* ... Promo Widget */}
            </aside>
            <main className="flex-1 overflow-y-auto">{children}</main>
        </div>
    );
}