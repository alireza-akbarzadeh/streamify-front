import { formatDistanceToNow } from "date-fns/formatDistanceToNow";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { scaleIn } from "@/components/motion/motion-page.tsx";
import type { Video } from "@/domains/library/store/library-store-types.ts";
import { formatDuration, formatViews } from "@/lib/utils.ts";

interface VideoCardProps {
	video: Video;
	onClick?: () => void;
}

export const VideoCard = ({ video, onClick }: VideoCardProps) => {
	return (
		<motion.div
			variants={scaleIn}
			whileHover={{ scale: 1.02 }}
			whileTap={{ scale: 0.98 }}
			className="group cursor-pointer"
			onClick={onClick}
		>
			{/* Thumbnail */}
			<div className="relative aspect-video rounded-xl overflow-hidden bg-card">
				<img
					src={video.thumbnail}
					alt={video.title}
					className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
					loading="lazy"
				/>

				{/* Duration Badge */}
				<div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-background/80 backdrop-blur-sm text-xs font-medium">
					{formatDuration(video.duration)}
				</div>

				{/* Play Overlay */}
				<div className="absolute inset-0 bg-background/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
					<motion.div
						initial={{ scale: 0.8, opacity: 0 }}
						whileHover={{ scale: 1.1 }}
						className="w-16 h-16 rounded-full bg-primary/90 backdrop-blur flex items-center justify-center shadow-glow"
					>
						<Play
							className="w-7 h-7 text-primary-foreground ml-1"
							fill="currentColor"
						/>
					</motion.div>
				</div>
			</div>

			{/* Info */}
			<div className="flex gap-3 mt-3">
				<img
					src={video.channelAvatar}
					alt={video.channel}
					className="w-9 h-9 rounded-full object-cover flex-shrink-0"
				/>
				<div className="min-w-0">
					<h3 className="font-medium text-foreground line-clamp-2 group-hover:text-primary transition-colors">
						{video.title}
					</h3>
					<p className="text-sm text-muted-foreground mt-1">{video.channel}</p>
					<p className="text-sm text-muted-foreground">
						{formatViews(video.views)} •{" "}
						{formatDistanceToNow(video.publishedAt)}
					</p>
				</div>
			</div>
		</motion.div>
	);
};
