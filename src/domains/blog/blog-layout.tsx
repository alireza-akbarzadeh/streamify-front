import { Link } from '@tanstack/react-router';
import { useStore } from '@tanstack/react-store';
import { motion } from 'framer-motion';
import {
    Compass,
    Film, Flame, Heart,
    Music, Play,
    Search,
    Sparkles, User
} from 'lucide-react';
import type React from 'react';
import { useState } from 'react';
import { MSG } from '@/constants/constants';
import { actions, blogStore } from '@/domains/blog/store/blog.store';
import { CommandSetting } from './components/command-setting';
import { LibraryButton } from './components/library-item';
import { UserProfile } from './components/user-profile';

export const CATEGORIES = [
    { id: 'all', label: 'Feed', icon: Compass },
    { id: 'music', label: 'Music', icon: Music },
    { id: 'movies', label: 'Cinema', icon: Film },
    { id: 'artists', label: 'Artists', icon: User },
    { id: 'behind', label: 'Originals', icon: Play },
];

export function BlogLayout({ children }: { children: React.ReactNode }) {
    const [open, setOpen] = useState(false);
    const activeCategory = useStore(blogStore, (s) => s.activeCategory);
    const bookmarks = useStore(blogStore, (s) => s.bookmarks);
    const likes = useStore(blogStore, (s) => s.likes);


    return (
        <div className="flex min-h-screen bg-[#050505] text-white selection:bg-purple-500/30">
            <CommandSetting setOpen={setOpen} open={open} />
            <aside className="w-72 border-r border-white/5 flex flex-col sticky top-0 h-screen bg-[#080808]/80 backdrop-blur-2xl z-50">
                <div className="p-8">
                    <Link to="/" className="group flex items-center gap-4">
                        <div className="relative">
                            <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-purple-600 to-pink-600 flex items-center justify-center shadow-[0_0_20px_rgba(168,85,247,0.4)] group-hover:scale-110 transition-transform duration-500">
                                <Sparkles className="w-6 h-6 text-white" />
                            </div>
                            <div className="absolute -inset-1 bg-linear-to-br from-purple-600 to-pink-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition-opacity" />
                        </div>
                        <div className="flex flex-col text-white">
                            <span className="text-xl font-black tracking-tighter uppercase leading-none">{MSG.APP_NAME}</span>
                            <span className="text-[10px] font-bold text-neutral-500 tracking-[0.2em] uppercase mt-1">Editorial v2</span>
                        </div>
                    </Link>
                </div>

                <div className="flex-1 overflow-y-auto px-4 custom-scrollbar">
                    {/* SEARCH TRIGGER */}
                    <button
                        type='button'
                        onClick={() => setOpen(true)}
                        className="w-full mb-8 flex items-center justify-between px-4 py-3 rounded-2xl bg-white/3 border border-white/5 text-neutral-500 hover:bg-white/5 hover:text-neutral-300 transition-all group"
                    >
                        <div className="flex items-center gap-3 text-white/60">
                            <Search size={16} />
                            <span className="text-sm font-medium">Quick search...</span>
                        </div>
                        <kbd className="text-[10px] font-bold bg-black px-1.5 py-0.5 rounded border border-white/10 group-hover:border-white/20 transition-colors">⌘K</kbd>
                    </button>

                    <div className="mb-8 text-white">
                        <h2 className="px-4 text-[10px] font-black uppercase tracking-[0.2em] text-neutral-600 mb-4">Discover</h2>
                        <nav className="space-y-1">
                            {CATEGORIES.map((cat) => {
                                const isActive = activeCategory === cat.id;
                                return (
                                    <button
                                        type='button'
                                        key={cat.id}
                                        onClick={() => actions.setActiveCategory(cat.id)}
                                        className={`w-full group flex items-center gap-3 px-4 py-3 rounded-2xl transition-all relative ${isActive ? 'text-white font-bold' : 'text-neutral-500 hover:text-neutral-200'}`}
                                    >
                                        {isActive && <motion.div layoutId="active-pill" className="absolute inset-0 bg-white/5 border border-white/10 rounded-2xl" />}
                                        <cat.icon size={18} className={`relative z-10 ${isActive ? 'text-purple-400' : 'group-hover:text-neutral-300'}`} />
                                        <span className="text-sm relative z-10">{cat.label}</span>
                                    </button>
                                );
                            })}
                        </nav>
                    </div>

                    <div className="mb-8">
                        <h2 className="px-4 text-[10px] font-black uppercase tracking-[0.2em] text-neutral-600 mb-4">Collection</h2>
                        <div className="space-y-1">
                            <LibraryButton icon={Heart} label="Liked" count={likes.length} color="text-pink-500" active={activeCategory === 'likes'} onClick={() => actions.setActiveCategory('likes')} />
                            <LibraryButton icon={Sparkles} label="Saved" count={bookmarks.length} color="text-yellow-400" active={activeCategory === 'bookmarks'} onClick={() => actions.setActiveCategory('bookmarks')} />
                        </div>
                    </div>

                    <div className="mb-8 p-4 rounded-3xl bg-linear-to-br from-purple-500/10 to-blue-500/10 border border-purple-500/20 text-white">
                        <div className="flex items-center gap-2 mb-3">
                            <Flame size={14} className="text-orange-500" />
                            <span className="text-[10px] font-black uppercase tracking-widest">Daily Streak</span>
                        </div>
                        <div className="flex gap-1.5 mb-3">
                            {[1, 1, 1, 1, 0, 0, 0].map((active, i) => (
                                <div key={i + active} className={`h-1 flex-1 rounded-full ${active ? 'bg-orange-500' : 'bg-white/10'}`} />
                            ))}
                        </div>
                        <p className="text-[10px] text-neutral-400 font-medium italic">4 days streak! Keep it up.</p>
                    </div>
                </div>
                <UserProfile />
            </aside>
            <main className="flex-1 h-screen overflow-y-auto">{children}</main>
        </div >
    );
}

