import { createFileRoute, Outlet } from "@tanstack/react-router";
import { AnimatePresence } from "framer-motion";
import { MiniPlayer } from "@/components/mini-music-player.tsx";
import { LibraryAppSidebar } from "@/domains/library/layouts/library-app-sidebar.tsx";
import { LibraryMobileNav } from "@/domains/library/layouts/library-mobile-nav.tsx";
import { LibraryTopBar } from "@/domains/library/layouts/library-top-bar.tsx";
import { useLibraryStore } from "@/domains/library/store/library-store.ts";
import { cn } from "@/lib/utils.ts";

export const Route = createFileRoute("/(library)")({
	component: LibraryLayout,
});

function LibraryLayout() {
	const sidebarOpen = useLibraryStore((state) => state.sidebarOpen);

	const hasCurrentMedia = useLibraryStore(
		(state) =>
			state.player.currentTrack !== null ||
			state.player.currentPodcast !== null,
	);

	return (
		<div className="min-h-screen bg-background">
			{/* Desktop Sidebar */}
			<div className="hidden md:block">
				<LibraryAppSidebar />
			</div>

			{/* Main Content */}
			<main
				className={cn(
					"min-h-screen transition-all duration-300",
					"pb-20 md:pb-0",
					hasCurrentMedia && "pb-36 md:pb-20",
					sidebarOpen ? "md:ml-60" : "md:ml-18",
				)}
			>
				<LibraryTopBar />
				<div className="px-4 md:px-6 pb-8">
					<AnimatePresence mode="wait">
						<Outlet />
					</AnimatePresence>
				</div>
			</main>

			{/* Mini Player */}
			<AnimatePresence>{hasCurrentMedia && <MiniPlayer />}</AnimatePresence>

			{/* Mobile Nav */}
			<LibraryMobileNav />
		</div>
	);
}
