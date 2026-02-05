import { motion } from "framer-motion";
import { Bookmark, Heart, Play } from "lucide-react";
import { scaleIn } from "@/components/motion/motion-page.tsx";
import { libraryActions } from "@/domains/library/store/library-actions.ts";
import { useLibraryStore } from "@/domains/library/store/library-store.ts";
import { cn } from "@/lib/utils";

interface MediaCardProps {
	id: string;
	title: string;
	subtitle: string;
	image: string;
	type: "track" | "video" | "blog" | "podcast";
	aspectRatio?: "square" | "video" | "portrait";
	onPlay?: () => void;
	showPlayButton?: boolean;
	meta?: string;
	className?: string;
}

export const MediaCard = ({
	id,
	title,
	subtitle,
	image,
	type,
	aspectRatio = "square",
	onPlay,
	showPlayButton = true,
	meta,
	className,
}: MediaCardProps) => {
	const typeMap = {
		track: "tracks",
		video: "videos",
		blog: "blogs",
		podcast: "podcasts",
	} as const;

	const storeType = typeMap[type];
	const isLiked = useLibraryStore((state) =>
		state.likes[storeType].includes(id),
	);
	const isBookmarked = useLibraryStore((state) =>
		state.bookmarks[storeType].includes(id),
	);

	const aspectClasses = {
		square: "aspect-square",
		video: "aspect-video",
		portrait: "aspect-[3/4]",
	};

	return (
		<motion.div
			variants={scaleIn}
			whileHover={{ scale: 1.02 }}
			whileTap={{ scale: 0.98 }}
			className={cn("group relative", className)}
		>
			<div className="media-card cursor-pointer">
				{/* Image Container */}
				<div
					className={cn(
						"relative overflow-hidden rounded-xl",
						aspectClasses[aspectRatio],
					)}
				>
					<img
						src={image}
						alt={title}
						className="media-card-image"
						loading="lazy"
					/>

					{/* Overlay on Hover */}
					<div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

					{/* Play Button */}
					{showPlayButton && (
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
					)}

					{/* Quick Actions */}
					<div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
						<motion.button
							whileHover={{ scale: 1.1 }}
							whileTap={{ scale: 0.9 }}
							onClick={(e) => {
								e.stopPropagation();
								libraryActions.toggleLike(storeType, id);
							}}
							className={cn(
								"w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-sm transition-colors",
								isLiked
									? "bg-accent text-accent-foreground"
									: "bg-background/60 text-foreground hover:bg-background/80",
							)}
						>
							<Heart
								className="w-4 h-4"
								fill={isLiked ? "currentColor" : "none"}
							/>
						</motion.button>
						<motion.button
							whileHover={{ scale: 1.1 }}
							whileTap={{ scale: 0.9 }}
							onClick={(e) => {
								e.stopPropagation();
								libraryActions.toggleBookmark(storeType, id);
							}}
							className={cn(
								"w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-sm transition-colors",
								isBookmarked
									? "bg-primary text-primary-foreground"
									: "bg-background/60 text-foreground hover:bg-background/80",
							)}
						>
							<Bookmark
								className="w-4 h-4"
								fill={isBookmarked ? "currentColor" : "none"}
							/>
						</motion.button>
					</div>
				</div>

				{/* Content */}
				<div className="p-3">
					<h3 className="font-semibold text-foreground truncate group-hover:text-primary transition-colors">
						{title}
					</h3>
					<p className="text-sm text-muted-foreground truncate mt-0.5">
						{subtitle}
					</p>
					{meta && <p className="text-xs text-muted-foreground mt-1">{meta}</p>}
				</div>
			</div>
		</motion.div>
	);
};
