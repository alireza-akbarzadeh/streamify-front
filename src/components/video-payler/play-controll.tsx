import BackButton from "../back-button";
import { PlayButton } from "../play-button";
import { MoreEpisode } from "./more-episode";
import { MoreVideoOptions } from "./more-video-options";
import { SoundControls } from "./SoundControls";
import { SettingVideoOptions } from "./setting-video-options";

import { VideoProgressbar } from "./video-progressbar";

export function PlayerControls({ isHovered, videoName, year, state, actions, videoRef }: any) {

    // --- Format time for progress bar ---
    const formatTime = (seconds: number) => {
        if (!seconds) return "0:00";
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = Math.floor(seconds % 60);
        if (h > 0) return `${h}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
        return `${m}:${s.toString().padStart(2, "0")}`;
    };

    return (
        <div className={`absolute inset-0 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            {/* Top Bar */}
            <div className="p-6 flex justify-between items-start">
                <BackButton title={videoName} />
                <div className="flex gap-2">
                    <MoreEpisode />
                    <SettingVideoOptions />
                </div>
            </div>

            {/* Middle: Big Play Button */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <PlayButton value={state.isPlaying} onOpenChange={actions.togglePlay} />
            </div>

            {/* Bottom Bar */}
            <div className="absolute bottom-0 inset-x-0 p-8 bg-linear-to-t from-black/90 to-transparent">
                <div className="flex flex-col gap-4">
                    <div>
                        <h2 className="text-2xl font-bold text-white">{videoName}</h2>
                        <p className="text-white/60">{year} • Action</p>
                    </div>

                    <VideoProgressbar
                        currentTime={state.currentTime}
                        duration={state.duration}
                        isPlaying={state.isPlaying}
                        onSeek={(t) => { if (videoRef.current) videoRef.current.currentTime = t }}
                        onPause={() => videoRef.current?.pause()}
                        onPlay={() => videoRef.current?.play()}
                    />

                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <SoundControls videoRef={videoRef} />
                            <span className="text-sm font-mono text-white/80">
                                {formatTime(state.currentTime)} / {formatTime(state.duration)}
                            </span>
                        </div>
                        <MoreVideoOptions videoRef={videoRef} />
                    </div>
                </div>
            </div>
        </div>
    );
}