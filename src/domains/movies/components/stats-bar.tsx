import { motion } from "framer-motion";
import { Award, DollarSign, Star, TrendingUp } from "lucide-react";

import { Card } from "@/components/ui/card";
import type { StatsBarProps } from "../movie-types";

export function StatsBar(props: StatsBarProps) {
	const { rating, votes, metascore, popularity, popularityChange, revenue } =
		props;

	const stats = [
		{
			icon: Star,
			label: "IMDb Rating",
			value: `${rating}/10`,
			subtext: `From ${(votes / 1000000).toFixed(1)}M users`,
			gradient: "from-yellow-500 to-amber-600",
			bgGradient: "from-yellow-500/10 to-amber-600/10",
		},
		{
			icon: Award,
			label: "Metascore",
			value: metascore,
			subtext: "Universal acclaim",
			gradient: "from-green-500 to-emerald-600",
			bgGradient: "from-green-500/10 to-emerald-600/10",
		},
		{
			icon: TrendingUp,
			label: "Popularity",
			value: `#${popularity}`,
			subtext: `+${popularityChange} from last week`,
			gradient: "from-cyan-500 to-blue-600",
			bgGradient: "from-cyan-500/10 to-blue-600/10",
		},
		{
			icon: DollarSign,
			label: "Box Office",
			value: revenue,
			subtext: "Worldwide gross",
			gradient: "from-purple-500 to-pink-600",
			bgGradient: "from-purple-500/10 to-pink-600/10",
		},
	];

	return (
		<section className="relative py-12 bg-[#0d0d0d]">
			<div className="max-w-7xl mx-auto px-6">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
					{stats.map((stat, index) => (
						<motion.div
							key={stat.label}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ delay: index * 0.1, duration: 0.5 }}
							whileHover={{ scale: 1.05, y: -4 }}
						>
							<Card className="relative overflow-hidden bg-white/3 backdrop-blur-xl border border-white/10 p-6 hover:bg-white/5 hover:border-white/20 transition-all duration-300 group">
								<div
									className={`absolute inset-0 bg-linear-to-br ${stat.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity`}
								/>

								<div
									className={`absolute inset-0 rounded-lg bg-linear-to-r ${stat.gradient} opacity-0 group-hover:opacity-50 blur-xl transition-opacity`}
								/>

								<div className="relative space-y-3">
									<div
										className={`inline-flex p-3 rounded-xl bg-linear-to-br ${stat.bgGradient}`}
									>
										<stat.icon
											className={`w-6 h-6 bg-linear-to-r ${stat.gradient} bg-clip-text text-transparent`}
											style={{ WebkitTextFillColor: "transparent" }}
										/>
									</div>
									<p className="text-xs uppercase tracking-wider text-gray-400 font-medium">
										{stat.label}
									</p>
									<p className="text-3xl font-bold text-white">{stat.value}</p>
									<p className="text-sm text-gray-500">{stat.subtext}</p>
								</div>
							</Card>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
}
