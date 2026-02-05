import { useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
	Bell,
	ChevronLeft,
	ChevronRight,
	Search,
	Settings,
} from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export const LibraryTopBar = () => {
	const navigate = useNavigate();
	const [searchFocused, setSearchFocused] = useState(false);

	return (
		<header className="h-16 flex items-center justify-between gap-4 px-6 bg-gradient-to-b from-background via-background to-transparent sticky top-0 z-30">
			{/* Navigation */}
			<div className="flex items-center gap-2">
				<motion.button
					whileHover={{ scale: 1.1 }}
					whileTap={{ scale: 0.9 }}
					onClick={() => navigate({ to: ".." })}
					className="w-8 h-8 rounded-full bg-background-elevated flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
				>
					<ChevronLeft className="w-5 h-5" />
				</motion.button>
				<motion.button
					whileHover={{ scale: 1.1 }}
					whileTap={{ scale: 0.9 }}
					onClick={() => navigate({ to: "." })}
					className="w-8 h-8 rounded-full bg-background-elevated flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
				>
					<ChevronRight className="w-5 h-5" />
				</motion.button>
			</div>

			{/* Search */}
			<motion.div
				animate={{ width: searchFocused ? 400 : 300 }}
				className="relative"
			>
				<Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
				<Input
					placeholder="Search tracks, videos, blogs..."
					onFocus={() => setSearchFocused(true)}
					onBlur={() => setSearchFocused(false)}
					className={cn(
						"pl-10 bg-background-elevated border-transparent focus:border-primary/50 transition-all",
						searchFocused && "ring-1 ring-primary/30",
					)}
				/>
			</motion.div>

			{/* Actions */}
			<div className="flex items-center gap-2">
				<motion.button
					whileHover={{ scale: 1.1 }}
					whileTap={{ scale: 0.9 }}
					className="relative w-10 h-10 rounded-full bg-background-elevated flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
				>
					<Bell className="w-5 h-5" />
					<span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-accent" />
				</motion.button>
				<motion.button
					whileHover={{ scale: 1.1 }}
					whileTap={{ scale: 0.9 }}
					className="w-10 h-10 rounded-full bg-background-elevated flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
				>
					<Settings className="w-5 h-5" />
				</motion.button>
			</div>
		</header>
	);
};
