import { motion } from "framer-motion";
import { ChevronDown, Flag, MessageCircle, Star, ThumbsUp } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface ReviewsSectionProps {
	movieId: number;
}

export function ReviewsSection({ movieId }: ReviewsSectionProps) {
	const [filter, setFilter] = useState("all");
	const [expandedReviews, setExpandedReviews] = useState(new Set());

	const reviews = [
		{
			id: 1,
			username: "JohnDoe_123",
			avatar:
				"https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop",
			rating: 9,
			title: "A masterpiece of sci-fi cinema",
			content:
				"Dune: Part Two exceeds all expectations with breathtaking visuals, powerful performances, and a compelling narrative that stays true to Frank Herbert's vision. Denis Villeneuve has crafted a cinematic experience that will be remembered for years to come. The world-building is impeccable, and every frame is a work of art.",
			date: "2 days ago",
			helpful: 245,
			verified: true,
		},
		{
			id: 2,
			username: "MovieBuff_2024",
			avatar:
				"https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
			rating: 10,
			title: "Best film of the year!",
			content:
				"Simply stunning from start to finish. The cinematography alone is worth the price of admission. Timothée Chalamet and Zendaya deliver career-best performances. The score by Hans Zimmer elevates every scene. This is what blockbuster filmmaking should aspire to be.",
			date: "5 days ago",
			helpful: 189,
			verified: true,
		},
		{
			id: 3,
			username: "CinemaFan88",
			avatar:
				"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
			rating: 8,
			title: "Visually spectacular, emotionally powerful",
			content:
				"While the pacing is slower than typical blockbusters, it serves the story well. The attention to detail in production design and costume work is extraordinary. Some may find it long, but I was captivated throughout.",
			date: "1 week ago",
			helpful: 156,
			verified: false,
		},
	];

	const toggleExpanded = (id: number) => {
		const newExpanded = new Set(expandedReviews);
		if (newExpanded.has(id)) {
			newExpanded.delete(id);
		} else {
			newExpanded.add(id);
		}
		setExpandedReviews(newExpanded);
	};

	return (
		<section className="relative py-20 bg-[#0a0a0a]">
			<div className="max-w-7xl mx-auto px-6">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.8 }}
					className="space-y-8"
				>
					{/* Header */}
					<div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
						<div>
							<h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
								Reviews
							</h2>
							<p className="text-gray-400">
								{reviews.length.toLocaleString()} reviews
							</p>
						</div>

						{/* Filters */}
						<div className="flex gap-3">
							<Button
								variant={filter === "all" ? "default" : "outline"}
								onClick={() => setFilter("all")}
								className={
									filter === "all"
										? "bg-linear-to-r from-purple-600 to-pink-600"
										: "bg-white/5 border-white/10 text-white hover:bg-white/10"
								}
							>
								All
							</Button>
							<Button
								variant={filter === "positive" ? "default" : "outline"}
								onClick={() => setFilter("positive")}
								className={
									filter === "positive"
										? "bg-linear-to-r from-purple-600 to-pink-600"
										: "bg-white/5 border-white/10 text-white hover:bg-white/10"
								}
							>
								Positive
							</Button>
							<Button
								variant={filter === "critical" ? "default" : "outline"}
								onClick={() => setFilter("critical")}
								className={
									filter === "critical"
										? "bg-linear-to-r from-purple-600 to-pink-600"
										: "bg-white/5 border-white/10 text-white hover:bg-white/10"
								}
							>
								Critical
							</Button>
						</div>
					</div>

					{/* Reviews List */}
					<div className="space-y-6">
						{reviews.map((review, index) => (
							<motion.div
								key={review.id}
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ delay: index * 0.1, duration: 0.5 }}
							>
								<Card className="bg-white/3 backdrop-blur-xl border border-white/10 p-6 hover:bg-white/5 hover:border-white/20 transition-all">
									{/* Header */}
									<div className="flex items-start justify-between mb-4">
										<div className="flex items-center gap-3">
											<img
												src={review.avatar}
												alt={review.username}
												className="w-12 h-12 rounded-full border-2 border-purple-500/50"
											/>
											<div>
												<div className="flex items-center gap-2">
													<p className="text-white font-medium">
														{review.username}
													</p>
													{review.verified && (
														<Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">
															Verified
														</Badge>
													)}
												</div>
												<p className="text-sm text-gray-500">{review.date}</p>
											</div>
										</div>

										{/* Rating */}
										<div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-linear-to-r from-yellow-500/20 to-amber-500/20 border border-yellow-500/30">
											<Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
											<span className="text-white font-bold">
												{review.rating}/10
											</span>
										</div>
									</div>

									{/* Title */}
									<h3 className="text-lg font-semibold text-white mb-3">
										{review.title}
									</h3>

									{/* Content */}
									<p
										className={`text-gray-300 leading-relaxed ${!expandedReviews.has(review.id) ? "line-clamp-3" : ""}`}
									>
										{review.content}
									</p>

									{review.content.length > 150 && (
										<Button
											variant="ghost"
											size="sm"
											onClick={() => toggleExpanded(review.id)}
											className="text-purple-400 hover:text-purple-300 hover:bg-purple-500/10 mt-2 px-0"
										>
											{expandedReviews.has(review.id)
												? "Show less"
												: "Read more"}
										</Button>
									)}

									{/* Actions */}
									<div className="flex items-center gap-6 mt-4 pt-4 border-t border-white/5">
										<Button className="flex items-center gap-2 text-gray-400 hover:text-purple-400 transition-colors">
											<ThumbsUp className="w-4 h-4" />
											<span className="text-sm">
												Helpful ({review.helpful})
											</span>
										</Button>
										<Button className="flex items-center gap-2 text-gray-400 hover:text-purple-400 transition-colors">
											<MessageCircle className="w-4 h-4" />
											<span className="text-sm">Reply</span>
										</Button>
										<Button className="flex items-center gap-2 text-gray-400 hover:text-red-400 transition-colors ml-auto">
											<Flag className="w-4 h-4" />
											<span className="text-sm">Report</span>
										</Button>
									</div>
								</Card>
							</motion.div>
						))}
					</div>

					{/* Load More */}
					<div className="flex justify-center pt-4">
						<Button
							variant="outline"
							className="bg-white/5 border-white/10 text-white hover:bg-white/10 hover:border-purple-500/50"
						>
							Load More Reviews
							<ChevronDown className="w-4 h-4 ml-2" />
						</Button>
					</div>
				</motion.div>
			</div>
		</section>
	);
}
