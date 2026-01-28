import { Link, useNavigate } from '@tanstack/react-router';
import { useStore } from '@tanstack/react-store';
import { motion } from 'framer-motion';
import {
    ChevronUp,
    Compass,
    CreditCard,
    Film, Flame, Heart,
    LogOut,
    Music, Play,
    Search, Settings, Sparkles, User
} from 'lucide-react';
import React, { useEffect, useState } from 'react';
import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MSG } from '@/constants/constants';
import { actions, blogStore } from '@/domains/blog/blog.store';
import { MOCK_ARTICLES } from '@/domains/blog/blog-mock';
import { generateSlug } from '@/lib/utils';

const CATEGORIES = [
    { id: 'all', label: 'Feed', icon: Compass },
    { id: 'music', label: 'Music', icon: Music },
    { id: 'movies', label: 'Cinema', icon: Film },
    { id: 'artists', label: 'Artists', icon: User },
    { id: 'behind', label: 'Originals', icon: Play },
];

export function BlogLayout({ children }: { children: React.ReactNode }) {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);

    const activeCategory = useStore(blogStore, (s) => s.activeCategory);
    const bookmarks = useStore(blogStore, (s) => s.bookmarks);
    const likes = useStore(blogStore, (s) => s.likes);
    const readingProgress = useStore(blogStore, (s) => s.readingProgress);

    // Filter unfinished for "Resume" section
    const unfinishedArticles = MOCK_ARTICLES.filter(a =>
        readingProgress[a.id] > 0 && readingProgress[a.id] < 100
    ).slice(0, 2);

    // --- ⌘K Keyboard Shortcut Logic ---
    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen((open) => !open);
            }
        };
        document.addEventListener("keydown", down);
        return () => document.removeEventListener("keydown", down);
    }, []);

    const handleSelectArticle = (title: string) => {
        setOpen(false);
        navigate({
            to: "/blog/$blogslug",
            params: { blogslug: generateSlug(title) }
        });
    };

    return (
        <div className="flex min-h-screen bg-[#050505] text-white selection:bg-purple-500/30">

            {/* --- COMMAND K SEARCH DIALOG --- */}
            <CommandDialog open={open} onOpenChange={setOpen}>
                <CommandInput placeholder="Type a command or search stories..." />
                <CommandList className="custom-scrollbar">
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup heading="Stories">
                        {MOCK_ARTICLES.map((article) => (
                            <CommandItem
                                key={article.id}
                                onSelect={() => handleSelectArticle(article.title)}
                                className="flex items-center gap-3 py-3"
                            >
                                <div className="w-10 h-10 rounded-lg overflow-hidden bg-neutral-800">
                                    <img src={article.image} className="w-full h-full object-cover" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="font-semibold text-white">{article.title}</span>
                                    <span className="text-xs text-neutral-500">{article.category}</span>
                                </div>
                            </CommandItem>
                        ))}
                    </CommandGroup>
                    <CommandGroup heading="Quick Actions">
                        <CommandItem onSelect={() => actions.setActiveCategory('bookmarks')}>
                            <Sparkles className="mr-2 h-4 w-4" /> View Bookmarks
                        </CommandItem>
                        <CommandItem onSelect={() => actions.setActiveCategory('likes')}>
                            <Heart className="mr-2 h-4 w-4" /> Liked Stories
                        </CommandItem>
                    </CommandGroup>
                </CommandList>
            </CommandDialog>

            <aside className="w-72 border-r border-white/5 flex flex-col sticky top-0 h-screen bg-[#080808]/80 backdrop-blur-2xl z-50">
                <div className="p-8">
                    <Link to="/" className="group flex items-center gap-4">
                        <div className="relative">
                            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center shadow-[0_0_20px_rgba(168,85,247,0.4)] group-hover:scale-110 transition-transform duration-500">
                                <Sparkles className="w-6 h-6 text-white" />
                            </div>
                            <div className="absolute -inset-1 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition-opacity" />
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
                        onClick={() => setOpen(true)}
                        className="w-full mb-8 flex items-center justify-between px-4 py-3 rounded-2xl bg-white/[0.03] border border-white/5 text-neutral-500 hover:bg-white/[0.05] hover:text-neutral-300 transition-all group"
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
                                        key={cat.id}
                                        onClick={() => actions.setActiveCategory(cat.id)}
                                        className={`w-full group flex items-center gap-3 px-4 py-3 rounded-2xl transition-all relative ${isActive ? 'text-white font-bold' : 'text-neutral-500 hover:text-neutral-200'}`}
                                    >
                                        {isActive && <motion.div layoutId="active-pill" className="absolute inset-0 bg-white/[0.05] border border-white/10 rounded-2xl" />}
                                        <cat.icon size={18} className={`relative z-10 ${isActive ? 'text-purple-400' : 'group-hover:text-neutral-300'}`} />
                                        <span className="text-sm relative z-10">{cat.label}</span>
                                    </button>
                                );
                            })}
                        </nav>
                    </div>

                    <div className="mb-8">
                        <h2 className="px-4 text-[10px] font-black uppercase tracking-[0.2em] text-neutral-600 mb-4 text-white">Collection</h2>
                        <div className="space-y-1">
                            <LibraryButton icon={Heart} label="Liked" count={likes.length} color="text-pink-500" active={activeCategory === 'likes'} onClick={() => actions.setActiveCategory('likes')} />
                            <LibraryButton icon={Sparkles} label="Saved" count={bookmarks.length} color="text-yellow-400" active={activeCategory === 'bookmarks'} onClick={() => actions.setActiveCategory('bookmarks')} />
                        </div>
                    </div>

                    <div className="mb-8 p-4 rounded-3xl bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-purple-500/20 text-white">
                        <div className="flex items-center gap-2 mb-3">
                            <Flame size={14} className="text-orange-500" />
                            <span className="text-[10px] font-black uppercase tracking-widest">Daily Streak</span>
                        </div>
                        <div className="flex gap-1.5 mb-3">
                            {[1, 1, 1, 1, 0, 0, 0].map((active, i) => (
                                <div key={i} className={`h-1 flex-1 rounded-full ${active ? 'bg-orange-500' : 'bg-white/10'}`} />
                            ))}
                        </div>
                        <p className="text-[10px] text-neutral-400 font-medium italic">4 days streak! Keep it up.</p>
                    </div>
                </div>

                {/* --- PROFILE DROPDOWN SECTION --- */}
                <div className="p-4 mt-auto border-t border-white/5 bg-black/20 text-white">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <div className="flex items-center gap-3 p-2 rounded-2xl hover:bg-white/5 transition-colors cursor-pointer group outline-none">
                                <div className="relative">
                                    <img src="https://i.pravatar.cc/100?u=me" className="w-10 h-10 rounded-xl object-cover ring-2 ring-white/5 group-hover:ring-purple-500/50 transition-all" />
                                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-black rounded-full" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-bold truncate">Alex Rivera</p>
                                    <p className="text-[10px] text-purple-400 font-black uppercase tracking-wider">Pro Member</p>
                                </div>
                                <ChevronUp size={16} className="text-neutral-600 group-hover:text-white transition-all group-data-[state=open]:rotate-180" />
                            </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-64 mb-4 ml-4 bg-[#0c0c0c] border-white/10 text-white rounded-2xl p-2 shadow-2xl backdrop-blur-xl" side="right" align="end">
                            <DropdownMenuLabel className="px-3 py-2 text-xs font-bold text-neutral-500 uppercase tracking-widest">My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator className="bg-white/5" />
                            <DropdownMenuItem className="flex items-center gap-3 p-3 rounded-xl focus:bg-white/10 focus:text-white cursor-pointer transition-colors">
                                <User size={16} /> <span className="text-sm font-semibold">Profile</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="flex items-center gap-3 p-3 rounded-xl focus:bg-white/10 focus:text-white cursor-pointer transition-colors">
                                <CreditCard size={16} /> <span className="text-sm font-semibold">Billing</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="flex items-center gap-3 p-3 rounded-xl focus:bg-white/10 focus:text-white cursor-pointer transition-colors">
                                <Settings size={16} /> <span className="text-sm font-semibold">Settings</span>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator className="bg-white/5" />
                            <DropdownMenuItem className="flex items-center gap-3 p-3 rounded-xl focus:bg-red-500/20 text-red-500 cursor-pointer transition-colors">
                                <LogOut size={16} /> <span className="text-sm font-semibold">Sign out</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </aside>

            <main className="flex-1 h-screen overflow-y-auto">{children}</main>
        </div>
    );
}

function LibraryButton({ icon: Icon, label, count, color, active, onClick }: any) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl transition-all ${active ? 'bg-white/10 text-white' : 'text-neutral-500 hover:text-neutral-200 hover:bg-white/5'}`}
        >
            <div className="flex items-center gap-3">
                <Icon size={18} className={count > 0 ? color : ""} fill={active && count > 0 ? "currentColor" : "none"} />
                <span className="text-sm font-semibold">{label}</span>
            </div>
            {count > 0 && <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${active ? 'bg-white/20' : 'bg-white/5'}`}>{count}</span>}
        </button>
    );
}