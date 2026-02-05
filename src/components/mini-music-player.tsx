import { motion } from "framer-motion";
import {
	Heart,
	ListMusic,
	Maximize2,
	Pause,
	Play,
	Repeat,
	Repeat1,
	Shuffle,
	SkipBack,
	SkipForward,
	Volume2,
	VolumeX,
} from "lucide-react";
import { useState } from "react";
import { Slider } from "@/components/ui/slider.tsx";
import { libraryActions } from "@/domains/library/store/library-actions.ts";
import { useLibraryStore } from "@/domains/library/store/library-store.ts";
import { cn, formatPayerTime } from "@/lib/utils";

export const MiniPlayer = () => {
	const player = useLibraryStore((state) => state.player);
	const isLiked = useLibraryStore((state) =>
		player.currentTrack
			? state.likes.tracks.includes(player.currentTrack.id)
			: false,
	);
	const [isMuted, setIsMuted] = useState(false);
	const [prevVolume, setPrevVolume] = useState(0.8);

	const currentMedia = player.currentTrack || player.currentPodcast;

	if (!currentMedia) return null;

	const handleVolumeToggle = () => {
		if (isMuted) {
			libraryActions.setVolume(prevVolume);
			setIsMuted(false);
		} else {
			setPrevVolume(player.volume);
			libraryActions.setVolume(0);
			setIsMuted(true);
		}
	};

	const handleVolumeChange = (value: number[]) => {
		libraryActions.setVolume(value[0]);
		setIsMuted(value[0] === 0);
	};

	const duration = "duration" in currentMedia ? currentMedia.duration : 0;
	const currentTime = duration * player.progress;

	return (
		<motion.div
			initial={{ y: 100 }}
			animate={{ y: 0 }}
			exit={{ y: 100 }}
			className="fixed bottom-0 left-0 right-0 z-50 bg-player border-t border-border backdrop-blur-xl"
		>
			{/* Progress Bar */}
			<div className="absolute top-0 left-0 right-0 h-1 group cursor-pointer">
				<div className="progress-bar h-full">
					<motion.div
						className="progress-bar-fill"
						style={{ width: `${player.progress * 100}%` }}
					/>
				</div>
				<div className="absolute inset-0 h-2 -top-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
					<Slider
						value={[player.progress * 100]}
						max={100}
						step={0.1}
						onValueChange={(value) =>
							libraryActions.setProgress(value[0] / 100)
						}
						className="h-2"
					/>
				</div>
			</div>

			<div className="h-20 px-4 flex items-center justify-between gap-4">
				{/* Track Info */}
				<div className="flex items-center gap-3 min-w-0 w-1/4">
					<motion.img
						key={"cover" in currentMedia ? currentMedia.cover : ""}
						initial={{ scale: 0.8, opacity: 0 }}
						animate={{ scale: 1, opacity: 1 }}
						src={"cover" in currentMedia ? currentMedia.cover : ""}
						alt={"title" in currentMedia ? currentMedia.title : ""}
						className="w-14 h-14 rounded-lg object-cover shadow-md"
					/>
					<div className="min-w-0">
						<p className="font-medium text-foreground truncate">
							{"title" in currentMedia ? currentMedia.title : ""}
						</p>
						<p className="text-sm text-muted-foreground truncate">
							{"artist" in currentMedia
								? currentMedia.artist
								: "show" in currentMedia
									? currentMedia.show
									: ""}
						</p>
					</div>
					{player.currentTrack && (
						<motion.button
							whileHover={{ scale: 1.1 }}
							whileTap={{ scale: 0.9 }}
							onClick={() =>
								libraryActions.toggleLike("tracks", player.currentTrack!.id)
							}
							className={cn(
								"ml-2 transition-colors",
								isLiked
									? "text-accent"
									: "text-muted-foreground hover:text-foreground",
							)}
						>
							<Heart
								className="w-5 h-5"
								fill={isLiked ? "currentColor" : "none"}
							/>
						</motion.button>
					)}
				</div>

				{/* Main Controls */}
				<div className="flex flex-col items-center gap-1 flex-1 max-w-md">
					<div className="flex items-center gap-4">
						<motion.button
							whileHover={{ scale: 1.1 }}
							whileTap={{ scale: 0.9 }}
							onClick={libraryActions.toggleShuffle}
							className={cn(
								"transition-colors",
								player.shuffle
									? "text-primary"
									: "text-muted-foreground hover:text-foreground",
							)}
						>
							<Shuffle className="w-4 h-4" />
						</motion.button>

						<motion.button
							whileHover={{ scale: 1.1 }}
							whileTap={{ scale: 0.9 }}
							className="text-foreground"
						>
							<SkipBack className="w-5 h-5" fill="currentColor" />
						</motion.button>

						<motion.button
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
							onClick={libraryActions.togglePlay}
							className="w-10 h-10 rounded-full bg-foreground text-background flex items-center justify-center"
						>
							{player.isPlaying ? (
								<Pause className="w-5 h-5" fill="currentColor" />
							) : (
								<Play className="w-5 h-5 ml-0.5" fill="currentColor" />
							)}
						</motion.button>

						<motion.button
							whileHover={{ scale: 1.1 }}
							whileTap={{ scale: 0.9 }}
							className="text-foreground"
						>
							<SkipForward className="w-5 h-5" fill="currentColor" />
						</motion.button>

						<motion.button
							whileHover={{ scale: 1.1 }}
							whileTap={{ scale: 0.9 }}
							onClick={libraryActions.toggleRepeat}
							className={cn(
								"transition-colors",
								player.repeat !== "off"
									? "text-primary"
									: "text-muted-foreground hover:text-foreground",
							)}
						>
							{player.repeat === "one" ? (
								<Repeat1 className="w-4 h-4" />
							) : (
								<Repeat className="w-4 h-4" />
							)}
						</motion.button>
					</div>

					{/* Time Display */}
					<div className="flex items-center gap-2 text-xs text-muted-foreground">
						<span>{formatPayerTime(currentTime)}</span>
						<span>/</span>
						<span>{formatPayerTime(duration)}</span>
					</div>
				</div>

				{/* Right Controls */}
				<div className="flex items-center gap-3 w-1/4 justify-end">
					<motion.button
						whileHover={{ scale: 1.1 }}
						whileTap={{ scale: 0.9 }}
						className="text-muted-foreground hover:text-foreground transition-colors"
					>
						<ListMusic className="w-5 h-5" />
					</motion.button>

					<div className="flex items-center gap-2 w-32">
						<motion.button
							whileHover={{ scale: 1.1 }}
							whileTap={{ scale: 0.9 }}
							onClick={handleVolumeToggle}
							className="text-muted-foreground hover:text-foreground transition-colors"
						>
							{player.volume === 0 || isMuted ? (
								<VolumeX className="w-5 h-5" />
							) : (
								<Volume2 className="w-5 h-5" />
							)}
						</motion.button>
						<Slider
							value={[player.volume * 100]}
							max={100}
							step={1}
							onValueChange={(v) => handleVolumeChange([v[0] / 100])}
							className="w-20"
						/>
					</div>

					<motion.button
						whileHover={{ scale: 1.1 }}
						whileTap={{ scale: 0.9 }}
						className="text-muted-foreground hover:text-foreground transition-colors hidden lg:block"
					>
						<Maximize2 className="w-5 h-5" />
					</motion.button>
				</div>
			</div>
		</motion.div>
	);
};
