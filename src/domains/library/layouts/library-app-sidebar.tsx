import { AnimatePresence, motion } from "framer-motion";
import {
	Bookmark,
	BookOpen,
	ChevronLeft,
	ChevronRight,
	Clock,
	Film,
	Heart,
	Home,
	Library,
	Mic2,
	Music,
	Search,
} from "lucide-react";
import { Link } from "@/components/ui/link.tsx";
import type { LibraryNav } from "@/domains/library/library-types.ts";
import { libraryActions } from "@/domains/library/store/library-actions.ts";
import { useLibraryStore } from "@/domains/library/store/library-store.ts";
import { cn } from "@/lib/utils";

const mainNavItems: LibraryNav[] = [
	{ icon: Home, label: "Home", href: "/" },
	{ icon: Search, label: "Search", href: "/library/search" },
	{ icon: Library, label: "Library", href: "/library" },
];

const mediaNavItems: LibraryNav[] = [
	{ icon: Music, label: "Music", href: "/library/music" },
	{ icon: Film, label: "Videos", href: "/library/videos" },
	{ icon: BookOpen, label: "Blogs", href: "/library/blogs" },
	{ icon: Mic2, label: "Podcasts", href: "/library/podcast" },
];

const userNavItems: LibraryNav[] = [
	{ icon: Heart, label: "Liked", href: "/library/liked" },
	{ icon: Bookmark, label: "Saved", href: "/library/saved" },
	{ icon: Clock, label: "History", href: "/library/history" },
];

const NavLink = ({ item }: { item: LibraryNav }) => {
	const isActive = location.pathname === item.href;
	const Icon = item.icon;
	const isOpen = useLibraryStore((state) => state.sidebarOpen);

	return (
		<Link to={item.href}>
			<motion.div
				whileHover={{ x: 4 }}
				whileTap={{ scale: 0.98 }}
				className={cn(
					"flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors cursor-pointer",
					isActive
						? "bg-sidebar-accent text-sidebar-accent-foreground"
						: "text-sidebar-foreground hover:bg-sidebar-accent/50",
				)}
			>
				<Icon className={cn("w-5 h-5 shrink-0", isActive && "text-primary")} />
				<AnimatePresence mode="wait">
					{isOpen && (
						<motion.span
							initial={{ opacity: 0, width: 0 }}
							animate={{ opacity: 1, width: "auto" }}
							exit={{ opacity: 0, width: 0 }}
							className="font-medium truncate"
						>
							{item.label}
						</motion.span>
					)}
				</AnimatePresence>
				{isActive && (
					<motion.div
						layoutId="activeNav"
						className="absolute left-0 w-1 h-6 bg-primary rounded-r-full"
					/>
				)}
			</motion.div>
		</Link>
	);
};

export const LibraryAppSidebar = () => {
	const isOpen = useLibraryStore((state) => state.sidebarOpen);
	const user = useLibraryStore((state) => state.user);

	return (
		<motion.aside
			initial={false}
			animate={{ width: isOpen ? 240 : 72 }}
			transition={{ duration: 0.3, ease: "easeInOut" }}
			className="fixed left-0 top-0 bottom-20 z-40 bg-sidebar border-r border-sidebar-border flex flex-col"
		>
			{/* Logo */}
			<div className="h-16 flex items-center justify-between px-4 border-b border-sidebar-border">
				<Link to="/" className="flex items-center gap-2">
					<div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
						<Music className="w-4 h-4 text-primary-foreground" />
					</div>
					<AnimatePresence mode="wait">
						{isOpen && (
							<motion.span
								initial={{ opacity: 0, x: -10 }}
								animate={{ opacity: 1, x: 0 }}
								exit={{ opacity: 0, x: -10 }}
								className="font-bold text-lg text-foreground"
							>
								StreamFlow
							</motion.span>
						)}
					</AnimatePresence>
				</Link>
			</div>

			{/* Navigation */}
			<nav className="flex-1 overflow-y-auto py-4 px-3 space-y-6">
				{/* Main */}
				<div className="space-y-1">
					{mainNavItems.map((item) => (
						<NavLink key={item.href} item={item} />
					))}
				</div>

				{/* Media */}
				<div className="space-y-1">
					<AnimatePresence mode="wait">
						{isOpen && (
							<motion.p
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
								className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-3 mb-2"
							>
								Browse
							</motion.p>
						)}
					</AnimatePresence>
					{mediaNavItems.map((item) => (
						<NavLink key={item.href} item={item} />
					))}
				</div>

				{/* User */}
				<div className="space-y-1">
					<AnimatePresence mode="wait">
						{isOpen && (
							<motion.p
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
								className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-3 mb-2"
							>
								Your Library
							</motion.p>
						)}
					</AnimatePresence>
					{userNavItems.map((item) => (
						<NavLink key={item.href} item={item} />
					))}
				</div>
			</nav>

			{/* User Section */}
			<div className="border-t border-sidebar-border p-3">
				<Link to="/library/profile">
					<motion.div
						whileHover={{ x: 4 }}
						className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-sidebar-accent/50 transition-colors cursor-pointer"
					>
						{user?.avatar && (
							<img
								src={user.avatar}
								alt={user.name}
								className="w-8 h-8 rounded-full object-cover ring-2 ring-primary/20"
							/>
						)}
						<AnimatePresence mode="wait">
							{isOpen && (
								<motion.div
									initial={{ opacity: 0, width: 0 }}
									animate={{ opacity: 1, width: "auto" }}
									exit={{ opacity: 0, width: 0 }}
									className="min-w-0"
								>
									<p className="font-medium text-sm text-foreground truncate">
										{user?.name}
									</p>
									<p className="text-xs text-muted-foreground truncate">
										{user?.email}
									</p>
								</motion.div>
							)}
						</AnimatePresence>
					</motion.div>
				</Link>
			</div>

			{/* Toggle Button */}
			<motion.button
				whileHover={{ scale: 1.1 }}
				whileTap={{ scale: 0.9 }}
				onClick={() => libraryActions.toggleSidebar()}
				className="absolute -right-3 top-20 w-6 h-6 rounded-full bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
			>
				{isOpen ? (
					<ChevronLeft className="w-4 h-4" />
				) : (
					<ChevronRight className="w-4 h-4" />
				)}
			</motion.button>
		</motion.aside>
	);
};
