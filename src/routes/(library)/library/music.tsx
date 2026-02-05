import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Play, Shuffle } from "lucide-react";
import {
	fadeInUp,
	MotionPage,
	staggerContainer,
} from "@/components/motion/motion-page.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MediaCard } from "@/domains/library/components/media-card.tsx";
import {
	TrackListHeader,
	TrackRow,
} from "@/domains/library/components/track-row.tsx";
import { mockTracks } from "@/domains/library/library-mock-data.ts";
import { libraryActions } from "@/domains/library/store/library-actions.ts";
import { useLibraryStore } from "@/domains/library/store/library-store.ts";

export const Route = createFileRoute("/(library)/library/music")({
	component: MusicPage,
});

function MusicPage() {
	const player = useLibraryStore((state) => state.player);
	const currentTrackId = player.currentTrack?.id;

	const handlePlayAll = () => {
		if (mockTracks.length > 0) {
			libraryActions.playTrack(mockTracks[0]);
		}
	};

	return (
		<MotionPage>
			{/* Hero Section */}
			<motion.section
				variants={fadeInUp}
				initial="initial"
				animate="animate"
				className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-accent/30 via-background-elevated to-primary/10 p-8 md:p-12 mb-8"
			>
				<div className="relative z-10">
					<h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
						Music Library
					</h1>
					<p className="text-lg text-muted-foreground mb-6 max-w-xl">
						Your personal collection of tracks, albums, and playlists. Discover
						new sounds and revisit your favorites.
					</p>
					<div className="flex gap-4">
						<Button
							size="lg"
							className="gap-2 glow-accent"
							onClick={handlePlayAll}
						>
							<Play className="w-5 h-5" fill="currentColor" />
							Play All
						</Button>
						<Button variant="outline" size="lg" className="gap-2">
							<Shuffle className="w-5 h-5" />
							Shuffle
						</Button>
					</div>
				</div>

				{/* Decorative */}
				<div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-accent/20 blur-3xl" />
				<div className="absolute right-20 bottom-0 w-40 h-40 rounded-full bg-primary/20 blur-2xl" />
			</motion.section>

			{/* Tabs */}
			<Tabs defaultValue="all" className="mb-8">
				<TabsList className="bg-card">
					<TabsTrigger value="all">All Tracks</TabsTrigger>
					<TabsTrigger value="albums">Albums</TabsTrigger>
					<TabsTrigger value="artists">Artists</TabsTrigger>
					<TabsTrigger value="genres">Genres</TabsTrigger>
				</TabsList>

				<TabsContent value="all" className="mt-6">
					{/* Track List */}
					<div className="glass-card rounded-xl overflow-hidden">
						<TrackListHeader />
						<div className="divide-y divide-border/50">
							{mockTracks.map((track, index) => (
								<TrackRow
									key={track.id}
									track={track}
									index={index}
									isActive={currentTrackId === track.id}
									isPlaying={player.isPlaying && currentTrackId === track.id}
									onPlay={() => libraryActions.playTrack(track)}
								/>
							))}
						</div>
					</div>
				</TabsContent>

				<TabsContent value="albums" className="mt-6">
					<motion.div
						variants={staggerContainer}
						initial="initial"
						animate="animate"
						className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6"
					>
						{mockTracks.slice(0, 5).map((track) => (
							<MediaCard
								key={track.id}
								id={track.id}
								title={track.album}
								subtitle={track.artist}
								image={track.cover}
								type="track"
								onPlay={() => libraryActions.playTrack(track)}
							/>
						))}
					</motion.div>
				</TabsContent>

				<TabsContent value="artists" className="mt-6">
					<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
						{mockTracks.map((track) => (
							<motion.div
								key={track.id}
								whileHover={{ scale: 1.05 }}
								className="text-center cursor-pointer group"
							>
								<div className="aspect-square rounded-full overflow-hidden mb-3 ring-4 ring-transparent group-hover:ring-primary/20 transition-all">
									<img
										src={track.cover}
										alt={track.artist}
										className="w-full h-full object-cover"
									/>
								</div>
								<h3 className="font-medium text-foreground group-hover:text-primary transition-colors">
									{track.artist}
								</h3>
								<p className="text-sm text-muted-foreground">Artist</p>
							</motion.div>
						))}
					</div>
				</TabsContent>

				<TabsContent value="genres" className="mt-6">
					<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
						{[
							"Electronic",
							"Chill",
							"Hip-Hop",
							"Synthwave",
							"Ambient",
							"Indie",
							"EDM",
							"Classical",
						].map((genre, index) => (
							<motion.div
								key={genre}
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: index * 0.1 }}
								whileHover={{ scale: 1.02 }}
								className="relative h-32 rounded-xl overflow-hidden cursor-pointer group"
							>
								<div
									className={`absolute inset-0 bg-linear-to-br ${
										index % 4 === 0
											? "from-accent/50 to-accent/20"
											: index % 4 === 1
												? "from-primary/50 to-primary/20"
												: index % 4 === 2
													? "from-secondary/50 to-secondary/20"
													: "from-success/50 to-success/20"
									}`}
								/>
								<div className="absolute inset-0 flex items-end p-4">
									<h3 className="font-bold text-xl text-foreground">{genre}</h3>
								</div>
							</motion.div>
						))}
					</div>
				</TabsContent>
			</Tabs>
		</MotionPage>
	);
}
