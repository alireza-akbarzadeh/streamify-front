import { useNavigate } from '@tanstack/react-router'
import { useStore } from '@tanstack/react-store'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, Home, Library, ListFilter, Plus, Search, X } from 'lucide-react'
import { useState } from 'react'
import { addLibraryItem, musicStore, setFilter, setSearchQuery } from '@/domains/music/music.store'
import { NavItem } from './artists/components/side-nav-item'
import { SidebarItem } from './artists/components/sidebar-item'

export function Sidebar() {
    const [isSearching, setIsSearching] = useState(false);

    // Subscribe to store
    const library = useStore(musicStore, (s) => s.library);
    const searchQuery = useStore(musicStore, (s) => s.searchQuery);
    const activeFilter = useStore(musicStore, (s) => s.activeFilter);

    // Derived State: Filtered Library
    const filteredLibrary = library.filter(item => {
        const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesFilter = activeFilter === "All" ||
            (activeFilter === "Playlists" && item.type === 'playlist') ||
            (activeFilter === "Artists" && item.type === 'artist');
        return matchesSearch && matchesFilter;
    });

    const handleCreatePlaylist = () => {
        const newId = Math.random().toString(36).substr(2, 9);
        addLibraryItem({
            id: newId,
            title: `New Playlist #${library.length}`,
            subtitle: 'Playlist • You',
            type: 'playlist',
            image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=100&q=80'
        });
    };

    return (
        <div className="w-72 bg-black flex flex-col h-full gap-2 p-2">
            <div className="bg-[#121212] rounded-lg p-3">
                <NavItem icon={Home} label="Home" to="/music" />
                <NavItem icon={Search} label="Search" to="/music/search" />
            </div>

            <div className="bg-[#121212] rounded-lg flex-1 flex flex-col overflow-hidden">
                <div className="px-4 py-3 flex items-center justify-between text-gray-400">
                    <div className="flex-1">
                        <NavItem icon={Library} label="Your Library" to="/music/library" />
                    </div>
                    <div className="flex items-center gap-2">
                        <Plus
                            onClick={handleCreatePlaylist}
                            className="w-5 h-5 hover:text-white cursor-pointer transition-transform active:scale-90"
                        />
                        <ArrowRight className="w-5 h-5 hover:text-white cursor-pointer" />
                    </div>
                </div>

                {/* Filter Chips */}
                <div className="px-4 pb-2 flex gap-2">
                    {['All', 'Playlists', 'Artists'].map((filter) => (
                        <button
                            type='button'
                            key={filter}
                            onClick={() => setFilter(filter as "All" | "Playlists" | "Artists")}
                            className={`text-xs font-medium px-3 py-1.5 rounded-full transition-colors ${activeFilter === filter
                                ? 'bg-white text-black'
                                : 'bg-white/10 text-white hover:bg-white/20'
                                }`}
                        >
                            {filter}
                        </button>
                    ))}
                </div>

                {/* Search Bar Logic */}
                <div className="px-4 py-2 flex items-center justify-between text-gray-400">
                    <div className="flex items-center flex-1">
                        {isSearching ? (
                            <motion.div initial={{ width: 0 }} animate={{ width: '100%' }} className="relative flex items-center w-full bg-[#242424] rounded-md px-2 py-1 mr-2">
                                <Search className="w-3 h-3 mr-2" />
                                <input
                                    className="bg-transparent text-xs text-white outline-none w-full"
                                    placeholder="Search in Your Library"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                <X className="w-3 h-3 cursor-pointer hover:text-white" onClick={() => { setIsSearching(false); setSearchQuery(""); }} />
                            </motion.div>
                        ) : (
                            <Search className="w-4 h-4 hover:text-white cursor-pointer" onClick={() => setIsSearching(true)} />
                        )}
                    </div>
                    {!isSearching && (
                        <button type='button' className="flex items-center gap-1 text-sm hover:text-white transition-colors">
                            <span>Recents</span>
                            <ListFilter className="w-4 h-4" />
                        </button>
                    )}
                </div>

                {/* Animated Library List */}
                <div className="flex-1 overflow-y-auto px-2 custom-scrollbar">
                    <AnimatePresence mode="popLayout">
                        {filteredLibrary.map((item) => (
                            <SidebarItem key={item.id} item={item} />
                        ))}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    )
}




