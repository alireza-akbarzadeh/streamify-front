import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { MovieImage } from "../movie-types";

interface ImagesGalleryProps {
	movieId: number;
}
export function ImagesGallery({ movieId }: ImagesGalleryProps) {
	const [activeTab, setActiveTab] = useState("all");
	const [lightboxOpen, setLightboxOpen] = useState(false);
	const [currentImage, setCurrentImage] = useState(0);

	const images: MovieImage[] = [
		{
			url: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&h=600&fit=crop",
			type: "still",
			description: "Epic desert scene from the movie",
		},
		{
			url: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&h=600&fit=crop",
			type: "still",
			description: "Main character walking through the sand dunes",
		},
		{
			url: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&h=600&fit=crop",
			type: "behind",
			description: "Director setting up a shot on the set",
		},
		{
			url: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&h=600&fit=crop",
			type: "still",
			description: "Intense confrontation scene between two characters",
		},
		{
			url: "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?w=800&h=600&fit=crop",
			type: "poster",
			description: "Official movie poster featuring the lead character",
		},
		{
			url: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=800&h=600&fit=crop",
			type: "behind",
			description: "Crew members adjusting lighting on set",
		},
	];

	const openLightbox = (index: number) => {
		setCurrentImage(index);
		setLightboxOpen(true);
	};

	const navigate = (direction: "next" | "prev") => {
		if (direction === "next") {
			setCurrentImage((prev) => (prev + 1) % images.length);
		} else {
			setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
		}
	};

	return (
		<section className="relative py-20 bg-linear-to-b from-[#0d0d0d] to-[#0a0a0a]">
			<div className="max-w-7xl mx-auto px-6">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.8 }}
				>
					<div className="flex items-center justify-between mb-8">
						<h2 className="text-3xl md:text-4xl font-bold text-white">
							Images
						</h2>

						<Tabs value={activeTab} onValueChange={setActiveTab}>
							<TabsList className="bg-white/5">
								<TabsTrigger value="all">All</TabsTrigger>
								<TabsTrigger value="still">Stills</TabsTrigger>
								<TabsTrigger value="behind">Behind Scenes</TabsTrigger>
								<TabsTrigger value="poster">Posters</TabsTrigger>
							</TabsList>
						</Tabs>
					</div>

					{/* Image Grid */}
					<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
						{images.map((image, index) => (
							<motion.div
								key={image.url}
								initial={{ opacity: 0, scale: 0.9 }}
								whileInView={{ opacity: 1, scale: 1 }}
								viewport={{ once: true }}
								transition={{ delay: index * 0.1, duration: 0.5 }}
								className="relative aspect-video rounded-xl overflow-hidden group cursor-pointer"
								onClick={() => openLightbox(index)}
							>
								<img
									src={image.url}
									alt={`Scene from the movie: ${image.url || `slide ${index + 1}`}`}
									className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
								/>

								{/* Overlay */}
								<div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
									<ZoomIn className="w-8 h-8 text-white" />
								</div>

								{/* Border glow */}
								<div className="absolute inset-0 rounded-xl border-2 border-purple-500/0 group-hover:border-purple-500/50 transition-colors" />
							</motion.div>
						))}
					</div>
				</motion.div>
			</div>

			{/* Lightbox */}
			<AnimatePresence>
				{lightboxOpen && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center"
						onClick={() => setLightboxOpen(false)}
					>
						{/* Close button */}
						<Button
							variant="ghost"
							size="icon"
							className="absolute top-4 right-4 text-white hover:bg-white/10 rounded-full"
							onClick={() => setLightboxOpen(false)}
						>
							<X className="w-6 h-6" />
						</Button>

						{/* Navigation */}
						<Button
							variant="ghost"
							size="icon"
							className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/10 rounded-full"
							onClick={(e) => {
								e.stopPropagation();
								navigate("prev");
							}}
						>
							<ChevronLeft className="w-6 h-6" />
						</Button>

						<Button
							variant="ghost"
							size="icon"
							className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/10 rounded-full"
							onClick={(e) => {
								e.stopPropagation();
								navigate("next");
							}}
						>
							<ChevronRight className="w-6 h-6" />
						</Button>

						{/* Image */}
						<motion.img
							key={currentImage}
							initial={{ scale: 0.8, opacity: 0 }}
							animate={{ scale: 1, opacity: 1 }}
							exit={{ scale: 0.8, opacity: 0 }}
							src={images[currentImage].url}
							alt="Full size"
							className="max-w-[90vw] max-h-[90vh] object-contain"
							onClick={(e) => e.stopPropagation()}
						/>

						{/* Counter */}
						<div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm">
							{currentImage + 1} / {images.length}
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</section>
	);
}
