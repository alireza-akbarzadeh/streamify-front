import { motion } from 'framer-motion';
import { Clock, Heart, Play } from 'lucide-react';
import { useState } from 'react';
// Import your store and actions
import { type Song, setCurrentSong } from '@/domains/music/music.store';

export function LibraryView() {
    const [likedSongs, setLikedSongs] = useState([1, 3]);

    // Mock data - In a real app, this might come from a TanStack Query
    const songs: Song[] = [
        {
            id: 1,
            title: "Blinding Lights",
            artist: "The Weeknd",
            album: "After Hours",
            albumArt: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=100&q=80",
            duration: 245, // Changed to number to match store type
        },
        {
            id: 2,
            title: "Save Your Tears",
            artist: "The Weeknd",
            album: "After Hours",
            albumArt: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=100&q=80",
            duration: 215,
        },
        {
            id: 3,
            title: "Starboy",
            artist: "The Weeknd",
            album: "Starboy",
            albumArt: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=100&q=80",
            duration: 230,
        },
    ];

    const toggleLike = (id: number) => {
        setLikedSongs(prev =>
            prev.includes(id) ? prev.filter(songId => songId !== id) : [...prev, id]
        );
    };

    // Helper to format duration seconds to MM:SS
    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className="min-h-screen bg-linear-to-b from-purple-900/20 to-black">
            {/* Header */}
            <div className="p-8 pb-6">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-7xl font-bold text-white mb-4"
                >
                    Liked Songs
                </motion.h1>
                <div className="flex items-center gap-2 text-sm">
                    <span className="text-white font-semibold">Playlist</span>
                    <span className="text-white">•</span>
                    <span className="text-gray-400">{songs.length} songs</span>
                </div>
            </div>

            {/* Controls */}
            <div className="px-8 pb-6 flex items-center gap-8">
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-14 h-14 rounded-full bg-green-500 hover:bg-green-400 flex items-center justify-center shadow-lg"
                    onClick={() => setCurrentSong(songs[0])} // Play first song on big play button
                >
                    <Play className="w-7 h-7 text-black fill-black ml-1" />
                </motion.button>
                {/* ... other buttons ... */}
            </div>

            {/* Songs table */}
            <div className="px-8">
                <div className="grid grid-cols-[16px_4fr_2fr_1fr] gap-4 px-4 py-2 border-b border-white/10 text-sm text-gray-400 mb-2">
                    <div className="text-center">#</div>
                    <div>Title</div>
                    <div>Album</div>
                    <div className="flex items-center justify-end">
                        <Clock className="w-4 h-4" />
                    </div>
                </div>

                <div className="space-y-1">
                    {songs.map((song, index) => (
                        <motion.div
                            key={song.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            // HERE: Using the store action directly instead of a prop
                            onClick={() => setCurrentSong(song)}
                            className="grid grid-cols-[16px_4fr_2fr_1fr] gap-4 px-4 py-3 rounded-md hover:bg-white/10 group cursor-pointer transition-colors"
                        >
                            <div className="flex items-center justify-center text-gray-400">
                                <span className="group-hover:hidden">{index + 1}</span>
                                <Play className="w-4 h-4 hidden group-hover:block text-white" />
                            </div>

                            <div className="flex items-center gap-4">
                                <img src={song.albumArt} alt={song.album} className="w-10 h-10 rounded" />
                                <div>
                                    <div className="text-white font-medium">{song.title}</div>
                                    <div className="text-sm text-gray-400">{song.artist}</div>
                                </div>
                            </div>

                            <div className="flex items-center text-gray-400 text-sm">
                                {song.album}
                            </div>

                            <div className="flex items-center justify-end gap-4">
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    onClick={(e) => {
                                        e.stopPropagation(); // Prevent playing the song when clicking heart
                                        toggleLike(song.id);
                                    }}
                                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    <Heart
                                        className={`w-4 h-4 ${likedSongs.includes(song.id)
                                            ? 'fill-green-500 text-green-500'
                                            : 'text-gray-400 hover:text-white'
                                            }`}
                                    />
                                </motion.button>
                                <span className="text-gray-400 text-sm w-12 text-right">
                                    {formatTime(song.duration)}
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}