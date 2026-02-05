import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
	Bookmark,
	BookOpen,
	Clock,
	Film,
	Heart,
	LogOut,
	Music,
	Settings,
} from "lucide-react";
import { fadeInUp, MotionPage } from "@/components/motion/motion-page.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Card, CardContent } from "@/components/ui/card.tsx";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockTracks } from "@/domains/library/library-mock-data.ts";
import { useLibraryStore } from "@/domains/library/store/library-store.ts";

export const Route = createFileRoute("/(library)/library/profile")({
	component: RouteComponent,
});

function RouteComponent() {
	const user = useLibraryStore((state) => state.user);
	const likes = useLibraryStore((state) => state.likes);
	const bookmarks = useLibraryStore((state) => state.bookmarks);
	const history = useLibraryStore((state) => state.history);

	const stats = [
		{
			label: "Liked Tracks",
			count: likes.tracks.length,
			icon: Music,
			color: "text-accent",
		},
		{
			label: "Liked Videos",
			count: likes.videos.length,
			icon: Film,
			color: "text-primary",
		},
		{
			label: "Saved Blogs",
			count: bookmarks.blogs.length,
			icon: BookOpen,
			color: "text-secondary",
		},
		{
			label: "History",
			count: history.tracks.length + history.videos.length,
			icon: Clock,
			color: "text-muted-foreground",
		},
	];
	return (
		<MotionPage>
			{/* Profile Header */}
			<motion.section
				variants={fadeInUp}
				initial="initial"
				animate="animate"
				className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/20 via-background-elevated to-secondary/20 p-8 md:p-12 mb-8"
			>
				<div className="flex flex-col md:flex-row items-center gap-8">
					{/* Avatar */}
					<motion.div
						initial={{ scale: 0.8, opacity: 0 }}
						animate={{ scale: 1, opacity: 1 }}
						transition={{ delay: 0.2 }}
						className="relative"
					>
						<img
							src={user?.avatar}
							alt={user?.name}
							className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover ring-4 ring-primary/30 shadow-lg"
						/>
						<div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-primary flex items-center justify-center shadow-glow">
							<Settings className="w-5 h-5 text-primary-foreground" />
						</div>
					</motion.div>

					{/* Info */}
					<div className="text-center md:text-left">
						<motion.h1
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.3 }}
							className="text-3xl md:text-4xl font-bold text-foreground mb-2"
						>
							{user?.name}
						</motion.h1>
						<motion.p
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.4 }}
							className="text-muted-foreground mb-4"
						>
							{user?.email}
						</motion.p>
						<motion.p
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.5 }}
							className="text-sm text-muted-foreground"
						>
							Member since{" "}
							{new Date(user?.joinedAt || "").toLocaleDateString("en-US", {
								month: "long",
								year: "numeric",
							})}
						</motion.p>
					</div>

					{/* Actions */}
					<div className="md:ml-auto flex gap-3">
						<Button variant="outline" className="gap-2">
							<Settings className="w-4 h-4" />
							Settings
						</Button>
						<Button
							variant="ghost"
							className="gap-2 text-destructive hover:text-destructive"
						>
							<LogOut className="w-4 h-4" />
							Log Out
						</Button>
					</div>
				</div>

				{/* Decorative */}
				<div className="absolute -right-20 -top-20 w-60 h-60 rounded-full bg-primary/10 blur-3xl" />
			</motion.section>

			{/* Stats */}
			<section className="mb-8">
				<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
					{stats.map((stat, index) => {
						const Icon = stat.icon;
						return (
							<motion.div
								key={stat.label}
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: index * 0.1 }}
							>
								<Card className="bg-card border-border">
									<CardContent className="p-6">
										<div className="flex items-center gap-3">
											<div
												className={`w-10 h-10 rounded-lg bg-muted flex items-center justify-center ${stat.color}`}
											>
												<Icon className="w-5 h-5" />
											</div>
											<div>
												<p className="text-2xl font-bold text-foreground">
													{stat.count}
												</p>
												<p className="text-sm text-muted-foreground">
													{stat.label}
												</p>
											</div>
										</div>
									</CardContent>
								</Card>
							</motion.div>
						);
					})}
				</div>
			</section>

			{/* Activity */}
			<Tabs defaultValue="liked" className="mb-8">
				<TabsList className="bg-card">
					<TabsTrigger value="liked" className="gap-2">
						<Heart className="w-4 h-4" />
						Liked
					</TabsTrigger>
					<TabsTrigger value="saved" className="gap-2">
						<Bookmark className="w-4 h-4" />
						Saved
					</TabsTrigger>
					<TabsTrigger value="history" className="gap-2">
						<Clock className="w-4 h-4" />
						History
					</TabsTrigger>
				</TabsList>

				<TabsContent value="liked" className="mt-6">
					<div className="glass-card p-6">
						{likes.tracks.length === 0 && likes.videos.length === 0 ? (
							<div className="text-center py-12">
								<Heart className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
								<h3 className="text-lg font-medium text-foreground mb-2">
									No likes yet
								</h3>
								<p className="text-muted-foreground">
									Start exploring and like content to see it here
								</p>
							</div>
						) : (
							<div className="space-y-4">
								<h3 className="font-medium text-foreground">
									Your liked content will appear here
								</h3>
								<p className="text-sm text-muted-foreground">
									Click the heart icon on any track, video, blog, or podcast to
									add it to your likes.
								</p>
							</div>
						)}
					</div>
				</TabsContent>

				<TabsContent value="saved" className="mt-6">
					<div className="glass-card p-6">
						<div className="text-center py-12">
							<Bookmark className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
							<h3 className="text-lg font-medium text-foreground mb-2">
								No saved items
							</h3>
							<p className="text-muted-foreground">
								Bookmark content to watch or read later
							</p>
						</div>
					</div>
				</TabsContent>

				<TabsContent value="history" className="mt-6">
					<div className="glass-card p-6">
						<div className="text-center py-12">
							<Clock className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
							<h3 className="text-lg font-medium text-foreground mb-2">
								No history yet
							</h3>
							<p className="text-muted-foreground">
								Your recently played and viewed content will show up here
							</p>
						</div>
					</div>
				</TabsContent>
			</Tabs>

			{/* Recent Activity Preview */}
			<section>
				<h2 className="section-header mb-6">Recommended For You</h2>
				<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
					{mockTracks.slice(0, 5).map((track, index) => (
						<motion.div
							key={track.id}
							initial={{ opacity: 0, scale: 0.9 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{ delay: index * 0.1 }}
							whileHover={{ scale: 1.05 }}
							className="cursor-pointer"
						>
							<img
								src={track.cover}
								alt={track.title}
								className="aspect-square rounded-xl object-cover shadow-md"
							/>
							<p className="mt-2 font-medium text-foreground truncate">
								{track.title}
							</p>
							<p className="text-sm text-muted-foreground truncate">
								{track.artist}
							</p>
						</motion.div>
					))}
				</div>
			</section>
		</MotionPage>
	);
}
