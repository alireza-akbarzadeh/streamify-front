import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
	MotionPage,
	staggerContainer,
} from "@/components/motion/motion-page.tsx";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { VideoCard } from "@/domains/library/components/video-card.tsx";
import { mockVideos } from "@/domains/library/library-mock-data.ts";

export const Route = createFileRoute("/(library)/library/videos")({
	component: LibraryVideoPage,
});

function LibraryVideoPage() {
	const categories = [
		"All",
		"Documentary",
		"Music",
		"Concert",
		"Tutorial",
		"Festival",
		"Education",
	];

	return (
		<MotionPage>
			{/* Header */}
			<section className="mb-8">
				<h1 className="text-4xl font-bold text-foreground mb-2">Videos</h1>
				<p className="text-muted-foreground">
					Watch documentaries, concerts, tutorials, and more
				</p>
			</section>

			{/* Categories */}
			<Tabs defaultValue="All" className="mb-8">
				<TabsList className="bg-card flex-wrap h-auto gap-2 p-2">
					{categories.map((cat) => (
						<TabsTrigger
							key={cat}
							value={cat}
							className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
						>
							{cat}
						</TabsTrigger>
					))}
				</TabsList>

				<TabsContent value="All" className="mt-6">
					<motion.div
						variants={staggerContainer}
						initial="initial"
						animate="animate"
						className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
					>
						{mockVideos.map((video) => (
							<VideoCard key={video.id} video={video} />
						))}
					</motion.div>
				</TabsContent>

				{categories.slice(1).map((cat) => (
					<TabsContent key={cat} value={cat} className="mt-6">
						<motion.div
							variants={staggerContainer}
							initial="initial"
							animate="animate"
							className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
						>
							{mockVideos
								.filter((v) => v.category === cat)
								.map((video) => (
									<VideoCard key={video.id} video={video} />
								))}
						</motion.div>
					</TabsContent>
				))}
			</Tabs>

			{/* Featured Section */}
			<section className="mb-8">
				<h2 className="section-header mb-6">Continue Watching</h2>
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
					{mockVideos.slice(0, 3).map((video, index) => (
						<motion.div
							key={video.id}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: index * 0.1 }}
							className="relative group cursor-pointer"
						>
							<div className="aspect-video rounded-xl overflow-hidden">
								<img
									src={video.thumbnail}
									alt={video.title}
									className="w-full h-full object-cover"
								/>
							</div>
							<div className="absolute bottom-0 left-0 right-0 h-1 bg-muted">
								<div
									className="h-full bg-primary"
									style={{ width: `${30 + index * 20}%` }}
								/>
							</div>
							<p className="mt-2 font-medium text-foreground truncate">
								{video.title}
							</p>
							<p className="text-sm text-muted-foreground">{video.channel}</p>
						</motion.div>
					))}
				</div>
			</section>
		</MotionPage>
	);
}
