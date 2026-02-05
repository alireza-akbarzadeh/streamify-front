import { motion } from "framer-motion";
import { Headphones, Play } from "lucide-react";
import { scaleIn } from "@/components/motion/motion-page.tsx";
import type { Podcast } from "@/domains/library/store/library-store-types.ts";
import { formatDistanceToNow } from "@/lib/date.ts";
import { cn, formatDuration } from "@/lib/utils";

interface PodcastCardProps {
	podcast: Podcast;
	onPlay?: () => void;
}

export const PodcastCard = ({ podcast, onPlay }: PodcastCardProps) => {
	return (
		<motion.div
			variants={scaleIn}
			whileHover={{ scale: 1.02 }}
			whileTap={{ scale: 0.98 }}
			className="group cursor-pointer"
		>
			<div className="media-card">
				{/* Cover */}
				<div className="relative aspect-square overflow-hidden rounded-xl">
					<img
						src={podcast.cover}
						alt={podcast.title}
						className="media-card-image"
						loading="lazy"
					/>

					{/* Category Indicator */}
					<div
						className={cn(
							"absolute top-3 left-3 w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-sm",
							podcast.category === "music" ? "bg-accent/90" : "bg-secondary/90",
						)}
					>
						<Headphones className="w-4 h-4 text-white" />
					</div>

					{/* Duration */}
					<div className="absolute bottom-3 left-3 px-2 py-1 rounded bg-background/80 backdrop-blur-sm text-xs font-medium">
						{formatDuration(podcast.duration)}
					</div>

					{/* Play Button */}
					<motion.button
						initial={{ opacity: 0, scale: 0.8 }}
						whileHover={{ scale: 1.1 }}
						className="absolute bottom-3 right-3 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-glow"
						onClick={(e) => {
							e.stopPropagation();
							onPlay?.();
						}}
					>
						<Play className="w-5 h-5 ml-0.5" fill="currentColor" />
					</motion.button>
				</div>

				{/* Info */}
				<div className="p-3">
					<h3 className="font-semibold text-foreground truncate group-hover:text-primary transition-colors">
						{podcast.title}
					</h3>
					<p className="text-sm text-muted-foreground truncate mt-0.5">
						{podcast.show}
					</p>
					<p className="text-xs text-muted-foreground mt-1">
						{formatDistanceToNow(podcast.publishedAt)}
					</p>
				</div>
			</div>
		</motion.div>
	);
};
