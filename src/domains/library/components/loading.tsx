import { cn } from "@/lib/utils";

interface SkeletonProps {
	className?: string;
}

export const Skeleton = ({ className }: SkeletonProps) => (
	<div className={cn("skeleton-pulse", className)} />
);

export const MediaCardSkeleton = ({
	aspectRatio = "square",
}: {
	aspectRatio?: "square" | "video" | "portrait";
}) => {
	const aspectClasses = {
		square: "aspect-square",
		video: "aspect-video",
		portrait: "aspect-[3/4]",
	};

	return (
		<div className="space-y-3">
			<Skeleton className={cn("rounded-xl", aspectClasses[aspectRatio])} />
			<div className="space-y-2 px-1">
				<Skeleton className="h-4 w-3/4" />
				<Skeleton className="h-3 w-1/2" />
			</div>
		</div>
	);
};

export const TrackRowSkeleton = () => (
	<div className="grid grid-cols-[40px_4fr_3fr_1fr_40px] gap-4 items-center px-4 py-3">
		<Skeleton className="w-8 h-4" />
		<div className="flex items-center gap-3">
			<Skeleton className="w-10 h-10 rounded" />
			<div className="space-y-2">
				<Skeleton className="h-4 w-32" />
				<Skeleton className="h-3 w-24" />
			</div>
		</div>
		<Skeleton className="h-3 w-24 hidden md:block" />
		<Skeleton className="h-3 w-12 ml-auto" />
		<div />
	</div>
);

const VideoCardSkeleton = () => (
	<div className="space-y-3">
		<Skeleton className="aspect-video rounded-xl" />
		<div className="flex gap-3">
			<Skeleton className="w-9 h-9 rounded-full flex-shrink-0" />
			<div className="space-y-2 flex-1">
				<Skeleton className="h-4 w-full" />
				<Skeleton className="h-3 w-1/3" />
				<Skeleton className="h-3 w-1/2" />
			</div>
		</div>
	</div>
);
export default VideoCardSkeleton;

export const BlogCardSkeleton = () => (
	<div className="space-y-3">
		<Skeleton className="aspect-video rounded-xl" />
		<div className="space-y-2">
			<Skeleton className="h-5 w-full" />
			<Skeleton className="h-4 w-3/4" />
			<div className="flex gap-4 pt-2">
				<Skeleton className="h-6 w-24 rounded-full" />
				<Skeleton className="h-4 w-20" />
			</div>
		</div>
	</div>
);
