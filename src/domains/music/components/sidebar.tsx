import { Link } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import { Heart, Home, Library, Music, Plus, Search } from 'lucide-react'

export function Sidebar() {
    const menuItems = [
        { icon: Home, label: 'Home', to: '/music' },
        { icon: Search, label: 'Search', to: '/music/search' },
        { icon: Library, label: 'Your Library', to: '/music/library' },
    ]

    const playlists = [
        { name: 'Liked Songs', id: 'liked' },
        { name: 'Your Episodes', id: 'episodes' },
        { name: 'Recently Played', id: 'recent' },
        { name: 'Chill Vibes', id: 'chill' },
        { name: 'Workout Mix', id: 'workout' },
        { name: 'Focus Flow', id: 'focus' },
        { name: 'Top Hits 2024', id: 'hits' },
    ]

    return (
        <div className="w-64 bg-black flex flex-col border-r border-white/5">
            {/* Logo */}
            <div className="p-6">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-linear-to-br from-purple-600 to-pink-600 flex items-center justify-center">
                        <Music className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-white font-bold text-lg">Vibe</span>
                </div>
            </div>

            {/* Navigation */}
            <nav className="px-3 mb-6">
                {menuItems.map((item) => (
                    <Link
                        key={item.label}
                        to={item.to}
                        className="block"
                    >
                        {({ isActive }) => (
                            <motion.div
                                whileHover={{ x: 4 }}
                                className={`w-full flex items-center gap-4 px-3 py-3 rounded-lg mb-2 transition-colors ${isActive
                                    ? 'bg-white/10 text-white'
                                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                                    }`}
                            >
                                <item.icon className="w-6 h-6" />
                                <span className="font-semibold">{item.label}</span>
                            </motion.div>
                        )}
                    </Link>
                ))}
            </nav>

            {/* Create Playlist */}
            <div className="px-3 mb-6">
                <motion.button
                    whileHover={{ x: 4 }}
                    className="w-full flex items-center gap-4 px-3 py-3 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
                >
                    <div className="w-6 h-6 rounded bg-white/10 flex items-center justify-center">
                        <Plus className="w-4 h-4" />
                    </div>
                    <span className="font-semibold">Create Playlist</span>
                </motion.button>

                <Link to="/music/library">
                    <motion.div
                        whileHover={{ x: 4 }}
                        className="w-full flex items-center gap-4 px-3 py-3 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                    >
                        <div className="w-6 h-6 rounded bg-linear-to-br from-purple-600 to-pink-600 flex items-center justify-center">
                            <Heart className="w-4 h-4 text-white" />
                        </div>
                        <span className="font-semibold">Liked Songs</span>
                    </motion.div>
                </Link>
            </div>

            {/* Playlists */}
            <div className="flex-1 overflow-y-auto px-3">
                <div className="border-t border-white/5 pt-4">
                    {playlists.map((playlist) => (
                        <Link
                            key={playlist.id}
                            to={`/music/library`}
                            className="block"
                        >
                            <motion.div
                                whileHover={{ x: 4 }}
                                className="w-full text-left px-3 py-2 text-sm text-gray-400 hover:text-white transition-colors rounded cursor-pointer"
                            >
                                {playlist.name}
                            </motion.div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}