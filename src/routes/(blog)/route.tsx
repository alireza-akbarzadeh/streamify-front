import { createFileRoute, Outlet } from '@tanstack/react-router';
import { useStore } from '@tanstack/react-store';
import { motion } from 'framer-motion';
import { Film, Headphones, LayoutGrid, Music, Play, User } from 'lucide-react';
import { actions, blogStore } from '@/domains/blog/blog.store';

export const Route = createFileRoute('/(blog)')({
    component: BlogLayout,
});

const CATEGORIES = [
    { id: 'all', label: 'All Stories', icon: LayoutGrid },
    { id: 'music', label: 'Music Stories', icon: Music },
    { id: 'movies', label: 'Movie Reviews', icon: Film },
    { id: 'artists', label: 'Artist Spotlights', icon: User },
    { id: 'behind', label: 'Behind the Scenes', icon: Play },
];

function BlogLayout() {
    const activeCategory = useStore(blogStore, (s) => s.activeCategory);

    return (
        <div className="flex min-h-screen bg-[#050505] text-white">
            {/* --- SIDEBAR --- */}
            <aside className="w-72 border-r border-white/5 flex flex-col sticky top-0 h-screen bg-black/50 backdrop-blur-xl">
                <div className="p-8">
                    <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 mb-8">
                        Editorial
                    </h2>

                    <nav className="space-y-2">
                        {CATEGORIES.map((cat) => (
                            <button
                                type='button'
                                key={cat.id}
                                onClick={() => actions.setActiveCategory(cat.id)}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${activeCategory === cat.id
                                    ? 'bg-white/10 text-white shadow-[0_0_20px_rgba(255,255,255,0.05)]'
                                    : 'text-gray-500 hover:text-gray-200 hover:bg-white/5'
                                    }`}
                            >
                                <cat.icon size={18} className={activeCategory === cat.id ? 'text-purple-400' : ''} />
                                <span className="font-medium">{cat.label}</span>
                                {activeCategory === cat.id && (
                                    <motion.div layoutId="activeGlow" className="ml-auto w-1 h-4 bg-purple-500 rounded-full" />
                                )}
                            </button>
                        ))}
                    </nav>
                </div>

                {/* --- PROMO WIDGET (The "Premium" Touch) --- */}
                <div className="mt-auto p-6">
                    <div className="bg-linear-to-br from-purple-900/40 to-blue-900/40 border border-white/10 rounded-2xl p-5">
                        <Headphones className="text-purple-400 mb-3" size={24} />
                        <p className="text-sm font-bold mb-1">New Soundtrack</p>
                        <p className="text-xs text-gray-400 mb-3">Blade Runner 2049 Vinyl Edition</p>
                        <button
                            type='button'
                            className="w-full py-2 bg-white text-black text-xs font-bold rounded-lg hover:bg-gray-200 transition-colors">
                            Listen Now
                        </button>
                    </div>
                </div>
            </aside>

            {/* --- MAIN CONTENT --- */}
            <main className="flex-1 overflow-y-auto overflow-x-hidden">
                <Outlet />
            </main>
        </div>
    );
}