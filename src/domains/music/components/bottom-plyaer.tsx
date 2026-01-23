import { motion } from 'framer-motion';
import { Heart, ListMusic, Pause, Play, Repeat, Shuffle, SkipBack, SkipForward, Volume2, VolumeX } from 'lucide-react';
import React, { useEffect, useState } from 'react';

export function BottomPlayer({ currentSong, isPlaying, onPlayPause, currentTime, onTimeChange }) {
    const [volume, setVolume] = useState(70);
    const [isMuted, setIsMuted] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const duration = currentSong?.duration || 245;

    useEffect(() => {
        if (isPlaying && currentTime < duration) {
            const timer = setTimeout(() => onTimeChange(currentTime + 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [isPlaying, currentTime, duration]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const progress = (currentTime / duration) * 100;

    return (
        <div className="fixed bottom-0 left-0 right-0 h-24 bg-black border-t border-white/10 px-4">
            <div className="h-full flex items-center justify-between gap-4">
                {/* Currently playing */}
                <div className="flex items-center gap-4 w-80">
                    {currentSong && (
                        <>
                            <img
                                src={currentSong.albumArt}
                                alt={currentSong.album}
                                className="w-14 h-14 rounded"
                            />
                            <div className="min-w-0 flex-1">
                                <div className="text-white text-sm font-medium truncate">
                                    {currentSong.title}
                                </div>
                                <div className="text-gray-400 text-xs truncate">
                                    {currentSong.artist}
                                </div>
                            </div>
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                onClick={() => setIsLiked(!isLiked)}
                                className="text-gray-400 hover:text-white transition-colors"
                            >
                                <Heart
                                    className={`w-5 h-5 ${isLiked ? 'fill-green-500 text-green-500' : ''
                                        }`}
                                />
                            </motion.button>
                        </>
                    )}
                </div>

                {/* Player controls */}
                <div className="flex-1 max-w-2xl">
                    <div className="flex items-center justify-center gap-4 mb-2">
                        <button className="text-gray-400 hover:text-white transition-colors">
                            <Shuffle className="w-4 h-4" />
                        </button>
                        <button className="text-gray-400 hover:text-white transition-colors">
                            <SkipBack className="w-5 h-5" />
                        </button>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={onPlayPause}
                            className="w-8 h-8 rounded-full bg-white hover:scale-105 flex items-center justify-center"
                        >
                            {isPlaying ? (
                                <Pause className="w-4 h-4 text-black fill-black" />
                            ) : (
                                <Play className="w-4 h-4 text-black fill-black ml-0.5" />
                            )}
                        </motion.button>
                        <button className="text-gray-400 hover:text-white transition-colors">
                            <SkipForward className="w-5 h-5" />
                        </button>
                        <button className="text-gray-400 hover:text-white transition-colors">
                            <Repeat className="w-4 h-4" />
                        </button>
                    </div>

                    {/* Progress bar */}
                    <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-400 w-10 text-right">
                            {formatTime(currentTime)}
                        </span>
                        <div className="flex-1 h-1 bg-gray-700 rounded-full group cursor-pointer">
                            <div
                                className="h-full bg-white rounded-full relative"
                                style={{ width: `${progress}%` }}
                            >
                                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100" />
                            </div>
                        </div>
                        <span className="text-xs text-gray-400 w-10">
                            {formatTime(duration)}
                        </span>
                    </div>
                </div>

                {/* Volume & other controls */}
                <div className="flex items-center gap-4 w-80 justify-end">
                    <button className="text-gray-400 hover:text-white transition-colors">
                        <ListMusic className="w-5 h-5" />
                    </button>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setIsMuted(!isMuted)}
                            className="text-gray-400 hover:text-white transition-colors"
                        >
                            {isMuted || volume === 0 ? (
                                <VolumeX className="w-5 h-5" />
                            ) : (
                                <Volume2 className="w-5 h-5" />
                            )}
                        </button>
                        <div className="w-24 h-1 bg-gray-700 rounded-full group cursor-pointer">
                            <div
                                className="h-full bg-white rounded-full relative"
                                style={{ width: `${isMuted ? 0 : volume}%` }}
                            >
                                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}