import { motion } from "framer-motion";
import { Logo } from "@/components/logo";
import { MoviesSearchInput } from "./movies-search-input";

interface SearchHeaderProps {
	searchQuery: string;
    onSearchChange: (query: string) => void
	title?: string;
}

export function SearchHeader({
	searchQuery,
                                 onSearchChange,
	title,
}: SearchHeaderProps) {
	return (
		<motion.div
			initial={{ y: -100 }}
			animate={{ y: 0 }}
			transition={{ duration: 0.6, ease: "easeOut" }}
			className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-2xl border-b border-white/5"
		>
			<div className="max-w-450 mx-auto px-6 py-4">
				<div className="flex items-center gap-4 justify-between">
					<div className="flex items-center gap-4 flex-1">
						<Logo />
						<MoviesSearchInput
							searchQuery={searchQuery}
							onSearchChange={onSearchChange}
						/>
						<div className="w-10 h-10 rounded-full bg-linear-to-br from-purple-600 to-pink-600 flex items-center justify-center cursor-pointer hover:scale-110 transition-transform shrink-0">
							<span className="text-white font-bold text-sm">JD</span>
						</div>
					</div>
					{title ? (
						<h2 className="text-2xl md:text-3xl font-bold text-white pl-6">
							{title}
						</h2>
					) : null}
				</div>
			</div>
		</motion.div>
	);
}
