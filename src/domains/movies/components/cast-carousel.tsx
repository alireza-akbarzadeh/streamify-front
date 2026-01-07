import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";
import { Button } from "@/components/ui/button";

interface CastCarouselProps {
	movieId: number;
}
export function CastCarousel({ movieId }: CastCarouselProps) {
	const scrollRef = useRef<HTMLDivElement>(null);

	const cast = [
		{
			name: "Timothée Chalamet",
			character: "Paul Atreides",
			image:
				"https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop",
		},
		{
			name: "Zendaya",
			character: "Chani",
			image:
				"https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop",
		},
		{
			name: "Rebecca Ferguson",
			character: "Lady Jessica",
			image:
				"https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop",
		},
		{
			name: "Josh Brolin",
			character: "Gurney Halleck",
			image:
				"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
		},
		{
			name: "Austin Butler",
			character: "Feyd-Rautha",
			image:
				"https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop",
		},
		{
			name: "Florence Pugh",
			character: "Princess Irulan",
			image:
				"https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop",
		},
		{
			name: "Javier Bardem",
			character: "Stilgar",
			image:
				"https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop",
		},
		{
			name: "Dave Bautista",
			character: "Glossu Rabban",
			image:
				"https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=200&h=200&fit=crop",
		},
	];

	const scroll = (direction: "left" | "right") => {
		if (scrollRef.current) {
			const scrollAmount = direction === "left" ? -400 : 400;
			scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
		}
	};

	return (
		<section className="relative py-20 bg-linear-to-b from-[#0d0d0d] to-[#0a0a0a] overflow-hidden">
			<div className="max-w-7xl mx-auto px-6">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.8 }}
				>
					<div className="flex items-center justify-between mb-8">
						<div>
							<h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
								Cast & Crew
							</h2>
							<p className="text-gray-400">Starring</p>
						</div>

						<div className="hidden md:flex gap-2">
							<Button
								variant="ghost"
								size="icon"
								onClick={() => scroll("left")}
								className="rounded-full bg-white/5 hover:bg-white/10 text-white border border-white/10"
							>
								<ChevronLeft className="w-5 h-5" />
							</Button>
							<Button
								variant="ghost"
								size="icon"
								onClick={() => scroll("right")}
								className="rounded-full bg-white/5 hover:bg-white/10 text-white border border-white/10"
							>
								<ChevronRight className="w-5 h-5" />
							</Button>
						</div>
					</div>

					<div
						ref={scrollRef}
						className="flex gap-6 overflow-x-auto scrollbar-hide pb-4 -mx-6 px-6 snap-x snap-mandatory"
						style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
					>
						{cast.map((actor, index) => (
							<motion.div
								key={actor.name}
								initial={{ opacity: 0, x: 50 }}
								whileInView={{ opacity: 1, x: 0 }}
								viewport={{ once: true }}
								transition={{ delay: index * 0.1, duration: 0.5 }}
								className="shrink-0 w-40 snap-start group cursor-pointer"
							>
								<div className="relative">
									{/* Avatar */}
									<div className="relative mb-4 overflow-hidden rounded-full">
										<div className="aspect-square rounded-full overflow-hidden border-2 border-transparent group-hover:border-purple-500 transition-all duration-300">
											<img
												src={actor.image}
												alt={actor.name}
												className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
											/>
										</div>

										{/* Gradient border effect */}
										<div className="absolute inset-0 rounded-full bg-linear-to-br from-purple-500 via-pink-500 to-cyan-500 opacity-0 group-hover:opacity-50 blur-lg transition-opacity duration-300" />
									</div>

									{/* Info */}
									<div className="text-center space-y-1">
										<p className="text-white font-medium group-hover:text-purple-400 transition-colors">
											{actor.name}
										</p>
										<p className="text-sm text-gray-400">{actor.character}</p>
									</div>
								</div>
							</motion.div>
						))}
					</div>
				</motion.div>
			</div>

			{/* Gradient fade edges */}
			<div className="absolute left-0 top-0 bottom-0 w-20 bg-linear-to-r from-[#0d0d0d] to-transparent pointer-events-none" />
			<div className="absolute right-0 top-0 bottom-0 w-20 bg-linear-to-l from-[#0a0a0a] to-transparent pointer-events-none" />
		</section>
	);
}
