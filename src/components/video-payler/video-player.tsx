import { useRef, useState } from "react";
import { PlayerControls } from "./play-controll";
import { useVideoController } from "./useVideoController";
import { Video } from "./video";
import { VideoOverlay } from "./video-overlay";

type VideoPlayerProps = {
    src: string;
    videoName?: string;
    year?: string;
    videoPoster?: string;
};

export function VideoPlayer({ src, videoPoster, videoName, year }: VideoPlayerProps) {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const [isHovered, setIsHovered] = useState(false);

    // Logic extraction
    const {
        isPlaying, currentTime, duration, togglePlay, skip
    } = useVideoController(videoRef);

    return (
        <div
            className="relative h-screen w-full bg-black rounded-3xl overflow-hidden group shadow-2xl"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <Video ref={videoRef} src={src} className="w-full h-full object-contain" />

            {!isPlaying && !currentTime && (
                <img src={videoPoster} alt={videoName} className="absolute inset-0 w-full h-full object-cover" />
            )}

            <VideoOverlay
                isHovered={isHovered}
                onTogglePlay={togglePlay}
                onSkip={(dir) => skip(dir === "forward" ? 10 : -10)}
            >
                {/* HUD: Heads Up Display */}
                <PlayerControls
                    isHovered={isHovered}
                    videoName={videoName}
                    year={year}
                    state={{ isPlaying, currentTime, duration }}
                    actions={{ togglePlay, skip }}
                    videoRef={videoRef}
                />
            </VideoOverlay>
        </div>
    );
}