import { motion } from "framer-motion";
import { Info, Play, Star } from "lucide-react";
import type { Platform } from "../download.domain";

// --- Verified Cinematic Assets ---
const HERO_IMAGE = "https://images.unsplash.com/photo-1616530940355-351fabd9524b?auto=format&fit=crop&q=80&w=1000";

const MOVIE_POSTERS = [
    "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=800&q=80",
    "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=800&q=80",
    "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&q=80",
    "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=800&q=80",
];

export function DeviceShowcase({ platform }: { platform: Platform }) {



    // --- Renders ---

    if (platform.type === "tv") {
        return (
            <div className="relative w-[340px] h-[200px] md:w-[680px] md:h-[380px] bg-black rounded-lg border-[12px] border-[#1a1a1a] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.8)] overflow-hidden">
                <AppInterface />
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-40 h-2 bg-[#2a2a2a] rounded-t-2xl shadow-inner" />
            </div>
        );
    }

    if (platform.type === "mobile") {
        return (
            <div className="relative w-[260px] h-[540px] rounded-[3.5rem] border-[10px] border-[#1a1a1a] bg-black shadow-[0_40px_80px_-20px_rgba(0,0,0,0.7)] overflow-hidden ring-1 ring-white/10">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-36 h-7 bg-[#1a1a1a] rounded-b-[1.5rem] z-20 flex items-center justify-center gap-2">
                    <div className="w-8 h-1 bg-white/5 rounded-full" />
                    <div className="w-2 h-2 bg-white/5 rounded-full" />
                </div>
                <AppInterface isMobile />
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-24 h-1 bg-white/20 rounded-full" />
            </div>
        );
    }

    return (
        <div className="relative w-[320px] h-[220px] md:w-[620px] md:h-[380px] bg-black rounded-2xl border border-white/10 shadow-[0_50px_100px_-30px_rgba(0,0,0,0.9)] overflow-hidden">
            <div className="flex items-center gap-1.5 px-4 py-3 border-b border-white/5 bg-[#0a0a0a]">
                <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
            </div>
            <AppInterface />
        </div>
    );
}

const AppInterface = ({ isMobile = false }) => (
    <div className="flex flex-col h-full w-full bg-black text-left overflow-hidden select-none">
        {/* Nav Bar Mockup */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 bg-black/50 backdrop-blur-md">
            <div className="flex items-center gap-2">
                <div className="w-5 h-5 bg-purple-600 rounded-md flex items-center justify-center">
                    <Play className="w-3 h-3 text-white fill-current" />
                </div>
                <div className="w-16 h-2 bg-white/20 rounded-full hidden md:block" />
            </div>
            <div className="flex gap-2">
                <div className="w-4 h-4 rounded-full bg-white/10" />
                <div className="w-4 h-4 rounded-full bg-white/10" />
            </div>
        </div>

        {/* Main Content */}
        <div className="relative flex-1 overflow-hidden">
            {/* Hero Feature */}
            <div className={`relative w-full ${isMobile ? 'h-48' : 'h-64'} overflow-hidden`}>
                <img src={HERO_IMAGE} className="w-full h-full object-cover" alt="Featured" />
                <div className="absolute inset-0 bg-linear-to-t from-black via-black/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="px-1.5 py-0.5 rounded bg-yellow-500 text-[8px] font-bold text-black uppercase">Trending</span>
                        <div className="flex items-center gap-1">
                            <Star className="w-2.5 h-2.5 text-yellow-500 fill-yellow-500" />
                            <span className="text-[10px] text-white/80 font-medium">4.9</span>
                        </div>
                    </div>
                    <h3 className={`font-bold text-white mb-2 ${isMobile ? 'text-sm' : 'text-xl'}`}>Cinematic Origins</h3>
                    <div className="flex gap-2">
                        <div className="px-3 py-1 bg-white text-black rounded text-[9px] font-bold flex items-center gap-1">
                            <Play className="w-2 h-2 fill-current" /> Play
                        </div>
                        <div className="px-3 py-1 bg-white/20 backdrop-blur-md text-white rounded text-[9px] font-bold flex items-center gap-1">
                            <Info className="w-2 h-2" /> Details
                        </div>
                    </div>
                </div>
            </div>

            {/* Animated Movie Shelf */}
            <div className="p-4">
                <div className="w-20 h-2 bg-white/20 rounded-full mb-3" />
                <div className="relative overflow-hidden">
                    <motion.div
                        className="flex gap-3"
                        animate={{ x: ["0%", "-50%"] }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    >
                        {[...MOVIE_POSTERS, ...MOVIE_POSTERS].map((src) => (
                            <div
                                key={src}
                                className={`${isMobile ? 'w-24' : 'w-32'} aspect-video rounded-lg overflow-hidden bg-white/5 shrink-0 border border-white/10`}
                            >
                                <img src={src} className="w-full h-full object-cover" alt="Movie" />
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </div>
    </div>
);